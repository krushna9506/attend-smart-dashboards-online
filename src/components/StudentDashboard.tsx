
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, Clock, CheckCircle, XCircle, BarChart, BookOpen, 
  LogOut, Scan, Camera, Wifi, WifiOff, MapPin
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("attendance");
  const [qrScanned, setQrScanned] = useState<number>(0);
  const [faceVerified, setFaceVerified] = useState<boolean>(false);

  // Mock data
  const attendanceRate = 92;
  const totalClasses = 45;
  const presentClasses = 42;
  const courses = [
    { id: 1, name: "Mathematics", attendance: 95, mode: "offline" },
    { id: 2, name: "Physics", attendance: 88, mode: "online" },
    { id: 3, name: "Computer Science", attendance: 100, mode: "offline" },
    { id: 4, name: "English", attendance: 82, mode: "online" },
  ];
  
  const upcomingClasses = [
    { id: 1, name: "Physics Lab", time: "10:00 AM", room: "Lab 101", mode: "offline" },
    { id: 2, name: "Calculus", time: "01:30 PM", room: "R203", mode: "online" },
  ];

  const attendanceHistory = [
    { id: 1, date: "May 15, 2023", course: "Mathematics", status: "present", verificationMethod: "Face Recognition" },
    { id: 2, date: "May 14, 2023", course: "Physics", status: "present", verificationMethod: "QR Code (Online)" },
    { id: 3, date: "May 13, 2023", course: "Computer Science", status: "absent", verificationMethod: "N/A" },
    { id: 4, date: "May 12, 2023", course: "English", status: "present", verificationMethod: "QR Code (Online)" },
    { id: 5, date: "May 11, 2023", course: "Mathematics", status: "present", verificationMethod: "Face Recognition" },
  ];

  const handleScanQR = () => {
    if (qrScanned < 3) {
      setQrScanned(qrScanned + 1);
      toast({
        title: `QR Code ${qrScanned + 1} scanned`,
        description: qrScanned === 2 
          ? "All QR codes successfully scanned!" 
          : `${3 - (qrScanned + 1)} more QR codes needed`,
      });
    }
  };

  const handleFaceVerification = () => {
    // Mock face verification
    setFaceVerified(true);
    toast({
      title: "Face verified",
      description: "Your face has been successfully verified",
    });
  };

  const handleCheckIn = () => {
    // For online classes: require 3 QR codes
    // For offline classes: require QR code + face verification
    const currentClass = upcomingClasses[0];
    
    if (currentClass.mode === "online" && qrScanned < 3) {
      toast({
        title: "Cannot check in",
        description: "You need to scan all 3 QR codes first",
        variant: "destructive",
      });
      return;
    }
    
    if (currentClass.mode === "offline" && (!qrScanned || !faceVerified)) {
      toast({
        title: "Cannot check in",
        description: "You need both QR scan and face verification",
        variant: "destructive",
      });
      return;
    }
    
    setIsCheckedIn(!isCheckedIn);
    toast({
      title: isCheckedIn ? "Checked out" : "Checked in",
      description: isCheckedIn ? "You have successfully checked out" : "You have successfully checked in",
    });
    
    // Reset verification state after check-out
    if (isCheckedIn) {
      setQrScanned(0);
      setFaceVerified(false);
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back, Alex Johnson</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-3xl font-bold mr-2">{attendanceRate}%</div>
                <BarChart className="h-5 w-5 text-attendance-secondary" />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Present: {presentClasses} / {totalClasses} classes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Next Class</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-attendance-primary mr-2" />
                <div className="text-lg font-medium">{upcomingClasses[0].name}</div>
                {upcomingClasses[0].mode === "online" ? (
                  <Badge className="ml-2 bg-blue-500">
                    <Wifi className="h-3 w-3 mr-1" />
                    Online
                  </Badge>
                ) : (
                  <Badge className="ml-2 bg-green-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    Offline
                  </Badge>
                )}
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{upcomingClasses[0].time}</span>
                {upcomingClasses[0].mode === "offline" && (
                  <>
                    <span className="mx-2">•</span>
                    <span>Room {upcomingClasses[0].room}</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Today's Check-in</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleCheckIn}
                className={`w-full ${isCheckedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-attendance-secondary hover:bg-attendance-secondary/90'}`}
                disabled={
                  (upcomingClasses[0].mode === "online" && qrScanned < 3) || 
                  (upcomingClasses[0].mode === "offline" && (!qrScanned || !faceVerified))
                }
              >
                {isCheckedIn ? (
                  <>
                    <XCircle className="mr-2 h-4 w-4" />
                    Check Out
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Check In
                  </>
                )}
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                {isCheckedIn ? "Checked in at 8:45 AM" : "Not checked in yet"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="attendance">Attendance Verification</TabsTrigger>
            <TabsTrigger value="data">Personal Data Log</TabsTrigger>
          </TabsList>
          
          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Attendance Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{upcomingClasses[0].name}</h3>
                      <p className="text-sm text-gray-500">
                        {upcomingClasses[0].mode === "online" ? "Online Class" : `Room ${upcomingClasses[0].room}`}
                      </p>
                    </div>
                    <Badge className={upcomingClasses[0].mode === "online" ? "bg-blue-500" : "bg-green-500"}>
                      {upcomingClasses[0].mode === "online" ? (
                        <>
                          <Wifi className="h-3 w-3 mr-1" />
                          Online
                        </>
                      ) : (
                        <>
                          <MapPin className="h-3 w-3 mr-1" />
                          Offline
                        </>
                      )}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold flex items-center mb-3">
                        <Scan className="h-4 w-4 mr-2" />
                        QR Code Verification
                      </h3>
                      
                      {upcomingClasses[0].mode === "online" ? (
                        <div>
                          <p className="text-sm text-gray-500 mb-3">
                            Scan all 3 QR codes generated by your teacher to verify attendance.
                          </p>
                          <div className="flex items-center space-x-2 mb-3">
                            <div className={`h-2 w-2 rounded-full ${qrScanned >= 1 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <div className={`h-2 w-2 rounded-full ${qrScanned >= 2 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <div className={`h-2 w-2 rounded-full ${qrScanned >= 3 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          </div>
                          <Button onClick={handleScanQR} className="w-full" disabled={qrScanned >= 3}>
                            Scan QR Code {qrScanned < 3 ? qrScanned + 1 : 'Complete'} 
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-500 mb-3">
                            Scan the QR code displayed in class to verify your attendance.
                          </p>
                          <Button 
                            onClick={handleScanQR} 
                            className="w-full" 
                            disabled={qrScanned > 0}
                            variant={qrScanned > 0 ? "outline" : "default"}
                          >
                            {qrScanned > 0 ? "QR Code Scanned ✓" : "Scan QR Code"}
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {upcomingClasses[0].mode === "offline" && (
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold flex items-center mb-3">
                          <Camera className="h-4 w-4 mr-2" />
                          Face Recognition
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          Your location will be verified to ensure you are within 50 meters of the class.
                        </p>
                        <Button 
                          onClick={handleFaceVerification} 
                          className="w-full"
                          disabled={faceVerified || !qrScanned}
                          variant={faceVerified ? "outline" : "default"}
                        >
                          {faceVerified ? "Face Verified ✓" : "Verify Face"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">{cls.name}</h3>
                        <div className="text-sm text-gray-500">
                          {cls.mode === "offline" ? `Room ${cls.room}` : "Online Class"}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm font-medium mr-2">{cls.time}</div>
                        <Badge className={cls.mode === "online" ? "bg-blue-500" : "bg-green-500"}>
                          {cls.mode === "online" ? (
                            <>
                              <Wifi className="h-3 w-3 mr-1" />
                              Online
                            </>
                          ) : (
                            <>
                              <MapPin className="h-3 w-3 mr-1" />
                              Offline
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2" />
                  Attendance by Course
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="font-medium flex items-center">
                          {course.name}
                          <Badge className="ml-2" variant="outline">
                            {course.mode === "online" ? (
                              <>
                                <Wifi className="h-3 w-3 mr-1" />
                                Online
                              </>
                            ) : (
                              <>
                                <MapPin className="h-3 w-3 mr-1" />
                                Offline
                              </>
                            )}
                          </Badge>
                        </div>
                        <div className="text-sm font-medium">{course.attendance}%</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-attendance-secondary rounded-full h-2" 
                          style={{ width: `${course.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Attendance History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceHistory.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">{record.course}</h3>
                        <div className="text-sm text-gray-500">{record.date}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={
                            record.status === "present" ? "bg-green-500" : "bg-red-500"
                          }
                        >
                          {record.status}
                        </Badge>
                        <div className="text-xs text-gray-500">{record.verificationMethod}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;
