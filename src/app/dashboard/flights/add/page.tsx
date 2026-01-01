/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import {
  PlaneTakeoff,
  ArrowLeft,
  Upload,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Briefcase,
  ChevronRight,
  Hash,
  Timer,
  Layers,
} from "lucide-react";
import Link from "next/link";

export default function AddFlightPage() {
  // --- State Management ---
  const [airline, setAirline] = useState("");
  const [flightId, setFlightId] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");
  const [departTime, setDepartTime] = useState("");
  const [arriveTime, setArriveTime] = useState("");
  const [duration, setDuration] = useState("");
  const [stops, setStops] = useState("Non-stop");
  const [classType, setClassType] = useState("Economy");
  const [price, setPrice] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // --- Logo Upload ---
      let logoUrl = "";
      if (logo) {
        const formData = new FormData();
        formData.append("file", logo);
        formData.append("upload_preset", "flybook");

        const uploadRes = await fetch(
          "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
          { method: "POST", body: formData }
        );
        const uploadData = await uploadRes.json();
        logoUrl = uploadData.secure_url;
      }

      // --- Prepare Data ---
      const flightData = {
        airline,
        flightId,
        from: fromCity,
        to: toCity,
        date,
        departTime,
        arriveTime,
        duration,
        stops,
        class: classType,
        price: Number(price),
        logo: logoUrl || "",
        status: "Active",
      };

      // --- API Call ---
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/flights`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flightData),
      });

      if (!res.ok) throw new Error("Failed to create flight");

      alert("✅ Flight created successfully!");

      // --- Reset Form ---
      setAirline(""); setFlightId(""); setFromCity(""); setToCity("");
      setDate(""); setDepartTime(""); setArriveTime(""); setDuration("");
      setStops("Non-stop"); setClassType("Economy"); setPrice(""); setLogo(null);

    } catch (err) {
      console.error(err);
      alert("❌ Error creating flight");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] pb-20">
      <div className="max-w-5xl mx-auto pt-10 px-6">
        
        {/* Back Navigation */}
        <Link
          href="/dashboard/flights"
          className="group flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black transition-all mb-8"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Back to Inventory
        </Link>

        {/* Header Card */}
        <div className="bg-white border border-gray-100 p-10 rounded-[40px] shadow-sm flex flex-col md:flex-row items-center gap-8 mb-10">
          <div className="w-20 h-20 bg-black rounded-[28px] flex items-center justify-center shadow-2xl shadow-gray-300">
            <PlaneTakeoff className="text-white w-10 h-10" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black tracking-tight">Create New Flight</h1>
            <p className="text-gray-400 font-medium mt-1">Configure your route, schedule and pricing model.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Identity & Route */}
          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white border border-gray-100 rounded-[35px] p-8 space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Identity
              </h2>
              <input
                placeholder="Airline Name"
                value={airline}
                onChange={(e) => setAirline(e.target.value)}
                required
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none font-semibold transition-all"
              />
              <input
                placeholder="Flight ID (e.g. EK-582)"
                value={flightId}
                onChange={(e) => setFlightId(e.target.value)}
                required
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none font-semibold transition-all"
              />
            </section>

            <section className="bg-white border border-gray-100 rounded-[35px] p-8 space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Route
              </h2>
              <input
                placeholder="From (Origin)"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                required
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none font-semibold transition-all"
              />
              <input
                placeholder="To (Destination)"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                required
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none font-semibold transition-all"
              />
            </section>
          </div>

          {/* Section 2: Schedule & Duration */}
          <section className="bg-white border border-gray-100 rounded-[35px] p-10">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Schedule Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase ml-2 text-gray-400">Flight Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase ml-2 text-gray-400">Departure</label>
                <input type="time" value={departTime} onChange={(e) => setDepartTime(e.target.value)} required className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase ml-2 text-gray-400">Arrival</label>
                <input type="time" value={arriveTime} onChange={(e) => setArriveTime(e.target.value)} required className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase ml-2 text-gray-400">Total Duration</label>
                <div className="relative">
                  <Timer className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input placeholder="6h 30m" value={duration} onChange={(e) => setDuration(e.target.value)} required className="w-full pl-11 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none font-bold" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Configuration & Pricing */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white border border-gray-100 rounded-[35px] p-10 flex flex-col justify-center">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Flight Tier & Cost
              </h2>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <select value={stops} onChange={(e) => setStops(e.target.value)} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none font-bold appearance-none cursor-pointer">
                  <option>Non-stop</option>
                  <option>1 Stop</option>
                  <option>2 Stops</option>
                </select>
                <select value={classType} onChange={(e) => setClassType(e.target.value)} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none font-bold appearance-none cursor-pointer">
                  <option>Economy</option>
                  <option>Business</option>
                  <option>First Class</option>
                </select>
              </div>
              <div className="relative group">
                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300 group-focus-within:text-black transition-colors" />
                <input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full pl-14 pr-8 py-6 bg-gray-50 border-none rounded-[24px] focus:ring-2 focus:ring-black outline-none text-3xl font-black transition-all placeholder:text-gray-200"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-gray-400 uppercase tracking-widest text-xs">USD / PAX</span>
              </div>
            </div>

            {/* Logo Box */}
            <div className="bg-white border border-gray-100 rounded-[35px] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => e.target.files && setLogo(e.target.files[0])} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-all duration-500">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-black mb-1">Airline Logo</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold">{logo ? logo.name : "Upload SVG/PNG"}</p>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 bg-black text-white rounded-[30px] font-black text-xl hover:bg-[#222] transition-all flex items-center justify-center gap-4 shadow-2xl shadow-gray-300 active:scale-[0.98] disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                  Finalizing...
                </div>
              ) : (
                <>Deploy Flight Route <ChevronRight className="w-6 h-6" /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}