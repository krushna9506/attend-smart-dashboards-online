
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { User, BookOpen, ShieldCheck, LockKeyhole, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface LoginCredentials {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [userType, setUserType] = useState<"student" | "teacher">("student");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!credentials.email || !credentials.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Mock authentication - in a real app, this would call an API
    toast({
      title: "Welcome back!",
      description: `You have successfully logged in as a ${userType}`,
    });

    // Navigate to the appropriate dashboard based on user type
    navigate(`/${userType}-dashboard`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/70 shadow-xl border-0 overflow-hidden">
        <CardHeader className="relative p-6 text-center bg-gradient-to-r from-attendance-primary to-attendance-primary/80">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#circuit-pattern)" />
            </svg>
            <defs>
              <pattern id="circuit-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0,10 L20,10 M10,0 L10,20" stroke="white" strokeWidth="0.5" fill="none" />
                <circle cx="10" cy="10" r="2" fill="white" />
              </pattern>
            </defs>
          </div>
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-2 flex justify-center"
          >
            <ShieldCheck className="h-16 w-16 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl font-bold text-white"
          >
            Smart Attendance
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-sm text-attendance-accent/90"
          >
            Realtime attendance tracking with advanced technology
          </motion.p>
        </CardHeader>
        
        <CardContent className="pt-8 px-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-attendance-primary/70" />
                </div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  className="pl-10 py-6 bg-gray-50/50 dark:bg-gray-800/20 focus:ring-2 focus:ring-attendance-primary/30 transition-all duration-200"
                />
              </motion.div>
              
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <LockKeyhole className="h-5 w-5 text-attendance-primary/70" />
                </div>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="pl-10 py-6 bg-gray-50/50 dark:bg-gray-800/20 focus:ring-2 focus:ring-attendance-primary/30 transition-all duration-200"
                />
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="pt-2 flex justify-between gap-4"
              >
                <Button 
                  type="button" 
                  className={`relative overflow-hidden flex-1 py-6 ${
                    userType === 'student' 
                      ? 'bg-attendance-primary text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition-all duration-300 ease-in-out`}
                  onClick={() => setUserType("student")}
                >
                  {userType === 'student' && (
                    <motion.span
                      layoutId="activeUserType"
                      className="absolute inset-0 bg-gradient-to-r from-attendance-primary/80 to-attendance-primary"
                    />
                  )}
                  <span className="relative flex items-center justify-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Student
                  </span>
                </Button>
                <Button 
                  type="button" 
                  className={`relative overflow-hidden flex-1 py-6 ${
                    userType === 'teacher' 
                      ? 'bg-attendance-primary text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition-all duration-300 ease-in-out`}
                  onClick={() => setUserType("teacher")}
                >
                  {userType === 'teacher' && (
                    <motion.span
                      layoutId="activeUserType"
                      className="absolute inset-0 bg-gradient-to-r from-attendance-primary/80 to-attendance-primary"
                    />
                  )}
                  <span className="relative flex items-center justify-center">
                    <User className="mr-2 h-5 w-5" />
                    Teacher
                  </span>
                </Button>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <Button 
                type="submit" 
                className="w-full mt-8 py-6 bg-gradient-to-r from-attendance-secondary/90 to-attendance-secondary hover:from-attendance-secondary hover:to-attendance-secondary/90 text-white shadow-lg transition-all duration-300 group"
              >
                <span className="relative inline-flex items-center group-hover:scale-105 transition-transform duration-200">
                  Login
                  <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Button>
            </motion.div>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center p-6 text-center text-sm text-gray-500">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Powered by Smart Attendance System
          </motion.p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LoginForm;
