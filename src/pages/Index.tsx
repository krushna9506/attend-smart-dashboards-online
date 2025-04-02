
import { useEffect } from "react";
import LoginForm from "@/components/LoginForm";

const Index = () => {
  // Set document title
  useEffect(() => {
    document.title = "Smart Attendance System | Login";
  }, []);

  return (
    <div className="min-h-screen circuit-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
