/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  IconPlaneDeparture, 
   
  IconPlaneArrival, 
  IconSearch, 
  IconFilter, 
  IconClock, 
   
  IconArmchair,
  IconChevronRight
} from "@tabler/icons-react";

// Mock Data for Flights
const flightsData = [
  {
    id: 1,
    airline: "Biman Bangladesh",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Biman_Bangladesh_Airlines_Logo.svg/1200px-Biman_Bangladesh_Airlines_Logo.svg.png",
    from: "Dhaka (DAC)",
    to: "Cox's Bazar (CXB)",
    departure: "10:30 AM",
    arrival: "11:45 AM",
    duration: "1h 15m",
    price: "4,500",
    class: "Economy",
    type: "Non-stop"
  },
  {
    id: 2,
    airline: "US-Bangla Airlines",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/US-Bangla_Airlines_logo.svg/1200px-US-Bangla_Airlines_logo.svg.png",
    from: "Dhaka (DAC)",
    to: "Chittagong (CGP)",
    departure: "02:15 PM",
    arrival: "03:00 PM",
    duration: "45m",
    price: "3,800",
    class: "Economy",
    type: "Non-stop"
  }
];

export default function FlightsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & SEARCH SECTION */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                Find Your Next <span className="text-green-600">Adventure</span>
              </h1>
              <p className="text-gray-500 mt-1 font-medium">Compare and book flights with ease</p>
            </div>
            
            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200 w-full md:w-[400px]">
              <div className="pl-3 text-gray-400"><IconSearch size={20} /></div>
              <input 
                type="text" 
                placeholder="Where do you want to fly?" 
                className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-green-700 transition">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SIDEBAR FILTERS */}
          <aside className="w-full lg:w-72 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <IconFilter size={18} className="text-green-600" /> Filters
                </h3>
                <button className="text-xs font-bold text-green-600">Reset</button>
              </div>

              {/* Stops Filter */}
              <div className="mb-6">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Stops</h4>
                <div className="space-y-3">
                  {["Non-stop", "1 Stop", "2+ Stops"].map((stop) => (
                    <label key={stop} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded-md border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="text-sm font-semibold text-gray-600 group-hover:text-green-600 transition">{stop}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cabin Class */}
              <div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Cabin Class</h4>
                <div className="space-y-3">
                  {["Economy", "Business", "First Class"].map((cls) => (
                    <label key={cls} className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="class" className="w-5 h-5 border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="text-sm font-semibold text-gray-600 group-hover:text-green-600 transition">{cls}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* FLIGHT LISTINGS */}
          <main className="flex-1 space-y-4">
            <div className="flex items-center justify-between mb-4 px-2">
              <p className="text-sm font-bold text-gray-500">{flightsData.length} Flights Found</p>
              <select className="bg-transparent border-none text-sm font-bold text-green-600 focus:ring-0 cursor-pointer">
                <option>Sort by: Cheapest</option>
                <option>Sort by: Fastest</option>
              </select>
            </div>

            {flightsData.map((flight) => (
              <div key={flight.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  
                  {/* Airline Info */}
                  <div className="flex items-center gap-4 w-full md:w-48">
                    <div className="w-12 h-12 relative flex-shrink-0">
                      <img src={flight.logo} alt={flight.airline} className="object-contain w-full h-full" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{flight.airline}</h3>
                      <p className="text-xs font-bold text-green-600">{flight.class}</p>
                    </div>
                  </div>

                  {/* Flight Route */}
                  <div className="flex-1 flex items-center justify-between w-full max-w-md relative">
                    <div className="text-center">
                      <p className="text-xl font-black text-gray-900">{flight.departure}</p>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mt-1">{flight.from}</p>
                    </div>

                    <div className="flex-1 px-8 flex flex-col items-center">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">{flight.duration}</p>
                      <div className="w-full h-[2px] bg-gray-100 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                          <IconPlaneDeparture size={16} className="text-green-600" />
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-green-600 mt-1 uppercase">{flight.type}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-xl font-black text-gray-900">{flight.arrival}</p>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mt-1">{flight.to}</p>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center md:flex-col gap-4 md:gap-1 w-full md:w-32 text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase">From</p>
                    <p className="text-2xl font-black text-gray-900 tracking-tighter">
                      <span className="text-sm font-bold mr-1 italic text-green-600">BDT</span>
                      {flight.price}
                    </p>
                    <button className="flex-1 md:w-full mt-2 bg-gray-900 text-white py-3 rounded-2xl font-bold text-sm hover:bg-green-600 transition-all active:scale-95">
                      Select
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </main>

        </div>
      </div>
    </div>
  );
}