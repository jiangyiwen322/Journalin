
import React, { useState, useEffect } from 'react';
import { AppView, Itinerary, Spark } from './types';
import Header from './components/Header';
import Home from './components/Home';
import ItineraryView from './components/ItineraryView';
import DecisionModal from './components/DecisionModal';
import { parseTravelLink } from './geminiService';

const MOCK_SPARKS: Spark[] = [
  {
    id: '1',
    location: 'Kyoto, Japan',
    title: 'Hidden Zen Tea Houses',
    description: 'A curated collection of minimalist architecture and traditional tea ceremonies in Arashiyama.',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    status: 'Parsed'
  },
  {
    id: '2',
    location: 'Amalfi Coast, Italy',
    title: 'Coastal Cliff Walks',
    description: 'The best sunset viewpoints from Positano to Amalfi for high-contrast photography.',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2070&auto=format&fit=crop',
    status: 'Saved'
  },
  {
    id: '3',
    location: 'New York, USA',
    title: 'Art Deco Masterclass',
    description: 'Architecture tour focusing on 1920s facades and interior lobby designs in Midtown.',
    imageUrl: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=2070&auto=format&fit=crop',
    status: 'In Progress'
  }
];

export default function App() {
  const [view, setView] = useState<AppView>(AppView.Home);
  const [currentItinerary, setCurrentItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ type: 'delete' | 'relax', payload: any } | null>(null);

  const handleParseLink = async (url: string) => {
    setIsLoading(true);
    try {
      const result = await parseTravelLink(url);
      setCurrentItinerary(result);
      setView(AppView.Itinerary);
    } catch (error) {
      alert("Failed to parse the link. Let's try again with a default Kyoto plan.");
      // Fallback or demo behavior
      handleParseLink("https://kyoto-travel.com/sample"); 
    } finally {
      setIsLoading(false);
    }
  };

  const openDecision = (type: 'delete' | 'relax', payload: any) => {
    setPendingAction({ type, payload });
    setShowDecisionModal(true);
  };

  const handleApplyDecision = (approved: boolean) => {
    if (approved && pendingAction && currentItinerary) {
      // Logic to modify itinerary
      if (pendingAction.type === 'delete') {
        const updatedDays = currentItinerary.days.map(day => ({
          ...day,
          activities: day.activities.filter(a => a.id !== pendingAction.payload)
        }));
        setCurrentItinerary({ ...currentItinerary, days: updatedDays });
      }
    }
    setShowDecisionModal(false);
    setPendingAction(null);
  };

  return (
    <div className="flex min-h-screen w-full flex-col shimmer-bg">
      <Header onViewChange={setView} currentView={view} />
      
      <main className="flex-1 flex flex-col items-center">
        {view === AppView.Home && (
          <Home 
            onParse={handleParseLink} 
            isLoading={isLoading} 
            sparks={MOCK_SPARKS}
            onSelectSpark={() => setView(AppView.Itinerary)}
          />
        )}
        
        {view === AppView.Itinerary && currentItinerary && (
          <ItineraryView 
            itinerary={currentItinerary} 
            onModify={openDecision}
          />
        )}
      </main>

      {showDecisionModal && (
        <DecisionModal 
          onClose={() => setShowDecisionModal(false)} 
          onConfirm={() => handleApplyDecision(true)}
          activityTitle={
            currentItinerary?.days[0]?.activities.find(a => a.id === pendingAction?.payload)?.title || 'Selected Place'
          }
        />
      )}

      {/* Persistent Action Pill on Home */}
      {view === AppView.Home && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-1 p-1 bg-[#0e191b] dark:bg-white text-white dark:text-[#0e191b] rounded-full shadow-2xl transition-all hover:scale-105">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full hover:bg-white/10 dark:hover:bg-black/5 transition-colors text-sm font-bold">
              <span className="material-symbols-outlined text-lg">add_circle</span>
              New Itinerary
            </button>
            <div className="w-px h-6 bg-white/20 dark:bg-black/10"></div>
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full hover:bg-white/10 dark:hover:bg-black/5 transition-colors text-sm font-bold">
              <span className="material-symbols-outlined text-lg">auto_fix</span>
              Relaxation Mode
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
