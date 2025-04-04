
import { useEffect } from "react";
import TeacherDashboardComponent from "@/components/TeacherDashboard";
import { motion } from "framer-motion";

const TeacherDashboard = () => {
  useEffect(() => {
    document.title = "Teacher Dashboard | Smart Attendance";
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TeacherDashboardComponent />
    </motion.div>
  );
};

export default TeacherDashboard;
