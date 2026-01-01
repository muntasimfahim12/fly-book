"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  IconStarFilled,
  IconMapPin,
  IconWifi,
  IconPool,
  IconParking,
  IconFilter,
  IconSearch,
  IconChevronRight,
  IconAirConditioning
} from "@tabler/icons-react";
import { HeroSection } from "@/src/components/shared/hero/HeroSection";

// HotelType interface
interface HotelType {
  _id: string;
  name: string;
  location: {
    address: string;
    city: string;
    country: string;
  };
  image: string;
  rating: number;
  price: number;
  amenities: string[];
}

const HotelsPage = () => {
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hotels`);
        const data = await res.json();
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <p className="text-center mt-20 font-bold">Loading hotels...</p>;

  return (
    <div className="min-h-screen bg-[#F7F9FB]">

      {/* Hero Section */}
      <div className="relative w-full">
        <HeroSection
          title="Experience Premium Stays"
          subtitle="Curated luxury hotels for the modern traveler."
          ctaText="Book Your Room"
          imageUrl="/hero/hotels23.jpg"
          stats={[
            { label: "Luxury Hotels", value: "300+" },
            { label: "Destinations", value: "150+" },
            { label: "Guest Services", value: "24/7" }
          ]}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto mt-24 px-6 pb-16">

        {/* TOP SEARCH & TITLE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Stay in the <span className="text-green-600">Best Hotels</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">Explore {hotels.length}+ handpicked hotels and resorts</p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm w-full md:w-[450px]">
            <div className="pl-3 text-gray-400"><IconSearch size={22} /></div>
            <input
              type="text"
              placeholder="Search by city or hotel name..."
              className="bg-transparent border-none focus:ring-0 w-full text-sm font-semibold text-gray-700"
            />
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-green-700 transition shadow-lg shadow-green-100">
              Find
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT SIDEBAR: FILTERS */}
          <aside className="w-full lg:w-72 space-y-6">
            <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <IconFilter size={20} className="text-green-600" /> Filter
                </h3>
                <button className="text-xs font-black text-green-600 uppercase tracking-widest">Clear</button>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Price Range</h4>
                <input type="range" className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-green-600" />
                <div className="flex justify-between mt-2 text-xs font-bold text-gray-500">
                  <span>$0</span>
                  <span>$20,000+</span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="mb-8">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Star Rating</h4>
                <div className="space-y-3">
                  {[5, 4, 3, 2].map((star) => (
                    <label key={star} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <div className="flex items-center gap-1 text-sm font-bold text-gray-600 group-hover:text-green-600 transition">
                        {star} Stars <IconStarFilled size={14} className="text-yellow-400" />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT: HOTEL CARDS */}
          <main className="flex-1 space-y-6">
            <div className="flex items-center justify-between px-2">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Showing {hotels.length} matches</p>
              <select className="bg-transparent border-none text-sm font-bold text-gray-900 focus:ring-0 cursor-pointer">
                <option>Most Popular</option>
                <option>Price: Low to High</option>
                <option>Rating: High to Low</option>
              </select>
            </div>

            {hotels.map((hotel) => (
              <div key={hotel._id} className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:border-green-100 transition-all duration-500 flex flex-col md:flex-row h-full md:h-72">

                {/* Image Section */}
                <div className="relative w-full md:w-80 h-64 md:h-auto overflow-hidden">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <IconStarFilled size={14} className="text-yellow-500" />
                    <span className="text-xs font-black text-gray-900">{hotel.rating}</span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-green-600 mb-2">
                      <IconMapPin size={16} />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {hotel.location.address}, {hotel.location.city}, {hotel.location.country}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-green-600 transition-colors">{hotel.name}</h2>

                    {/* Amenities Icons */}
                    <div className="flex items-center gap-4 mt-4">
                      {hotel.amenities.includes("Free Wifi") && <IconWifi size={18} className="text-gray-400" title="WiFi" />}
                      {hotel.amenities.includes("Pool") && <IconPool size={18} className="text-gray-400" title="Pool" />}
                      {hotel.amenities.includes("AC") && <IconAirConditioning size={18} className="text-gray-400" title="AC" />}
                      {hotel.amenities.includes("Parking") && <IconParking size={18} className="text-gray-400" title="Parking" />}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-50">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Start from</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-bold text-green-600">BDT</span>
                        <span className="text-2xl font-black text-gray-900">{hotel.price}</span>
                        <span className="text-xs font-medium text-gray-400">/night</span>
                      </div>
                    </div>
                    <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl shadow-gray-200 hover:shadow-green-100 flex items-center gap-2 group/btn active:scale-95">
                      Book Now <IconChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
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
};

export default HotelsPage;
