
import React, { useState } from 'react';
import { Spark } from '../types';

interface HomeProps {
  onParse: (url: string) => void;
  isLoading: boolean;
  sparks: Spark[];
  onSelectSpark: (spark: Spark) => void;
}

const Home: React.FC<HomeProps> = ({ onParse, isLoading, sparks, onSelectSpark }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onParse(url);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full px-6 py-12 lg:py-20 flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full text-center mb-16 space-y-4">
        <h1 className="text-[#0e191b] dark:text-white tracking-tight text-4xl lg:text-7xl font-extrabold leading-tight">
          Where will the light <span className="text-primary italic">take you?</span>
        </h1>
        <p className="text-[#508f95] dark:text-primary/70 text-lg lg:text-xl max-w-xl mx-auto font-medium">
          Transform your saved links into dynamic itineraries with a single click.
        </p>
      </div>

      {/* Search/Input Area */}
      <div className="w-full max-w-3xl mb-24">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 rounded-2xl blur-md opacity-25 group-focus-within:opacity-100 transition-opacity"></div>
          <div className="relative flex h-16 w-full items-stretch rounded-xl glass-card shadow-xl overflow-hidden border border-white/40">
            <div className="text-primary flex items-center justify-center pl-6">
              <span className="material-symbols-outlined text-2xl">link</span>
            </div>
            <input 
              className="flex w-full min-w-0 flex-1 border-none bg-transparent px-4 text-lg font-medium placeholder:text-[#508f95]/50 focus:ring-0" 
              placeholder="Paste a link from Xiaohongshu, TikTok, Yelp..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={isLoading}
              className={`m-2 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all flex items-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
            >
              {isLoading ? (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Parse</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </form>
        
        {/* Platform Grid */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 opacity-80">
          {['Xiaohongshu', 'TikTok', 'Instagram', 'Yelp'].map((platform, i) => (
            <div key={platform} className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-default">
              <span className="material-symbols-outlined text-primary text-base">
                {['diversity_1', 'music_note', 'photo_camera', 'stars'][i]}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0e191b] dark:text-white/80">{platform}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Grid Section: Recent Sparks */}
      <div className="w-full">
        <div className="flex items-end justify-between mb-8 px-2">
          <div>
            <h3 className="text-2xl font-extrabold text-[#0e191b] dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">speed</span>
              Recent Sparks
            </h3>
            <p className="text-sm text-[#508f95] dark:text-primary/60 font-medium">Your recently parsed inspirations</p>
          </div>
          <button className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
            View All <span className="material-symbols-outlined text-xs">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sparks.map((spark) => (
            <div 
              key={spark.id}
              onClick={() => onSelectSpark(spark)}
              className="group cursor-pointer relative rounded-2xl overflow-hidden glass-card shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/30"
            >
              <div 
                className="h-56 w-full bg-cover bg-center overflow-hidden transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${spark.imageUrl})` }}
              >
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm border border-black/5">
                  {spark.status}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 text-[#508f95] dark:text-primary/60 text-xs font-bold mb-2 uppercase tracking-wider">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {spark.location}
                </div>
                <h4 className="text-xl font-bold text-[#0e191b] dark:text-white group-hover:text-primary transition-colors">
                  {spark.title}
                </h4>
                <p className="text-sm text-[#508f95] dark:text-white/60 mt-3 line-clamp-2 leading-relaxed font-medium">
                  {spark.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
