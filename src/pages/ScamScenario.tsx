
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  ChevronRight,
  ArrowRight,
  AlertTriangle,
  ShieldAlert,
  ExternalLink,
  Info
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfile, CompletedScenario, badgeDefinitions } from "@/types/auth";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

// Scam scenarios data
const scamScenarios = [
  {
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
    redFlags: [
      {
        id: "flag1",
        element: "secur1ty-alert@amaz0n-support.com",
        explanation: "Suspicious email address with misspelled domain (amaz0n) and unusual subdomain"
      },
      {
        id: "flag2",
        element: "https://amaz0n-account-verify.com/restore-access",
        explanation: "Suspicious URL that doesn't match Amazon's official domain (amazon.com)"
      },
      {
        id: "flag3",
        element: "URGENT",
        explanation: "Creating urgency is a common phishing tactic to make you act without thinking"
      },
      {
        id: "flag4", 
        element: "Dear Valued Customer",
        explanation: "Generic greeting instead of using your name, which legitimate Amazon emails would include"
      }
    ],
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
  },
  {
    id: 2,
    title: "Fake Job Offer",
    description: "Identify suspicious job opportunities that are too good to be true",
    content: `
      <div class="border rounded-md p-4 space-y-3 bg-white max-w-md mx-auto">
        <div class="flex items-center gap-3 border-b pb-2">
          <div class="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">JR</div>
          <div>
            <div class="font-semibold">John Recruiter</div>
            <div class="text-xs text-gray-500">Today, 10:32 AM</div>
          </div>
        </div>
        <div class="space-y-3 text-sm">
          <p>Hello dear,</p>
          <p>I'm John from Global Work Opportunities Inc. I saw your profile and would like to offer you a remote position as a Financial Processing Agent.</p>
          <p><strong>Job Details:</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Work from home, only 2-3 hours daily</li>
            <li>No experience required</li>
            <li>$5,000-$8,000 monthly salary</li>
            <li>Start immediately</li>
          </ul>
          <p>To secure this position, you need to pay a small processing fee of $199 to cover administrative costs. This is a one-time payment only.</p>
          <p>Send the fee via wire transfer to:</p>
          <div class="bg-gray-100 p-2 rounded">
            <p>Bank: International Banking Corp.</p>
            <p>Account: 6729401058</p>
            <p>Name: GWO Processing</p>
          </div>
          <p>After payment confirmation, we will send your employment contract.</p>
          <p>Reply ASAP as positions are filling fast!</p>
          <p>Regards,<br />John</p>
        </div>
      </div>
    `,
    redFlags: [
      {
        id: "flag1",
        element: "Hello dear",
        explanation: "Unprofessional greeting without using your name indicates a mass-sent message"
      },
      {
        id: "flag2",
        element: "$5,000-$8,000 monthly salary",
        explanation: "Unrealistically high salary for minimal work is a classic scam tactic"
      },
      {
        id: "flag3",
        element: "pay a small processing fee of $199",
        explanation: "Legitimate employers never ask candidates to pay fees to get hired"
      },
      {
        id: "flag4",
        element: "Reply ASAP as positions are filling fast",
        explanation: "Creating artificial urgency to rush you into making a payment without thinking"
      }
    ],
    questions: [
      {
        id: 1,
        text: "What is the biggest red flag in this job offer?",
        options: [
          { id: 'a', text: "The position is remote" },
          { id: 'b', text: "They ask for a processing fee" },
          { id: 'c', text: "The job only requires 2-3 hours daily" },
          { id: 'd', text: "The message came via messaging app" }
        ],
        correctAnswer: 'b',
      },
      {
        id: 2,
        text: "Why is the salary a warning sign?",
        options: [
          { id: 'a', text: "The salary is normal for this type of work" },
          { id: 'b', text: "The salary is too low for the required hours" },
          { id: 'c', text: "The salary is unrealistically high for minimal work" },
          { id: 'd', text: "Global companies always pay in this range" }
        ],
        correctAnswer: 'c',
      },
      {
        id: 3,
        text: "What should you do if you receive this kind of job offer?",
        options: [
          { id: 'a', text: "Pay the fee quickly to secure the position" },
          { id: 'b', text: "Negotiate a lower fee before paying" },
          { id: 'c', text: "Share it with your friends so they can apply too" },
          { id: 'd', text: "Ignore it - legitimate employers never charge fees to hire you" }
        ],
        correctAnswer: 'd',
      }
    ],
    tips: [
      "Legitimate employers never ask candidates to pay fees",
      "Be suspicious of job offers with unusually high pay for minimal work",
      "Research the company thoroughly before engaging with recruiters",
      "Vague job descriptions with few details are often scams",
      "Be wary of recruiters who contact you out of the blue"
    ]
  },
  {
    id: 3,
    title: "Credit Card Scam",
    description: "Protect your financial information from clever scammers",
    content: `
      <div class="max-w-md mx-auto border rounded-md overflow-hidden">
        <div class="bg-blue-600 p-3 text-white text-center">
          <h3 class="font-bold text-lg">SecureBank Payment Verification</h3>
        </div>
        <div class="bg-white p-4 space-y-4">
          <div class="border-b pb-2 text-center">
            <img src="https://logo.clearbit.com/visa.com" alt="Visa" class="h-8 inline-block mr-2" />
            <img src="https://logo.clearbit.com/mastercard.com" alt="Mastercard" class="h-8 inline-block" />
          </div>
          <p class="text-sm text-center">Your recent transaction requires additional verification. Please provide your card details below to proceed:</p>
          
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">Cardholder Name</label>
              <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Card Number</label>
              <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input type="text" placeholder="MM/YY" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">CVV</label>
                <input type="text" placeholder="123" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Billing Address</label>
              <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" />
            </div>
          </div>
          
          <button class="w-full bg-blue-600 text-white p-3 rounded-md font-medium">Verify Now</button>
          <p class="text-xs text-gray-500 text-center">This page is secured with 128-bit encryption</p>
        </div>
      </div>
    `,
    redFlags: [
      {
        id: "flag1",
        element: "SecureBank Payment Verification",
        explanation: "Generic bank name instead of your actual bank's name"
      },
      {
        id: "flag2",
        element: "Your recent transaction requires additional verification",
        explanation: "Vague reference to a transaction without specific details"
      },
      {
        id: "flag3",
        element: "Please provide your card details below",
        explanation: "Legitimate banks will never ask for your full card details on an email link"
      },
      {
        id: "flag4",
        element: "128-bit encryption",
        explanation: "Mentions outdated security (modern sites use 256-bit encryption) to appear legitimate"
      }
    ],
    questions: [
      {
        id: 1,
        text: "What makes this payment page suspicious?",
        options: [
          { id: 'a', text: "It doesn't show a padlock icon in the address bar" },
          { id: 'b', text: "It's asking for your full credit card information" },
          { id: 'c', text: "It has a blue header" },
          { id: 'd', text: "It shows payment card logos" }
        ],
        correctAnswer: 'b',
      },
      {
        id: 2,
        text: "What should you do if you receive a link to a page like this?",
        options: [
          { id: 'a', text: "Enter your information to verify your card is secure" },
          { id: 'b', text: "Call the number on the back of your card to verify if this is legitimate" },
          { id: 'c', text: "Enter fake details to test if the site is real" },
          { id: 'd', text: "Share the link with friends to warn them" }
        ],
        correctAnswer: 'b',
      },
      {
        id: 3,
        text: "Why do scammers ask for your CVV number?",
        options: [
          { id: 'a', text: "To verify you're human" },
          { id: 'b', text: "It's standard security protocol" },
          { id: 'c', text: "The CVV is needed to make online purchases with your card" },
          { id: 'd', text: "Banks require it for all transactions" }
        ],
        correctAnswer: 'c',
      }
    ],
    tips: [
      "Your bank will never ask for your full card details via email or text",
      "Always check the URL before entering any financial information",
      "When in doubt, call your bank using the number on the back of your card",
      "Look for https and a padlock icon in your browser before entering information",
      "Be suspicious of generic bank names or logos instead of your specific bank"
    ]
  }
];

