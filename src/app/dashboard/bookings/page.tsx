/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  MoreVertical, 
  ArrowUpRight, 
  Download,
  Tag,
  Clock,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const initialBookings = [
  { id: "BK-8801", customer: "Ariful Islam", service: "Dubai Luxury Package", date: "2024-10-12", amount: "$1,200", status: "Confirmed", type: "Package" },
  { id: "BK-8802", customer: "Sarah Khan", service: "Emirates (DAC-DXB)", date: "2024-10-15", amount: "$450", status: "Pending", type: "Flight" },
  { id: "BK-8803", customer: "John Doe", service: "Radisson Blu (2 Nights)", date: "2024-10-18", amount: "$240", status: "Confirmed", type: "Hotel" },
  { id: "BK-8804", customer: "Mehedi Hasan", service: "Bali Paradise Tour", date: "2024-10-20", amount: "$850", status: "Cancelled", type: "Package" },
];

export default function BookingsPage() {
  const [bookings] = useState(initialBookings);

  return (
    <div className="space-y-6 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span className="p-2.5 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-200">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </span>
            Bookings
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Monitor and manage all customer reservations.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Stats Quick View (Responsive Grid) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Bookings", val: "1,284", color: "bg-emerald-50 text-emerald-600" },
          { label: "Pending", val: "14", color: "bg-amber-50 text-amber-600" },
          { label: "Revenue", val: "$42.5k", color: "bg-slate-900 text-white" },
          { label: "Cancelled", val: "08", color: "bg-rose-50 text-rose-600" }
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} p-4 rounded-3xl flex flex-col justify-center items-center text-center shadow-sm border border-black/5`}>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-80">{stat.label}</p>
            <p className="text-xl md:text-2xl font-black mt-1">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by Booking ID or Customer Name..." 
            className="w-full pl-11 pr-4 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-semibold focus:ring-4 focus:ring-emerald-50 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter className="w-4 h-4 text-emerald-600" /> Filter
          </button>
        </div>
      </div>

      {/* Bookings Table (Desktop) / Cards (Mobile) */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Service Details</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Date & Amount</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {bookings.map((book, idx) => (
                <motion.tr 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}
                  key={book.id} className="hover:bg-emerald-50/30 transition-all group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
                        {book.customer.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{book.customer}</p>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">{book.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-slate-400" />
                      <p className="text-sm font-bold text-slate-700">{book.service}</p>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium ml-5">{book.type}</p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-sm font-black text-slate-800">{book.amount}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 font-bold">
                      <Calendar className="w-3 h-3" /> {book.date}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase border ${
                      book.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      book.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                      'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {book.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-emerald-600 hover:text-white transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View (Cards) */}
        <div className="md:hidden divide-y divide-slate-50">
          {bookings.map((book) => (
            <div key={book.id} className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-black">
                    {book.customer.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-sm">{book.customer}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{book.id}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase border ${
                  book.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                  {book.status}
                </span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Service</p>
                  <p className="text-xs font-black text-slate-700">{book.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Total</p>
                  <p className="text-sm font-black text-emerald-600">{book.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Page 1 of 24</p>
          <div className="flex gap-2">
            <button className="p-2 bg-white border border-slate-200 rounded-xl disabled:opacity-50"><ChevronRight className="w-4 h-4 rotate-180" /></button>
            <button className="p-2 bg-white border border-slate-200 rounded-xl"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}