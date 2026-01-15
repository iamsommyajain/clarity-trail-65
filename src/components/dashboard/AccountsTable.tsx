import { RiskBadge } from "./RiskBadge";
import { ArrowUpRight, ArrowDownLeft, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Account {
  id: string;
  riskScore: number;
  riskLevel: "high" | "medium" | "low";
  totalSent: number;
  totalReceived: number;
  transactionCount: number;
  patterns: string[];
  lastActivity: string;
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
    lastActivity: "2 min ago",
  },
  {
    id: "ACC-3456",
    riskScore: 0.87,
    riskLevel: "high",
    totalSent: 189000,
    totalReceived: 5200,
    transactionCount: 38,
    patterns: ["Layering"],
    lastActivity: "5 min ago",
  },
  {
    id: "ACC-9012",
    riskScore: 0.65,
    riskLevel: "medium",
    totalSent: 75000,
    totalReceived: 68000,
    transactionCount: 22,
    patterns: ["Burst Activity"],
    lastActivity: "12 min ago",
  },
  {
    id: "ACC-5678",
    riskScore: 0.58,
    riskLevel: "medium",
    totalSent: 52000,
    totalReceived: 48000,
    transactionCount: 18,
    patterns: ["Correlation"],
    lastActivity: "28 min ago",
  },
  {
    id: "ACC-2345",
    riskScore: 0.22,
    riskLevel: "low",
    totalSent: 15000,
    totalReceived: 14500,
    transactionCount: 8,
    patterns: [],
    lastActivity: "1 hour ago",
  },
];

export function AccountsTable() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Risk-Ranked Accounts</h3>
        <span className="text-xs text-muted-foreground font-mono">Top 5 of 127</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Account
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Risk Score
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Flow
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Patterns
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Last Activity
              </th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {mockAccounts.map((account) => (
              <tr
                key={account.id}
                className="data-table-row border-b border-border last:border-0 cursor-pointer"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium text-foreground">
                      {account.id}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({account.transactionCount} txns)
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <RiskBadge level={account.riskLevel} score={account.riskScore} size="sm" />
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-0.5">
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
                <td className="px-4 py-3">
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
                <td className="px-4 py-3">
                  <span className="text-xs text-muted-foreground">{account.lastActivity}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="p-1 rounded hover:bg-muted transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
