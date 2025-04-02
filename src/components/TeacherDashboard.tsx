
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, Clock, Calendar, BarChart, CheckCircle, Search, 
  FileText, LogOut, BookOpen
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [classStarted, setClassStarted] = useState(false);

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
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h1>
            <p className="text-gray-600">Welcome back, Prof. Sarah Williams</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
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
            </CardContent>
          </Card>

          <Card>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Classes Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-3xl font-bold mr-2">{classesToday}</div>
                <BookOpen className="h-5 w-5 text-attendance-primary" />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Next: 10:00 AM
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Current Class</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleStartClass}
                className={`w-full ${classStarted ? 'bg-red-500 hover:bg-red-600' : 'bg-attendance-secondary hover:bg-attendance-secondary/90'}`}
              >
                {classStarted ? "End Class" : "Start Class"}
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                {classStarted ? "Computer Science 101 - Started at 9:55 AM" : "Ready to start"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Current Class Attendance
                </CardTitle>
                <div className="mt-2 relative">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search students..." 
                      className="pl-8" 
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentList.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
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
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-right">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Export Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
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
                          Room {cls.room} • {cls.students} students
                        </div>
                      </div>
                      <div className="text-sm font-medium">{cls.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2" />
                  Recent Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAttendance.map((item) => (
                    <div key={item.id} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm font-medium">{item.rate}%</div>
                      </div>
                      <div className="text-sm text-gray-500">{item.date} • {item.students} students</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-attendance-secondary rounded-full h-2" 
                          style={{ width: `${item.rate}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
