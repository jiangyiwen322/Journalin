
import React from 'react';

interface DecisionModalProps {
  onClose: () => void;
  onConfirm: () => void;
  activityTitle: string;
}

const DecisionModal: React.FC<DecisionModalProps> = ({ onClose, onConfirm, activityTitle }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md transition-opacity">
      <div className="glass-card max-w-[900px] w-full rounded-[40px] shadow-[0_32px_120px_-20px_rgba(0,0,0,0.5)] border border-white/40 overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header Section */}
        <div className="bg-[#0e191b] p-10 text-white relative">
          <div className="absolute top-8 right-8 flex gap-2">
            <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">AI Prediction</div>
            <button onClick={onClose} className="hover:bg-white/10 p-1 rounded-full"><span className="material-symbols-outlined">close</span></button>
          </div>
          <h2 className="text-4xl font-black tracking-tight flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-4xl">balance</span>
            Decision Center
          </h2>
          <p className="text-white/60 mt-4 text-lg max-w-xl font-medium leading-relaxed">
            Changing <span className="text-primary font-bold">"{activityTitle}"</span> will trigger a sequence of trade-offs. Review your dynamic balance.
          </p>
        </div>

        {/* Bento Grid Trade-offs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50/50">
          
          {/* GAINS - Positive Green */}
          <div className="bg-white rounded-[32px] p-8 border border-gain-teal/20 shadow-sm relative group overflow-hidden">
             <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <span className="material-symbols-outlined text-[120px] text-gain-teal">keyboard_double_arrow_up</span>
             </div>
             <div className="flex items-center gap-3 mb-8">
               <div className="size-12 rounded-2xl bg-gain-teal/10 flex items-center justify-center text-gain-teal">
                 <span className="material-symbols-outlined font-bold">trending_up</span>
               </div>
               <h3 className="text-xl font-black text-[#0e191b] uppercase tracking-tight">Projected Gains</h3>
             </div>
             
             <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="size-6 bg-gain-teal rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-1">1</div>
                  <div>
                    <p className="font-bold text-sm">+1.5 hrs Relaxation Window</p>
                    <p className="text-xs text-gray-500 mt-1 font-medium">Reclaim energy for the evening Gion tour.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="size-6 bg-gain-teal rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-1">2</div>
                  <div>
                    <p className="font-bold text-sm">Reduced Fatigue Index</p>
                    <p className="text-xs text-gray-500 mt-1 font-medium">Saves 4,200 steps and avoiding peak sun hours.</p>
                  </div>
                </div>
             </div>
          </div>

          {/* LOSSES - Negative Red */}
          <div className="bg-white rounded-[32px] p-8 border border-accent/20 shadow-sm relative group overflow-hidden">
             <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <span className="material-symbols-outlined text-[120px] text-accent">keyboard_double_arrow_down</span>
             </div>
             <div className="flex items-center gap-3 mb-8">
               <div className="size-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                 <span className="material-symbols-outlined font-bold">trending_down</span>
               </div>
               <h3 className="text-xl font-black text-[#0e191b] uppercase tracking-tight">Potential Losses</h3>
             </div>
             
             <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="size-6 bg-accent rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-1">1</div>
                  <div>
                    <p className="font-bold text-sm">Miss Golden Hour Lighting</p>
                    <p className="text-xs text-gray-500 mt-1 font-medium">Arashiyama Grove looks best at 4:30 PM.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="size-6 bg-accent rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-1">2</div>
                  <div>
                    <p className="font-bold text-sm">Logistics Surcharge</p>
                    <p className="text-xs text-gray-500 mt-1 font-medium">Cancellation fee (¥800) for pre-booked lunch.</p>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* PLAN B - AI RECOMMENDATION */}
        <div className="px-4 pb-4">
          <div className="bg-primary/10 border-2 border-dashed border-primary/40 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-primary/20 transition-all">
             <div className="flex items-center gap-6">
               <div className="size-16 rounded-[24px] bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30 group-hover:scale-110 transition-transform">
                 <span className="material-symbols-outlined text-4xl">auto_fix_high</span>
               </div>
               <div>
                 <p className="text-primary font-black uppercase text-[10px] tracking-widest">Dynamic Adjustment Suggestion</p>
                 <h4 className="text-xl font-black text-[#0e191b] mt-1">Try "The Snapshot Express"</h4>
                 <p className="text-sm text-gray-600 font-medium mt-1">Keep the location, skip the long tour. Total time: 15 mins.</p>
               </div>
             </div>
             <button 
               onClick={onConfirm}
               className="bg-[#0e191b] text-white px-10 py-4 rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20"
             >
               APPLY PLAN B
             </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 flex justify-center border-t border-gray-100">
           <div className="flex gap-4">
             <button onClick={onClose} className="px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest text-[#508f95] hover:bg-gray-100 transition-colors">Discard Change</button>
             <button onClick={onConfirm} className="px-10 py-3 rounded-full text-xs font-black uppercase tracking-widest bg-accent text-white shadow-lg shadow-accent/20 hover:scale-105 transition-all">Confirm Removal</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionModal;
