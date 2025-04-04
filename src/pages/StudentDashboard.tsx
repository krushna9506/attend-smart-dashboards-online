
import { useEffect } from "react";
import StudentDashboardComponent from "@/components/StudentDashboard";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  useEffect(() => {
    document.title = "Student Dashboard | Smart Attendance";
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StudentDashboardComponent />
    </motion.div>
  );
};

export default StudentDashboard;
