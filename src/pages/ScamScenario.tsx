
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfile, CompletedScenario, badgeDefinitions } from "@/types/auth";

// Mock phishing email scenario
const phishingScenario = {
  id: 1,
  title: "Phishing Email",
  description: "Learn how to identify phishing emails that try to steal your personal information.",
  content: `
    <div class="border rounded-md p-4 space-y-2 bg-white">
      <div class="flex justify-between text-sm text-gray-600">
        <div><strong>From:</strong> secur1ty-alert@amaz0n-support.com</div>
        <div>March 15, 2023</div>
      </div>
      <div class="text-sm text-gray-600"><strong>To:</strong> valued.customer@email.com</div>
      <div class="text-sm text-gray-600"><strong>Subject:</strong> ⚠️ URGENT: Your Amazon account has been suspended</div>
      <hr class="my-2" />
      <div class="space-y-4">
        <div class="flex items-center justify-center">
          <img src="https://logo.clearbit.com/amazon.com" alt="Amazon" class="h-10" />
        </div>
        <p><strong>Dear Valued Customer,</strong></p>
        <p>We have detected suspicious activity on your Amazon account. Your account has been temporarily suspended for security reasons.</p>
        <p>To restore your account access, you need to verify your billing information immediately by clicking the link below:</p>
        <div class="py-2">
          <a href="#" class="text-blue-600 underline">https://amaz0n-account-verify.com/restore-access</a>
        </div>
        <p>If you do not verify your information within 24 hours, your account will be permanently deactivated and all pending orders will be canceled.</p>
        <p>Thank you for your immediate attention to this matter.</p>
        <p>Sincerely,<br/>The Amazon Security Team</p>
      </div>
    </div>
  `,
  questions: [
    {
      id: 1,
      text: "What is the main red flag in this email?",
      options: [
        { id: 'a', text: "The email is from Amazon" },
        { id: 'b', text: "The sender's email address doesn't match the official Amazon domain" },
        { id: 'c', text: "The email mentions suspicious activity" },
        { id: 'd', text: "The email was sent in March 2023" }
      ],
      correctAnswer: 'b',
    },
    {
      id: 2,
      text: "What is the goal of this phishing attempt?",
      options: [
        { id: 'a', text: "To help you secure your Amazon account" },
        { id: 'b', text: "To inform you about a real Amazon security issue" },
        { id: 'c', text: "To trick you into clicking a malicious link and stealing your information" },
        { id: 'd', text: "To cancel your pending orders" }
      ],
      correctAnswer: 'c',
    },
    {
      id: 3,
      text: "What should you do if you receive this email?",
      options: [
        { id: 'a', text: "Click the link to verify your information" },
        { id: 'b', text: "Reply to the email asking for more information" },
        { id: 'c', text: "Delete the email and log into Amazon directly through the official website or app" },
        { id: 'd', text: "Forward your bank details to secure your account" }
      ],
      correctAnswer: 'c',
    }
  ],
  tips: [
    "Always check the sender's email address for misspellings or unofficial domains",
    "Legitimate companies won't ask for sensitive information via email",
    "Be wary of urgent requests that pressure you to act quickly",
    "When in doubt, go directly to the official website by typing the URL yourself",
    "Look for grammar and spelling errors, which are common in phishing attempts"
  ]
};

