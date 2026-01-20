
import React from 'react';

interface DecisionCenterProps {
  activityTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DecisionCenter: React.FC<DecisionCenterProps> = ({ activityTitle, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-white animate-in fade-in duration-500 flex flex-col items-center overflow-y-auto">
      <div className="w-full max-w-6xl px-6 py-16 lg:py-24">
        
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-[0.3em] mb-4">
              <span className="material-symbols-outlined text-lg">balance</span>
              AI Decision Engine
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-[#0e191b] tracking-tighter leading-[1.1]">
              Removing <span className="text-primary italic">"{activityTitle}"</span>
            </h1>
            <p className="text-[#508f95] text-xl mt-6 font-medium leading-relaxed">
              Review the dynamic trade-offs before finalizing your Kyoto route.
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={onCancel}
              className="px-8 py-4 rounded-full border-2 border-gray-100 text-[#508f95] font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all"
            >
              Discard
            </button>
            <button 
              onClick={onConfirm}
              className="px-10 py-4 rounded-full bg-accent text-white font-black text-sm uppercase tracking-widest shadow-2xl shadow-accent/30 hover:scale-105 transition-all"
            >
              Apply Change
            </button>
          </div>
        </div>

        {/* Bento Balance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Gains */}
          <div className="bg-gain-teal/5 rounded-[48px] p-10 lg:p-14 border border-gain-teal/10 relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 opacity-10">
              <span className="material-symbols-outlined text-[180px] text-gain-teal">keyboard_double_arrow_up</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="size-14 rounded-2xl bg-gain-teal text-white flex items-center justify-center shadow-xl">
                  <span className="material-symbols-outlined text-3xl">add_circle</span>
                </div>
                <h3 className="text-3xl font-black text-[#0e191b] uppercase tracking-tight">Gains</h3>
              </div>
              <div className="space-y-10">
                <div>
                  <p className="text-2xl font-black text-[#0e191b]">+90m Free Time</p>
                  <p className="text-base text-[#508f95] mt-2 font-medium">Reclaimed energy for the Gion evening walk.</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#0e191b]">Step Reduction</p>
                  <p className="text-base text-[#508f95] mt-2 font-medium">Avoids 3,800 uphill steps at the shrine.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Losses */}
          <div className="bg-accent/5 rounded-[48px] p-10 lg:p-14 border border-accent/10 relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 opacity-10">
              <span className="material-symbols-outlined text-[180px] text-accent">keyboard_double_arrow_down</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="size-14 rounded-2xl bg-accent text-white flex items-center justify-center shadow-xl">
                  <span className="material-symbols-outlined text-3xl">remove_circle</span>
                </div>
                <h3 className="text-3xl font-black text-[#0e191b] uppercase tracking-tight">Losses</h3>
              </div>
              <div className="space-y-10">
                <div>
                  <p className="text-2xl font-black text-[#0e191b]">UNESCO Site Missed</p>
                  <p className="text-base text-[#508f95] mt-2 font-medium">This is a primary landmark for your Kyoto trip.</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#0e191b]">¥800 Fee</p>
                  <p className="text-base text-[#508f95] mt-2 font-medium">Pre-booked ticket cancellation charge.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plan B Suggestion */}
        <div className="bg-primary/10 border-2 border-dashed border-primary/40 rounded-[56px] p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 group transition-all">
          <div className="flex items-center gap-8">
            <div className="size-24 rounded-[32px] bg-primary text-white flex items-center justify-center shadow-2xl">
              <span className="material-symbols-outlined text-5xl">auto_fix_high</span>
            </div>
            <div>
              <p className="text-primary font-black uppercase text-[11px] tracking-[0.4em]">Alternative Suggestion</p>
              <h4 className="text-4xl font-black text-[#0e191b] mt-2">The "Snapshot" Loop</h4>
              <p className="text-lg text-[#508f95] font-medium mt-3">Shorten the visit to 20m for photos instead of full tour.</p>
            </div>
          </div>
          <button 
            onClick={onConfirm}
            className="bg-[#0e191b] text-white px-12 py-6 rounded-full font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Apply Plan B
          </button>
        </div>
      </div>
    </div>
  );
};

export default DecisionCenter;
