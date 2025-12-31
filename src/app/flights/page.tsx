/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { 
  IconPlaneDeparture, IconSearch, IconClock, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  IconArrowRight, IconFilter, IconX, IconChevronLeft,
  IconMapPin, IconCalendar, IconCircleCheckFilled, IconBolt
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/src/components/shared/hero/HeroSection";

export default function FlightsPage() {
  const [flights, setFlights] = useState<any[]>([]);
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
    <div className="min-h-screen bg-[#FDFDFD] pb-20">
      <HeroSection
        title="Experience Premium Travel"
        subtitle="Curated luxury flights for the modern explorer."
        ctaText="Book Now"
        imageUrl="/hero/HeroImages1.png"
        stats={[
          { label: "Elite Airlines", value: "500+" },
          { label: "Routes", value: "12,000" },
          { label: "Priority", value: "24/7" }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-16 relative z-30">
        
        {/* --- ULTRA MODERN SEARCH BAR --- */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-xl p-3 rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.08)] border border-emerald-50 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
            <div className="md:col-span-5 relative group">
              <IconMapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-600 group-focus-within:scale-110 transition-transform" size={20} />
              <input
                placeholder="From: City or Airport"
                className="w-full pl-14 pr-4 py-4 bg-emerald-50/20 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 text-sm font-semibold transition-all border border-transparent focus:border-emerald-100"
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="md:col-span-4 relative group">
              <IconCalendar className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-600" size={20} />
              <input
                type="text"
                placeholder="Travel Date"
                onFocus={(e) => (e.target.type = "date")}
                className="w-full pl-14 pr-4 py-4 bg-emerald-50/20 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 text-sm font-semibold transition-all border border-transparent focus:border-emerald-100"
              />
            </div>
            <div className="md:col-span-3">
              <button className="w-full py-4 bg-black hover:bg-green-700 text-white text-sm font-black rounded-2xl transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-3">
                <IconSearch size={18} /> SEARCH FLIGHTS
              </button>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- SIDEBAR FILTERS --- */}
          <aside className={`fixed inset-0 z-[100] bg-white p-8 lg:relative lg:inset-auto lg:z-auto lg:bg-transparent lg:p-0 lg:w-72 transition-all duration-500 lg:translate-x-0 ${isFilterOpen ? 'translate-x-0 opacity-100' : '-translate-x-full lg:opacity-100'}`}>
            <div className="lg:hidden flex justify-between items-center mb-8">
              <button onClick={() => setIsFilterOpen(false)} className="flex items-center gap-2 text-black font-black text-xs uppercase tracking-widest">
                <IconChevronLeft size={20} className="text-emerald-600" /> Close
              </button>
            </div>

            <div className="bg-white p-7 rounded-[32px] border border-emerald-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] sticky top-28">
               <div className="flex items-center gap-2 mb-6 border-b border-emerald-50 pb-4">
                 <IconFilter size={18} className="text-emerald-600" />
                 <h3 className="font-black text-black text-xs uppercase tracking-widest">Refine Search</h3>
               </div>
               
               <div className="space-y-8">
                 <FilterGroup title="Stops">
                   {["Non-stop", "1 Stop", "2+ Stops"].map(s => (
                     <FilterItem key={s} label={s} type="checkbox" checked={stops.includes(s)} onChange={() => setStops(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])} />
                   ))}
                 </FilterGroup>

                 <FilterGroup title="Travel Class">
                   {["Economy", "Business", "First Class"].map(c => (
                     <FilterItem key={c} label={c} type="radio" name="cabin" checked={cabin === c} onChange={() => setCabin(c)} />
                   ))}
                 </FilterGroup>
               </div>
               
               <button 
                onClick={() => { setStops([]); setCabin(""); setIsFilterOpen(false); }}
                className="w-full mt-10 py-3 text-[10px] font-black text-slate-400 hover:text-white hover:bg-black rounded-xl transition-all uppercase tracking-[2px] border border-slate-100"
               >
                 Reset Filters
               </button>
            </div>
          </aside>

          {/* --- FLIGHT LISTINGS --- */}
          <main className="flex-1 space-y-5">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-[10px] font-black text-black uppercase tracking-[2px]">
                  {filteredFlights.length} Premium Results
                </p>
              </div>
              <button onClick={() => setIsFilterOpen(true)} className="lg:hidden flex items-center gap-2 font-bold text-xs bg-emerald-50 px-4 py-2 rounded-full text-emerald-700">
                <IconFilter size={14} /> Filter
              </button>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredFlights.map((f, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={f._id}
                  className="bg-white p-5 md:p-6 rounded-[28px] border border-emerald-50 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all group overflow-hidden relative"
                >
                  {/* Premium Badge */}
                  {idx === 0 && (
                    <div className="absolute top-0 right-0 bg-emerald-600 text-white px-6 py-1 rounded-bl-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                      <IconBolt size={10} /> Fastest Flight
                    </div>
                  )}

                  <div className="flex flex-col xl:flex-row items-center gap-8">
                    {/* Airline */}
                    <div className="flex items-center gap-5 w-full xl:w-48">
                      <div className="w-12 h-12 p-2.5 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                        <img src={f.logo} alt={f.airline} className="max-h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="font-black text-black text-[13px] tracking-tight">{f.airline}</h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <IconCircleCheckFilled size={12} className="text-emerald-500" />
                          <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">{f.class}</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex-1 flex items-center justify-between w-full max-w-lg">
                      <div className="text-left">
                        <p className="text-2xl font-black text-black tracking-tighter">{f.departure}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{f.from}</p>
                      </div>

                      <div className="flex-1 px-8 flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-2">
                          <IconClock size={12} className="text-emerald-600" />
                          <span className="text-[10px] font-black text-black">{f.duration}</span>
                        </div>
                        <div className="w-full h-[1.5px] bg-emerald-50 relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-emerald-600">
                            <IconPlaneDeparture size={16} className="rotate-45" />
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-[3px]">{f.stops}</span>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-black text-black tracking-tighter">{f.arrival}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{f.to}</p>
                      </div>
                    </div>

                    {/* CTA & Price */}
                    <div className="w-full xl:w-auto flex xl:flex-col items-center justify-between xl:justify-center gap-5 border-t xl:border-t-0 xl:border-l border-slate-50 pt-5 xl:pt-0 xl:pl-10">
                      <div className="text-left xl:text-right">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Fare</p>
                        <p className="text-2xl font-black text-black">
                          <span className="text-sm font-bold text-emerald-600 mr-0.5">৳</span>
                          {f.price.toLocaleString()}
                        </p>
                      </div>
                      <button className="bg-emerald-600 hover:bg-black text-white px-7 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[2px] transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:shadow-black/10 active:scale-95">
                        SELECT <IconArrowRight size={14} />
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

// Reusable UI Components
const FilterGroup = ({ title, children }: any) => (
  <div>
    <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[3px] mb-4">{title}</h4>
    <div className="space-y-3">{children}</div>
  </div>
);

const FilterItem = ({ label, type, ...props }: any) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className="relative flex items-center justify-center">
      <input 
        type={type} 
        className={`w-4 h-4 border-2 border-slate-200 ${type === 'radio' ? 'rounded-full' : 'rounded'} text-emerald-600 focus:ring-emerald-500 transition-all checked:border-emerald-600`} 
        {...props} 
      />
    </div>
    <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{label}</span>
  </label>
);

function LoadingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="relative">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-16 h-16 border-t-2 border-b-2 border-emerald-600 rounded-full"
        />
        <IconPlaneDeparture size={24} className="text-emerald-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="mt-6 font-black text-black uppercase tracking-[5px] text-[10px] animate-pulse">Finding Elite Deals</p>
    </div>
  );
}