/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  PlaneTakeoff, 
  Clock, 
  MapPin, 
  DollarSign, 
  Timer, 
  Layers,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function EditFlightPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    airline: "",
    flightId: "",
    from: "",
    to: "",
    date: "",
    departTime: "",
    arriveTime: "",
    duration: "",
    stops: "Non-stop",
    class: "Economy",
    price: "",
    status: "Active",
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/flights/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          airline: data.airline || "",
          flightId: data.flightId || "",
          from: data.from || "",
          to: data.to || "",
          date: data.date || "",
          departTime: data.departTime || "",
          arriveTime: data.arriveTime || "",
          duration: data.duration || "",
          stops: data.stops || "Non-stop",
          class: data.class || "Economy",
          price: data.price || "",
          status: data.status || "Active",
        });
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load flight");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/flights/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });

      if (!res.ok) throw new Error("Update failed");
      router.push("/dashboard/flights");
    } catch (err) {
      alert("Error updating flight");
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse font-black text-gray-300 tracking-tighter text-2xl">LOADING...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black pb-10">
      <div className="max-w-3xl mx-auto pt-8 px-6">
        
        {/* Simple Navigation */}
        <Link href="/dashboard/flights" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all mb-6">
          <ArrowLeft className="w-3 h-3" /> Go Back
        </Link>

        {/* Header - Very Compact */}
        <div className="flex items-center justify-between border-b pb-6 mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tighter">EDIT FLIGHT</h1>
            <p className="text-gray-400 text-sm font-medium">Update schedule for {form.flightId}</p>
          </div>
          <div className="bg-gray-50 px-4 py-2 rounded-full border">
             <select name="status" value={form.status} onChange={handleChange} className="bg-transparent text-xs font-bold outline-none cursor-pointer">
                <option value="Active">Active</option>
                <option value="Delayed">Delayed</option>
                <option value="Cancelled">Cancelled</option>
             </select>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Airline</label>
              <input name="airline" value={form.airline} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-black outline-none transition-all font-bold text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Flight Number</label>
              <input name="flightId" value={form.flightId} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-black outline-none font-bold text-sm" />
            </div>
          </div>

          {/* Section 2: Route */}
          <div className="p-5 border border-gray-100 rounded-2xl bg-gray-50/30 grid grid-cols-2 gap-4">
             <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3"/> Origin</label>
                <input name="from" value={form.from} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-black outline-none font-bold text-sm" />
             </div>
             <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3"/> Destination</label>
                <input name="to" value={form.to} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-black outline-none font-bold text-sm" />
             </div>
          </div>

          {/* Section 3: Time & Price */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1 col-span-2 md:col-span-1">
              <label className="text-[10px] font-black uppercase text-gray-400">Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:border-black outline-none font-bold text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400">Dep. Time</label>
              <input type="time" name="departTime" value={form.departTime} onChange={handleChange} className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:border-black outline-none font-bold text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400">Arr. Time</label>
              <input type="time" name="arriveTime" value={form.arriveTime} onChange={handleChange} className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:border-black outline-none font-bold text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1"><Timer className="w-3 h-3"/> Duration</label>
              <input name="duration" value={form.duration} onChange={handleChange} placeholder="6h 20m" className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:border-black outline-none font-bold text-xs" />
            </div>
          </div>

          {/* Section 4: Pricing & Tier */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-6">
             <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400">Stops</label>
                <select name="stops" value={form.stops} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none font-bold text-sm appearance-none">
                  <option>Non-stop</option>
                  <option>1 Stop</option>
                  <option>2 Stops</option>
                </select>
             </div>
             <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400">Class</label>
                <select name="class" value={form.class} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none font-bold text-sm appearance-none">
                  <option>Economy</option>
                  <option>Business</option>
                  <option>First Class</option>
                </select>
             </div>
             <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400">Price (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full pl-8 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-black outline-none font-black text-sm" />
                </div>
             </div>
          </div>

          {/* Submit Action */}
          <div className="flex gap-3 pt-6">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-4 bg-black text-white rounded-xl font-black text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isSaving ? "SAVING..." : <><CheckCircle2 className="w-4 h-4"/> SAVE CHANGES</>}
            </button>
            <Link href="/dashboard/flights" className="px-8 py-4 bg-gray-100 text-black rounded-xl font-black text-sm hover:bg-gray-200 transition-all">
              CANCEL
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}