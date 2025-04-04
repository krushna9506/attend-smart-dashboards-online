
import { useEffect } from "react";
import LoginForm from "@/components/LoginForm";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Index = () => {
  // Set document title
  useEffect(() => {
    document.title = "Smart Attendance System | Login";
  }, []);

  return (
    <div className="min-h-screen circuit-background flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? 
                `linear-gradient(135deg, rgba(11, 76, 92, 0.1), rgba(107, 171, 100, 0.1))` : 
                `linear-gradient(135deg, rgba(107, 171, 100, 0.1), rgba(11, 76, 92, 0.1))`,
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
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-attendance-primary/20"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Light effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-attendance-background/0 via-attendance-primary/5 to-attendance-background/0" />
      
      {/* Header */}
      <motion.div 
        className="mb-8 text-center relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-attendance-primary mr-2" />
          <h1 className="text-3xl font-bold text-attendance-primary">Smart Attendance</h1>
        </div>
        <p className="text-gray-600">Sign in to access your dashboard</p>
      </motion.div>
      
      {/* Login Form */}
      <motion.div 
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <LoginForm />
      </motion.div>
      
      {/* Footer */}
      <motion.div 
        className="mt-8 text-center text-sm text-gray-500 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        &copy; {new Date().getFullYear()} Smart Attendance System • All Rights Reserved
      </motion.div>
    </div>
  );
};

export default Index;
