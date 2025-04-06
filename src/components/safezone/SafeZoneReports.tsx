
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, FileSearch, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mock reports data
const reports = [
  {
    id: "CZXR-5823-FFTS",
    type: "Phishing Email",
    date: "2025-03-27",
    status: "verified",
    txHash: "0x7d8f3e6b2c1a9f0d4e2c3b1a8f7e6d5c4b3a2e1f"
  },
  {
    id: "PQRS-4912-VWXY",
    type: "Fake Job Offer",
    date: "2025-04-02",
    status: "reviewing",
    txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t"
  },
  {
    id: "ABCD-1234-EFGH",
    type: "Tech Support Scam",
    date: "2025-04-05",
    status: "submitted",
    txHash: "0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "submitted":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          <Clock className="mr-1 h-3 w-3" />
          Submitted
        </Badge>
      );
    case "reviewing":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
          <FileSearch className="mr-1 h-3 w-3" />
          Under Review
        </Badge>
      );
    case "verified":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          <CheckCircle className="mr-1 h-3 w-3" />
          Verified
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};

const SafeZoneReports = () => {
  return (
    <div>
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Your Reports</h2>
        
        {reports.length > 0 ? (
          <Table>
            <TableCaption>A list of your recent scam reports.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/safezone/report/${report.id}`}>
                        View <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              You haven't submitted any reports yet.
            </p>
            <Button asChild>
              <Link to="/safezone">Create a Report</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafeZoneReports;
