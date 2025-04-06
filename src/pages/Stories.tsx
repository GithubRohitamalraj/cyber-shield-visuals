
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Share2, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Mock stories data
const stories = [
  {
    id: 1,
    title: "How I Spotted a Sophisticated Phishing Attack",
    excerpt: "I received what looked like a legitimate email from my bank, but something felt off...",
    content: `I received what looked like a legitimate email from my bank, but something felt off. The email claimed there was suspicious activity on my account and I needed to verify my information immediately.

The email looked very convincing - it had my bank's logo, the right colors, and even a footer with all the legitimate links. But I noticed a few things:

1. The sender's email was "security@bank-secure-center.com" instead of my actual bank's domain
2. There was a slight urgency in the tone "Act within 24 hours to prevent account suspension"
3. When I hovered over the "Verify Account" button, the link didn't go to my bank's website

Instead of clicking, I called my bank directly using the number on the back of my card. They confirmed it was a phishing attempt and thanked me for reporting it.

Always verify communications from financial institutions by contacting them directly through official channels!`,
    author: "SecuritySage",
    authorInitials: "SS",
    authorColor: "bg-purple-500",
    date: "2025-03-15",
    likes: 128,
    comments: 32,
    category: "phishing"
  },
  {
    id: 2,
    title: "Job Scam Warning: Too Good To Be True Offer",
    excerpt: "I was job hunting and received an incredible offer with a huge salary, but something didn't add up...",
    content: `I was job hunting and received an incredible offer with a huge salary, but something didn't add up.

The email came out of nowhere, offering a remote position with a salary that was well above market rate. They claimed to have found my resume on a job board and were impressed with my qualifications.

Red flags that caught my attention:
- The email had several grammar and spelling errors
- They offered the job without an interview
- They asked for personal banking information for "direct deposit setup" before I even started
- The company name was similar to a well-known corporation but slightly different
- They pressured me to respond quickly to "secure the position"

I researched the company and found several reports of the same scam. They were trying to collect personal information and potentially set up fake check scams.

Remember: legitimate employers don't offer jobs without proper interviews and never ask for bank information before you're hired!`,
    author: "JobHunter",
    authorInitials: "JH",
    authorColor: "bg-blue-500",
    date: "2025-03-24",
    likes: 95,
    comments: 18,
    category: "job"
  },
  {
    id: 3,
    title: "Romance Scam: My Experience and How I Caught On",
    excerpt: "After my divorce, I tried online dating and connected with someone who seemed too perfect...",
    content: `After my divorce, I tried online dating and connected with someone who seemed too perfect. They were attentive, charming, and seemed genuinely interested in getting to know me.

We chatted for weeks, and they always had a reason why we couldn't video call - bad connection, working abroad, etc. They shared photos that looked professional and told elaborate stories about their life as an engineer working on international projects.

Things changed when they started having "emergencies" - first, their wallet was stolen and they needed a small loan. Then, they couldn't access their bank account while abroad and needed help with medical bills.

I became suspicious and did a reverse image search on their photos, only to find they belonged to a model from another country. When I confronted them, they became defensive and eventually disappeared.

What I learned:
- Be wary of people who can never video chat
- Be skeptical of consistent excuses for not meeting
- Watch out for rapid emotional attachment
- Always reverse image search photos
- Never send money to someone you haven't met in person

The experience was painful, but I'm sharing to help others avoid the same heartbreak and financial loss.`,
    author: "WiserNow",
    authorInitials: "WN",
    authorColor: "bg-pink-500",
    date: "2025-04-01",
    likes: 156,
    comments: 42,
    category: "romance"
  },
  {
    id: 4,
    title: "Tech Support Scam That Almost Fooled Me",
    excerpt: "I received a call from someone claiming to be from Microsoft about a virus on my computer...",
    content: `I received a call from someone claiming to be from Microsoft about a virus on my computer. They sounded professional and knew my name, which made me initially trust them.

They said they detected suspicious activity from my computer and needed to help me remove malware immediately. They directed me to a website to download a "security tool" that would allow them to access my computer remotely.

Fortunately, I remembered reading about tech support scams and became suspicious. I asked them how they knew my computer had a virus, and they claimed Microsoft monitors all Windows computers - a clear lie.

When I questioned them further, they became aggressive and threatened that my computer would be "blocked" if I didn't comply. That confirmed it was definitely a scam.

Tips to avoid tech support scams:
- Microsoft, Apple, and other tech companies don't make unsolicited calls
- Never give remote access to someone who calls you
- Don't trust caller ID as it can be spoofed
- Hang up and contact the company directly using their official website

Be vigilant, especially if you have older relatives who might be more vulnerable to these tactics.`,
    author: "TechSavvy",
    authorInitials: "TS",
    authorColor: "bg-green-500",
    date: "2025-04-03",
    likes: 82,
    comments: 27,
    category: "tech"
  },
  {
    id: 5,
    title: "Investment Scam: The Fake Crypto Opportunity",
    excerpt: "I was approached on social media about an investment opportunity with guaranteed returns...",
    content: `I was approached on social media about an investment opportunity with guaranteed returns. The person messaged me saying they were a financial advisor and had a "special crypto investment strategy" that was generating 15% weekly returns for their clients.

They directed me to a professional-looking website with charts, testimonials, and even a fake trading platform that showed consistent gains. They encouraged a small initial investment, which appeared to grow rapidly on their platform.

When I tried to withdraw my "earnings," they said I needed to pay a "verification fee" first. Then there was a "tax clearance fee," and finally an "international transfer fee." Each time I paid, there was another fee to unlock my funds.

Eventually, I realized the entire platform was fake, and my investments weren't real - just numbers on a screen. I lost a considerable amount of money before admitting to myself it was a scam.

Warning signs I should have noticed:
- Guaranteed returns (no investment can guarantee profits)
- Pressure to act quickly before "missing out"
- Requests to use cryptocurrency for payments
- Unwillingness to use regulated financial channels
- Escalating fees to access your own money

I'm sharing this embarrassing experience to help others avoid similar scams. If it sounds too good to be true, it is.`,
    author: "InvestorAlert",
    authorInitials: "IA",
    authorColor: "bg-yellow-500",
    date: "2025-04-05",
    likes: 113,
    comments: 36,
    category: "financial"
  }
];

