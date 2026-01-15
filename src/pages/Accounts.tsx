import { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Download,
  ArrowUpDown,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  Eye
} from "lucide-react";
import { RiskBadge } from "@/components/dashboard/RiskBadge";

interface Account {
  id: string;
  riskScore: number;
  riskLevel: "high" | "medium" | "low";
  totalSent: number;
  totalReceived: number;
  transactionCount: number;
  patterns: string[];
  connections: number;
  lastActivity: string;
  status: "flagged" | "investigating" | "cleared" | "monitoring";
}

const mockAccounts: Account[] = [
  {
    id: "ACC-7821",
    riskScore: 0.92,
    riskLevel: "high",
    totalSent: 245000,
    totalReceived: 12500,
    transactionCount: 47,
    patterns: ["Smurfing", "Rapid Transfer"],
    connections: 12,
    lastActivity: "2 min ago",
    status: "flagged",
  },
  {
    id: "ACC-3456",
    riskScore: 0.87,
    riskLevel: "high",
    totalSent: 189000,
    totalReceived: 5200,
    transactionCount: 38,
    patterns: ["Layering"],
    connections: 8,
    lastActivity: "5 min ago",
    status: "investigating",
  },
  {
    id: "ACC-9012",
    riskScore: 0.65,
    riskLevel: "medium",
    totalSent: 75000,
    totalReceived: 68000,
    transactionCount: 22,
    patterns: ["Burst Activity"],
    connections: 5,
    lastActivity: "12 min ago",
    status: "monitoring",
  },
  {
    id: "ACC-5678",
    riskScore: 0.58,
    riskLevel: "medium",
    totalSent: 52000,
    totalReceived: 48000,
    transactionCount: 18,
    patterns: ["Correlation"],
    connections: 6,
    lastActivity: "28 min ago",
    status: "monitoring",
  },
  {
    id: "ACC-2345",
    riskScore: 0.22,
    riskLevel: "low",
    totalSent: 15000,
    totalReceived: 14500,
    transactionCount: 8,
    patterns: [],
    connections: 3,
    lastActivity: "1 hour ago",
    status: "cleared",
  },
  {
    id: "ACC-8901",
    riskScore: 0.18,
    riskLevel: "low",
    totalSent: 8500,
    totalReceived: 9200,
    transactionCount: 5,
    patterns: [],
    connections: 2,
    lastActivity: "2 hours ago",
    status: "cleared",
  },
];

const statusColors = {
  flagged: "bg-risk-high/10 text-risk-high border-risk-high/20",
  investigating: "bg-risk-medium/10 text-risk-medium border-risk-medium/20",
  monitoring: "bg-primary/10 text-primary border-primary/20",
  cleared: "bg-success/10 text-success border-success/20",
};

export default function Accounts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRisk, setFilterRisk] = useState<string>("all");

  const filteredAccounts = mockAccounts.filter(account => {
    const matchesSearch = account.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = filterRisk === "all" || account.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <Users className="w-6 h-6 text-primary" />
            Account Analysis
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Risk-ranked accounts with pattern detection results
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-card border border-border rounded-lg p-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by account ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All Risk Levels</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>
        </div>

        <span className="text-sm text-muted-foreground">
          {filteredAccounts.length} accounts
        </span>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <button className="flex items-center gap-1 hover:text-foreground">
                    Account ID
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <button className="flex items-center gap-1 hover:text-foreground">
                    Risk Score
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Money Flow
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Transactions
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Connections
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Patterns
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="w-20"></th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account, index) => (
                <tr
                  key={account.id}
                  className="data-table-row border-b border-border last:border-0 fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-4 py-4">
                    <span className="font-mono text-sm font-medium text-foreground">
                      {account.id}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <RiskBadge level={account.riskLevel} score={account.riskScore} size="sm" />
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded border capitalize ${statusColors[account.status]}`}>
                      {account.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs">
                        <ArrowUpRight className="w-3 h-3 text-risk-high" />
                        <span className="font-mono text-foreground">
                          ₹{account.totalSent.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <ArrowDownLeft className="w-3 h-3 text-success" />
                        <span className="font-mono text-muted-foreground">
                          ₹{account.totalReceived.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-sm text-foreground">
                      {account.transactionCount}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-sm text-foreground">
                      {account.connections}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {account.patterns.length > 0 ? (
                        account.patterns.map((pattern) => (
                          <span
                            key={pattern}
                            className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded border border-primary/20"
                          >
                            {pattern}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs text-muted-foreground">
                      {account.lastActivity}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded hover:bg-muted transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-muted transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
