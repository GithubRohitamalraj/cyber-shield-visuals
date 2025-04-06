
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Upload, FileCheck, AlertCircle } from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import SafeZoneReportForm from "@/components/safezone/SafeZoneReportForm";
import SafeZoneReports from "@/components/safezone/SafeZoneReports";

const SafeZone = () => {
  const [activeTab, setActiveTab] = useState("report");
  
  return (
    <div className="container px-4 mx-auto py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-cybershield-blue-bright/20 p-2 rounded-full">
            <Shield className="h-6 w-6 text-cybershield-blue-bright" />
          </div>
          <h1 className="text-3xl font-bold">SafeZone</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Anonymously report scams and help others stay safe. All reports are encrypted and blockchain-verified.
        </p>
        
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle>Why Report Scams?</CardTitle>
            <CardDescription>
              Your anonymous reports help identify new scams and protect the community.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 rounded-lg bg-cybershield-blue/20 text-center">
                <AlertCircle className="h-8 w-8 mb-2 text-cybershield-blue-bright" />
                <h3 className="font-medium mb-1">Protect Others</h3>
                <p className="text-sm text-muted-foreground">
                  Help the community avoid falling victim to the same scam
                </p>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-green-50 text-center">
                <FileCheck className="h-8 w-8 mb-2 text-green-600" />
                <h3 className="font-medium mb-1">Anonymous</h3>
                <p className="text-sm text-muted-foreground">
                  All reports are anonymous and your identity is protected
                </p>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-cybershield-purple-light text-center">
                <Upload className="h-8 w-8 mb-2 text-cybershield-purple" />
                <h3 className="font-medium mb-1">Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Follow your report through our verification process
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="report">File a Report</TabsTrigger>
            <TabsTrigger value="my-reports">My Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="report" className="mt-0">
            <SafeZoneReportForm />
          </TabsContent>
          
          <TabsContent value="my-reports" className="mt-0">
            <SafeZoneReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SafeZone;
