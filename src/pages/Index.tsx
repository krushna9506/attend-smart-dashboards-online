
import { useEffect } from "react";
import LoginForm from "@/components/LoginForm";
import { motion } from "framer-motion";

const Index = () => {
  // Set document title
  useEffect(() => {
    document.title = "Smart Attendance System | Login";
  }, []);

  return (
    <div className="min-h-screen circuit-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-attendance-primary/10"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: Math.random() * 0.5 + 0.5, 
              opacity: Math.random() * 0.3 + 0.1,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            transition={{ 
              duration: Math.random() * 10 + 15, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
        ))}
      </div>
      
      {/* Light effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-attendance-background/0 via-attendance-primary/5 to-attendance-background/0" />
      
      {/* Login Form */}
      <motion.div 
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default Index;
