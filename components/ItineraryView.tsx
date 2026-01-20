
import React, { useState } from 'react';
import { Itinerary, Activity } from '../types';

interface ItineraryViewProps {
  itinerary: Itinerary;
  onModify: (type: 'delete' | 'relax', payload: any) => void;
}

const ItineraryView: React.FC<ItineraryViewProps> = ({ itinerary, onModify }) => {
  const currentDay = itinerary.days[0];
  const [relaxation, setRelaxation] = useState(75);

  return (
    <div className="flex w-full h-[calc(100vh-73px)] overflow-hidden relative">
      {/* Left Pane: Interactive Map (Simulated) */}
      <section className="hidden lg:block w-1/2 h-full relative border-r border-[#e8f2f3] dark:border-white/10 bg-slate-200">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale-[0.2]"
          style={{ backgroundImage: "url('https://picsum.photos/id/230/1200/1000')" }}
        >
          {/* Map Overlays */}
          <div className="absolute inset-0 bg-blue-500/5 backdrop-overlay"></div>
          
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
            <label className="flex h-12 w-80 items-center rounded-xl bg-white/90 dark:bg-background-dark/90 backdrop-blur-md shadow-2xl border border-black/5 dark:border-white/10 px-4 group">
              <span className="material-symbols-outlined text-primary mr-2 transition-transform group-focus-within:scale-110">search</span>
              <input 
                className="w-full bg-transparent border-none focus:ring-0 text-sm font-semibold placeholder:text-[#508f95]/70" 
                placeholder={`Find a place in ${itinerary.location}...`}
              />
            </label>
          </div>

          <div className="absolute bottom-28 right-6 z-10 flex flex-col gap-2">
            {['add', 'remove', 'near_me'].map((icon, i) => (
              <button 
                key={icon}
                className={`size-12 flex items-center justify-center rounded-xl shadow-xl transition-all hover:scale-110 active:scale-95 ${i === 2 ? 'bg-primary text-white mt-2' : 'bg-white dark:bg-background-dark text-[#0e191b] dark:text-white'}`}
              >
                <span className="material-symbols-outlined">{icon}</span>
              </button>
            ))}
          </div>

          {/* Numbered Markers */}
          {currentDay.activities.slice(0, 4).map((activity, i) => (
            <div 
              key={activity.id}
              className="absolute size-10 bg-primary rounded-full border-4 border-white flex items-center justify-center text-white font-black shadow-2xl transition-transform hover:scale-125 cursor-pointer"
              style={{ 
                top: `${20 + i * 15}%`, 
                left: `${30 + (i % 2) * 20}%` 
              }}
            >
              {i + 1}
              <div className="absolute -bottom-10 whitespace-nowrap bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 transition-opacity hover:opacity-100">
                {activity.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Right Pane: Timeline Schedule */}
      <section className="w-full lg:w-1/2 h-full flex flex-col bg-white dark:bg-background-dark">
        {/* Header/Tags */}
        <div className="p-8 border-b border-[#e8f2f3] dark:border-white/10 glass-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#0e191b] dark:text-white">
                {currentDay.title}
              </h2>
              <div className="flex items-center gap-2 text-[#508f95] text-sm mt-1 font-semibold">
                <span className="material-symbols-outlined text-base">calendar_month</span>
                <span>{currentDay.date}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="h-10 px-5 bg-primary rounded-lg text-white font-bold text-sm shadow-lg shadow-primary/20 transition-all active:scale-95">Save Plan</button>
              <button className="h-10 px-5 bg-[#e8f2f3] dark:bg-white/5 rounded-lg text-[#0e191b] dark:text-white font-bold text-sm hover:bg-opacity-80 transition-all">Share</button>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {itinerary.tags.map(tag => (
              <div key={tag} className="flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1.5 text-primary text-[10px] font-black uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Timeline */}
        <div className="flex-1 overflow-y-auto px-8 py-10 custom-scrollbar space-y-0">
          {currentDay.activities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <div className="relative pl-10 pb-10 group">
                {/* Connector Line */}
                <div className="absolute left-[3.5px] top-2 bottom-0 w-[2px] bg-primary/20 dark:bg-white/5"></div>
                {/* Node */}
                <div className="absolute left-0 top-1.5 size-2.5 rounded-full bg-primary ring-4 ring-primary/20 group-hover:scale-125 transition-transform"></div>
                
                {/* Content Card */}
                <div className="relative bg-white dark:bg-white/5 rounded-2xl p-6 shadow-sm border border-black/5 dark:border-white/5 transition-all hover:border-primary/40 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">{activity.type} • {activity.time}</p>
                        <button 
                          onClick={() => onModify('delete', activity.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-accent hover:text-red-600"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                      <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{activity.title}</h3>
                      <p className="text-sm text-[#508f95] mt-2 font-medium leading-relaxed">{activity.description}</p>
                    </div>
                    <div 
                      className="size-16 rounded-xl bg-cover bg-center border border-black/5 shadow-inner flex-shrink-0"
                      style={{ backgroundImage: `url(${activity.imageUrl})` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Buffer / Commute Blocks */}
              {index < currentDay.activities.length - 1 && (
                <div className="relative pl-10 py-4 mb-4">
                  <div className="absolute left-[3.5px] top-0 bottom-0 w-[2px] bg-primary/20 dark:bg-white/5 border-dashed border-l-2"></div>
                  <div className="flex items-center gap-3 py-2 px-4 rounded-xl border border-dashed border-primary/20 bg-primary/5 transition-all hover:bg-primary/10 cursor-pointer">
                    <span className="material-symbols-outlined text-[#508f95] text-lg">directions_walk</span>
                    <span className="text-xs font-bold text-[#508f95] uppercase tracking-wider">15m Buffer / Commute</span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}

          {/* Dynamic Relaxation Block based on Slider */}
          {relaxation > 50 && (
            <div className="relative pl-10 py-6 mb-10">
              <div className="absolute left-[3.5px] top-0 bottom-0 w-[2px] bg-primary/20 dark:bg-white/5"></div>
              <div className="flex items-center gap-4 py-5 px-6 rounded-2xl border border-dashed border-gain-teal/30 bg-gain-teal/10 shadow-inner">
                <span className="material-symbols-outlined text-gain-teal text-2xl">spa</span>
                <div>
                  <span className="text-sm font-bold text-gain-teal uppercase tracking-widest">45m Relaxation Window</span>
                  <p className="text-xs text-gain-teal/70 font-semibold mt-1">Chill Mode Active: Enjoy a quiet stroll</p>
                </div>
                <span className="ml-auto text-[10px] font-black text-white bg-gain-teal px-2 py-1 rounded-full uppercase tracking-tighter">Optimized</span>
              </div>
            </div>
          )}
        </div>

        {/* Floating Decision Balance Popup Trigger */}
        <div className="absolute bottom-32 left-3/4 -translate-x-1/2 z-30 glass-card px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-primary/20 animate-bounce cursor-pointer hover:bg-white">
          <div className="size-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
            <span className="material-symbols-outlined">info</span>
          </div>
          <div>
            <p className="text-sm font-extrabold text-[#0e191b] dark:text-white">Decision Balance</p>
            <p className="text-[10px] font-bold text-[#508f95] uppercase">More chill time = 1 missed location</p>
          </div>
          <button className="text-xs font-black text-primary hover:underline ml-4">VIEW</button>
        </div>

        {/* Relaxation Slider Pill */}
        <div className="sticky bottom-8 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-4rem)] max-w-lg glass-card h-16 rounded-full shadow-2xl flex items-center px-8 gap-6 border border-white/40 mb-8 mx-auto self-center">
          <div className="flex flex-col items-center flex-shrink-0">
            <span className="text-[9px] font-black uppercase text-accent tracking-tighter">Intensity</span>
            <span className="text-[10px] font-extrabold whitespace-nowrap">Special Forces</span>
          </div>
          <div className="flex-1 relative flex items-center group">
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-accent via-[#fbd14b] to-gain-teal overflow-hidden opacity-30"></div>
            <div 
              className="absolute h-2 left-0 rounded-full bg-gradient-to-r from-accent via-[#fbd14b] to-gain-teal transition-all duration-300"
              style={{ width: `${relaxation}%` }}
            ></div>
            <input 
              type="range"
              min="0" max="100"
              value={relaxation}
              onChange={(e) => setRelaxation(parseInt(e.target.value))}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div 
              className="absolute size-8 rounded-full bg-white shadow-xl border-2 border-primary flex items-center justify-center transition-all duration-300 pointer-events-none"
              style={{ left: `calc(${relaxation}% - 1rem)` }}
            >
              <div className="size-3 rounded-full bg-primary animate-pulse"></div>
            </div>
            <div 
              className="absolute -top-12 glass-card px-3 py-1 rounded-lg border border-primary/20 shadow-md transition-all duration-300"
              style={{ left: `calc(${relaxation}% - 3rem)` }}
            >
              <p className="text-[9px] font-black text-primary whitespace-nowrap uppercase tracking-widest">
                {relaxation < 30 ? 'Pace: High' : relaxation < 70 ? 'Pace: Balanced' : 'Pace: Zen'}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center flex-shrink-0">
            <span className="text-[9px] font-black uppercase text-gain-teal tracking-tighter">Relaxed</span>
            <span className="text-[10px] font-extrabold whitespace-nowrap">Chill Mode</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItineraryView;
