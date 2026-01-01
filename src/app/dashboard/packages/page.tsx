/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { 
  Package, Plus, Search, MapPin, 
  Calendar, Clock, Edit2, Trash2, 
  Filter, ArrowRight, Star
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const packages = [
  { id: "PKG-501", title: "Luxury Dubai Escape", location: "Dubai, UAE", duration: "5 Days, 4 Nights", price: 1200, rating: 4.9, img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
  { id: "PKG-502", title: "Switzerland Alpine Tour", location: "Zermatt, Switzerland", duration: "7 Days, 6 Nights", price: 2500, rating: 5.0, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" },
  { id: "PKG-503", title: "Bali Tropical Paradise", location: "Bali, Indonesia", duration: "4 Days, 3 Nights", price: 850, rating: 4.8, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80" },
];

export default function PackagesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span className="p-2 bg-blue-600 rounded-xl">
              <Package className="w-6 h-6 text-white" />
            </span>
            Tour Packages
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Design and manage custom travel experiences.</p>
        </div>
        
        <Link href="/dashboard/packages/add">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
          >
            <Plus className="w-5 h-5" /> Add New Package
          </motion.button>
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-3 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search packages by destination or title..." 
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
        <button className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Advanced Filter
        </button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <motion.div key={pkg.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all overflow-hidden"
          >
            <div className="h-48 overflow-hidden relative">
              <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-black text-slate-900">{pkg.rating}</span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase rounded-lg tracking-widest shadow-lg">
                  {pkg.id}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-black text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{pkg.title}</h3>
                <p className="text-slate-400 text-xs font-bold flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-blue-500" /> {pkg.location}
                </p>
              </div>

              <div className="flex items-center gap-4 text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold">{pkg.duration}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase leading-none mb-1">Price Starts</p>
                  <p className="text-xl font-black text-slate-900">${pkg.price}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all shadow-sm border border-transparent hover:border-red-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}