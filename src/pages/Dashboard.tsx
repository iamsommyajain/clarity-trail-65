import { 
  Activity, 
  AlertTriangle, 
  Users, 
  TrendingUp,
  Network,
  Clock
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TransactionGraph } from "@/components/dashboard/TransactionGraph";
import { AccountsTable } from "@/components/dashboard/AccountsTable";
import { AlertsList } from "@/components/dashboard/AlertsList";
import { TimelinePanel } from "@/components/dashboard/TimelinePanel";
import { ExplainabilityPanel } from "@/components/dashboard/ExplainabilityPanel";
import { AgentStatusPanel } from "@/components/dashboard/AgentStatusPanel";

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Fraud Investigation Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time micro-transaction analysis and pattern detection
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-xs text-muted-foreground">Live Monitoring</span>
          </div>
          <div className="px-3 py-1.5 bg-card border border-border rounded-lg">
            <span className="text-xs font-mono text-muted-foreground">
              Last sync: <span className="text-foreground">12s ago</span>
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Transactions"
          value="10,247"
          subtitle="Today"
          icon={<Activity className="w-5 h-5 text-primary" />}
          trend="up"
          trendValue="+12.5%"
        />
        <MetricCard
          title="High Risk Accounts"
          value="23"
          subtitle="Requires investigation"
          icon={<AlertTriangle className="w-5 h-5 text-risk-high" />}
          variant="risk-high"
          trend="up"
          trendValue="+3"
        />
        <MetricCard
          title="Active Patterns"
          value="7"
          subtitle="Smurfing, Layering, Cycles"
          icon={<Network className="w-5 h-5 text-risk-medium" />}
          variant="risk-medium"
        />
        <MetricCard
          title="Graph Nodes"
          value="284"
          subtitle="Accounts in network"
          icon={<Users className="w-5 h-5 text-muted-foreground" />}
          trend="neutral"
          trendValue="+8"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Graph and Table */}
        <div className="xl:col-span-2 space-y-6">
          {/* Transaction Graph */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Network className="w-5 h-5 text-primary" />
                Transaction Graph
              </h2>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg transition-colors">
                  Zoom to Fit
                </button>
                <button className="px-3 py-1.5 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors">
                  Expand View
                </button>
              </div>
            </div>
            <TransactionGraph />
          </div>

          {/* Accounts Table */}
          <AccountsTable />

          {/* Agent Status */}
          <AgentStatusPanel />
        </div>

        {/* Right Column - Alerts and Timeline */}
        <div className="space-y-6">
          <AlertsList />
          <TimelinePanel />
          <ExplainabilityPanel />
        </div>
      </div>
    </div>
  );
}
