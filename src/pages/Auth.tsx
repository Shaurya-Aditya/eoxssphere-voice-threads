
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, UserPlus, Shield } from "lucide-react";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, navigate to appropriate route based on role
    navigate(isAdmin ? '/admin-chat' : '/chat');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
      <Card className="w-[380px] shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Eoxssphere
          </CardTitle>
          <CardDescription>Welcome to Eoxssphere</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user" className="mb-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user" onClick={() => setIsAdmin(false)}>
                User
              </TabsTrigger>
              <TabsTrigger value="admin" onClick={() => setIsAdmin(true)}>
                Admin
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
              className="w-full"
            />
            <Input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              className="w-full"
            />
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              {isAdmin ? <Shield className="mr-2 h-4 w-4" /> : isLogin ? <LogIn className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
              {isAdmin ? "Admin Login" : isLogin ? "Login" : "Sign Up"}
            </Button>
            {!isAdmin && (
              <p className="text-center text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-purple-600 hover:text-purple-800"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
