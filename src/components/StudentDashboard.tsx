
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CheckCircle, XCircle, BarChart, BookOpen, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Mock data
  const attendanceRate = 92;
  const totalClasses = 45;
  const presentClasses = 42;
  const courses = [
    { id: 1, name: "Mathematics", attendance: 95 },
    { id: 2, name: "Physics", attendance: 88 },
    { id: 3, name: "Computer Science", attendance: 100 },
    { id: 4, name: "English", attendance: 82 },
  ];
  
  const upcomingClasses = [
    { id: 1, name: "Physics Lab", time: "10:00 AM", room: "Lab 101" },
    { id: 2, name: "Calculus", time: "01:30 PM", room: "R203" },
  ];

  const handleCheckIn = () => {
    setIsCheckedIn(!isCheckedIn);
    toast({
      title: isCheckedIn ? "Checked out" : "Checked in",
      description: isCheckedIn ? "You have successfully checked out" : "You have successfully checked in",
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
              <CardTitle className="text-sm font-medium text-gray-500">Today's Check-in</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleCheckIn}
                className={`w-full ${isCheckedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-attendance-secondary hover:bg-attendance-secondary/90'}`}
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

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Next Class</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-attendance-primary mr-2" />
                <div className="text-lg font-medium">{upcomingClasses[0].name}</div>
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{upcomingClasses[0].time}</span>
                <span className="mx-2">•</span>
                <span>Room {upcomingClasses[0].room}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <div className="text-sm text-gray-500">Room {cls.room}</div>
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
                Attendance by Course
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{course.name}</div>
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
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
