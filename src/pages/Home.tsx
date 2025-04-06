
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Gamepad2, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cybershield-blue via-cybershield-purple-light to-white py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Stay one step ahead of <span className="text-cybershield-purple">cyber threats</span>
              </h1>
              <p className="text-lg mb-6">
                Learn to identify and report scams through interactive scenarios and gamified learning. Join our community of vigilant cyber defenders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-cybershield-purple hover:bg-cybershield-purple/90">
                  <Link to="/scam-slayer">
                    <Gamepad2 className="mr-2 h-5 w-5" />
                    Scam Slayer
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/safezone">
                    <Shield className="mr-2 h-5 w-5" />
                    SafeZone
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Cybersecurity visualization" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-md p-3">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 rounded-full p-2">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Protection Status</p>
                    <p className="text-sm font-bold text-green-600">Actively Learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How CyberShield Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines gamified learning with real-world reporting to create a comprehensive cybersecurity education experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-border">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cybershield-purple-light">
                <Gamepad2 className="h-6 w-6 text-cybershield-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Scam Slayer</h3>
              <p className="text-muted-foreground mb-4">
                Engage with interactive scenarios designed to teach you how to identify and avoid common cyber scams. Earn XP, badges, and climb the leaderboard.
              </p>
              <Button asChild variant="outline">
                <Link to="/scam-slayer">Learn More</Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-border">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cybershield-blue">
                <Shield className="h-6 w-6 text-cybershield-blue-bright" />
              </div>
              <h3 className="text-xl font-bold mb-2">SafeZone</h3>
              <p className="text-muted-foreground mb-4">
                Anonymously report scams you've encountered in a secure environment. Track the status of your reports and help protect others from falling victim.
              </p>
              <Button asChild variant="outline">
                <Link to="/safezone">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <p className="text-3xl md:text-4xl font-bold text-cybershield-purple">1.2M+</p>
              <p className="text-sm text-muted-foreground">Users Protected</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <p className="text-3xl md:text-4xl font-bold text-cybershield-purple">450K+</p>
              <p className="text-sm text-muted-foreground">Scams Identified</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <p className="text-3xl md:text-4xl font-bold text-cybershield-purple">85%</p>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <p className="text-3xl md:text-4xl font-bold text-cybershield-purple">24/7</p>
              <p className="text-sm text-muted-foreground">Protection</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="bg-gradient-to-br from-cybershield-purple to-cybershield-blue-bright rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to become a cyber security expert?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Join thousands of users who are learning to protect themselves and others from cyber threats. Start your journey today!
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-cybershield-purple hover:bg-white/90">
              <Link to="/scam-slayer">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
