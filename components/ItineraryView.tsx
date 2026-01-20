
import React, { useState, useEffect } from 'react';
import { Itinerary, UserPreferences } from '../types';

interface ItineraryViewProps {
  itinerary: Itinerary;
  onTriggerDecision: (activityId: string) => void;
  preferences: UserPreferences;
  onUpdatePrefs: (p: Partial<UserPreferences>) => void;
}

const ItineraryView: React.FC<ItineraryViewProps> = ({ itinerary, onTriggerDecision, preferences, onUpdatePrefs }) => {
  const currentDay = itinerary.days[0];
  const [relaxation, setRelaxation] = useState(preferences.pace);

  useEffect(() => {
    if (Math.abs(relaxation - preferences.pace) > 10) {
      onUpdatePrefs({ pace: relaxation });
    }
  }, [relaxation]);

  return (
    <div className="flex w-full h-[calc(100vh-73px)] overflow-hidden relative">
      {/* MAP SECTION - 50% split as requested */}
      <section className="hidden lg:block w-1/2 h-full relative border-r border-gray-100">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale-[0.2]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop')" }}
        >
          {/* Overlay for aesthetic */}
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
          
          {/* Mock POI Markers */}
          {currentDay.activities.map((activity, i) => (
            <div 
              key={activity.id}
              className="absolute size-14 bg-white rounded-[24px] shadow-2xl flex flex-col items-center justify-center border-4 border-primary group cursor-pointer hover:scale-125 transition-all z-20"
              style={{ top: `${20 + i * 18}%`, left: `${40 + (i % 2) * 15}%` }}
            >
              <span className="text-sm font-black text-primary">{i + 1}</span>
              <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-[#0e191b] text-white px-4 py-2 rounded-xl text-[10px] font-black border border-white/20">
                {activity.title}
              </div>
            </div>
          ))}
          
          {/* Legend Pill */}
          <div className="absolute bottom-10 left-10 glass-card px-6 py-4 rounded-3xl shadow-2xl">
            <p className="text-[10px] font-black uppercase text-primary mb-2">Current Route</p>
            <div className="flex items-center gap-4">
               <div className="text-center">
                 <p className="text-xl font-black">12km</p>
                 <p className="text-[9px] font-bold text-[#508f95] uppercase">Total</p>
               </div>
               <div className="w-[1px] h-8 bg-black/5"></div>
               <div className="text-center">
                 <p className="text-xl font-black">4</p>
                 <p className="text-[9px] font-bold text-[#508f95] uppercase">Stops</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="w-full lg:w-1/2 h-full flex flex-col bg-white overflow-hidden relative">
        <div className="p-10 border-b border-gray-50">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">Live Day Plan</p>
           <h2 className="text-4xl font-black text-[#0e191b]">{currentDay.title}</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-10 py-10 custom-scrollbar pb-32">
          {currentDay.activities.map((activity, index) => (
            <div key={activity.id} className="relative pl-12 pb-12 group">
              <div className="absolute left-[6px] top-2 bottom-0 w-[3px] bg-primary/20 rounded-full"></div>
              <div className="absolute left-0 top-1.5 size-4 rounded-full bg-white border-4 border-primary shadow-lg ring-8 ring-primary/5"></div>
              
              <div className="bg-white p-6 lg:p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 group relative overflow-hidden">
                <div className="flex justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[11px] font-black text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest">{activity.time}</span>
                      <button 
                        onClick={() => onTriggerDecision(activity.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-accent/10 rounded-full text-accent"
                        title="Open Decision Balance"
                      >
                        <span className="material-symbols-outlined text-xl">balance</span>
                      </button>
                    </div>
                    <h3 className="text-2xl font-black text-[#0e191b] mb-3 group-hover:text-primary transition-colors">{activity.title}</h3>
                    <p className="text-sm text-[#508f95] font-medium leading-relaxed">{activity.description}</p>
                  </div>
                  <div 
                    className="size-24 rounded-[24px] bg-cover bg-center border-4 border-white shadow-xl flex-shrink-0"
                    style={{ backgroundImage: `url(${activity.imageUrl})` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Intensity Slider */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white via-white/90 to-transparent">
           <div className="glass-card h-20 rounded-full shadow-2xl flex items-center px-8 gap-6 border border-white/60">
              <span className="material-symbols-outlined text-accent">bolt</span>
              <div className="flex-1 relative flex items-center">
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-700" style={{ width: `${relaxation}%` }}></div>
                </div>
                <input 
                  type="range"
                  min="0" max="100"
                  value={relaxation}
                  onChange={(e) => setRelaxation(parseInt(e.target.value))}
                  className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div 
                  className="absolute size-7 rounded-full bg-white shadow-2xl border-4 border-primary transition-all duration-300 pointer-events-none"
                  style={{ left: `calc(${relaxation}% - 0.8rem)` }}
                ></div>
              </div>
              <span className="material-symbols-outlined text-gain-teal">self_improvement</span>
           </div>
        </div>
      </section>
    </div>
  );
};

export default ItineraryView;
