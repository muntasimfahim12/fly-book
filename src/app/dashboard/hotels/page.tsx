/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { 
  Hotel, 
  Plus, 
  Search, 
  Star, 
  MapPin, 
  Edit2, 
  Trash2, 
  Filter,
  LayoutGrid,
  ListFilter
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const hotels = [
  { id: "HTL-101", name: "Radisson Blu Water Garden", location: "Dhaka, Bangladesh", rating: 5, price: 120, status: "Available", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80" },
  { id: "HTL-102", name: "The Westin Dhaka", location: "Gulshan, Dhaka", rating: 5, price: 150, status: "Full", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80" },
  { id: "HTL-103", name: "Sayeman Beach Resort", location: "Cox's Bazar", rating: 4, price: 95, status: "Available", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80" },
  { id: "HTL-104", name: "InterContinental Dhaka", location: "Ramna, Dhaka", rating: 5, price: 180, status: "Available", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80" },
];

export default function HotelsPage() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span className="p-2 bg-blue-600 rounded-xl">
              <Hotel className="w-6 h-6 text-white" />
            </span>
            Hotels
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Oversee property listings, availability and pricing.</p>
        </div>
        
        <Link href="/dashboard/hotels/add">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add New Hotel
          </motion.button>
        </Link>
      </div>

      {/* Stats & Search Bar Combined */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search hotels, cities or zip codes..." 
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium shadow-sm"
          />
        </div>
        <div className="lg:col-span-4 flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
            <Filter className="w-4 h-4 text-blue-600" /> Filters
          </button>
          <button className="px-4 py-3.5 bg-slate-900 text-white rounded-2xl shadow-sm hover:bg-slate-800 transition-all">
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotels.map((hotel, index) => (
          <motion.div 
            key={hotel.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row p-3 gap-5">
              {/* Image Container */}
              <div className="lg:w-48 h-48 lg:h-auto rounded-2xl overflow-hidden relative">
                <img 
                  src={hotel.img} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-3 left-3 flex gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] font-black text-slate-900">{hotel.rating}.0</span>
                </div>
              </div>

              {/* Content Container */}
              <div className="flex-1 py-2 pr-3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                      hotel.status === 'Available' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : 'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {hotel.status}
                    </span>
                    <span className="text-[10px] font-bold text-slate-300 font-mono tracking-tighter uppercase">{hotel.id}</span>
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-800 mt-3 group-hover:text-blue-600 transition-colors line-clamp-1 tracking-tight">
                    {hotel.name}
                  </h3>
                  
                  <p className="text-slate-400 text-sm flex items-center gap-1.5 mt-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" /> {hotel.location}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Price/Night</p>
                    <p className="text-2xl font-black text-slate-900 tracking-tighter">
                      ${hotel.price} <span className="text-sm font-bold text-slate-300 italic">net</span>
                    </p>
                  </div>
                  
                  <div className="flex gap-2 items-center">
                    <button className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all shadow-sm border border-transparent hover:border-red-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More/Pagination */}
      <div className="flex justify-center pt-4">
        <button className="px-8 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-black text-slate-500 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm flex items-center gap-2">
          <ListFilter className="w-4 h-4" /> View All Properties
        </button>
      </div>
    </div>
  );
}