/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { 
  PlaneTakeoff, 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ArrowUpDown,
  Calendar,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// ডামি ফ্লাইট ডেটা
const initialFlights = [
  { id: "FL-001", airline: "Emirates", from: "Dhaka (DAC)", to: "Dubai (DXB)", date: "2024-10-25", time: "10:30 AM", price: "$450", status: "Active" },
  { id: "FL-002", airline: "Qatar Airways", from: "Dhaka (DAC)", to: "Doha (DOH)", date: "2024-10-26", time: "02:15 PM", price: "$520", status: "Active" },
  { id: "FL-003", airline: "Biman Bangladesh", from: "Dhaka (DAC)", to: "London (LHR)", date: "2024-10-28", time: "08:00 AM", price: "$890", status: "Delayed" },
  { id: "FL-004", airline: "Turkish Airlines", from: "Dhaka (DAC)", to: "Istanbul (IST)", date: "2024-10-30", time: "11:45 PM", price: "$710", status: "Active" },
  { id: "FL-005", airline: "Air India", from: "Dhaka (DAC)", to: "Delhi (DEL)", date: "2024-11-01", time: "05:30 PM", price: "$180", status: "Cancelled" },
];

const FlightsPage = () => {
  const [flights] = useState(initialFlights);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span className="p-2 bg-blue-600 rounded-xl">
              <PlaneTakeoff className="w-6 h-6 text-white" />
            </span>
            Flights
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Manage schedules, pricing and airline operations.</p>
        </div>
        
        {/* Click করলে Add Flight পেজে যাবে */}
        <Link href="/dashboard/flights/add">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add New Flight
          </motion.button>
        </Link>
      </div>

      {/* Modern Filter Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by ID, airline or destination..." 
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 rounded-xl text-sm font-bold text-blue-600 hover:bg-blue-100 transition-colors">
            Export <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Airline & ID</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Route</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Schedule</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {flights.map((flight, index) => (
                <motion.tr 
                  key={flight.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-blue-50/30 transition-all cursor-default"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${flight.airline}&background=random&color=fff`} 
                          alt="logo" 
                          className="w-8 h-8 rounded-lg"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{flight.airline}</p>
                        <p className="text-[10px] text-blue-600 font-bold font-mono bg-blue-50 px-1.5 py-0.5 rounded mt-1 inline-block">{flight.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-700">{flight.from.split(' ')[0]}</span>
                      <ChevronRight className="w-3 h-3 text-slate-300" />
                      <span className="text-sm font-bold text-slate-700">{flight.to.split(' ')[0]}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium mt-1">Direct Flight</p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-1.5">
                      <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" /> {flight.date}
                      </p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1.5 font-bold">
                        <Clock className="w-3.5 h-3.5" /> {flight.time}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-lg font-black text-slate-900">{flight.price}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter shadow-sm border ${
                      flight.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      flight.status === 'Delayed' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                      'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {flight.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button title="Edit" className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button title="Delete" className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all shadow-sm border border-transparent hover:border-red-100">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Modern Pagination */}
        <div className="px-8 py-6 bg-slate-50/30 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing 5 of 124 Results</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-400 cursor-not-allowed">PREV</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm">NEXT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;