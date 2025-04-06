
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Award, CheckCircle, ChevronRight, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Mock phishing email scenario
const phishingScenario = {
  title: "Phishing Email Challenge",
  description: "You've received the following email. Analyze it carefully and identify if it's legitimate or a scam.",
  steps: [
    {
      id: 1,
      type: "info",
      content: {
        title: "Incoming Email",
        sender: "security@app1e-support.com",
        subject: "Your Apple ID has been locked",
        body: `Dear Customer,
        
We detected unauthorized login attempts to your Apple ID. To protect your account, we've temporarily locked it.

Please verify your information within 24 hours by clicking the link below:

[Verify Account Now]

Failure to verify will result in permanent account suspension.

Apple Support Team`,
        clues: [
          "Check the sender's email address",
          "Look for spelling or grammatical errors",
          "Consider if the email creates urgency"
        ]
      }
    },
    {
      id: 2,
      type: "question",
      content: {
        question: "Is this email legitimate or a phishing attempt?",
        options: [
          { id: "a", text: "Legitimate - this is from Apple" },
          { id: "b", text: "Phishing attempt - this is a scam" }
        ],
        correctAnswer: "b",
        explanation: "This is a phishing email. Clues include: the sender's email domain 'app1e-support.com' (using the number 1 instead of the letter l), creating urgency, and requesting you to click a suspicious link."
      }
    },
    {
      id: 3,
      type: "question",
      content: {
        question: "What should you do with this email?",
        options: [
          { id: "a", text: "Click the verification link to check if it's legitimate" },
          { id: "b", text: "Reply asking for more information" },
          { id: "c", text: "Forward it to Apple's official phishing report email" },
          { id: "d", text: "Ignore but keep the email in case you need it later" }
        ],
        correctAnswer: "c",
        explanation: "You should report phishing attempts to the legitimate company. For Apple, you can forward suspicious emails to reportphishing@apple.com."
      }
    }
  ],
  xpReward: 50
};

const ScamScenario = () => {
  const { scenarioId } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const handleNextStep = () => {
    if (currentStep < phishingScenario.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Scenario completed
      setShowResults(true);
    }
  };
  
  const handleSelectAnswer = (questionId: number, answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId
    });
  };
  
  const calculateScore = () => {
    let correct = 0;
    let total = 0;
    
    phishingScenario.steps.forEach(step => {
      if (step.type === "question") {
        total++;
        if (selectedAnswers[step.id] === step.content.correctAnswer) {
          correct++;
        }
      }
    });
    
    return {
      correct,
      total,
      percentage: Math.round((correct / total) * 100)
    };
  };
  
  const handleCompleteScenario = () => {
    setIsCompleted(true);
  };
  
  return (
    <div className="container px-4 mx-auto py-8 md:py-12">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link to="/scam-slayer" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Scenarios
          </Link>
        </Button>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{phishingScenario.title}</h1>
        <p className="text-muted-foreground mb-6">{phishingScenario.description}</p>
        
        {/* Progress bar */}
        {!showResults && !isCompleted && (
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{currentStep + 1} of {phishingScenario.steps.length}</span>
            </div>
            <Progress value={((currentStep + 1) / phishingScenario.steps.length) * 100} className="h-2" />
          </div>
        )}
        
        {/* Current step content */}
        {!showResults && !isCompleted && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              {phishingScenario.steps[currentStep].type === "info" && (
                <div className="border rounded-md p-4 mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {phishingScenario.steps[currentStep].content.title}
                  </h3>
                  <div className="bg-gray-50 p-3 rounded mb-4">
                    <p><strong>From:</strong> {phishingScenario.steps[currentStep].content.sender}</p>
                    <p><strong>Subject:</strong> {phishingScenario.steps[currentStep].content.subject}</p>
                  </div>
                  <div className="whitespace-pre-line mb-4">
                    {phishingScenario.steps[currentStep].content.body}
                  </div>
                  <div className="bg-cybershield-blue/30 p-3 rounded">
                    <h4 className="font-medium mb-2">Clues to look for:</h4>
                    <ul className="list-disc pl-5">
                      {phishingScenario.steps[currentStep].content.clues?.map((clue, i) => (
                        <li key={i}>{clue}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {phishingScenario.steps[currentStep].type === "question" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {phishingScenario.steps[currentStep].content.question}
                  </h3>
                  <RadioGroup 
                    value={selectedAnswers[phishingScenario.steps[currentStep].id] || ""}
                    onValueChange={(value) => handleSelectAnswer(phishingScenario.steps[currentStep].id, value)}
                    className="space-y-3"
                  >
                    {phishingScenario.steps[currentStep].content.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                        <Label htmlFor={`option-${option.id}`} className="flex-grow cursor-pointer">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        {/* Results screen */}
        {showResults && !isCompleted && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Challenge Complete!</h2>
              <p className="text-muted-foreground">
                You've completed the phishing email challenge.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Your Results:</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-3xl font-bold text-cybershield-purple">{calculateScore().correct}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-3xl font-bold text-cybershield-purple">{calculateScore().total}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-3xl font-bold text-cybershield-purple">{calculateScore().percentage}%</p>
                  <p className="text-sm text-muted-foreground">Score</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-cybershield-purple" />
                <p className="font-medium">Rewards</p>
              </div>
              <p>+ {phishingScenario.xpReward} XP earned</p>
            </div>
            
            <Button onClick={handleCompleteScenario} className="w-full">
              Continue
            </Button>
          </div>
        )}
        
        {/* Completion screen */}
        {isCompleted && (
          <div className="bg-cybershield-purple/10 rounded-lg p-6 text-center">
            <Award className="h-12 w-12 mx-auto text-cybershield-purple mb-4" />
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p className="mb-6">
              You've learned how to identify phishing emails. Keep practicing to improve your skills!
            </p>
            <Button asChild>
              <Link to="/scam-slayer">Back to Scenarios</Link>
            </Button>
          </div>
        )}
        
        {/* Navigation buttons */}
        {!showResults && !isCompleted && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={phishingScenario.steps[currentStep].type === "question" && !selectedAnswers[phishingScenario.steps[currentStep].id]}
            >
              {currentStep === phishingScenario.steps.length - 1 ? "Complete" : "Next"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScamScenario;
