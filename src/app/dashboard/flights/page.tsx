/* eslint-disable jsx-a11y/alt-text */
"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  PlaneTakeoff,
  Plus,
  Edit2,
  Trash2,
  ChevronRight,
  Calendar,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface FlightType {
  _id: string;
  airline: string;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  status: "Active" | "Delayed" | "Cancelled";
  logo?: string;
}

const FlightsPage = () => {
  const [flights, setFlights] = useState<FlightType[]>([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  const fetchFlights = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/flights`);
      const data = await res.json();
      setFlights(data);
    } catch (err) {
      console.error("Fetch flights error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this flight?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/flights/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Delete failed");

      // instant UI update
      setFlights((prev) => prev.filter((f) => f._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete flight");
    }
  };

  if (loading)
    return <p className="text-center mt-20 font-bold">Loading flights...</p>;

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <span className="p-2 bg-blue-600 rounded-xl">
              <PlaneTakeoff className="w-6 h-6 text-white" />
            </span>
            Flights
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Manage schedules, pricing and airline operations.
          </p>
        </div>

        <Link href="/dashboard/flights/add">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-xl hover:bg-blue-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add New Flight
          </motion.button>
        </Link>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="px-8 py-5 text-xs font-black text-slate-400">
                  Airline
                </th>
                <th className="px-8 py-5 text-xs font-black text-slate-400">
                  Route
                </th>
                <th className="px-8 py-5 text-xs font-black text-slate-400">
                  Schedule
                </th>
                <th className="px-8 py-5 text-xs font-black text-slate-400">
                  Price
                </th>
                <th className="px-8 py-5 text-xs font-black text-slate-400">
                  Status
                </th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {flights.map((flight, index) => (
                <motion.tr
                  key={flight._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-blue-50/40"
                >
                  {/* Airline */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          flight.logo ||
                          `https://ui-avatars.com/api/?name=${flight.airline}`
                        }
                        className="w-10 h-10 rounded-xl"
                      />
                      <div>
                        <p className="font-black text-slate-800">
                          {flight.airline}
                        </p>
                        <p className="text-xs text-blue-600 font-mono">
                          {flight._id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Route */}
                  <td className="px-8 py-5 font-bold">
                    {flight.from} <ChevronRight className="inline w-3" />{" "}
                    {flight.to}
                  </td>

                  {/* Schedule */}
                  <td className="px-8 py-5 text-sm">
                    <p className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      {flight.date}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-4 h-4" />
                      {flight.time}
                    </p>
                  </td>

                  {/* Price */}
                  <td className="px-8 py-5 font-black">${flight.price}</td>

                  {/* Status */}
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 rounded-xl text-xs font-black bg-emerald-50 text-emerald-600">
                      {flight.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      {/* EDIT */}
                      <Link href={`/dashboard/flights/edit/${flight._id}`}>
                        <button className="p-2 rounded-xl bg-slate-50 hover:bg-blue-600 hover:text-white transition">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </Link>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(flight._id)}
                        className="p-2 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;
