import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Wallet, Sparkles } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Dummy login - just navigate to dashboard
    toast.success("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Minimalist Branding */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary to-primary/90 p-12 text-primary-foreground relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center space-y-7 max-w-md">
          <div className="inline-flex items-center justify-center">
            <div className="w-[110px]">
              <img src="./finance.png" alt=""/>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              Money Tracker
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Kelola keuangan<br />dengan lebih mudah dan terorganisir
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-primary-foreground/60">
            <Sparkles className="h-4 w-4" />
            <span>Trusted by 10,000+ families</span>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-success/5 p-4">
            <Card className="w-full max-w-md  bg-background">
              <CardHeader className="space-y-1">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-16">
                      <img src="./finance.png" alt=""/>
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary hover:underline">
                    Register
                  </Link>
                </div>
              </CardContent>
            </Card>
      </div>
    </div>
  );
}
