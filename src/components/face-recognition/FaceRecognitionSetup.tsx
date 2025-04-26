
import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const FaceRecognitionSetup = () => {
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

  const captureFace = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();

    if (detection) {
      const canvas = canvasRef.current;
      const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
      faceapi.matchDimensions(canvas, displaySize);
      
      // Get face descriptor
      const fullFaceDescription = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (fullFaceDescription) {
        // Store face data in Supabase
        const { error } = await supabase
          .from('face_data')
          .upsert({
            user_id: (await supabase.auth.getUser()).data.user?.id,
            face_encoding: fullFaceDescription.descriptor.toString(),
            is_current: true,
          });

        if (error) {
          toast({
            title: "Error",
            description: "Failed to save face data",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Face data captured successfully",
          });
        }
      }
    } else {
      toast({
        title: "Error",
        description: "No face detected. Please position your face in the camera",
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
          <Button onClick={captureFace} className="mt-4">
            Capture Face Data
          </Button>
        )}
      </div>
    </Card>
  );
};
