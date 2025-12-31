"use client";

import React, { useState } from "react";
import { 
  PlaneTakeoff, 
  ArrowLeft, 
  Upload, 
  Calendar as CalendarIcon, 
  Clock, 
  DollarSign, 
  Globe, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  CheckCircle2 
} from "lucide-react";
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { motion } from "framer-motion";

export default function AddFlightPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          href="/dashboard/flights" 
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Flights
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center gap-6">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
          <PlaneTakeoff className="text-white w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900">Add New Flight</h1>
          <p className="text-slate-500 font-medium">Fill in the details below to create a new flight schedule.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* --- Basic Information --- */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Airline Name</label>
              <input 
                type="text" 
                placeholder="e.g. Emirates" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Flight ID / Number</label>
              <input 
                type="text" 
                placeholder="e.g. EK-582" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm font-medium"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> Departure City
              </label>
              <input 
                type="text" 
                placeholder="From (e.g. Dhaka)" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> Arrival City
              </label>
              <input 
                type="text" 
                placeholder="To (e.g. London)" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm font-medium"
                required
              />
            </div>
          </div>
        </div>

        {/* --- Pricing & Schedule --- */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            Pricing & Schedule
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5" /> Date
              </label>
              <input 
                type="date" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Departure Time
              </label>
              <input 
                type="time" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" /> Base Price ($)
              </label>
              <input 
                type="number" 
                placeholder="0.00" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm font-medium"
                required
              />
            </div>
          </div>
        </div>

        {/* --- Media Upload --- */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Airline Logo</h2>
          <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center hover:bg-blue-50/50 hover:border-blue-200 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload className="text-blue-600 w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-700">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-400 mt-1 uppercase font-black tracking-widest">SVG, PNG, JPG (MAX. 800x400px)</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link 
            href="/dashboard/flights" 
            className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-70 disabled:translate-y-0"
          >
            {isSubmitting ? "Creating..." : "Create Flight"}
          </button>
        </div>
      </form>
    </div>
  );
}