const ScamScenario = () => {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const { user, userProfile, refreshProfile } = useAuth();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [existingCompletion, setExistingCompletion] = useState<CompletedScenario | null>(null);
  
  // Check if the scenario has been completed before
  useEffect(() => {
    const checkCompletion = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('completed_scenarios')
          .select('*')
          .eq('user_id', user.id)
          .eq('scenario_id', parseInt(scenarioId || '1'))
          .maybeSingle();
          
        if (error) throw error;
        
        if (data) {
          setExistingCompletion(data);
          setCompleted(true);
        }
      } catch (error) {
        console.error('Error checking scenario completion:', error);
      }
    };
    
    checkCompletion();
  }, [user, scenarioId]);

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestion < phishingScenario.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateFinalScore = () => {
    let correctCount = 0;
    
    phishingScenario.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    return Math.round((correctCount / phishingScenario.questions.length) * 100);
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to save your progress",
          variant: "destructive"
        });
        navigate('/auth');
        return;
      }
      
      // Calculate final score
      const finalScore = calculateFinalScore();
      setScore(finalScore);
      
      // Save completion to the database
      if (!existingCompletion) {
        const { error } = await supabase
          .from('completed_scenarios')
          .insert({
            user_id: user.id,
            scenario_id: parseInt(scenarioId || '1'),
            score: finalScore,
          });
          
        if (error) throw error;
        
        // Update user's XP
        if (userProfile) {
          const currentXp = userProfile.xp || 0;
          const newXp = currentXp + 50; // Award 50 XP for completion
          
          const { error: profileError } = await supabase
            .from('profiles')
            .update({ xp: newXp })
            .eq('id', user.id);
            
          if (profileError) throw profileError;
          
          // Refresh user profile to get updated XP
          await refreshProfile();
        }
      }
      
      setSubmitted(true);
      setCompleted(true);
      
      toast({
        title: "Challenge completed!",
        description: `You scored ${finalScore}%`,
      });
    } catch (error) {
      console.error('Error submitting scenario:', error);
      toast({
        title: "Error saving your progress",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-4 mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/scam-slayer')} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Scenarios
        </Button>
        
        <h1 className="text-2xl md:text-3xl font-bold">{phishingScenario.title}</h1>
        <p className="text-muted-foreground">{phishingScenario.description}</p>
      </div>
      
      {!submitted ? (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Question {currentQuestion + 1} of {phishingScenario.questions.length}</span>
              <span className="text-sm font-medium">{Math.round(((currentQuestion + 1) / phishingScenario.questions.length) * 100)}%</span>
            </div>
            <Progress value={((currentQuestion + 1) / phishingScenario.questions.length) * 100} className="h-2" />
          </div>
          
          {currentQuestion === 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Analyze this email</CardTitle>
                <CardDescription>Look for signs that indicate this might be a scam</CardDescription>
              </CardHeader>
              <CardContent>
                <div dangerouslySetInnerHTML={{ __html: phishingScenario.content }} />
              </CardContent>
            </Card>
          )}
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{phishingScenario.questions[currentQuestion].text}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedAnswers[phishingScenario.questions[currentQuestion].id] || ""} onValueChange={(value) => handleAnswerSelect(phishingScenario.questions[currentQuestion].id, value)}>
                {phishingScenario.questions[currentQuestion].options.map(option => (
                  <div key={option.id} className="flex items-center space-x-2 my-2">
                    <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                    <Label htmlFor={`option-${option.id}`} className="cursor-pointer">{option.text}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={goToPreviousQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              
              {currentQuestion < phishingScenario.questions.length - 1 ? (
                <Button 
                  onClick={goToNextQuestion}
                  disabled={!selectedAnswers[phishingScenario.questions[currentQuestion].id]}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={!selectedAnswers[phishingScenario.questions[currentQuestion].id] || loading}
                >
                  {loading ? "Submitting..." : "Submit Answers"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader className={score >= 70 ? "bg-green-50" : "bg-amber-50"}>
              <div className="flex items-center gap-3 mb-2">
                {score >= 70 ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <AlertCircle className="h-8 w-8 text-amber-600" />
                )}
                <CardTitle>Your Results</CardTitle>
              </div>
              <CardDescription>
                {score >= 70 
                  ? "Great job! You've successfully completed this challenge." 
                  : "You've completed this challenge, but there's room for improvement."}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span>Your Score</span>
                  <span className="font-bold">{score}%</span>
                </div>
                <Progress value={score} className="h-3" />
              </div>
              
              <div className="space-y-4">
                {phishingScenario.questions.map((question) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">{question.text}</h3>
                    
                    {question.options.map(option => (
                      <div key={option.id} className={`flex items-center p-2 rounded-md ${
                        option.id === question.correctAnswer 
                          ? "bg-green-50"
                          : selectedAnswers[question.id] === option.id && option.id !== question.correctAnswer
                            ? "bg-red-50"
                            : ""
                      }`}>
                        {option.id === question.correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        ) : selectedAnswers[question.id] === option.id ? (
                          <XCircle className="h-5 w-5 text-red-600 mr-2" />
                        ) : (
                          <div className="h-5 w-5 mr-2" /> // Empty space for alignment
                        )}
                        <span className={option.id === question.correctAnswer ? "font-medium" : ""}>{option.text}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Key Takeaways</CardTitle>
              <CardDescription>Remember these tips to protect yourself from scams</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {phishingScenario.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/scam-slayer')} className="w-full">
                Return to Scenarios
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ScamScenario;
