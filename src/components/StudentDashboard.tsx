
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, Clock, CheckCircle, XCircle, BarChart, BookOpen, 
  LogOut, Scan, Camera, Wifi, WifiOff, MapPin, TrendingUp, Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AreaChart, Area, LineChart, Line, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("attendance");
  const [qrScanned, setQrScanned] = useState<number>(0);
  const [faceVerified, setFaceVerified] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Animation configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Setup welcome message animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  // Chart data
  const attendanceTrendData = [
    { name: "Week 1", attendance: 85 },
    { name: "Week 2", attendance: 90 },
    { name: "Week 3", attendance: 88 },
    { name: "Week 4", attendance: 92 },
    { name: "Week 5", attendance: 96 },
  ];

  const attendanceBySubjectData = [
    { name: "Mathematics", value: 95 },
    { name: "Physics", value: 88 },
    { name: "Computer Science", value: 100 },
    { name: "English", value: 82 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-attendance-primary/5"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: Math.random() * 0.5 + 0.5, 
              opacity: Math.random() * 0.2 + 0.05,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
        ))}
      </div>

      {/* Welcome overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-attendance-primary/90 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="text-white text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-2">Welcome back, Alex</h1>
              <p className="text-xl">Your attendance is looking great today!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back, Alex Johnson</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-t-4 border-t-attendance-secondary hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Attendance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="relative">
                    <svg className="w-16 h-16">
                      <circle 
                        className="text-gray-200" 
                        strokeWidth="5" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="30" 
                        cx="32" 
                        cy="32" 
                      />
                      <motion.circle 
                        className="text-attendance-secondary" 
                        strokeWidth="5" 
                        strokeLinecap="round" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="30" 
                        cx="32" 
                        cy="32" 
                        initial={{ strokeDasharray: "188.5", strokeDashoffset: "188.5" }}
                        animate={{ strokeDashoffset: 188.5 - (188.5 * attendanceRate / 100) }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span 
                        className="text-lg font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        {attendanceRate}%
                      </motion.span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">
                      Present: {presentClasses} / {totalClasses} classes
                    </p>
                    <div className="flex items-center text-green-500 text-sm mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>4% increase</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-t-4 border-t-attendance-primary hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Next Class</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="bg-attendance-primary/10 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-attendance-primary" />
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
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
                  </div>
                </div>
                
                <motion.div 
                  className="w-full h-1 bg-gray-100 mt-3 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div 
                    className="h-full bg-attendance-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 2, delay: 1.2 }}
                  />
                </motion.div>
                <div className="text-xs text-gray-500 mt-1 text-right">Starts in 35 minutes</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-t-4 border-t-blue-500 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Today's Check-in</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleCheckIn}
                  className={`w-full relative overflow-hidden group ${
                    isCheckedIn 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-attendance-secondary hover:bg-attendance-secondary/90'
                  }`}
                  disabled={
                    (upcomingClasses[0].mode === "online" && qrScanned < 3) || 
                    (upcomingClasses[0].mode === "offline" && (!qrScanned || !faceVerified))
                  }
                >
                  <motion.span 
                    className="absolute inset-0 bg-white"
                    initial={{ scale: 0, opacity: 0.5 }}
                    whileHover={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
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
                <div className="text-sm text-gray-500 mt-2 flex items-center justify-center">
                  <Zap className="h-4 w-4 mr-1 text-yellow-500" />
                  {isCheckedIn ? "Checked in at 8:45 AM" : "Not checked in yet"}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 rounded-lg p-1 bg-gray-100">
              <TabsTrigger value="attendance" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Attendance Verification
              </TabsTrigger>
              <TabsTrigger value="data" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Personal Data Log
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="attendance" className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key="attendance-content"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
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
                          <motion.div 
                            className="p-4 border rounded-lg hover:border-attendance-primary/50 hover:shadow-sm transition-all"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <h3 className="font-semibold flex items-center mb-3">
                              <Scan className="h-4 w-4 mr-2" />
                              QR Code Verification
                            </h3>
                            
                            {upcomingClasses[0].mode === "online" ? (
                              <div>
                                <p className="text-sm text-gray-500 mb-3">
                                  Scan all 3 QR codes generated by your teacher to verify attendance.
                                </p>
                                <div className="flex items-center space-x-4 mb-3 justify-center">
                                  {[1, 2, 3].map((step) => (
                                    <motion.div 
                                      key={step}
                                      className={`h-3 w-3 rounded-full ${
                                        qrScanned >= step ? 'bg-green-500' : 'bg-gray-300'
                                      }`}
                                      initial={qrScanned >= step ? { scale: 1 } : { scale: 0.8 }}
                                      animate={qrScanned >= step ? 
                                        { scale: [1, 1.2, 1], backgroundColor: ['#10b981', '#10b981'] } : 
                                        { scale: 0.8 }
                                      }
                                      transition={qrScanned >= step ? 
                                        { duration: 0.5, times: [0, 0.5, 1] } : 
                                        { duration: 0.3 }
                                      }
                                    />
                                  ))}
                                </div>
                                <Button 
                                  onClick={handleScanQR} 
                                  className="w-full relative overflow-hidden" 
                                  disabled={qrScanned >= 3}
                                >
                                  <motion.span 
                                    className="absolute inset-0 bg-white"
                                    initial={{ scale: 0, opacity: 0.5 }}
                                    whileHover={{ scale: 2, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                  />
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
                                  className="w-full relative overflow-hidden" 
                                  disabled={qrScanned > 0}
                                  variant={qrScanned > 0 ? "outline" : "default"}
                                >
                                  <motion.span 
                                    className="absolute inset-0 bg-white"
                                    initial={{ scale: 0, opacity: 0.5 }}
                                    whileHover={{ scale: 2, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                  />
                                  {qrScanned > 0 ? (
                                    <motion.span 
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ duration: 0.3 }}
                                      className="flex items-center"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                                      QR Code Scanned
                                    </motion.span>
                                  ) : "Scan QR Code"}
                                </Button>
                              </div>
                            )}
                          </motion.div>
                          
                          {upcomingClasses[0].mode === "offline" && (
                            <motion.div 
                              className="p-4 border rounded-lg hover:border-attendance-primary/50 hover:shadow-sm transition-all"
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <h3 className="font-semibold flex items-center mb-3">
                                <Camera className="h-4 w-4 mr-2" />
                                Face Recognition
                              </h3>
                              <p className="text-sm text-gray-500 mb-3">
                                Your location will be verified to ensure you are within 50 meters of the class.
                              </p>
                              <Button 
                                onClick={handleFaceVerification} 
                                className="w-full relative overflow-hidden"
                                disabled={faceVerified || !qrScanned}
                                variant={faceVerified ? "outline" : "default"}
                              >
                                <motion.span 
                                  className="absolute inset-0 bg-white"
                                  initial={{ scale: 0, opacity: 0.5 }}
                                  whileHover={{ scale: 2, opacity: 0 }}
                                  transition={{ duration: 0.5 }}
                                />
                                {faceVerified ? (
                                  <motion.span 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-center"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                                    Face Verified
                                  </motion.span>
                                ) : "Verify Face"}
                              </Button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        Upcoming Classes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingClasses.map((cls, index) => (
                          <motion.div 
                            key={cls.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ x: 5 }}
                          >
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
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
            
            <TabsContent value="data" className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key="data-content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart className="h-5 w-5 mr-2" />
                        Attendance Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium mb-3 text-gray-700">Attendance Trend</h3>
                          <div className="h-[250px]">
                            <ChartContainer
                              config={{
                                attendance: {
                                  label: "Attendance %",
                                  color: "#8B5CF6"
                                }
                              }}
                            >
                              <AreaChart data={attendanceTrendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis domain={[70, 100]} />
                                <ChartTooltip 
                                  content={
                                    <ChartTooltipContent labelKey="attendance" nameKey="name" />
                                  } 
                                />
                                <defs>
                                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                                  </linearGradient>
                                </defs>
                                <Area 
                                  type="monotone" 
                                  dataKey="attendance" 
                                  stroke="#8B5CF6" 
                                  fillOpacity={1} 
                                  fill="url(#attendanceGradient)" 
                                  animationDuration={1500}
                                />
                              </AreaChart>
                            </ChartContainer>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-3 text-gray-700">Attendance by Subject</h3>
                          <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={attendanceBySubjectData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                  animationDuration={1000}
                                  animationBegin={200}
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                  {attendanceBySubjectData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value}%`} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart className="h-5 w-5 mr-2" />
                        Attendance by Course
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {courses.map((course, index) => (
                          <motion.div 
                            key={course.id} 
                            className="space-y-1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
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
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <motion.div 
                                className="bg-attendance-secondary rounded-full h-2" 
                                initial={{ width: 0 }}
                                animate={{ width: `${course.attendance}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        Attendance History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {attendanceHistory.map((record, index) => (
                          <motion.div 
                            key={record.id} 
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                          >
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
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
