
import { useEffect } from "react";
import TeacherDashboardComponent from "@/components/TeacherDashboard";

const TeacherDashboard = () => {
  useEffect(() => {
    document.title = "Teacher Dashboard | Smart Attendance";
  }, []);
  
  return <TeacherDashboardComponent />;
};

export default TeacherDashboard;
