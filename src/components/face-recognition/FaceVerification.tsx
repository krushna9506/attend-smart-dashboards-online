
import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const FaceVerification = ({ onVerificationComplete }: { onVerificationComplete: (success: boolean) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCaptureMode, setCaptureMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        ]);
        setIsLoading(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load face recognition models",
          variant: "destructive",
        });
      }
    };

    loadModels();
  }, []);

  const startVideo = async () => {
    if (!videoRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      videoRef.current.srcObject = stream;
      setCaptureMode(true);
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera",
        variant: "destructive",
      });
    }
  };

  const verifyFace = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    try {
      // Get current face descriptor
      const fullFaceDescription = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!fullFaceDescription) {
        toast({
          title: "Error",
          description: "No face detected. Please position your face in the camera",
          variant: "destructive",
        });
        return;
      }

      // Get stored face data
      const { data: faceData, error: faceError } = await supabase
        .from('face_data')
        .select('face_encoding')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .eq('is_current', true)
        .single();

      if (faceError || !faceData) {
        toast({
          title: "Error",
          description: "No face data found. Please set up face recognition first",
          variant: "destructive",
        });
        return;
      }

      // Parse the face encoding based on type
      let storedDescriptor: Float32Array;
      
      if (typeof faceData.face_encoding === 'string') {
        // If it's stored as a string
        storedDescriptor = new Float32Array(faceData.face_encoding.split(',').map(Number));
      } else if (Array.isArray(faceData.face_encoding)) {
        // If it's stored as an array
        const numberArray = faceData.face_encoding.map(value => Number(value));
        storedDescriptor = new Float32Array(numberArray);
      } else if (typeof faceData.face_encoding === 'object' && faceData.face_encoding !== null) {
        // If it's stored as an object with numeric indices (JSON representation of array)
        const values = Object.values(faceData.face_encoding).map(value => Number(value));
        storedDescriptor = new Float32Array(values);
      } else {
        toast({
          title: "Error",
          description: "Invalid face data format",
          variant: "destructive",
        });
        return;
      }

      const distance = faceapi.euclideanDistance(fullFaceDescription.descriptor, storedDescriptor);

      if (distance < 0.6) { // Threshold for face match
        // Record attendance
        const { error: attendanceError } = await supabase
          .from('face_attendance')
          .insert({
            user_id: (await supabase.auth.getUser()).data.user?.id,
            class_id: 'current-class', // This should be passed as a prop
            face_confidence: 1 - distance,
            location: 'classroom', // This could be from geolocation
            device_info: navigator.userAgent
          });

        if (attendanceError) {
          toast({
            title: "Error",
            description: "Failed to record attendance",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Success",
          description: "Face verification successful",
        });
        onVerificationComplete(true);
      } else {
        toast({
          title: "Error",
          description: "Face verification failed. Please try again",
          variant: "destructive",
        });
        onVerificationComplete(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Face verification failed. Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-[640px] h-[480px] bg-gray-100 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-full object-cover"
            style={{ display: isCaptureMode ? 'block' : 'none' }}
          />
          <canvas ref={canvasRef} className="absolute top-0 left-0" />
          {!isCaptureMode && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button onClick={startVideo}>Start Camera</Button>
            </div>
          )}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-lg">Loading face recognition models...</div>
            </div>
          )}
        </div>
        {isCaptureMode && (
          <Button onClick={verifyFace} className="mt-4">
            Verify Face
          </Button>
        )}
      </div>
    </Card>
  );
};
