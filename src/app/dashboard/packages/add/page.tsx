"use client";

import React from "react";
import { 
  ArrowLeft, Package, MapPin, 
  Calendar, DollarSign, Save, 
  Camera, Info, ChevronDown, ListChecks
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AddPackagePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-6 pb-12">
      <Link href="/dashboard/packages" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm transition-all group w-fit">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Packages
      </Link>

      <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
          <div className="w-20 h-20 bg-blue-600 rounded-[2.2rem] flex items-center justify-center shadow-2xl shadow-blue-200 rotate-6 group-hover:rotate-0 transition-transform">
            <Package className="text-white w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create New Package</h1>
            <p className="text-slate-400 font-medium">Build an unforgettable tour experience for travelers.</p>
          </div>
        </div>

        <form className="space-y-10">
          {/* Section 1: Package Title & Destination */}
          <div className="space-y-6">
            <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              <Info className="w-3.5 h-3.5" /> General Info
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Package Title</label>
                <input type="text" placeholder="e.g. 5 Days Wonders of Bali" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none font-semibold transition-all" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Main Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                    <input type="text" placeholder="City, Country" className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none font-semibold transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Duration</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                    <input type="text" placeholder="e.g. 4 Days, 3 Nights" className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none font-semibold transition-all" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Features */}
          <div className="space-y-6">
            <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              <ListChecks className="w-3.5 h-3.5" /> Pricing & Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Base Price ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                  <input type="number" placeholder="00.00" className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none font-semibold transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
                <div className="relative">
                  <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none font-semibold transition-all appearance-none cursor-pointer">
                    <option>Honeymoon</option>
                    <option>Adventure</option>
                    <option>Family</option>
                    <option>Business</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Media */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Featured Image</label>
            <div className="border-4 border-dashed border-slate-50 rounded-[2.5rem] p-12 flex flex-col items-center justify-center group hover:bg-blue-50/30 hover:border-blue-100 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Camera className="w-7 h-7 text-blue-600" />
              </div>
              <p className="mt-4 font-black text-slate-700">Drop your package banner here</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Recommended: 1200 x 800 px</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Link href="/dashboard/packages" className="px-10 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-xs hover:bg-slate-200 transition-all">DISCARD</Link>
            <button type="submit" className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-3">
              <Save className="w-5 h-5" /> PUBLISH PACKAGE
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}