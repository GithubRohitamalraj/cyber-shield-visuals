
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/contexts/AuthContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Auth = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    if (authType === "login") {
      await signIn(data.email, data.password);
    } else {
      await signUp(data.email, data.password);
    }
  };

  // Redirect if user is already logged in
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Shield className="h-12 w-12 text-cybershield-purple" />
          </div>
          <CardTitle className="text-2xl">Welcome to CyberShield</CardTitle>
          <CardDescription>
            Sign in to track your progress and compete on the leaderboard
          </CardDescription>
        </CardHeader>
        <Tabs value={authType} onValueChange={(value) => setAuthType(value as "login" | "signup")}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
        
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  {authType === "login" ? "Sign In" : "Create Account"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Tabs>
        
        <CardFooter className="flex flex-col text-center text-sm text-muted-foreground pt-0">
          <p>
            {authType === "login" 
              ? "Don't have an account? Select 'Sign Up' above" 
              : "Already have an account? Select 'Login' above"}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
