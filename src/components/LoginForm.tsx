
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { User, BookOpen, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden border-0">
        <CardHeader className="bg-attendance-primary p-6 text-center">
          <div className="mb-2 flex justify-center">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Smart Attendance</h1>
          <p className="text-sm text-attendance-accent/80">
            Realtime attendance tracking with advanced technology
          </p>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  className="w-full p-3"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="w-full p-3"
                />
              </div>
              
              <div className="pt-2 flex justify-between gap-4">
                <Button 
                  type="button" 
                  className={`flex-1 py-6 ${userType === 'student' ? 'bg-attendance-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setUserType("student")}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Student
                </Button>
                <Button 
                  type="button" 
                  className={`flex-1 py-6 ${userType === 'teacher' ? 'bg-attendance-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setUserType("teacher")}
                >
                  <User className="mr-2 h-5 w-5" />
                  Teacher
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-6 py-6 bg-attendance-secondary hover:bg-attendance-secondary/90 text-white"
            >
              Login
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center p-4 text-center text-sm text-gray-500">
          <p>
            Powered by Smart Attendance System
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
