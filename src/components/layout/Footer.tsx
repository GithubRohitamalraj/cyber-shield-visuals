
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-cybershield-purple" />
              <span className="font-bold text-lg">CyberShield</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Learn to identify and report cyber scams with our gamified educational platform.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/scam-slayer" className="text-muted-foreground hover:text-foreground">Scam Slayer</Link></li>
              <li><Link to="/safezone" className="text-muted-foreground hover:text-foreground">SafeZone</Link></li>
              <li><Link to="/leaderboard" className="text-muted-foreground hover:text-foreground">Leaderboard</Link></li>
              <li><Link to="/stories" className="text-muted-foreground hover:text-foreground">Stories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Security Tips</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-sm text-muted-foreground text-center">
          <p>© {new Date().getFullYear()} CyberShield. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
