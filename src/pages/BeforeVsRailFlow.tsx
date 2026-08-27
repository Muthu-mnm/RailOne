import React from 'react';
import {
  Award,
  TrendingUp,
  Clock,
  Train,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  GitMerge,
  History,
  FileText,
} from 'lucide-react';
import { useRailFlowStore } from '../store/railflowStore';

export const BeforeVsRailFlow: React.FC = () => {
  const { decisionHistory, setActiveView, startOptimization } = useRailFlowStore();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Before vs RailFlow — Coordinated Planning Impact
            </h1>

          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Demonstrating tangible operational gains: Less disruption, 100% express protection, identical maintenance completed.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveView('planner');
            startOptimization();
          }}
          className="px-4 py-2 rounded-lg bg-railway-blue hover:bg-railway-dark text-white text-xs font-bold shadow flex items-center space-x-1.5 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-railway-teal" />
          <span>Test Live Scenario in Planner</span>
        </button>
      </div>

      {/* Hero Comparative Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Metric 1: Track Closures */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-card p-4 space-y-2 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Corridor Closures
          </span>
          <div className="flex items-center justify-center space-x-2 text-xl font-extrabold">
            <span className="text-rose-600 line-through">3 Closures</span>
            <span className="text-slate-400 text-sm">→</span>
            <span className="text-teal-600 font-extrabold">1 Block</span>
          </div>
          <span className="inline-block text-[10px] font-extrabold text-teal-800 bg-teal-100 px-2 py-0.5 rounded border border-teal-300">
            66.7% Closure Reduction
          </span>
        </div>

        {/* Metric 2: Cumulative Train Delay */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-card p-4 space-y-2 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Cumulative Train Delay
          </span>
          <div className="flex items-center justify-center space-x-2 text-xl font-extrabold">
            <span className="text-rose-600 line-through">64 min</span>
            <span className="text-slate-400 text-sm">→</span>
            <span className="text-teal-600 font-extrabold">18 min</span>
          </div>
          <span className="inline-block text-[10px] font-extrabold text-teal-800 bg-teal-100 px-2 py-0.5 rounded border border-teal-300">
            -46 min Delay Saved (71.9%)
          </span>
        </div>

        {/* Metric 3: Priority Express Conflicts */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-card p-4 space-y-2 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Priority Express Conflicts
          </span>
          <div className="flex items-center justify-center space-x-2 text-xl font-extrabold">
            <span className="text-rose-600 line-through">2 Conflicts</span>
            <span className="text-slate-400 text-sm">→</span>
            <span className="text-teal-600 font-extrabold">0 Conflicts</span>
          </div>
          <span className="inline-block text-[10px] font-extrabold text-teal-800 bg-teal-100 px-2 py-0.5 rounded border border-teal-300">
            100% Express Protection
          </span>
        </div>

        {/* Metric 4: Asset Availability */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-card p-4 space-y-2 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Corridor Asset Availability
          </span>
          <div className="flex items-center justify-center space-x-2 text-xl font-extrabold">
            <span className="text-slate-500 line-through">85.8%</span>
            <span className="text-slate-400 text-sm">→</span>
            <span className="text-emerald-600 font-extrabold">94.2%</span>
          </div>
          <span className="inline-block text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
            +8.4% Net Uptime Gain
          </span>
        </div>
      </div>

      {/* Side-by-Side Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Traditional Siloed Maintenance */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-rose-900 uppercase tracking-wider">
              Traditional Departmental Silos
            </span>
            <span className="text-[10px] bg-rose-100 text-rose-800 font-semibold px-2 py-0.5 rounded">
              High Operational Drag
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block">Fragmented Track Possessions:</span>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Each department (Civil, S&T, TRD) books independent line possessions on different days or hours, multiplying speed restrictions and passenger disruptions.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block">Cascading Ripple Delays:</span>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Uncoordinated blocks intercept peak express corridors (like 12801 Purushottam Superfast), resulting in 64 min of cumulative system delay.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block">Redundant Traction Power Isolations:</span>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Requires 3 separate de-energization notices to the grid, slowing locomotive dispatch and recovery.
              </p>
            </div>
          </div>
        </div>

        {/* RailFlow AI-Assisted Coordinated Platform */}
        <div className="bg-white rounded-xl border-2 border-teal-500 shadow-elevated p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-teal-100 pb-2">
            <span className="text-xs font-extrabold text-teal-950 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>RailFlow Coordinated Decision Support</span>
            </span>
            <span className="text-[10px] font-bold bg-teal-600 text-white px-2 py-0.5 rounded shadow">
              Optimized Solution
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700 font-medium">
            <div className="p-3 bg-teal-50/60 rounded-lg border border-teal-200">
              <span className="font-bold text-teal-950 block">Single Multi-Department Window:</span>
              <p className="text-[11px] text-teal-900 mt-0.5">
                Executes Track Tamping (CSM-09), Point Overhaul (Point 104A), and 25kV Catenary Alignment concurrently within a single 2.5-hour possession.
              </p>
            </div>

            <div className="p-3 bg-teal-50/60 rounded-lg border border-teal-200">
              <span className="font-bold text-teal-950 block">Zero Priority Train Collisions:</span>
              <p className="text-[11px] text-teal-900 mt-0.5">
                CP-SAT constraint solver slots the block during the natural midday low-density gap (Option B: 11:30–14:00), ensuring green aspect clearance for all expresses.
              </p>
            </div>

            <div className="p-3 bg-teal-50/60 rounded-lg border border-teal-200">
              <span className="font-bold text-teal-950 block">Human Authority in Complete Control:</span>
              <p className="text-[11px] text-teal-900 mt-0.5">
                RailFlow produces explainable advisory suggestions. Section & Chief Controllers retain 100% final authorization and modification authority.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Audit Log Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-railway-blue" />
            <span className="font-extrabold text-sm text-slate-900">
              Controller Advisory Decision Audit History
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Immutable Decision Record</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Section</th>
                <th className="py-2.5 px-3">Consolidated Tasks</th>
                <th className="py-2.5 px-3">Approved Window</th>
                <th className="py-2.5 px-3">Est. Delay</th>
                <th className="py-2.5 px-3">Controller</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {decisionHistory.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">{d.timestamp}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{d.section}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-teal-800 bg-teal-100 px-1.5 py-0.5 rounded text-[10px]">
                      {d.coordinatedCount || 3} Tasks Consolidated
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-railway-blue">{d.chosenWindow}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-800">{d.estimatedDelay} min</td>
                  <td className="py-2.5 px-3 text-slate-600">{d.controllerName}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded">
                      ✓ {d.status} (Advisory)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
