
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Award, Medal } from "lucide-react";

// Mock user data
const users = [
  {
    id: 1,
    username: "CyberHero",
    avatar: "https://i.pravatar.cc/150?img=1",
    xp: 4820,
    level: 10,
    badges: ["Phishing Expert", "Digital Defender", "Scam Buster"],
    reportsSubmitted: 32
  },
  {
    id: 2,
    username: "ScamSlayer92",
    avatar: "https://i.pravatar.cc/150?img=2",
    xp: 3950,
    level: 9,
    badges: ["Financial Guard", "Phishing Expert"],
    reportsSubmitted: 24
  },
  {
    id: 3,
    username: "SecuritySage",
    avatar: "https://i.pravatar.cc/150?img=3",
    xp: 3720,
    level: 8,
    badges: ["Digital Defender", "Scam Buster"],
    reportsSubmitted: 19
  },
  {
    id: 4,
    username: "CyberDefender",
    avatar: "https://i.pravatar.cc/150?img=4",
    xp: 3350,
    level: 8,
    badges: ["Phishing Expert"],
    reportsSubmitted: 15
  },
  {
    id: 5,
    username: "TechSavvy",
    avatar: "https://i.pravatar.cc/150?img=5",
    xp: 2980,
    level: 7,
    badges: ["Scam Buster"],
    reportsSubmitted: 12
  },
  {
    id: 6,
    username: "GuardianAngel",
    avatar: "https://i.pravatar.cc/150?img=6",
    xp: 2450,
    level: 6,
    badges: ["Digital Defender"],
    reportsSubmitted: 10
  },
  {
    id: 7,
    username: "CyberSentinel",
    avatar: "https://i.pravatar.cc/150?img=7",
    xp: 2100,
    level: 5,
    badges: [],
    reportsSubmitted: 8
  },
  {
    id: 8,
    username: "DigitalNinja",
    avatar: "https://i.pravatar.cc/150?img=8",
    xp: 1950,
    level: 5,
    badges: [],
    reportsSubmitted: 7
  },
  {
    id: 9,
    username: "SafetyFirst",
    avatar: "https://i.pravatar.cc/150?img=9",
    xp: 1820,
    level: 4,
    badges: [],
    reportsSubmitted: 6
  },
  {
    id: 10,
    username: "TechGuardian",
    avatar: "https://i.pravatar.cc/150?img=10",
    xp: 1240,
    level: 3,
    badges: [],
    reportsSubmitted: 4
  }
];

const Leaderboard = () => {
  return (
    <div className="container px-4 mx-auto py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground mb-8">
          See the top CyberShield users ranked by experience points and contributions.
        </p>
        
        <Tabs defaultValue="xp" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="xp">XP Leaders</TabsTrigger>
            <TabsTrigger value="reports">Top Contributors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="xp">
            <div className="grid grid-cols-1 gap-8">
              {/* Top 3 Podium */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* 2nd Place */}
                <div className="flex-1 order-2 md:order-1">
                  <div className="bg-gradient-to-b from-gray-100 to-gray-200 p-6 rounded-t-xl h-[80px] md:h-[120px] flex items-end justify-center">
                    <Medal className="h-8 w-8 text-gray-500" />
                  </div>
                  <div className="bg-white rounded-b-xl p-5 text-center border shadow-sm">
                    <Avatar className="h-16 w-16 border-4 border-white -mt-12 mx-auto shadow">
                      <AvatarImage src={users[1].avatar} alt={users[1].username} />
                      <AvatarFallback>{users[1].username.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold mt-2">{users[1].username}</h3>
                    <p className="text-sm text-muted-foreground">Level {users[1].level}</p>
                    <p className="text-xl font-bold text-cybershield-purple mt-1">{users[1].xp.toLocaleString()} XP</p>
                  </div>
                </div>
                
                {/* 1st Place */}
                <div className="flex-1 order-1 md:order-2 -mt-4">
                  <div className="bg-gradient-to-b from-yellow-100 to-yellow-200 p-6 rounded-t-xl h-[100px] md:h-[160px] flex items-end justify-center">
                    <Trophy className="h-10 w-10 text-yellow-500" />
                  </div>
                  <div className="bg-white rounded-b-xl p-5 text-center border shadow-sm">
                    <Avatar className="h-20 w-20 border-4 border-white -mt-14 mx-auto shadow">
                      <AvatarImage src={users[0].avatar} alt={users[0].username} />
                      <AvatarFallback>{users[0].username.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg mt-2">{users[0].username}</h3>
                    <p className="text-muted-foreground">Level {users[0].level}</p>
                    <p className="text-2xl font-bold text-cybershield-purple mt-1">{users[0].xp.toLocaleString()} XP</p>
                    <div className="flex flex-wrap gap-1 justify-center mt-2">
                      {users[0].badges.map((badge, index) => (
                        <Badge key={index} variant="outline" className="bg-cybershield-blue text-foreground">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* 3rd Place */}
                <div className="flex-1 order-3">
                  <div className="bg-gradient-to-b from-amber-100 to-amber-200 p-6 rounded-t-xl h-[60px] md:h-[100px] flex items-end justify-center">
                    <Award className="h-8 w-8 text-amber-600" />
                  </div>
                  <div className="bg-white rounded-b-xl p-5 text-center border shadow-sm">
                    <Avatar className="h-16 w-16 border-4 border-white -mt-12 mx-auto shadow">
                      <AvatarImage src={users[2].avatar} alt={users[2].username} />
                      <AvatarFallback>{users[2].username.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold mt-2">{users[2].username}</h3>
                    <p className="text-sm text-muted-foreground">Level {users[2].level}</p>
                    <p className="text-xl font-bold text-cybershield-purple mt-1">{users[2].xp.toLocaleString()} XP</p>
                  </div>
                </div>
              </div>
              
              {/* Rest of leaderboard */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Leaderboard Rankings</CardTitle>
                  <CardDescription>
                    Users ranked by experience points earned
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.slice(3).map((user, index) => (
                      <div 
                        key={user.id} 
                        className="flex items-center justify-between bg-white p-4 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-bold text-muted-foreground w-6">
                            {index + 4}
                          </span>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} alt={user.username} />
                            <AvatarFallback>{user.username.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-xs text-muted-foreground">
                              Level {user.level} {user.badges.length > 0 && `• ${user.badges.length} badge${user.badges.length > 1 ? "s" : ""}`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-cybershield-purple">{user.xp.toLocaleString()} XP</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
                <CardDescription>
                  Users who have submitted the most validated reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...users]
                    .sort((a, b) => b.reportsSubmitted - a.reportsSubmitted)
                    .map((user, index) => (
                      <div 
                        key={user.id} 
                        className="flex items-center justify-between bg-white p-4 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-bold text-muted-foreground w-6">
                            {index + 1}
                          </span>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} alt={user.username} />
                            <AvatarFallback>{user.username.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-xs text-muted-foreground">
                              Level {user.level}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-cybershield-blue-bright">
                            {user.reportsSubmitted} report{user.reportsSubmitted !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboard;