const Stories = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null);
  
  const filteredStories = activeTab === "all" 
    ? stories 
    : stories.filter(story => story.category === activeTab);
  
  return (
    <div className="container px-4 mx-auto py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Community Stories</h1>
        <p className="text-muted-foreground mb-8">
          Real experiences shared by our users to help you recognize and avoid scams.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="phishing">Phishing</TabsTrigger>
            <TabsTrigger value="job">Job Scams</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="romance">Romance</TabsTrigger>
            <TabsTrigger value="tech">Tech Support</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStories.map((story) => (
            <Card key={story.id} className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Avatar className={`${story.authorColor} h-8 w-8 text-white`}>
                    <AvatarFallback>{story.authorInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(story.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <CardTitle>{story.title}</CardTitle>
                <CardDescription>{story.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <Badge variant="outline" className="bg-secondary">
                  {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
                </Badge>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">{story.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span className="text-sm">{story.comments}</span>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setSelectedStory(story)}>
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No stories found in this category.
            </p>
          </div>
        )}
        
        {/* Full Story Dialog */}
        <Dialog open={!!selectedStory} onOpenChange={(open) => !open && setSelectedStory(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedStory?.title}</DialogTitle>
              <DialogDescription>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Avatar className={`${selectedStory?.authorColor} h-8 w-8 text-white`}>
                      <AvatarFallback>{selectedStory?.authorInitials}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{selectedStory?.author}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {selectedStory?.date && new Date(selectedStory.date).toLocaleDateString()}
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <div className="whitespace-pre-line text-balance mt-2 max-h-[60vh] overflow-y-auto">
              {selectedStory?.content}
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-6">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{selectedStory?.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{selectedStory?.comments}</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" /> 
                Share
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Stories;
