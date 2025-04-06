
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronRight, FileUp, Shield } from "lucide-react";
import { toast } from "sonner";

const SafeZoneReportForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    scamType: "",
    description: "",
    infoShared: "",
    contactMethod: "",
    fileUpload: null as File | null
  });
  
  const handleNextStep = () => {
    setStep(step + 1);
  };
  
  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, fileUpload: e.target.files[0] });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      toast.success("Report submitted successfully!");
    }, 2000);
  };
  
  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.scamType !== "" && formData.description.length >= 20;
      case 2:
        return formData.infoShared !== "" && formData.contactMethod !== "";
      default:
        return true;
    }
  };
  
  if (isCompleted) {
    return (
      <div className="bg-white rounded-lg p-8 text-center border shadow-sm">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Report Submitted!</h2>
        <p className="text-muted-foreground mb-6">
          Your report has been encrypted and securely submitted to our system.
        </p>
        
        <div className="mb-6 p-4 bg-gray-50 border rounded-md text-left">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Transaction Hash</p>
            <p className="font-mono text-xs bg-white p-2 rounded border mt-1">0x7d8f3e6b2c1a9f0d4e2c3b1a8f7e6d5c4b3a2e1f</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Report ID</p>
            <p className="font-medium mt-1">CZXR-5823-FFTS</p>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="font-medium mb-3">Status</p>
          <div className="relative">
            <div className="flex justify-between mb-2">
              <div className="text-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <p className="text-xs">Submitted</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-xs font-medium">2</span>
                </div>
                <p className="text-xs">Review</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-xs font-medium">3</span>
                </div>
                <p className="text-xs">Verified</p>
              </div>
            </div>
            <div className="h-1 bg-gray-200 absolute top-4 left-4 right-4 -z-10">
              <div className="h-1 bg-green-600 w-1/6"></div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button onClick={() => { setIsCompleted(false); setStep(1); }}>
            Submit Another Report
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg p-6 border shadow-sm">
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Step {step} of 3</span>
          <span>{Math.round((step / 3) * 100)}% Complete</span>
        </div>
        <Progress value={(step / 3) * 100} className="h-2" />
      </div>
      
      <form onSubmit={step === 3 ? handleSubmit : undefined}>
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Tell us about the scam</h2>
              <p className="text-muted-foreground mb-6">
                Provide details about the scam you encountered to help others avoid it.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="scamType">Scam Type</Label>
                <Select 
                  value={formData.scamType} 
                  onValueChange={(value) => handleSelectChange("scamType", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select type of scam" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phishing">Phishing Email/Message</SelectItem>
                    <SelectItem value="job">Fake Job Offer</SelectItem>
                    <SelectItem value="financial">Financial Scam</SelectItem>
                    <SelectItem value="shopping">Shopping Scam</SelectItem>
                    <SelectItem value="social">Social Media Scam</SelectItem>
                    <SelectItem value="romance">Romance Scam</SelectItem>
                    <SelectItem value="tech">Tech Support Scam</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">What happened?</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the scam in detail. What did they say or ask for?"
                  className="mt-1 resize-none"
                  rows={5}
                  value={formData.description}
                  onChange={handleTextChange}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum 20 characters 
                  ({formData.description.length < 20 ? `${20 - formData.description.length} more needed` : "✓"})
                </p>
              </div>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Information shared</h2>
              <p className="text-muted-foreground mb-6">
                Tell us what information was requested or shared during the scam.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="infoShared">What information was requested or shared?</Label>
                <Select 
                  value={formData.infoShared} 
                  onValueChange={(value) => handleSelectChange("infoShared", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select what was shared or requested" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="login">Login credentials</SelectItem>
                    <SelectItem value="financial">Financial information</SelectItem>
                    <SelectItem value="personal">Personal information</SelectItem>
                    <SelectItem value="payment">Payment or money transfer</SelectItem>
                    <SelectItem value="none">No information was shared</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="contactMethod">How were you contacted?</Label>
                <Select 
                  value={formData.contactMethod} 
                  onValueChange={(value) => handleSelectChange("contactMethod", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select contact method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS/Text message</SelectItem>
                    <SelectItem value="phone">Phone call</SelectItem>
                    <SelectItem value="social">Social media</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="app">Mobile app</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Additional evidence</h2>
              <p className="text-muted-foreground mb-6">
                Optionally add screenshots or other evidence of the scam.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="fileUpload">Upload evidence (optional)</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Input
                    id="fileUpload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                  />
                  <Label htmlFor="fileUpload" className="cursor-pointer">
                    <FileUp className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, PDF (up to 10MB)
                    </p>
                  </Label>
                </div>
                {formData.fileUpload && (
                  <p className="text-sm mt-2">
                    File selected: {formData.fileUpload.name}
                  </p>
                )}
              </div>
              
              <div className="pt-4 bg-cybershield-blue/10 p-4 rounded-md">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-cybershield-blue-bright mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Privacy Notice</h4>
                    <p className="text-sm text-muted-foreground">
                      Your report will be anonymized before being added to our database. Any personal information will be automatically removed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={handlePreviousStep}>
              Back
            </Button>
          ) : (
            <div></div> // Empty div to maintain flex layout
          )}
          
          {step < 3 ? (
            <Button 
              type="button" 
              onClick={handleNextStep}
              disabled={!isStepValid()}
            >
              Continue 
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SafeZoneReportForm;
