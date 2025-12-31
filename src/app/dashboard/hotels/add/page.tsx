"use client";

import React from "react";
import { 
  ArrowLeft, 
  Camera, 
  MapPin, 
  DollarSign, 
  Save, 
  Hotel,
  Info,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AddHotelPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-4xl mx-auto space-y-6 pb-12"
    >
      {/* Back Button */}
      <Link 
        href="/dashboard/hotels" 
        className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm transition-all group w-fit"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
        Back to Property List
      </Link>

      <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-200 rotate-3 group-hover:rotate-0 transition-transform">
            <Hotel className="text-white w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Add New Property</h1>
            <p className="text-slate-400 font-medium flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500" />
              Fill in the details to list a new luxury hotel or resort.
            </p>
          </div>
        </div>

        <form className="space-y-10">
          {/* Section 1: Basic Details */}
          <div className="space-y-6">
            <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] ml-1">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1">Hotel Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Grand Sultan Resort" 
                  className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none font-semibold transition-all text-slate-800" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1">Location / Address</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                  <input 
                    type="text" 
                    placeholder="Sylhet, Bangladesh" 
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none font-semibold transition-all text-slate-800" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Stats */}
          <div className="space-y-6">
            <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] ml-1">Pricing & Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1">Price per Night</label>
                <div className="relative">
                  <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                  <input 
                    type="number" 
                    placeholder="00.00" 
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none font-semibold transition-all text-slate-800" 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1">Star Rating</label>
                <div className="relative">
                  <select className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none font-semibold transition-all text-slate-800 appearance-none cursor-pointer">
                    <option>Select Rating</option>
                    <option>5 Star (Luxury)</option>
                    <option>4 Star (Premium)</option>
                    <option>3 Star (Business)</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1">Availability</label>
                <div className="relative">
                  <select className="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none font-semibold transition-all text-slate-800 appearance-none cursor-pointer">
                    <option>Available</option>
                    <option>Full / Sold Out</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Media */}
          <div className="space-y-6">
            <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] ml-1">Visual Assets</h2>
            <div className="border-4 border-dashed border-slate-50 rounded-[2.5rem] p-12 flex flex-col items-center justify-center group hover:bg-blue-50/30 hover:border-blue-100 transition-all cursor-pointer">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
              <p className="mt-6 font-black text-slate-700 tracking-tight">Upload Property High-Res Photo</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">Maximum size: 5MB (PNG, JPG)</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-slate-50">
            <Link 
              href="/dashboard/hotels" 
              className="px-10 py-4 bg-slate-50 text-slate-500 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all text-center"
            >
              DISCARD
            </Link>
            <button 
              type="submit" 
              className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              <Save className="w-5 h-5" /> SAVE PROPERTY
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}