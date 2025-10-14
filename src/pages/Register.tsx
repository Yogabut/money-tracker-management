import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Wallet, Sparkles } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password || !formData.verifyPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.verifyPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Dummy registration
    toast.success("Registration successful! Please login.");
    navigate("/");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Minimalist Branding */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary to-primary/90 p-12 text-primary-foreground relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center space-y-8 max-w-md">
          <div className="inline-flex items-center justify-center">
            <div className="h-20 w-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl">
              <Wallet className="h-10 w-10" />
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
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-none bg-background">
            <CardHeader className="space-y-1 px-0">
              <CardTitle className="text-3xl font-bold text-center">Create an account</CardTitle>
              <CardDescription className="text-base text-center">
                Join your family's finance management
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verifyPassword">Verify Password</Label>
                  <Input
                    id="verifyPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={formData.verifyPassword}
                    onChange={(e) => setFormData({ ...formData, verifyPassword: e.target.value })}
                    className="h-11"
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-11 text-base">
                  Create Account
                </Button>
              </form>
              
              <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/" className="text-primary font-medium hover:underline">
                  Login
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t">
                <p className="text-xs text-center text-muted-foreground">
                  By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}