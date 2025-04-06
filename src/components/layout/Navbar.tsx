
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Menu, X, Shield, Bell, User, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b">
      <div className="container px-4 mx-auto flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-cybershield-purple" />
            <span className="font-bold text-lg">CyberShield</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">Home</Link>
          <Link to="/leaderboard" className="text-foreground/80 hover:text-foreground transition-colors">Leaderboard</Link>
          <Link to="/stories" className="text-foreground/80 hover:text-foreground transition-colors">Stories</Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">About</Link>
          
          {user ? (
            /* Profile & Notifications when logged in */
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <span className="font-semibold">New Badge Earned!</span>
                      <span className="text-sm text-muted-foreground">You earned the "Phishing Expert" badge</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col">
                      <span className="font-semibold">Level Up!</span>
                      <span className="text-sm text-muted-foreground">You reached Level 5</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative p-0" aria-label="Profile dropdown">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`} alt={user.email || "User"} />
                      <AvatarFallback>{user.email?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user.email}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="flex justify-between w-full">
                      <span>XP</span>
                      <span className="font-medium">1,240</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex justify-between w-full">
                      <span>Level</span>
                      <span className="font-medium">5</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col gap-1 w-full">
                      <span>Badges</span>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="bg-cybershield-blue text-foreground">Phishing Expert</Badge>
                        <Badge variant="outline" className="bg-cybershield-purple-light text-foreground">Scam Buster</Badge>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            /* Login/Signup when not logged in */
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/auth">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/auth">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
        
        {/* Mobile Toggle Menu */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-30">
          <div className="flex flex-col p-6 space-y-4">
            <Link to="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/leaderboard" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Leaderboard</Link>
            <Link to="/stories" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Stories</Link>
            <Link to="/about" className="text-lg font-medium" onClick={() => setIsOpen(false)}>About</Link>
            
            {user ? (
              <div className="border-t pt-4">
                <Link to="/profile" className="flex items-center gap-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                  <User className="h-5 w-5" />
                  Profile
                </Link>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 text-lg font-medium w-full justify-start p-0 mt-4" 
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}>
                  <LogOut className="h-5 w-5" />
                  Log out
                </Button>
              </div>
            ) : (
              <div className="border-t pt-4 flex flex-col space-y-3">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
