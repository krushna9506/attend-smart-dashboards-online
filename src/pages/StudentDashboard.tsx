
import { useEffect } from "react";
import StudentDashboardComponent from "@/components/StudentDashboard";

const StudentDashboard = () => {
  useEffect(() => {
    document.title = "Student Dashboard | Smart Attendance";
  }, []);
  
  return <StudentDashboardComponent />;
};

export default StudentDashboard;
