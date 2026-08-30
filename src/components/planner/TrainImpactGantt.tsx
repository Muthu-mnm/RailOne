import React, { useState } from 'react';
import {
  Train as TrainIcon,
  Info,
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
  const pallavanTrain = trains.find((t) => t.number === '12606') || trains[2];
  const passengerTrain = trains.find((t) => t.number === '56706') || trains[4];
  const freightTrain = trains.find((t) => t.number === 'G-SR-742') || trains[5];

  // Time slots from 08:00 to 19:00 (11 hours total = 660 minutes)
  const hours = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
  ];

  const timeToPercent = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    const totalMinutesFrom8 = (h - 8) * 60 + m;
    const totalSpanMinutes = 11 * 60; // 660 minutes
    return Math.max(0, Math.min(100, (totalMinutesFrom8 / totalSpanMinutes) * 100));
  };

  const blockStartPercent = timeToPercent(selectedCandidate.startTime);
  const blockEndPercent = timeToPercent(selectedCandidate.endTime);
  const blockWidthPercent = Math.max(2, blockEndPercent - blockStartPercent);

  // Train row configurations with dedicated parameters and candidate-dependent status badges
  const trainRows = [
    {
      number: '12635',
      title: '12635 Vaigai Superfast Express',
      subtitle: 'Chennai 13:15 → Madurai 20:35',
      startTime: '13:15',
      endTime: '16:14',
      startStationLabel: 'MS 13:15',
      endStationLabel: 'VRI 16:14',
      indicatorColor: 'bg-[#0FAF9A] animate-pulse',
      titleColor: 'text-[#123B5D]',
      barClasses: 'bg-gradient-to-r from-[#123B5D] to-[#2C5F7C] border border-white/90',
      trainObj: vaigaiTrain,
      renderStatusBadge: () => {
        if (selectedCandidate.id === 'OPTION_C') {
          return (
            <span className="inline-flex items-center text-[10px] bg-rose-600 text-white font-extrabold px-2.5 py-1 rounded-md shadow animate-pulse truncate max-w-[260px]">
              ❌ DIRECT VAIGAI CONFLICT (+15m)
            </span>
          );
        }
        if (selectedCandidate.id === 'OPTION_A') {
          return (
            <span className="inline-flex items-center text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold px-2.5 py-1 rounded-md truncate max-w-[260px]">
              ✓ 100% Protected (Departs MS after block)
            </span>
          );
        }
        return (
          <span className="inline-flex items-center text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold px-2.5 py-1 rounded-md truncate max-w-[260px]">
            ✓ 100% Protected (Line Clear at 15:30)
          </span>
        );
      },
    },
    {
      number: '12606',
      title: '12606 Pallavan Superfast Express (Up)',
      subtitle: 'Karaikkudi → Chennai Egmore (VM 09:25)',
      startTime: '08:20',
      endTime: '09:25',
      startStationLabel: '08:20',
      endStationLabel: '09:25',
      indicatorColor: 'bg-rose-600',
      titleColor: 'text-rose-700',
      barClasses: 'bg-rose-600 border border-rose-400',
      trainObj: pallavanTrain,
      renderStatusBadge: () => {
        if (selectedCandidate.id === 'OPTION_A') {
          return (
            <span className="inline-flex items-center text-[10px] bg-rose-600 text-white font-extrabold px-2.5 py-1 rounded-md shadow animate-pulse truncate max-w-[260px]">
              ❌ Pallavan Conflict (+28m)
            </span>
          );
        }
        return (
          <span className="inline-flex items-center text-[10px] text-slate-600 bg-slate-100 border border-slate-200 font-semibold px-2.5 py-1 rounded-md truncate max-w-[260px]">
            ✓ Clear of Midday Window
          </span>
        );
      },
    },
    {
      number: '56706',
      title: '56706 Villupuram–Madurai Passenger',
      subtitle: 'VM Dep 11:45 IST',
      startTime: '11:45',
      endTime: '12:40',
      startStationLabel: '11:45',
      endStationLabel: '12:40',
      indicatorColor: 'bg-slate-700',
      titleColor: 'text-slate-800',
      barClasses: 'bg-slate-700 border border-slate-500',
      trainObj: passengerTrain,
      renderStatusBadge: () => {
        if (selectedCandidate.id === 'OPTION_B') {
          return (
            <span className="inline-flex items-center text-[10px] bg-teal-100 text-teal-900 border border-teal-300 font-bold px-2.5 py-1 rounded-md truncate max-w-[260px]">
              ⏱️ Regulated +6m (Controlled Spacing)
            </span>
          );
        }
        if (selectedCandidate.id === 'OPTION_A') {
          return (
            <span className="inline-flex items-center text-[10px] bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2.5 py-1 rounded-md truncate max-w-[260px]">
              ⏱️ Regulated +14m (Morning Reschedule)
            </span>
          );
        }
        return (
          <span className="inline-flex items-center text-[10px] text-slate-600 bg-slate-100 border border-slate-200 font-semibold px-2.5 py-1 rounded-md truncate max-w-[260px]">
            ✓ Normal Timetable Path
          </span>
        );
      },
    },
    {
      number: 'G-SR-742',
      title: 'G-SR-742 Neyveli Coal Freight Rake',
      subtitle: 'VM 12:50 IST',
      startTime: '12:50',
      endTime: '13:45',
      startStationLabel: '12:50',
      endStationLabel: '13:45',
      indicatorColor: 'bg-slate-500',
      titleColor: 'text-slate-700',
      barClasses: 'bg-slate-600 border border-dashed border-white/90',
      trainObj: freightTrain,
      renderStatusBadge: () => {
        if (selectedCandidate.id === 'OPTION_B') {
          return (
            <span className="inline-flex items-center text-[10px] bg-slate-100 text-slate-800 border border-slate-300 font-bold px-2.5 py-1 rounded-md truncate max-w-[260px]">
              📦 Siding Loop Track 3 Halt (+8m)
            </span>
          );
        }
        return (
          <span className="inline-flex items-center text-[10px] text-slate-600 bg-slate-100 border border-slate-200 font-semibold px-2.5 py-1 rounded-md truncate max-w-[260px]">
            ✓ Normal Path
          </span>
        );
      },
    },
  ];

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

      {/* Gantt & String Chart Visualizer with Responsive Scroll */}
      <div className="relative border border-slate-200 rounded-xl bg-slate-50/50 p-4 overflow-x-auto">
        <div className="min-w-[1000px] relative">
          {/* Layer 1: Time axis header */}
          <div className="relative w-full h-8 border-b border-slate-200 flex justify-between text-xs font-mono font-bold text-slate-600 px-1 select-none mb-5">
            {hours.map((h, i) => (
              <div key={i} className="text-center w-12 -ml-6 first:ml-0 last:mr-0">
                {h}
              </div>
            ))}
          </div>

          {/* Main Timeline Body */}
          <div className="relative w-full">
            {/* LAYER 1: Full-height Vertical Grid Lines */}
            <div className="absolute inset-0 pointer-events-none z-1 flex justify-between">
              {hours.map((_, i) => (
                <div key={i} className="h-full border-r border-slate-200/90" />
              ))}
            </div>

            {/* LAYER 2: Block-Window Highlight Shading Layer */}
            <div
              className="absolute top-0 bottom-0 bg-teal-500/15 border-2 border-dashed border-teal-600/80 rounded-xl transition-all duration-300 pointer-events-none z-5"
              style={{
                left: `${blockStartPercent}%`,
                width: `${blockWidthPercent}%`,
              }}
            >
              {/* Top Pill for Block Window positioned in the header clearance zone */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0C2340] text-white px-3 py-0.5 rounded-full text-[10px] font-extrabold shadow-md border border-[#0FAF9A] whitespace-nowrap z-10 flex items-center space-x-1.5">
                <span>⚡</span>
                <span>
                  {selectedCandidate.name.split(':')[0]} ({selectedCandidate.startTime}–{selectedCandidate.endTime})
                </span>
              </div>
            </div>

            {/* Track Lanes: 4 Independent Dedicated Rows */}
            <div className="relative z-10 space-y-4 pt-4 pb-2">
              {trainRows.map((trainData) => {
                const isHovered = hoveredTrain === trainData.number;
                const startPercent = timeToPercent(trainData.startTime);
                const endPercent = timeToPercent(trainData.endTime);
                const widthPercent = Math.max(10, endPercent - startPercent);

                return (
                  <div
                    key={trainData.number}
                    className={`relative rounded-xl border p-3.5 transition-all duration-200 group cursor-pointer flex flex-col justify-between ${
                      isHovered
                        ? 'border-railway-blue/60 bg-blue-50/40 shadow-md ring-1 ring-railway-blue/20'
                        : 'border-slate-200 bg-white/95 shadow-xs hover:border-slate-300 hover:bg-white'
                    }`}
                    style={{ minHeight: '82px' }}
                    onMouseEnter={() => setHoveredTrain(trainData.number)}
                    onMouseLeave={() => setHoveredTrain(null)}
                    onClick={() => setSelectedTrain(trainData.trainObj)}
                  >
                    {/* LAYER 4: Dedicated Row Header (Train Info Left + Status Badge Right) */}
                    <div className="relative z-20 flex items-center justify-between gap-3 min-w-0">
                      {/* Left Info: Train identity */}
                      <div className="flex items-center space-x-2 min-w-0 truncate">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${trainData.indicatorColor}`} />
                        <span className={`text-xs font-extrabold truncate ${trainData.titleColor}`}>
                          {trainData.title}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded font-bold border border-slate-200 shrink-0">
                          {trainData.subtitle}
                        </span>
                      </div>

                      {/* Right Info: Status badge strictly constrained within its row */}
                      <div className="shrink-0 flex items-center">
                        {trainData.renderStatusBadge()}
                      </div>
                    </div>

                    {/* LAYER 3: Dedicated Track Rail Guide + Absolute Train Movement Bar */}
                    <div className="relative w-full h-8 flex items-center mt-1 z-15">
                      {/* Horizontal track rail guide bar */}
                      <div className="absolute inset-x-0 h-2 bg-slate-200/80 rounded-full border border-slate-300/40" />

                      {/* Absolute Train Movement Bar */}
                      <div
                        className={`absolute h-7 rounded-lg shadow-sm flex items-center justify-between px-2.5 text-white z-15 transition-transform duration-150 ${
                          isHovered ? 'scale-y-105 shadow-md ring-2 ring-white/50' : ''
                        } ${trainData.barClasses}`}
                        style={{
                          left: `${startPercent}%`,
                          width: `${widthPercent}%`,
                          minWidth: '72px',
                        }}
                      >
                        <span className="text-[9px] font-bold font-mono whitespace-nowrap">
                          {trainData.startStationLabel}
                        </span>
                        <TrainIcon className="w-3.5 h-3.5 mx-1 shrink-0 text-white/90" />
                        <span className="text-[9px] font-bold font-mono whitespace-nowrap">
                          {trainData.endStationLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
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

