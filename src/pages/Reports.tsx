import { 
  FileText, 
  Download, 
  Calendar,
  Filter,
  Eye,
  Share,
  Clock
} from "lucide-react";
import { RiskBadge } from "@/components/dashboard/RiskBadge";

interface Report {
  id: string;
  title: string;
  type: "investigation" | "summary" | "str" | "audit";
  status: "draft" | "pending" | "submitted" | "approved";
  createdAt: string;
  updatedAt: string;
  accounts: string[];
  riskLevel: "high" | "medium" | "low";
  assignee: string;
}

const mockReports: Report[] = [
  {
    id: "RPT-001",
    title: "Smurfing Investigation - ACC-7821",
    type: "investigation",
    status: "pending",
    createdAt: "2024-01-15",
    updatedAt: "2 hours ago",
    accounts: ["ACC-7821", "ACC-3456", "ACC-9012"],
    riskLevel: "high",
    assignee: "Analyst 1",
  },
  {
    id: "RPT-002",
    title: "STR Filing - Multiple Accounts",
    type: "str",
    status: "draft",
    createdAt: "2024-01-14",
    updatedAt: "5 hours ago",
    accounts: ["ACC-7821"],
    riskLevel: "high",
    assignee: "Compliance Officer",
  },
  {
    id: "RPT-003",
    title: "Weekly Summary - Week 2",
    type: "summary",
    status: "approved",
    createdAt: "2024-01-13",
    updatedAt: "1 day ago",
    accounts: [],
    riskLevel: "medium",
    assignee: "System",
  },
  {
    id: "RPT-004",
    title: "Layering Pattern Analysis",
    type: "investigation",
    status: "submitted",
    createdAt: "2024-01-12",
    updatedAt: "2 days ago",
    accounts: ["ACC-3456", "ACC-5678"],
    riskLevel: "medium",
    assignee: "Analyst 2",
  },
];

const typeLabels = {
  investigation: { label: "Investigation", color: "bg-primary/10 text-primary" },
  summary: { label: "Summary", color: "bg-muted text-muted-foreground" },
  str: { label: "STR", color: "bg-risk-high/10 text-risk-high" },
  audit: { label: "Audit", color: "bg-risk-medium/10 text-risk-medium" },
};

const statusLabels = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground border-border" },
  pending: { label: "Pending Review", color: "bg-risk-medium/10 text-risk-medium border-risk-medium/20" },
  submitted: { label: "Submitted", color: "bg-primary/10 text-primary border-primary/20" },
  approved: { label: "Approved", color: "bg-success/10 text-success border-success/20" },
};

export default function Reports() {
  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            Investigation Reports
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Case documentation and regulatory filings
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <FileText className="w-4 h-4" />
          New Report
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select className="px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none">
            <option>All Types</option>
            <option>Investigation</option>
            <option>STR</option>
            <option>Summary</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <select className="px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <span className="ml-auto text-sm text-muted-foreground">
          {mockReports.length} reports
        </span>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockReports.map((report, index) => (
          <div
            key={report.id}
            className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-colors cursor-pointer fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{report.id}</span>
                <span className={`px-2 py-0.5 text-xs font-medium rounded ${typeLabels[report.type].color}`}>
                  {typeLabels[report.type].label}
                </span>
              </div>
              <RiskBadge level={report.riskLevel} size="sm" />
            </div>

            <h3 className="text-base font-medium text-foreground mb-2">
              {report.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {report.accounts.map(acc => (
                <span key={acc} className="font-mono text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded">
                  {acc}
                </span>
              ))}
              {report.accounts.length === 0 && (
                <span className="text-xs text-muted-foreground">All accounts</span>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className={`px-2 py-0.5 font-medium rounded border ${statusLabels[report.status].color}`}>
                  {statusLabels[report.status].label}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {report.updatedAt}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                  <Share className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
