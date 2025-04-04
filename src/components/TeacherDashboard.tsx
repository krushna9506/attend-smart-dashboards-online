
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, Clock, Calendar, BarChart, CheckCircle, Search, 
  FileText, LogOut, BookOpen, Sparkles, Trophy, Zap
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer, PieChart, Pie, Cell,
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [classStarted, setClassStarted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  // Mock data
  const totalStudents = 156;
  const averageAttendance = 88;
  const classesToday = 4;
  
  const upcomingClasses = [
    { id: 1, name: "Computer Science 101", time: "10:00 AM", room: "Lab 101", students: 32 },
    { id: 2, name: "Programming Fundamentals", time: "01:30 PM", room: "R203", students: 28 },
    { id: 3, name: "Data Structures", time: "03:00 PM", room: "Lab 102", students: 25 },
  ];
  
  const recentAttendance = [
    { id: 1, name: "Web Development", date: "Mon, 15 May", rate: 92, students: 30 },
    { id: 2, name: "Database Systems", date: "Tue, 16 May", rate: 85, students: 26 },
    { id: 3, name: "Computer Networks", date: "Wed, 17 May", rate: 90, students: 28 },
  ];

  const studentList = [
    { id: 1, name: "Emma Thompson", status: "present", time: "9:55 AM" },
    { id: 2, name: "James Wilson", status: "present", time: "9:58 AM" },
    { id: 3, name: "Sophia Garcia", status: "absent", time: "-" },
    { id: 4, name: "Daniel Johnson", status: "present", time: "10:05 AM" },
    { id: 5, name: "Olivia Martinez", status: "late", time: "10:12 AM" },
  ];

  const attendancePerDay = [
    { name: "Mon", students: 145 },
    { name: "Tue", students: 139 },
    { name: "Wed", students: 150 },
    { name: "Thu", students: 142 },
    { name: "Fri", students: 130 },
  ];

  const attendanceDistribution = [
    { name: "Present", value: 85 },
    { name: "Late", value: 8 },
    { name: "Absent", value: 7 },
  ];

  const COLORS = ['#6bab64', '#FFB347', '#FF6B6B'];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
      transition: { duration: 0.2 }
    }
  };
  
  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleStartClass = () => {
    setClassStarted(!classStarted);
    toast({
      title: classStarted ? "Class ended" : "Class started",
      description: classStarted 
        ? "You have successfully ended the class" 
        : "You have successfully started the class",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.2, 1], opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex items-center"
            >
              <Sparkles className="h-8 w-8 text-attendance-primary mr-2" />
              <span className="text-2xl font-bold text-attendance-primary">Smart Teacher Dashboard</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
              Teacher Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, Prof. Sarah Williams</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <motion.div 
              whileHover="hover"
              variants={cardHoverVariants}
            >
              <Card className="border-t-4 border-t-attendance-primary overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="text-3xl font-bold mr-2">{totalStudents}</div>
                    <Users className="h-5 w-5 text-attendance-primary" />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Across 5 courses
                  </p>
                  <div className="mt-3">
                    <motion.div 
                      className="h-1.5 bg-attendance-primary/20 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.8, duration: 1 }}
                    >
                      <motion.div 
                        className="h-full bg-attendance-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ delay: 1.2, duration: 1.5 }}
                      />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div 
              whileHover="hover"
              variants={cardHoverVariants}
            >
              <Card className="border-t-4 border-t-attendance-secondary overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Avg. Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="text-3xl font-bold mr-2">{averageAttendance}%</div>
                    <BarChart className="h-5 w-5 text-attendance-secondary" />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Last 30 days
                  </p>
                  <div className="flex items-center mt-3">
                    <div className="relative h-8 w-8">
                      <svg viewBox="0 0 36 36" className="h-8 w-8 rotate-[-90deg]">
                        <circle 
                          cx="18" 
                          cy="18" 
                          r="16" 
                          fill="none" 
                          className="stroke-attendance-secondary/20" 
                          strokeWidth="4" 
                        />
                        <motion.circle 
                          cx="18" 
                          cy="18" 
                          r="16" 
                          fill="none" 
                          className="stroke-attendance-secondary" 
                          strokeWidth="4" 
                          strokeDasharray="100"
                          strokeDashoffset="100"
                          initial={{ strokeDashoffset: 100 }}
                          animate={{ strokeDashoffset: 100 - averageAttendance }}
                          transition={{ delay: 0.8, duration: 1.5 }}
                        />
                      </svg>
                    </div>
                    <div className="ml-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                        Present: {attendanceDistribution[0].value}%
                      </div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-yellow-400 rounded-full mr-1"></span>
                        Late: {attendanceDistribution[1].value}%
                      </div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-red-500 rounded-full mr-1"></span>
                        Absent: {attendanceDistribution[2].value}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div 
              whileHover="hover"
              variants={cardHoverVariants}
            >
              <Card className="border-t-4 border-t-blue-500 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Classes Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="text-3xl font-bold mr-2">{classesToday}</div>
                    <BookOpen className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Next: 10:00 AM
                  </p>
                  <div className="mt-3 space-y-1.5">
                    {[1, 2, 3, 4].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="h-1 bg-blue-100 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.8 + i * 0.2, duration: 0.7 }}
                      >
                        <motion.div 
                          className="h-full bg-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${100 - i * 15}%` }}
                          transition={{ delay: 1.2 + i * 0.2, duration: 0.9 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div 
              whileHover="hover"
              variants={cardHoverVariants}
            >
              <Card className={`border-t-4 overflow-hidden ${classStarted ? 'border-t-red-500' : 'border-t-purple-500'}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Current Class</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleStartClass}
                    className={`w-full relative overflow-hidden ${
                      classStarted ? 'bg-red-500 hover:bg-red-600' : 'bg-attendance-secondary hover:bg-attendance-secondary/90'
                    }`}
                  >
                    <motion.span 
                      className="absolute inset-0 bg-white" 
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 2, opacity: 0.3 }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center">
                      {classStarted ? (
                        <>
                          <Clock className="mr-2 h-4 w-4" />
                          End Class
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Start Class
                        </>
                      )}
                    </span>
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    {classStarted ? "Computer Science 101 - Started at 9:55 AM" : "Ready to start"}
                  </p>
                  {classStarted && (
                    <motion.div 
                      className="mt-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Live for 01:25:37</span>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.div
              whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)" }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full bg-white border border-gray-200 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-attendance-primary/5 to-attendance-secondary/5">
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-attendance-primary" />
                    <span>Current Class Attendance</span>
                  </CardTitle>
                  <div className="mt-2 relative">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search students..." 
                        className="pl-8 border-attendance-primary/20 focus:border-attendance-primary" 
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentList.map((student, index) => (
                      <motion.div 
                        key={student.id} 
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                        whileHover={{ x: 3 }}
                      >
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-attendance-primary/10 flex items-center justify-center mr-3 text-attendance-primary font-medium">
                            {student.name.charAt(0)}
                          </div>
                          <div className="font-medium">{student.name}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-gray-500">{student.time}</div>
                          <Badge 
                            className={
                              student.status === "present" ? "bg-green-500" : 
                              student.status === "late" ? "bg-yellow-500" : 
                              "bg-red-500"
                            }
                          >
                            {student.status}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div 
                    className="mt-4 text-right"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    <Button variant="outline" className="flex items-center gap-2 hover:bg-attendance-primary/5 transition-colors">
                      <FileText className="h-4 w-4" />
                      Export Report
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div 
              className="mb-6"
              whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)" }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden border border-gray-200 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-500/5 to-blue-300/5">
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                    Upcoming Classes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingClasses.map((cls, index) => (
                      <motion.div 
                        key={cls.id} 
                        className="group flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 + index * 0.15, duration: 0.3 }}
                        whileHover={{ x: 3 }}
                        onClick={() => setSelectedCard(cls.id)}
                      >
                        <div>
                          <h3 className="font-medium group-hover:text-blue-600 transition-colors">{cls.name}</h3>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1 inline" />
                            Room {cls.room} • {cls.students} students
                          </div>
                        </div>
                        <div className="text-sm font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded group-hover:bg-blue-700 group-hover:text-white transition-colors">
                          {cls.time}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)" }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden border border-gray-200 bg-white">
                <CardHeader className="bg-gradient-to-r from-attendance-secondary/5 to-green-300/5">
                  <CardTitle className="flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-attendance-secondary" />
                    Weekly Attendance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={attendancePerDay}>
                        <defs>
                          <linearGradient id="attendanceColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6bab64" stopOpacity={0.7}/>
                            <stop offset="95%" stopColor="#6bab64" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis domain={[100, 160]} axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: "8px", 
                            border: "none", 
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" 
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="students" 
                          stroke="#6bab64" 
                          strokeWidth={2}
                          fill="url(#attendanceColor)" 
                          activeDot={{ r: 6, fill: "#6bab64", stroke: "white", strokeWidth: 2 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-3">
                    <div className="space-y-4">
                      {recentAttendance.map((item, index) => (
                        <motion.div 
                          key={item.id} 
                          className="space-y-1"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.4 + index * 0.15, duration: 0.3 }}
                        >
                          <div className="flex justify-between items-center">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm font-medium">{item.rate}%</div>
                          </div>
                          <div className="text-sm text-gray-500">{item.date} • {item.students} students</div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div 
                              className="bg-attendance-secondary rounded-full h-2" 
                              initial={{ width: 0 }}
                              animate={{ width: `${item.rate}%` }}
                              transition={{ delay: 1.5 + index * 0.2, duration: 0.8 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Weekly attendance distribution chart */}
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Card className="overflow-hidden border border-gray-200 bg-white">
            <CardHeader className="bg-gradient-to-r from-purple-500/5 to-blue-300/5">
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-purple-500" />
                Attendance Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attendanceDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {attendanceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="font-medium mb-4">Attendance Summary</h3>
                  <div className="space-y-3">
                    {attendanceDistribution.map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6 + index * 0.1 }}
                      >
                        <div className="flex items-center">
                          <div 
                            className="h-3 w-3 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index] }} 
                          />
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <div className="text-sm font-medium">{item.value}%</div>
                      </motion.div>
                    ))}
                    <hr className="my-2" />
                    <motion.div 
                      className="text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                    >
                      <p className="font-medium">Insights:</p>
                      <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                        <li>Attendance rate is above the semester average</li>
                        <li>8% reduction in late arrivals this month</li>
                        <li>3% improvement in overall attendance</li>
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
