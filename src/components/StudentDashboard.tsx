
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, Clock, CheckCircle, XCircle, BarChart, BookOpen, 
  LogOut, Scan, Camera, Wifi, WifiOff, MapPin, TrendingUp, Zap,
  ChevronRight, Award, Star, Bell, Check
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

  // More vibrant colors
  const COLORS = ['#4f46e5', '#06b6d4', '#f59e0b', '#10b981'];

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-500/5"
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
            className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 z-50"
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
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, times: [0, 0.8, 1] }}
                  className="mb-4"
                >
                  <Star className="h-16 w-16 text-yellow-300" />
                </motion.div>
                <h1 className="text-4xl font-bold mb-2">Welcome back, Alex</h1>
                <p className="text-xl">Your attendance is looking great today!</p>
              </div>
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
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Award className="h-7 w-7 text-indigo-600 mr-2" />
              Student Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, Alex Johnson</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors shadow-sm"
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
            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-white rounded-xl overflow-hidden">
              <CardHeader className="pb-2 border-b border-indigo-100">
                <CardTitle className="text-sm font-medium text-indigo-700">Attendance Rate</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center">
                  <div className="relative">
                    <svg className="w-16 h-16">
                      <circle 
                        className="text-indigo-100" 
                        strokeWidth="5" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="30" 
                        cx="32" 
                        cy="32" 
                      />
                      <motion.circle 
                        className="text-indigo-600" 
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
                        className="text-lg font-bold text-indigo-700"
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
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white rounded-xl overflow-hidden">
              <CardHeader className="pb-2 border-b border-purple-100">
                <CardTitle className="text-sm font-medium text-purple-700">Next Class</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-purple-400 to-indigo-500 p-2.5 rounded-lg shadow-md">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <div className="text-lg font-medium text-gray-800">{upcomingClasses[0].name}</div>
                      {upcomingClasses[0].mode === "online" ? (
                        <Badge className="ml-2 bg-blue-500 shadow-sm">
                          <Wifi className="h-3 w-3 mr-1" />
                          Online
                        </Badge>
                      ) : (
                        <Badge className="ml-2 bg-green-500 shadow-sm">
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
                  className="w-full h-1.5 bg-gray-100 mt-3 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div 
                    className="h-full bg-purple-500 rounded-full"
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
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white rounded-xl overflow-hidden">
              <CardHeader className="pb-2 border-b border-blue-100">
                <CardTitle className="text-sm font-medium text-blue-700">Today's Check-in</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <Button 
                  onClick={handleCheckIn}
                  className={`w-full relative overflow-hidden shadow-lg ${
                    isCheckedIn 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-blue-600 hover:bg-blue-700'
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

                {isCheckedIn && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-2 bg-green-50 border border-green-100 rounded-lg text-green-700 text-xs flex items-center justify-center"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Attendance successfully recorded
                  </motion.div>
                )}
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
            <TabsList className="grid w-full grid-cols-2 rounded-lg p-1 bg-indigo-50 shadow-inner">
              <TabsTrigger value="attendance" className="rounded-md font-medium data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-indigo-700">
                <Clock className="h-4 w-4 mr-1.5" />
                Attendance Verification
              </TabsTrigger>
              <TabsTrigger value="data" className="rounded-md font-medium data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-indigo-700">
                <BarChart className="h-4 w-4 mr-1.5" />
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
                  <Card className="border-0 shadow-lg bg-white rounded-xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
                      <CardTitle className="flex items-center text-indigo-800">
                        <CheckCircle className="h-5 w-5 mr-2 text-indigo-600" />
                        Attendance Verification
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                          <div>
                            <h3 className="font-semibold text-gray-800">{upcomingClasses[0].name}</h3>
                            <p className="text-sm text-gray-600 flex items-center">
                              {upcomingClasses[0].mode === "online" ? (
                                <>
                                  <Wifi className="h-3 w-3 mr-1 text-blue-500" />
                                  Online Class
                                </>
                              ) : (
                                <>
                                  <MapPin className="h-3 w-3 mr-1 text-green-500" />
                                  Room {upcomingClasses[0].room}
                                </>
                              )}
                            </p>
                          </div>
                          <Badge className={upcomingClasses[0].mode === "online" ? 
                            "bg-gradient-to-r from-blue-500 to-blue-600 shadow-md" : 
                            "bg-gradient-to-r from-green-500 to-green-600 shadow-md"}
                          >
                            {upcomingClasses[0].time}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <motion.div 
                            className="p-5 border border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all bg-gradient-to-br from-blue-50/50 to-white"
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <h3 className="font-semibold flex items-center mb-3 text-blue-800">
                              <Scan className="h-4 w-4 mr-2 text-blue-600" />
                              QR Code Verification
                            </h3>
                            
                            {upcomingClasses[0].mode === "online" ? (
                              <div>
                                <p className="text-sm text-gray-600 mb-3">
                                  Scan all 3 QR codes generated by your teacher to verify attendance.
                                </p>
                                <div className="flex items-center space-x-4 mb-3 justify-center">
                                  {[1, 2, 3].map((step) => (
                                    <motion.div 
                                      key={step}
                                      className={`h-4 w-4 rounded-full ${
                                        qrScanned >= step ? 'bg-gradient-to-br from-blue-500 to-indigo-500' : 'bg-gray-200'
                                      }`}
                                      initial={qrScanned >= step ? { scale: 1 } : { scale: 0.8 }}
                                      animate={qrScanned >= step ? 
                                        { scale: [1, 1.2, 1], backgroundColor: ['#4f46e5', '#4f46e5'] } : 
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
                                  className="w-full relative overflow-hidden shadow-md bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600" 
                                  disabled={qrScanned >= 3}
                                >
                                  <motion.span 
                                    className="absolute inset-0 bg-white"
                                    initial={{ scale: 0, opacity: 0.5 }}
                                    whileHover={{ scale: 2, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                  />
                                  <span className="relative z-10">
                                    {qrScanned < 3 ? `Scan QR Code ${qrScanned + 1}` : 'Complete'} 
                                  </span>
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <p className="text-sm text-gray-600 mb-3">
                                  Scan the QR code displayed in class to verify your attendance.
                                </p>
                                <Button 
                                  onClick={handleScanQR} 
                                  className="w-full relative overflow-hidden shadow-md" 
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
                              className="p-5 border border-purple-200 rounded-xl hover:border-purple-400 hover:shadow-md transition-all bg-gradient-to-br from-purple-50/50 to-white"
                              whileHover={{ scale: 1.02, y: -5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <h3 className="font-semibold flex items-center mb-3 text-purple-800">
                                <Camera className="h-4 w-4 mr-2 text-purple-600" />
                                Face Recognition
                              </h3>
                              <p className="text-sm text-gray-600 mb-3">
                                Your location will be verified to ensure you are within 50 meters of the class.
                              </p>
                              <Button 
                                onClick={handleFaceVerification} 
                                className="w-full relative overflow-hidden shadow-md bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                                disabled={faceVerified || !qrScanned}
                                variant={faceVerified ? "outline" : "default"}
                              >
                                <motion.span 
                                  className="absolute inset-0 bg-white"
                                  initial={{ scale: 0, opacity: 0.5 }}
                                  whileHover={{ scale: 2, opacity: 0 }}
                                  transition={{ duration: 0.5 }}
                                />
                                <span className="relative z-10">
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
                                </span>
                              </Button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-lg bg-white rounded-xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                      <CardTitle className="flex items-center text-purple-800">
                        <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                        Upcoming Classes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5">
                      <div className="space-y-4">
                        {upcomingClasses.map((cls, index) => (
                          <motion.div 
                            key={cls.id}
                            className="flex items-center justify-between p-3.5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ x: 5, borderColor: "#c7d2fe" }}
                          >
                            <div className="flex items-center">
                              <div className={`p-2.5 rounded-lg mr-3 shadow-md ${cls.mode === "online" ? "bg-gradient-to-br from-blue-400 to-blue-500" : "bg-gradient-to-br from-green-400 to-green-500"}`}>
                                {cls.mode === "online" ? 
                                  <Wifi className="h-4 w-4 text-white" /> : 
                                  <MapPin className="h-4 w-4 text-white" />
                                }
                              </div>
                              <div>
                                <h3 className="font-medium flex items-center text-gray-800">
                                  {cls.name}
                                  <ChevronRight className="h-4 w-4 ml-1 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h3>
                                <div className="text-sm text-gray-500">
                                  {cls.mode === "offline" ? `Room ${cls.room}` : "Online Class"}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className={`px-3 py-1.5 rounded-lg shadow-sm font-medium text-sm ${
                                cls.mode === "online" ? 
                                "bg-blue-100 text-blue-700" : 
                                "bg-green-100 text-green-700"
                              }`}>{cls.time}</div>
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
                  <Card className="border-0 shadow-lg bg-white rounded-xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
                      <CardTitle className="flex items-center text-indigo-800">
                        <BarChart className="h-5 w-5 mr-2 text-indigo-600" />
                        Attendance Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="font-medium mb-3 text-gray-800 text-lg flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1.5 text-indigo-600" />
                            Attendance Trend
                          </h3>
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
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
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
                                  strokeWidth={2}
                                  fillOpacity={1} 
                                  fill="url(#attendanceGradient)" 
                                  animationDuration={1500}
                                />
                              </AreaChart>
                            </ChartContainer>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-3 text-gray-800 text-lg flex items-center">
                            <PieChart className="h-4 w-4 mr-1.5 text-indigo-600" />
                            Attendance by Subject
                          </h3>
                          <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={attendanceBySubjectData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={80}
                                  innerRadius={60}
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
                  
                  <Card className="border-0 shadow-lg bg-white rounded-xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                      <CardTitle className="flex items-center text-blue-800">
                        <Award className="h-5 w-5 mr-2 text-blue-600" />
                        Attendance by Course
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5">
                      <div className="space-y-4">
                        {courses.map((course, index) => (
                          <motion.div 
                            key={course.id} 
                            className="p-3.5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 3, borderColor: "#bfdbfe" }}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <div className="font-medium flex items-center text-gray-800">
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
                              <div className="text-sm font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-lg">{course.attendance}%</div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                              <motion.div 
                                className={`${
                                  course.attendance > 95 ? 'bg-gradient-to-r from-green-400 to-green-500' : 
                                  course.attendance > 85 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                                  'bg-gradient-to-r from-amber-400 to-amber-500'
                                } rounded-full h-2.5`}
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
                  
                  <Card className="border-0 shadow-lg bg-white rounded-xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                      <CardTitle className="flex items-center text-green-800">
                        <Calendar className="h-5 w-5 mr-2 text-green-600" />
                        Attendance History
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5">
                      <div className="space-y-4">
                        {attendanceHistory.map((record, index) => (
                          <motion.div 
                            key={record.id} 
                            className="flex items-center justify-between p-3.5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5, borderColor: "#bbf7d0" }}
                          >
                            <div className="flex items-center">
                              <div className={`p-2.5 rounded-lg mr-3 shadow-md ${
                                record.status === "present" ? 
                                "bg-gradient-to-br from-green-400 to-green-500" : 
                                "bg-gradient-to-br from-red-400 to-red-500"
                              }`}>
                                {record.status === "present" ? 
                                  <Check className="h-4 w-4 text-white" /> : 
                                  <XCircle className="h-4 w-4 text-white" />
                                }
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-800">{record.course}</h3>
                                <div className="text-sm text-gray-600 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {record.date}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                className={
                                  record.status === "present" ? 
                                  "bg-gradient-to-r from-green-500 to-emerald-500 shadow-sm" : 
                                  "bg-gradient-to-r from-red-500 to-rose-500 shadow-sm"
                                }
                              >
                                {record.status}
                              </Badge>
                              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                {record.verificationMethod}
                              </div>
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
