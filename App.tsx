
import React, { useState, useEffect } from 'react';
import { AppView, Itinerary, Spark, UserPreferences } from './types';
import Header from './components/Header';
import Home from './components/Home';
import ItineraryView from './components/ItineraryView';
import DecisionCenter from './components/DecisionCenter';
import MemoryCapsule from './components/MemoryCapsule';
import { parseTravelLink } from './geminiService';

const KYOTO_DEMO: Itinerary = {
  id: 'kyoto-demo',
  location: 'Kyoto, Japan',
  title: 'Kyoto Aesthetic & Zen',
  tags: ['Culture', 'Photography', 'Trending'],
  days: [{
    dayNumber: 1,
    title: 'Arashiyama & Gion District',
    date: 'Oct 24, 2024',
    activities: [
      {
        id: 'act-1',
        type: 'Sightseeing',
        title: 'Arashiyama Bamboo Grove',
        time: '09:00 AM',
        description: 'Morning walk through the iconic bamboo forest. Perfect for light photography.',
        imageUrl: 'https://images.unsplash.com/photo-1542931287-023b922fa89b?q=80&w=600&auto=format&fit=crop',
        lat: 35.0175, lng: 135.6713, durationMinutes: 60
      },
      {
        id: 'act-2',
        type: 'Culture',
        title: 'Tenryu-ji Temple',
        time: '11:00 AM',
        description: 'UNESCO World Heritage site with a breathtaking Zen garden.',
        imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop',
        lat: 35.0157, lng: 135.6738, durationMinutes: 90
      },
      {
        id: 'act-3',
        type: 'Dining',
        title: 'Gion Kichi Kichi Omurice',
        time: '01:30 PM',
        description: 'The world-famous theatrical omurice in the heart of Gion.',
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
        lat: 35.0088, lng: 135.7708, durationMinutes: 60
      },
      {
        id: 'act-4',
        type: 'Relaxation',
        title: 'Hanamikoji Street Stroll',
        time: '04:00 PM',
        description: 'Explore the traditional teahouses and hope for a Geisha sighting.',
        imageUrl: 'https://images.unsplash.com/photo-1524413840049-1d37a5307567?q=80&w=600&auto=format&fit=crop',
        lat: 35.0034, lng: 135.7749, durationMinutes: 120
      }
    ]
  }]
};

export default function App() {
  const [view, setView] = useState<AppView>(AppView.Home);
  const [currentItinerary, setCurrentItinerary] = useState<Itinerary | null>(KYOTO_DEMO);
  const [preferences, setPreferences] = useState<UserPreferences>({ spiceLevel: 'Mild', caffeine: true, pace: 50 });
  const [isLoading, setIsLoading] = useState(false);
  const [isDecisionActive, setIsDecisionActive] = useState(false);
  const [pendingActivityId, setPendingActivityId] = useState<string | null>(null);

  const handleParseLink = async (url: string) => {
    setIsLoading(true);
    try {
      const result = await parseTravelLink(url);
      setCurrentItinerary(result);
      setView(AppView.Itinerary);
    } catch (error) {
      setCurrentItinerary(KYOTO_DEMO);
      setView(AppView.Itinerary);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTriggerDecision = (activityId: string) => {
    setPendingActivityId(activityId);
    setIsDecisionActive(true);
  };

  const handleApplyDecision = (approved: boolean) => {
    if (approved && pendingActivityId && currentItinerary) {
      const updatedDays = currentItinerary.days.map(day => ({
        ...day,
        activities: day.activities.filter(a => a.id !== pendingActivityId)
      }));
      setCurrentItinerary({ ...currentItinerary, days: updatedDays });
    }
    setIsDecisionActive(false);
    setPendingActivityId(null);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#fcfdfe] relative overflow-x-hidden">
      <Header onViewChange={setView} currentView={view} />
      
      <main className="flex-1 w-full flex flex-col items-center">
        {view === AppView.Home && (
          <Home 
            onParse={handleParseLink} 
            isLoading={isLoading} 
            sparks={[]} 
            onSelectSpark={() => setView(AppView.Itinerary)}
          />
        )}
        
        {view === AppView.Itinerary && currentItinerary && (
          <ItineraryView 
            itinerary={currentItinerary} 
            onTriggerDecision={handleTriggerDecision}
            preferences={preferences}
            onUpdatePrefs={(p) => setPreferences({ ...preferences, ...p })}
          />
        )}

        {view === AppView.Memories && (
          <MemoryCapsule memories={[]} receipts={[]} onAddMemory={()=>{}} onAddReceipt={()=>{}} />
        )}
      </main>

      {/* Dynamic Decision Center as a High-Impact Overlay */}
      {isDecisionActive && currentItinerary && (
        <DecisionCenter 
          activityTitle={
            currentItinerary.days[0].activities.find(a => a.id === pendingActivityId)?.title || 'Selected Stop'
          }
          onConfirm={() => handleApplyDecision(true)}
          onCancel={() => handleApplyDecision(false)}
        />
      )}
    </div>
  );
}
