
import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  onViewChange: (view: AppView) => void;
  currentView: AppView;
}

const Header: React.FC<HeaderProps> = ({ onViewChange, currentView }) => {
  return (
    <header className="sticky top-0 z-50 px-6 lg:px-20 py-4 flex items-center justify-between glass-card border-b border-black/5 dark:border-white/5">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => onViewChange(AppView.Home)}
      >
        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30">
          <span className="material-symbols-outlined text-xl">auto_awesome</span>
        </div>
        <h2 className="text-[#0e191b] dark:text-white text-lg font-extrabold tracking-tight">Streamline</h2>
      </div>
      
      <nav className="hidden md:flex items-center gap-10">
        {[
          { view: AppView.Home, label: 'Explore' },
          { view: AppView.Itinerary, label: 'Itinerary' },
          { view: AppView.Memories, label: 'Memory Capsule' }
        ].map(item => (
          <button 
            key={item.view}
            onClick={() => onViewChange(item.view)}
            className={`text-sm font-bold transition-all ${currentView === item.view ? 'text-primary' : 'text-[#508f95] hover:text-primary'}`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-accent rounded-full border border-white"></span>
        </button>
        <div 
          className="size-10 rounded-full border-2 border-primary/20 bg-cover bg-center shadow-md cursor-pointer"
          style={{ backgroundImage: "url('https://picsum.photos/id/64/100/100')" }}
        ></div>
      </div>
    </header>
  );
};

export default Header;
