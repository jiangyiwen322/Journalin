
import React, { useState } from 'react';
import { Memory, Receipt } from '../types';

interface MemoryCapsuleProps {
  memories: Memory[];
  receipts: Receipt[];
  onAddMemory: (m: Memory) => void;
  onAddReceipt: (r: Receipt) => void;
}

const MemoryCapsule: React.FC<MemoryCapsuleProps> = ({ memories, receipts, onAddMemory, onAddReceipt }) => {
  const [isScanning, setIsScanning] = useState(false);

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      onAddReceipt({
        id: Math.random().toString(),
        merchant: "Kyoto Kichi Kichi Omurice",
        amount: 2800,
        currency: "JPY",
        items: ["Special Omurice", "Green Tea"],
        date: new Date().toLocaleDateString()
      });
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-[#0e191b] dark:text-white">Memory Capsule</h1>
          <p className="text-[#508f95] font-medium mt-2">AI-powered journal & travel accounting</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={simulateScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/30 transition-all active:scale-95 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">{isScanning ? 'sync' : 'photo_camera'}</span>
            {isScanning ? 'Scanning Receipt...' : 'Scan Receipt'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Memory Grid */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-square glass-card rounded-3xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-primary transition-all">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">add</span>
              </div>
              <p className="text-sm font-black text-primary uppercase tracking-widest">Add Photo Memory</p>
            </div>

            {/* Mock Memory Card */}
            <div className="glass-card rounded-3xl overflow-hidden border border-white/50 shadow-xl group">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop')" }}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Golden Hour at Arashiyama</h3>
                    <p className="text-xs text-[#508f95] font-medium">Oct 12, 2024</p>
                  </div>
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                </div>
                <p className="text-sm text-[#0e191b]/70 italic line-clamp-2">"The light hitting the bamboo grove was unlike anything I've seen. Simply magical."</p>
                <div className="mt-6 pt-6 border-t border-black/5 flex justify-between items-center">
                  <button className="text-xs font-black text-primary hover:underline uppercase tracking-widest">Generate Social Post</button>
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="size-6 rounded-full border-2 border-white bg-slate-200"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accounting Sidebar */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-8 border border-white/50 shadow-xl">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">payments</span>
              Smart Expenses
            </h3>
            
            <div className="space-y-4">
              {receipts.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-sm text-[#508f95] font-medium">No receipts scanned yet.</p>
                </div>
              ) : (
                receipts.map(r => (
                  <div key={r.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 border border-black/5 hover:border-primary/30 transition-all">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">receipt_long</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold truncate">{r.merchant}</p>
                      <p className="text-[10px] text-[#508f95] font-medium uppercase">{r.date}</p>
                    </div>
                    <p className="font-black text-sm">{r.currency} {r.amount}</p>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-black/5">
              <div className="flex justify-between items-end">
                <p className="text-xs font-bold text-[#508f95] uppercase tracking-widest">Total Spend</p>
                <p className="text-2xl font-black text-primary">JPY 12,400</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0e191b] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
              <span className="material-symbols-outlined text-6xl">insights</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Budget Health</h4>
            <p className="text-white/60 text-sm mb-6 font-medium">You're 15% under budget for Kyoto. Treat yourself to that Wagyu dinner!</p>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[45%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCapsule;
