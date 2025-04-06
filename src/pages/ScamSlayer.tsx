import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Award, 
  Mail, 
  Briefcase, 
  CreditCard, 
  Gift, 
  MessageSquare, 
  Heart, 
  ShieldCheck,
  Phone,
  Globe,
  ArrowRight,
  Loader2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { UserProfile, CompletedScenario } from "@/types/auth";

// Mock scam scenarios
const scamScenarios = [
  {
    id: 1,
    title: "Phishing Email",
    description: "Learn how to spot fraudulent emails trying to steal your information",
    icon: Mail,
    difficulty: "Easy",
    xp: 50,
    completed: true
  },
  {
    id: 2,
    title: "Fake Job Offer",
    description: "Identify suspicious job opportunities that are too good to be true",
    icon: Briefcase,
    difficulty: "Medium",
    xp: 75,
    completed: false
  },
  {
    id: 3,
    title: "Credit Card Scam",
    description: "Protect your financial information from clever scammers",
    icon: CreditCard,
    difficulty: "Hard",
    xp: 100,
    completed: false
  },
  {
    id: 4,
    title: "Gift Card Fraud",
    description: "Recognize gift card scams and common tactics used by fraudsters",
    icon: Gift,
    difficulty: "Medium",
    xp: 75,
    completed: false
  },
  {
    id: 5,
    title: "Social Media Scam",
    description: "Stay safe from scams on popular social media platforms",
    icon: MessageSquare,
    difficulty: "Easy",
    xp: 50,
    completed: false
  },
  {
    id: 6,
    title: "Dating Site Fraud",
    description: "Identify romance scams and protect yourself from heartbreak",
    icon: Heart,
    difficulty: "Hard",
    xp: 100,
    completed: false
  },
  {
    id: 7,
    title: "Tech Support Scam",
    description: "Learn to recognize fake technical support calls and popups",
    icon: Phone,
    difficulty: "Medium",
    xp: 75,
    completed: false
  },
  {
    id: 8,
    title: "Fake Website",
    description: "Spot fraudulent websites designed to steal your information",
    icon: Globe,
    difficulty: "Medium",
    xp: 75,
    completed: false
  }
];

// Mock badges definition
const badgeDefinitions = [
  { id: 1, name: "Phishing Expert", icon: Mail, description: "Successfully completed all phishing challenges" },
  { id: 2, name: "Scam Buster", icon: ShieldCheck, description: "Reported 5 or more scams" },
  { id: 3, name: "Digital Defender", icon: Award, description: "Reached level 5" },
  { id: 4, name: "Financial Guard", icon: CreditCard, description: "Completed all financial scam challenges" }
];

const ScamSlayer = () => {
  const [activeTab, setActiveTab] = useState("scenarios");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<CompletedScenario[]>([]);
  const [userBadges, setUserBadges] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Calculate XP required for next level (simple formula)
  const calculateNextLevelXp = (currentLevel: number) => {
    return currentLevel * 500;
  };

  // Fetch user profile and data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) throw profileError;
        
        // Fetch completed scenarios
        const { data: scenarios, error: scenariosError } = await supabase
          .from('completed_scenarios')
          .select('*')
          .eq('user_id', user.id);
          
        if (scenariosError) throw scenariosError;
        
        // Fetch user badges
        const { data: badges, error: badgesError } = await supabase
          .from('user_badges')
          .select('badge_id')
          .eq('user_id', user.id);
          
        if (badgesError) throw badgesError;
        
        setUserProfile(profile);
        setCompletedScenarios(scenarios);
        setUserBadges(badges.map(badge => badge.badge_id));
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error loading your data",
          description: "Please refresh the page to try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);

  // Get the list of completed scenario IDs
  const completedScenarioIds = completedScenarios.map(scenario => scenario.scenario_id);

  // Get badges with earned status
  const badges = badgeDefinitions.map(badge => ({
    ...badge,
    earned: userBadges.includes(badge.id)
  }));

  if (isLoading) {
    return (
      <div className="container px-4 mx-auto py-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-cybershield-purple" />
          <p className="text-lg font-medium">Loading your scam slayer data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8 items-start">
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Scam Slayer</h1>
          <p className="text-muted-foreground mb-4">
            Test your skills against common scam scenarios, earn XP, and collect badges.
          </p>
        </div>
        <div className="w-full md:w-1/3 bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium">Level {userProfile?.level || 1}</span>
            <span className="text-sm font-medium">
              {userProfile?.xp || 0} / {calculateNextLevelXp(userProfile?.level || 1)} XP
            </span>
          </div>
          <Progress 
            value={((userProfile?.xp || 0) / calculateNextLevelXp(userProfile?.level || 1)) * 100} 
            className="h-2 mb-4" 
          />
          <div className="flex justify-between text-sm">
            <span>Current Level</span>
            <span>Next Level</span>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-8 w-full max-w-md">
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="badges">My Badges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scenarios" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {scamScenarios.map((scenario) => {
              const isCompleted = completedScenarioIds.includes(scenario.id);
              return (
                <Card 
                  key={scenario.id} 
                  className={`card-hover ${isCompleted ? "border-green-200 bg-green-50" : ""}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className={`rounded-full p-2 ${
                        scenario.difficulty === "Easy" ? "bg-green-100" :
                        scenario.difficulty === "Medium" ? "bg-yellow-100" : "bg-red-100"
                      }`}>
                        <scenario.icon className={`h-5 w-5 ${
                          scenario.difficulty === "Easy" ? "text-green-600" :
                          scenario.difficulty === "Medium" ? "text-yellow-600" : "text-red-600"
                        }`} />
                      </div>
                      <Badge variant="outline" className="bg-secondary">
                        {scenario.xp} XP
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-3">{scenario.title}</CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button asChild className="w-full" variant={isCompleted ? "outline" : "default"}>
                      <Link to={`/scam-slayer/${scenario.id}`}>
                        {isCompleted ? "Review" : "Start Challenge"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="badges" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {badges.map((badge) => (
              <Card key={badge.id} className={`card-hover ${badge.earned ? "" : "opacity-50"}`}>
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-cybershield-purple-light rounded-full p-6 mb-2">
                    <badge.icon className="h-10 w-10 text-cybershield-purple" />
                  </div>
                  <CardTitle className="text-lg">{badge.name}</CardTitle>
                  <CardDescription>
                    {badge.earned ? "Earned" : "Not earned yet"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  {badge.description}
                </CardContent>
                <CardFooter className="justify-center pt-0">
                  <Button variant="outline" size="sm" disabled={!badge.earned}>
                    {badge.earned ? "View Details" : "Locked"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScamSlayer;
