/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  IconPlaneDeparture, IconSearch, IconClock, 
  IconArrowRight, IconFilter, IconX
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/src/components/shared/hero/HeroSection";

export default function FlightsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [flights, setFlights] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filteredFlights, setFilteredFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [stops, setStops] = useState<string[]>([]);
  const [cabin, setCabin] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/flights`);
        const data = await res.json();
        setFlights(data);
        setFilteredFlights(data);
      } catch (err) {
        console.error("Flight fetch error", err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchFlights();
  }, []);

  useEffect(() => {
    let data = [...flights];
    if (search) {
      data = data.filter(f => 
        f.from.toLowerCase().includes(search.toLowerCase()) || 
        f.to.toLowerCase().includes(search.toLowerCase()) ||
        f.airline.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (stops.length > 0) data = data.filter(f => stops.includes(f.stops));
    if (cabin) data = data.filter(f => f.class === cabin);
    setFilteredFlights(data);
  }, [search, stops, cabin, flights]);

  if (loading) return <LoadingState />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <HeroSection
        title="Explore Heavenly Destinations"
        subtitle="Experience luxury travel with over 500+ premium airlines worldwide."
        ctaText="Book Now"
        imageUrl="/hero/HeroImages1.png"
        stats={[
          { label: "Partner Airlines", value: "500+" },
          { label: "Daily Flights", value: "12,000" },
          { label: "Support", value: "24/7" }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-12 relative z-20">
        
        {/* --- SEARCH BAR: Green & White Modern Theme --- */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-3 md:p-4 rounded-[32px] shadow-[0_20px_60px_rgba(16,185,129,0.1)] border border-emerald-50 mb-12 flex flex-col md:flex-row gap-3 items-center"
        >
          <div className="relative flex-1 w-full">
            <IconSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500" size={22} />
            <input
              placeholder="Where are you flying to?"
              className="w-full pl-16 pr-6 py-4 md:py-5 bg-emerald-50/30 rounded-[24px] outline-none focus:ring-2 focus:ring-emerald-500/20 border-none font-medium text-slate-700 transition-all placeholder:text-emerald-300"
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="w-full md:w-auto px-12 py-4 md:py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-[24px] transition-all active:scale-95 shadow-lg shadow-emerald-200 flex items-center justify-center gap-2">
            Search Flights
          </button>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- MOBILE FILTER TOGGLE --- */}
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 bg-white border border-emerald-100 p-4 rounded-2xl font-bold text-emerald-600 shadow-sm"
          >
            <IconFilter size={20} /> Filters
          </button>

          {/* --- SIDEBAR FILTERS --- */}
          <aside className={`fixed inset-0 z-[100] bg-white p-8 lg:relative lg:inset-auto lg:z-auto lg:bg-transparent lg:p-0 lg:w-80 transition-transform lg:translate-x-0 ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="lg:hidden flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-slate-900">Filters</h2>
              <IconX className="text-emerald-500" onClick={() => setIsFilterOpen(false)} />
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-emerald-50 shadow-sm sticky top-32">
               <h3 className="font-bold text-slate-900 text-lg mb-6 underline decoration-emerald-500/20 underline-offset-8">Refine Search</h3>
               
               {/* Stops Filter */}
               <div className="mb-8">
                 <h4 className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-widest mb-4">Stops</h4>
                 <div className="space-y-3">
                   {["Non-stop", "1 Stop", "2+ Stops"].map(s => (
                     <label key={s} className="flex items-center gap-3 cursor-pointer group">
                       <input 
                        type="checkbox" 
                        checked={stops.includes(s)}
                        onChange={() => setStops(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                        className="w-5 h-5 rounded-md border-emerald-200 text-emerald-500 focus:ring-emerald-500" 
                       />
                       <span className="text-sm font-semibold text-slate-600 group-hover:text-emerald-500 transition-colors">{s}</span>
                     </label>
                   ))}
                 </div>
               </div>

               {/* Cabin Filter */}
               <div>
                 <h4 className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-widest mb-4">Travel Class</h4>
                 <div className="space-y-3">
                   {["Economy", "Business", "First Class"].map(c => (
                     <label key={c} className="flex items-center gap-3 cursor-pointer group">
                       <input 
                        type="radio" 
                        name="cabin"
                        checked={cabin === c}
                        onChange={() => setCabin(c)}
                        className="w-5 h-5 border-emerald-200 text-emerald-500 focus:ring-emerald-500" 
                       />
                       <span className="text-sm font-semibold text-slate-600 group-hover:text-emerald-500 transition-colors">{c}</span>
                     </label>
                   ))}
                 </div>
               </div>
               
               <button 
                onClick={() => { setStops([]); setCabin(""); setIsFilterOpen(false); }}
                className="w-full mt-8 py-3 text-xs font-bold text-emerald-400 hover:text-white hover:bg-emerald-500 border border-emerald-100 rounded-xl transition-all"
               >
                 Clear All
               </button>
            </div>
          </aside>

          {/* --- FLIGHT LISTINGS --- */}
          <main className="flex-1 space-y-6">
            <div className="flex items-center justify-between px-2">
              <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[2px]">
                Showing <span className="text-emerald-500">{filteredFlights.length} Results</span>
              </p>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredFlights.map((f) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={f._id}
                  className="bg-white p-6 md:p-8 rounded-[32px] border border-emerald-50 shadow-sm hover:shadow-[0_20px_40px_rgba(16,185,129,0.08)] transition-all group relative overflow-hidden"
                >
                  <div className="flex flex-col xl:flex-row items-center gap-8">
                    
                    {/* Airline Info */}
                    <div className="flex items-center gap-5 w-full xl:w-52">
                      <div className="w-14 h-14 p-2.5 bg-emerald-50/50 rounded-2xl flex items-center justify-center border border-emerald-50 group-hover:scale-105 transition-transform">
                        <img src={f.logo} alt={f.airline} className="max-h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 leading-tight">{f.airline}</h3>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase mt-1 tracking-wider">
                          {f.class}
                        </span>
                      </div>
                    </div>

                    {/* Flight Timeline */}
                    <div className="flex-1 flex items-center justify-between w-full max-w-xl">
                      <div className="text-left">
                        <p className="text-2xl md:text-3xl font-black text-slate-900">{f.departure}</p>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{f.from}</p>
                      </div>

                      <div className="flex-1 px-6 md:px-12 flex flex-col items-center">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase mb-3 px-3 py-1 bg-emerald-50 rounded-full">
                          {f.duration}
                        </span>
                        <div className="w-full h-[2px] bg-emerald-50 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 text-emerald-500 border border-emerald-100 rounded-full">
                            <IconPlaneDeparture size={18} className="rotate-45" />
                          </div>
                        </div>
                        <span className="text-[10px] font-extrabold text-emerald-500/60 mt-3 uppercase tracking-[2px]">{f.stops}</span>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl md:text-3xl font-black text-slate-900">{f.arrival}</p>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{f.to}</p>
                      </div>
                    </div>

                    {/* Pricing & Selection */}
                    <div className="w-full xl:w-auto flex xl:flex-col items-center justify-between xl:justify-center gap-5 border-t xl:border-t-0 xl:border-l border-emerald-50 pt-6 xl:pt-0 xl:pl-12">
                      <div className="text-left xl:text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grand Total</p>
                        <p className="text-3xl font-black text-emerald-600">
                          <span className="text-sm font-bold mr-1">৳</span>
                          {f.price.toLocaleString()}
                        </p>
                      </div>
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-emerald-100 hover:scale-105">
                        Select Flight <IconArrowRight size={18} />
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="flex flex-col items-center"
      >
        <IconPlaneDeparture size={48} className="text-emerald-500 mb-4" />
        <p className="font-bold text-emerald-600 uppercase tracking-[4px] text-xs">Finding Best Deals...</p>
      </motion.div>
    </div>
  );
}