// New improved phishing simulation with the requested changes
const improvedScamScenarios = [
  {
    id: 1,
    title: "Phishing Login Page",
    description: "Learn how to identify fake login pages that try to steal your credentials.",
    content: `
      <div class="max-w-md mx-auto border rounded-md overflow-hidden shadow-md">
        <div class="p-4 bg-blue-600 flex items-center justify-between">
          <div class="flex items-center">
            <img src="https://via.placeholder.com/40x40?text=f" alt="Faceb00k" class="mr-2 h-8 w-8 filter blur-[0.5px]" />
            <span class="text-white text-lg font-bold">faceb00k</span>
          </div>
          <div class="text-white text-xs">
            <span class="bg-red-500 text-white px-1 py-0.5 rounded text-xs">secure-faceb00k-login.com</span>
          </div>
        </div>
        <div class="p-6 bg-white space-y-6">
          <div class="text-center space-y-2">
            <div class="text-xl font-bold text-red-500">⚠️ Warning: Your Account is at Risk!</div>
            <p class="text-gray-600">We've detected suspicious activity on your acount. Please login to verify your identity.</p>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Email or Phone</label>
              <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" placeholder="Email or phone" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Pssword</label>
              <input type="password" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border" placeholder="Password" />
            </div>
          </div>
          
          <button class="w-full bg-blue-600 text-white p-2 rounded-md font-medium text-center">
            Login Now to Secure Your Account
          </button>
          
          <div class="text-center text-sm text-gray-500">
            <a href="#" class="text-blue-600 hover:underline">Forgot Password?</a> | 
            <a href="#" class="text-blue-600 hover:underline">Create New Account</a>
          </div>
        </div>
      </div>
    `,
    redFlags: [
      {
        id: "flag1",
        element: "secure-faceb00k-login.com",
        explanation: "Suspicious URL with a misspelled domain name (faceb00k) and misleading 'secure' prefix"
      },
      {
        id: "flag2",
        element: "⚠️ Warning: Your Account is at Risk!",
        explanation: "Creating urgency is a common phishing tactic to make you act without thinking"
      },
      {
        id: "flag3",
        element: "Pssword",
        explanation: "Misspelled words and poor grammar are common signs of phishing pages"
      },
      {
        id: "flag4",
        element: "acount",
        explanation: "Typos like 'acount' instead of 'account' indicate a fake page"
      },
      {
        id: "flag5",
        element: "faceb00k",
        explanation: "Brand name with numbers replacing letters (0 instead of o) is a common phishing technique"
      }
    ],
    questions: [
      {
        id: 1,
        text: "What is the main red flag in this login page?",
        options: [
          { id: 'a', text: "The page has a Facebook logo" },
          { id: 'b', text: "The URL contains 'faceb00k' with '00' instead of 'oo'" },
          { id: 'c', text: "The login form asks for an email" },
          { id: 'd', text: "The blue header matches Facebook's brand color" }
        ],
        correctAnswer: 'b',
      },
      {
        id: 2,
        text: "Why do phishers create this sense of urgency?",
        options: [
          { id: 'a', text: "To help protect your account quickly" },
          { id: 'b', text: "To scare you into acting quickly without thinking critically" },
          { id: 'c', text: "Because your account is actually at risk" },
          { id: 'd', text: "To make the website seem more professional" }
        ],
        correctAnswer: 'b',
      },
      {
        id: 3,
        text: "What should you do if you encounter this page?",
        options: [
          { id: 'a', text: "Log in quickly to protect your account" },
          { id: 'b', text: "Check your account security from the official app" },
          { id: 'c', text: "Close the page and go directly to the real Facebook website by typing the URL" },
          { id: 'd', text: "Enter fake details to see what happens" }
        ],
        correctAnswer: 'c',
      }
    ],
    tips: [
      "Always check the URL for unusual characters or typos",
      "Be cautious of urgency traps like 'verify now' messages",
      "Look for spelling and grammar errors in the content",
      "Legitimate sites don't suddenly ask you to verify your account",
      "When in doubt, access the site directly by typing the URL in your browser"
    ]
  },
  {
    id: 2,
    title: "Fake Job Offer",
    description: "Identify suspicious job opportunities that are too good to be true",
    content: `
      <div class="max-w-md mx-auto border rounded-md overflow-hidden shadow-md">
        <div class="bg-white p-4 border-b">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <img src="https://via.placeholder.com/40x40?text=E" alt="Email" class="h-6 w-6" />
              <div>
                <div class="font-semibold">New Job Offer</div>
                <div class="text-xs text-gray-500">From: hr@job-portal-career.info</div>
              </div>
            </div>
            <div class="text-xs text-gray-500">Today, 11:23 AM</div>
          </div>
        </div>
        
        <div class="p-4 bg-white space-y-4">
          <div class="border-b pb-3">
            <div class="flex items-center gap-3">
              <div class="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img src="https://via.placeholder.com/100x100?text=HR" alt="HR Profile" class="h-full w-full object-cover" style="filter: blur(0.6px);" />
              </div>
              <div>
                <div class="font-semibold">Ms. Sophia Williams</div>
                <div class="text-xs text-gray-500">HR Manager | Global Remote Jobs Inc.</div>
              </div>
            </div>
          </div>
          
          <div class="space-y-3 text-sm">
            <p>Dear Candidate,</p>
            
            <p>Congratulations! Your profile has been selected for the position of <strong>Remote Digital Marketing Specialist</strong> with our prestigious client.</p>
            
            <div class="bg-gray-50 p-3 rounded-md border">
              <div class="font-semibold">Position Details:</div>
              <ul class="list-disc pl-5 space-y-1 mt-1">
                <li>Salary: $6,500 - $8,200 per month</li>
                <li>Hours: 3-4 hours daily, completely flexible</li>
                <li>Location: 100% remote work from home</li>
                <li>Experience Required: Minimal (Training provided)</li>
              </ul>
            </div>
            
            <p>To confirm your position, you must complete the onboarding process within 24 hours by paying a refundable registration fee of ₹500 (approximately $6 USD) to cover administrative costs.</p>
            
            <div class="bg-yellow-50 p-3 rounded-md border border-yellow-200">
              <div class="font-semibold text-yellow-800">Payment Details:</div>
              <p class="mt-1">Send payment to:</p>
              <p>UPI ID: quickjobsonboarding@ybl</p>
              <p>Name: Career Placement Services</p>
              <p class="mt-2 text-yellow-800 font-medium">*Fee will be refunded with your first salary payment</p>
            </div>
            
            <p>Please respond URGENTLY as positions are filling quickly. After payment confirmation, we will send your contract and login details.</p>
            
            <p>Best regards,<br/>Sophia Williams<br/>HR Manager<br/>Global Remote Jobs Inc.</p>
          </div>
          
          <div class="pt-3 border-t">
            <button class="bg-green-600 text-white px-4 py-2 rounded w-full font-medium">Reply Now</button>
          </div>
        </div>
      </div>
    `,
    redFlags: [
      {
        id: "flag1",
        element: "hr@job-portal-career.info",
        explanation: "Suspicious domain name that's generic and doesn't match a legitimate company"
      },
      {
        id: "flag2",
        element: "$6,500 - $8,200 per month",
        explanation: "Unrealistically high salary for minimal work is a classic scam tactic"
      },
      {
        id: "flag3",
        element: "paying a refundable registration fee of ₹500",
        explanation: "Legitimate employers never ask candidates to pay fees to get hired"
      },
      {
        id: "flag4",
        element: "Please respond URGENTLY as positions are filling quickly",
        explanation: "Creating artificial urgency to rush you into making a payment without thinking"
      },
      {
        id: "flag5",
        element: "Dear Candidate",
        explanation: "Generic greeting instead of using your name indicates a mass-sent scam"
      },
      {
        id: "flag6",
        element: "Global Remote Jobs Inc.",
        explanation: "Vague company name that's hard to verify"
      }
    ],
    questions: [
      {
        id: 1,
        text: "What is the biggest red flag in this job offer?",
        options: [
          { id: 'a', text: "The position is remote" },
          { id: 'b', text: "They ask for a registration fee" },
          { id: 'c', text: "The job only requires 3-4 hours daily" },
          { id: 'd', text: "The email came from an HR manager" }
        ],
        correctAnswer: 'b',
      },
      {
        id: 2,
        text: "Why is the salary a warning sign?",
        options: [
          { id: 'a', text: "The salary is normal for marketing work" },
          { id: 'b', text: "The salary is too low for a specialist position" },
          { id: 'c', text: "The salary is unrealistically high for minimal work hours" },
          { id: 'd', text: "Global companies always pay in this range" }
        ],
        correctAnswer: 'c',
      },
      {
        id: 3,
        text: "What should you do if you receive this kind of job offer?",
        options: [
          { id: 'a', text: "Pay the fee quickly to secure the position" },
          { id: 'b', text: "Negotiate a lower fee before paying" },
          { id: 'c', text: "Reply asking for more company details" },
          { id: 'd', text: "Ignore it - legitimate employers never charge fees to hire you" }
        ],
        correctAnswer: 'd',
      }
    ],
    tips: [
      "Real employers never ask for money upfront",
      "Look for verified company emails, not generic domains",
      "Be cautious of too-good-to-be-true offers with high pay for little work",
      "Research the company thoroughly before engaging with recruiters",
      "Verify job offers through official company websites or LinkedIn"
    ]
  }
];

