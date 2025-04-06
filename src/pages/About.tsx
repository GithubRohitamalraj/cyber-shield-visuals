
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Lock, Sparkles, Award } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <div className="container px-4 mx-auto py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">About CyberShield</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Our mission is to create a safer digital world through education and community awareness.
        </p>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold mb-3">Our Story</h2>
              <p className="mb-3">
                CyberShield was founded in 2024 by a team of cybersecurity experts who recognized that the most vulnerable part of any security system is the human element. We created this platform to empower individuals with the knowledge and tools they need to protect themselves online.
              </p>
              <p>
                Through interactive education and community reporting, we're building a network of cyber-aware individuals who can recognize, avoid, and report online threats.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&h=400&q=80" 
                alt="People working on cybersecurity" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">What Makes Us Different</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cybershield-purple-light">
                <Sparkles className="h-6 w-6 text-cybershield-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gamified Learning</h3>
              <p className="text-muted-foreground">
                We've turned cybersecurity education into an engaging experience with points, badges, and real-world scenarios.
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cybershield-blue">
                <Lock className="h-6 w-6 text-cybershield-blue-bright" />
              </div>
              <h3 className="text-xl font-bold mb-2">Anonymous Reporting</h3>
              <p className="text-muted-foreground">
                Our secure reporting system allows users to submit scam information without revealing their identity.
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Focus</h3>
              <p className="text-muted-foreground">
                We believe in the power of shared knowledge and experiences to build a safer online community.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-gradient-to-br from-cybershield-purple/10 to-cybershield-blue/10 rounded-lg p-8 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white p-3 rounded-full">
              <Award className="h-6 w-6 text-cybershield-purple" />
            </div>
            <h2 className="text-2xl font-bold">Our Impact</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-cybershield-purple">1.2M+</p>
              <p className="text-sm text-muted-foreground">Users Protected</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-cybershield-purple">450K+</p>
              <p className="text-sm text-muted-foreground">Scams Reported</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-cybershield-purple">32</p>
              <p className="text-sm text-muted-foreground">Countries</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-cybershield-purple">$4.2M</p>
              <p className="text-sm text-muted-foreground">Losses Prevented</p>
            </div>
          </div>
          
          <p className="text-center text-muted-foreground">
            Together, we're making the digital world safer for everyone.
          </p>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Our Team</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {["Emma Chen", "Marcus Williams", "Sophia Rodriguez", "David Kim"].map((name, index) => (
            <div key={index} className="bg-white rounded-lg p-4 text-center border">
              <div className="aspect-square rounded-full bg-gray-100 mb-4 overflow-hidden">
                <img 
                  src={`https://i.pravatar.cc/150?img=${index + 20}`} 
                  alt={name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold">{name}</h3>
              <p className="text-sm text-muted-foreground">
                {["Founder & CEO", "CTO", "Director of Education", "Head of Community"][index]}
              </p>
            </div>
          ))}
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-4">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-cybershield-purple" />
            <h3 className="font-bold text-lg">Join the CyberShield community today</h3>
          </div>
          <p className="text-muted-foreground">
            For partnership inquiries: <span className="font-medium">partners@cybershield.example</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
