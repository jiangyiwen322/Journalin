
import React from 'react';

interface DecisionModalProps {
  onClose: () => void;
  onConfirm: () => void;
  activityTitle: string;
}

const DecisionModal: React.FC<DecisionModalProps> = ({ onClose, onConfirm, activityTitle }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="glass-card max-w-[860px] w-full rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/50 dark:border-white/10 overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Breadcrumbs in Modal */}
        <div className="flex flex-wrap gap-2 px-8 pt-8">
          <span className="text-[#508f95] text-xs font-bold uppercase tracking-widest">Trip to Japan</span>
          <span className="text-[#508f95] text-xs font-bold">/</span>
          <span className="text-[#508f95] text-xs font-bold uppercase tracking-widest">Day 4: Kyoto</span>
          <span className="text-[#508f95] text-xs font-bold">/</span>
          <span className="text-[#0e191b] dark:text-gray-300 text-xs font-bold uppercase tracking-widest">{activityTitle}</span>
        </div>

        <div className="px-8 pt-6 pb-2">
          <h1 className="text-[#0e191b] dark:text-white text-4xl font-black tracking-tight leading-tight">Decision Balance</h1>
          <p className="text-[#508f95] dark:text-gray-400 text-base mt-2 font-medium">
            Skipping <strong>{activityTitle}</strong> will restructure your afternoon flow. Review the trade-offs.
          </p>
        </div>

        {/* Bento-Box Decision Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          {/* GAIN COLUMN */}
          <div className="bg-gain-teal/5 dark:bg-gain-teal/10 p-6 rounded-2xl border border-gain-teal/20 relative overflow-hidden group transition-all hover:bg-gain-teal/10">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <span className="material-symbols-outlined text-gain-teal text-6xl">bolt</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-full bg-gain-teal/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-gain-teal">add_circle</span>
              </div>
              <h3 className="text-xl font-black text-gain-teal uppercase tracking-tight">Potential Gains</h3>
            </div>
            <ul className="space-y-5">
              {[
                { icon: 'schedule', title: '+1.5 Hours Free Time', desc: 'Total recovery of transit and exploration time.' },
                { icon: 'local_cafe', title: 'Unscheduled Discovery', desc: 'Visit "Weekenders Coffee" (4.8★) nearby, currently trending.' },
                { icon: 'sentiment_very_satisfied', title: 'Relaxation Index +22%', desc: 'Reduces walking fatigue before tonight\'s dinner.' }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-gain-teal mt-0.5 text-[20px]">{item.icon}</span>
                  <div>
                    <p className="font-bold text-[#0e191b] dark:text-white text-sm">{item.title}</p>
                    <p className="text-xs text-[#508f95] dark:text-gray-400 mt-1 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* LOSS COLUMN */}
          <div className="bg-accent/5 dark:bg-accent/10 p-6 rounded-2xl border border-accent/20 relative overflow-hidden group transition-all hover:bg-accent/10">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <span className="material-symbols-outlined text-accent text-6xl">warning</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-accent">remove_circle</span>
              </div>
              <h3 className="text-xl font-black text-accent uppercase tracking-tight">Projected Losses</h3>
            </div>
            <ul className="space-y-5">
              {[
                { icon: 'event_busy', title: 'Logistical Chain Reaction', desc: 'Tofuku-ji Temple closes at 4:30 PM. Skipping this may cause you to miss it.' },
                { icon: 'videocam_off', title: 'Iconic Moment Lost', desc: 'Missing the Senbon Torii gates during the \'golden hour\' light.' },
                { icon: 'route', title: 'Path Inefficiency', desc: 'Your current transit pass value drops by ¥800 (non-optimal route).' }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-accent mt-0.5 text-[20px]">{item.icon}</span>
                  <div>
                    <p className="font-bold text-[#0e191b] dark:text-white text-sm">{item.title}</p>
                    <p className="text-xs text-[#508f95] dark:text-gray-400 mt-1 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Suggested Plan B Section */}
        <div className="px-8 pb-8">
          <div className="bg-primary/5 dark:bg-primary/10 border-2 border-dashed border-primary/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-primary transition-all">
            <div className="flex items-center gap-5">
              <div className="size-14 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                <span className="material-symbols-outlined text-primary text-3xl">auto_fix_high</span>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Intelligent Plan B</p>
                <p className="text-[#0e191b] dark:text-white font-black text-lg mt-0.5">"The Snapshot Loop" Alternative</p>
                <p className="text-xs text-[#508f95] dark:text-gray-400 mt-1 font-medium max-w-md">Replace 2hr hike with 15min taxi photo stop. Keeps the memory, saves the legs.</p>
              </div>
            </div>
            <button 
              onClick={onConfirm}
              className="whitespace-nowrap bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              Apply Plan B
            </button>
          </div>
        </div>

        {/* Action Footer Pill */}
        <div className="flex justify-center pb-12">
          <div className="inline-flex items-center bg-[#0e191b] dark:bg-white p-1.5 rounded-full shadow-2xl border border-white/20">
            <button 
              onClick={onClose}
              className="px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest text-white dark:text-[#0e191b] hover:bg-white/10 dark:hover:bg-black/5 transition-colors"
            >
              Keep Original
            </button>
            <div className="w-px h-6 bg-white/20 dark:bg-black/10 mx-2"></div>
            <button 
              onClick={onConfirm}
              className="px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest text-accent hover:bg-accent/10 transition-colors"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionModal;
