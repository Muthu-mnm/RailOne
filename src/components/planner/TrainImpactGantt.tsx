import React, { useState } from 'react';
import {
  Train as TrainIcon,
  AlertTriangle,
  Clock,
  Info,
  ShieldAlert,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { useRailFlowStore } from '../../store/railflowStore';
import { CandidateWindow, Train } from '../../types';
import { TrainDetailDrawer } from '../shared/TrainDetailDrawer';

interface TrainImpactGanttProps {
  selectedCandidate: CandidateWindow;
}

export const TrainImpactGantt: React.FC<TrainImpactGanttProps> = ({
  selectedCandidate,
}) => {
  const { trains, selectedSectionId, sections } = useRailFlowStore();
  const [hoveredTrain, setHoveredTrain] = useState<string | null>(null);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);

  const activeSection = sections.find((s) => s.id === selectedSectionId) || sections[3];
  const vaigaiTrain = trains.find((t) => t.number === '12635') || trains[0];

  // Time slots from 08:00 to 19:00 (11 hours total = 660 minutes)
  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  const timeToPercent = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    const totalMinutesFrom8 = (h - 8) * 60 + m;
    const totalSpanMinutes = 11 * 60; // 660 minutes
    return Math.max(0, Math.min(100, (totalMinutesFrom8 / totalSpanMinutes) * 100));
  };

  const blockStartPercent = timeToPercent(selectedCandidate.startTime);
  const blockEndPercent = timeToPercent(selectedCandidate.endTime);
  const blockWidthPercent = blockEndPercent - blockStartPercent;

  const isVaigaiConflict = selectedCandidate.id === 'OPTION_C';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-sm text-slate-900">
              Train Trajectory & Block Conflict Matrix
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-railway-lightBlue text-railway-blue border border-railway-blue/20">
              Marey String Model
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Active Section: <span className="font-bold text-slate-800">{activeSection.name}</span> (KM 159.0 – 213.0) • Southern Railway Mainline
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-600">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-1.5 bg-[#123B5D] rounded-sm" />
            <span className="font-bold text-slate-900">12635 Vaigai SF Exp</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-1.5 bg-rose-600 rounded-sm" />
            <span>Pallavan SF (12606)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-1.5 bg-slate-700 rounded-sm" />
            <span>Passenger (56706)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 bg-teal-500/20 border border-teal-600 rounded-sm" />
            <span>Maintenance Possession Window</span>
          </div>
        </div>
      </div>

      {/* Gantt & String Chart Visualizer */}
      <div className="relative border border-slate-200 rounded-xl bg-slate-50/50 p-4 overflow-x-auto">
        {/* Time axis header */}
        <div className="relative w-full h-8 border-b border-slate-200 flex justify-between text-xs font-mono font-bold text-slate-600 px-1 select-none">
          {hours.map((h, i) => (
            <div key={i} className="text-center">
              {h}
            </div>
          ))}
        </div>

        {/* Chart Rows Container with comfortable natural height */}
        <div className="relative w-full min-h-[300px] mt-3 pb-3">
          {/* Vertical grid lines */}
          <div className="absolute inset-0 flex justify-between pointer-events-none">
            {hours.map((_, i) => (
              <div key={i} className="h-full border-r border-slate-200/80" />
            ))}
          </div>

          {/* Active Maintenance Block Window Shading */}
          <div
            className="absolute top-0 bottom-0 bg-teal-500/15 border-2 border-dashed border-teal-600 rounded-lg transition-all duration-300 pointer-events-none z-0"
            style={{
              left: `${blockStartPercent}%`,
              width: `${blockWidthPercent}%`,
            }}
          >
            {/* Top Badge for Block Window (Placed at the very top of shaded area so it never overlaps train tracks) */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0C2340] text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shadow-md border border-[#0FAF9A] whitespace-nowrap">
              ⚡ {selectedCandidate.name.split(':')[0]} ({selectedCandidate.startTime}–{selectedCandidate.endTime})
            </div>
          </div>

          {/* Train Trajectory Rows with generous vertical separation */}
          <div className="space-y-6 pt-5 relative z-10">
            {/* 1. 🚆 12635 VAIGAI SF EXP (HERO SPOTLIGHT TRAIN) */}
            <div
              className="relative flex flex-col space-y-1 group cursor-pointer"
              onMouseEnter={() => setHoveredTrain('12635')}
              onMouseLeave={() => setHoveredTrain(null)}
              onClick={() => setSelectedTrain(vaigaiTrain)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0FAF9A] animate-pulse" />
                  <span className="text-xs font-extrabold text-[#123B5D]">
                    🚆 12635 Vaigai Superfast Express
                  </span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-mono px-1.5 rounded font-bold">
                    Chennai 13:15 → Madurai 20:35
                  </span>
                </div>

                {isVaigaiConflict ? (
                  <span className="text-[10px] bg-rose-600 text-white font-extrabold px-2 py-0.5 rounded shadow animate-pulse">
                    ❌ DIRECT VAIGAI CONFLICT (+15m)
                  </span>
                ) : (
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold px-2 py-0.5 rounded">
                    ✓ 100% Protected (Line Clear at 15:30)
                  </span>
                )}
              </div>

              <div className="relative w-full h-4 bg-slate-200/80 rounded-full">
                <div
                  className="absolute h-4 top-0 rounded-full bg-gradient-to-r from-[#123B5D] to-[#2C5F7C] border border-white shadow-md flex items-center justify-between px-2 text-white"
                  style={{
                    left: `${timeToPercent('13:15')}%`,
                    width: `${Math.max(12, timeToPercent('16:16') - timeToPercent('13:15'))}%`,
                  }}
                >
                  <span className="text-[9px] font-bold font-mono">MS 13:15</span>
                  <TrainIcon className="w-3 h-3 text-white" />
                  <span className="text-[9px] font-bold font-mono">VRI 16:14</span>
                </div>
              </div>
            </div>

            {/* 2. 12606 Pallavan Superfast Express */}
            <div
              className="relative flex flex-col space-y-1 group cursor-pointer"
              onMouseEnter={() => setHoveredTrain('12606')}
              onMouseLeave={() => setHoveredTrain(null)}
              onClick={() => setSelectedTrain(trains[2])}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  <span className="text-xs font-bold text-rose-700">
                    12606 Pallavan Superfast Express (Up)
                  </span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-mono px-1.5 rounded">
                    Karaikkudi → Chennai Egmore (VM 09:25)
                  </span>
                </div>

                {selectedCandidate.id === 'OPTION_A' ? (
                  <span className="text-[10px] bg-rose-600 text-white font-extrabold px-2 py-0.5 rounded shadow">
                    ❌ Pallavan Conflict (+28m)
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 font-semibold">
                    ✓ Clear of Midday Window
                  </span>
                )}
              </div>

              <div className="relative w-full h-3.5 bg-slate-200/80 rounded-full">
                <div
                  className="absolute h-3.5 top-0 rounded-full bg-rose-600 shadow-sm flex items-center justify-between px-1.5 text-white"
                  style={{
                    left: `${timeToPercent('08:20')}%`,
                    width: `${Math.max(10, timeToPercent('09:25') - timeToPercent('08:20'))}%`,
                  }}
                >
                  <span className="text-[8px] font-bold">08:20</span>
                  <TrainIcon className="w-2.5 h-2.5 text-white" />
                  <span className="text-[8px] font-bold">09:25</span>
                </div>
              </div>
            </div>

            {/* 3. 56706 Villupuram-Madurai Passenger */}
            <div
              className="relative flex flex-col space-y-1 group cursor-pointer"
              onMouseEnter={() => setHoveredTrain('56706')}
              onMouseLeave={() => setHoveredTrain(null)}
              onClick={() => setSelectedTrain(trains[4])}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                  <span className="text-xs font-bold text-slate-800">
                    56706 Villupuram–Madurai Passenger
                  </span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-mono px-1.5 rounded">
                    VM Dep 11:45 IST
                  </span>
                </div>

                {selectedCandidate.id === 'OPTION_B' && (
                  <span className="text-[10px] bg-teal-100 text-teal-900 border border-teal-300 font-bold px-2 py-0.5 rounded">
                    ⏱️ Regulated +6m (Controlled Spacing)
                  </span>
                )}
              </div>

              <div className="relative w-full h-3.5 bg-slate-200/80 rounded-full">
                <div
                  className="absolute h-3.5 top-0 rounded-full bg-slate-700 shadow-sm flex items-center justify-between px-1.5 text-white"
                  style={{
                    left: `${timeToPercent('11:45')}%`,
                    width: `${Math.max(10, timeToPercent('12:40') - timeToPercent('11:45'))}%`,
                  }}
                >
                  <span className="text-[8px] font-bold">11:45</span>
                  <TrainIcon className="w-2.5 h-2.5 text-white" />
                  <span className="text-[8px] font-bold">12:40</span>
                </div>
              </div>
            </div>

            {/* 4. G-SR-742 Neyveli Lignite Freight Rake */}
            <div
              className="relative flex flex-col space-y-1 group cursor-pointer"
              onMouseEnter={() => setHoveredTrain('G-SR-742')}
              onMouseLeave={() => setHoveredTrain(null)}
              onClick={() => setSelectedTrain(trains[5])}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                  <span className="text-xs font-bold text-slate-700">
                    G-SR-742 Neyveli Coal Freight Rake
                  </span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-mono px-1.5 rounded">
                    VM 12:50 IST
                  </span>
                </div>

                {selectedCandidate.id === 'OPTION_B' && (
                  <span className="text-[10px] bg-slate-100 text-slate-800 border border-slate-300 font-bold px-2 py-0.5 rounded">
                    📦 Siding Loop Track 3 Halt (+8m)
                  </span>
                )}
              </div>

              <div className="relative w-full h-3.5 bg-slate-200/80 rounded-full">
                <div
                  className="absolute h-3.5 top-0 rounded-full bg-slate-600 shadow-sm border border-dashed border-white flex items-center justify-between px-1.5 text-white"
                  style={{
                    left: `${timeToPercent('12:50')}%`,
                    width: `${Math.max(10, timeToPercent('13:45') - timeToPercent('12:50'))}%`,
                  }}
                >
                  <span className="text-[8px] font-bold">12:50</span>
                  <TrainIcon className="w-2.5 h-2.5 text-white" />
                  <span className="text-[8px] font-bold">13:45</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Downstream Impact Summary Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-start space-x-2.5 max-w-2xl">
          <Info className="w-4 h-4 text-railway-blue shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-slate-900 text-xs">
              Priority Express Protection Analysis:
            </span>
            <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
              {selectedCandidate.id === 'OPTION_B'
                ? 'Option B completes at 14:00 IST. High-priority 12635 Vaigai Superfast Express departs Chennai Egmore at 13:15 and enters Villupuram at 15:30 with 100% green aspect line clear.'
                : selectedCandidate.id === 'OPTION_C'
                ? 'Option C (14:30–17:00) directly intersects 12635 Vaigai Express at Villupuram (15:30), causing a +15 min delay and severe downstream cascade into Madurai.'
                : 'Option A intercepts morning superfast services 12606 Pallavan Express and 12636 Vaigai Up return leg.'}
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right pl-4 border-l border-slate-200">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
            Estimated Delay
          </span>
          <div className="text-xl font-extrabold text-[#123B5D]">
            {selectedCandidate.estimatedDelayMinutes} min
          </div>
        </div>
      </div>

      {/* Drawer for Clicked Train */}
      <TrainDetailDrawer
        train={selectedTrain}
        onClose={() => setSelectedTrain(null)}
      />
    </div>
  );
};
