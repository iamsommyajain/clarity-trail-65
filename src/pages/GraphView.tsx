import { useState } from "react";
import { 
  Network, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Filter,
  Search,
  Layers
} from "lucide-react";
import { TransactionGraph } from "@/components/dashboard/TransactionGraph";
import { RiskBadge } from "@/components/dashboard/RiskBadge";

export default function GraphView() {
  const [selectedNode, setSelectedNode] = useState<string | null>("ACC-7821");

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <Network className="w-6 h-6 text-primary" />
            Transaction Graph Explorer
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Interactive visualization of money flow relationships
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Graph Area */}
        <div className="xl:col-span-3 space-y-4">
          {/* Controls */}
          <div className="flex items-center justify-between bg-card border border-border rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search account..."
                  className="pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg text-sm transition-colors">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg text-sm transition-colors">
                <Layers className="w-4 h-4" />
                Layers
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg transition-colors">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button className="p-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg transition-colors">
                <ZoomOut className="w-4 h-4" />
              </button>
              <button className="p-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg transition-colors">
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Graph */}
          <div className="graph-container h-[600px] relative">
            <TransactionGraph />
          </div>
        </div>

        {/* Details Panel */}
        <div className="space-y-4">
          {/* Selected Node Details */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Node Details</h3>
            </div>
            
            {selectedNode ? (
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg font-bold text-foreground">
                    {selectedNode}
                  </span>
                  <RiskBadge level="high" score={0.92} size="sm" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">In-Degree</span>
                    <span className="font-mono text-foreground">3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Out-Degree</span>
                    <span className="font-mono text-foreground">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Flow Out</span>
                    <span className="font-mono text-primary">₹2,45,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Flow In</span>
                    <span className="font-mono text-foreground">₹12,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Centrality Score</span>
                    <span className="font-mono text-risk-high">0.87</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase mb-2">
                    Detected Patterns
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-risk-high/10 text-risk-high rounded border border-risk-high/20">
                      Smurfing
                    </span>
                    <span className="px-2 py-1 text-xs bg-risk-medium/10 text-risk-medium rounded border border-risk-medium/20">
                      Rapid Transfer
                    </span>
                  </div>
                </div>

                <button className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium rounded-lg transition-colors">
                  View Full Profile
                </button>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Network className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Select a node to view details
                </p>
              </div>
            )}
          </div>

          {/* Graph Statistics */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Graph Statistics</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Nodes</span>
                <span className="font-mono text-foreground">284</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Edges</span>
                <span className="font-mono text-foreground">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Connected Components</span>
                <span className="font-mono text-foreground">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cycles Detected</span>
                <span className="font-mono text-risk-high">7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