// Update the scam scenarios array with the new improved scenarios
scamScenarios[0] = improvedScamScenarios[0]; // Update phishing scenario
scamScenarios[1] = improvedScamScenarios[1]; // Update fake job offer scenario

const ScamScenario = () => {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const { user, userProfile, refreshProfile } = useAuth();
  
  // State for the interactive experience
  const [currentScenario, setCurrentScenario] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'simulation' | 'quiz' | 'results'>('simulation');
  const [simulationStep, setSimulationStep] = useState(1);
  const [highlightedFlags, setHighlightedFlags] = useState<string[]>([]);
  
  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [existingCompletion, setExistingCompletion] = useState<CompletedScenario | null>(null);

  // Load scenario data
  useEffect(() => {
    const id = parseInt(scenarioId || '1');
    const scenario = scamScenarios.find(s => s.id === id);
    if (scenario) {
      setCurrentScenario(scenario);
    } else {
      navigate('/scam-slayer');
    }
  }, [scenarioId, navigate]);
  
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

  const toggleFlag = (flagId: string) => {
    setHighlightedFlags(prev => 
      prev.includes(flagId) 
        ? prev.filter(id => id !== flagId) 
        : [...prev, flagId]
    );
  };

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const goToNextQuestion = () => {
    if (!currentScenario) return;
    
    if (currentQuestion < currentScenario.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const startQuiz = () => {
    setViewMode('quiz');
  };

  const calculateFinalScore = () => {
    let correctCount = 0;
    
    if (!currentScenario) return 0;
    
    currentScenario.questions.forEach((question: any) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    return Math.round((correctCount / currentScenario.questions.length) * 100);
  };

  const handleSubmit = async () => {
    if (!currentScenario) return;
    
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
      setViewMode('results');
      
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
  
  // Loading state
  if (!currentScenario) {
    return (
      <div className="container px-4 mx-auto py-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin text-cybershield-purple">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </div>
          <p className="text-lg font-medium">Loading scenario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/scam-slayer')} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Scenarios
        </Button>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{currentScenario.title}</h1>
            <p className="text-muted-foreground">{currentScenario.description}</p>
          </div>
          
          {viewMode === 'simulation' && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium mr-2">Spot the red flags:</span>
              <Badge variant="outline" className={`${highlightedFlags.length >= 4 ? 'bg-green-100 text-green-800' : 'bg-secondary'}`}>
                {highlightedFlags.length} / {currentScenario.redFlags.length}
              </Badge>
            </div>
          )}
        </div>
      </div>
      
      {viewMode === 'simulation' && (
        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  Scam Simulation
                </CardTitle>
                <CardDescription>
                  Examine this {currentScenario.title.toLowerCase()} and spot the red flags
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  dangerouslySetInnerHTML={{ __html: currentScenario.content }}
                  className="relative scam-content"
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/scam-slayer')}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={startQuiz}
                  disabled={highlightedFlags.length === 0}
                >
                  Continue to Quiz
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <ShieldAlert className="h-5 w-5 mr-2 text-red-500" />
                  Red Flags
                </CardTitle>
                <CardDescription>
                  Click on items in the simulation to identify red flags
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentScenario.redFlags.map((flag: any) => (
                    <div 
                      key={flag.id}
                      onClick={() => toggleFlag(flag.id)}
                      className={`p-3 rounded-md border cursor-pointer transition-all ${
                        highlightedFlags.includes(flag.id) 
                          ? 'bg-red-50 border-red-200' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {highlightedFlags.includes(flag.id) ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : (
                          <div className="h-5 w-5 border border-gray-300 rounded-full mt-0.5"></div>
                        )}
                        <div>
                          <div className="font-medium">{flag.element}</div>
                          {highlightedFlags.includes(flag.id) && (
                            <div className="text-sm text-gray-600 mt-1">{flag.explanation}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-xl">
                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                  Safety Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentScenario.tips.slice(0, 3).map((tip: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 shrink-0" />
                      <p className="text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-full text-xs">
                        See more tips
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="w-80 p-3">
                      <div className="space-y-2">
                        {currentScenario.tips.slice(3).map((tip: string, index: number) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-1 shrink-0" />
                            <p className="text-sm">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
      
      {viewMode === 'quiz' && (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Question {currentQuestion + 1} of {currentScenario.questions.length}</span>
              <span className="text-sm font-medium">{Math.round(((currentQuestion + 1) / currentScenario.questions.length) * 100)}%</span>
            </div>
            <Progress value={((currentQuestion + 1) / currentScenario.questions.length) * 100} className="h-2" />
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{currentScenario.questions[currentQuestion].text}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedAnswers[currentScenario.questions[currentQuestion].id] || ""} 
                onValueChange={(value) => handleAnswerSelect(currentScenario.questions[currentQuestion].id, value)}
              >
                {currentScenario.questions[currentQuestion].options.map((option: any) => (
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
              
              {currentQuestion < currentScenario.questions.length - 1 ? (
                <Button 
                  onClick={goToNextQuestion}
                  disabled={!selectedAnswers[currentScenario.questions[currentQuestion].id]}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={!selectedAnswers[currentScenario.questions[currentQuestion].id] || loading}
                >
                  {loading ? "Submitting..." : "Submit Answers"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </>
      )}
      
      {viewMode === 'results' && (
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
                {currentScenario.questions.map((question: any) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">{question.text}</h3>
                    
                    {question.options.map((option: any) => (
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
                          <div className="h-5 w-5 mr-2" />
                        )}
                        <span className={option.id === question.correctAnswer ? "font-medium" : ""}>{option.text}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Takeaways</CardTitle>
                <CardDescription>Remember these tips to protect yourself from scams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {currentScenario.tips.map((tip: string, index: number) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/safezone">
                    Report a Real Scam
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
                <CardDescription>Continue your cybersecurity education</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" onClick={() => navigate('/scam-slayer')}>
                  Return to Scenarios
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                {parseInt(scenarioId || '1') < scamScenarios.length && (
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/scam-slayer/${parseInt(scenarioId || '1') + 1}`}>
                      Try Next Scenario
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScamScenario;

