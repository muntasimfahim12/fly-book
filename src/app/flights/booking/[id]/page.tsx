/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  IconArrowLeft,
  IconPlaneDeparture,
  IconClock,
  IconUser,
  IconMail,
  IconPhone,
  IconShieldCheck,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function FlightBookingPage() {
  const { id } = useParams();
  const router = useRouter();

  const [flight, setFlight] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [passenger, setPassenger] = useState({
    name: "",
    email: "",
    phone: "",
  });

  /* ---------------- Fetch Single Flight ---------------- */
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/flights/${id}`
        );
        const data = await res.json();
        setFlight(data);
      } catch (error) {
        console.error("Booking fetch error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [id]);

  /* ---------------- Form Handler ---------------- */
  const handleChange = (e: any) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  /* ---------------- Confirm Booking ---------------- */
  const handleConfirmBooking = () => {
    if (!passenger.name || !passenger.email || !passenger.phone) {
      alert("Please fill all passenger details");
      return;
    }

    const bookingPayload = {
      flightId: flight._id,
      passenger,
      price: flight.price,
    };

    console.log("BOOKING DATA:", bookingPayload);

    // 👉 backend POST later
    router.push("/booking-success");
  };

  if (loading) return <BookingLoading />;

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-14 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-10 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-black"
        >
          <IconArrowLeft size={16} /> Back to flights
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ---------------- FLIGHT SUMMARY ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-emerald-50 shadow-sm"
          >
            <h2 className="text-lg font-black mb-6">Flight Summary</h2>

            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xl font-black">{flight.airline}</p>
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  {flight.class}
                </p>
              </div>
              <IconPlaneDeparture className="text-emerald-600" />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-black">{flight.departure}</p>
                <p className="text-xs font-bold text-slate-400">
                  {flight.from}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <IconClock size={16} className="text-emerald-600 mb-2" />
                <p className="text-xs font-bold">{flight.duration}</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">
                  {flight.stops}
                </p>
              </div>

              <div>
                <p className="text-3xl font-black">{flight.arrival}</p>
                <p className="text-xs font-bold text-slate-400">
                  {flight.to}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ---------------- PASSENGER & PAYMENT ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[32px] p-8 border border-emerald-50 shadow-sm"
          >
            <h2 className="text-lg font-black mb-6">
              Passenger Information
            </h2>

            <div className="space-y-4">
              <Input
                icon={<IconUser size={16} />}
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
              />
              <Input
                icon={<IconMail size={16} />}
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
              />
              <Input
                icon={<IconPhone size={16} />}
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
              />
            </div>

            {/* Price */}
            <div className="border-t mt-6 pt-6">
              <p className="text-xs uppercase tracking-widest text-slate-400">
                Total Payable
              </p>
              <p className="text-3xl font-black">
                <span className="text-emerald-600">৳</span>{" "}
                {flight.price.toLocaleString()}
              </p>
            </div>

            {/* Security */}
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-widest">
              <IconShieldCheck size={14} className="text-emerald-600" />
              Secure & Encrypted Booking
            </div>

            <button
              onClick={handleConfirmBooking}
              className="w-full mt-6 bg-emerald-600 hover:bg-black text-white py-4 rounded-2xl text-xs font-black uppercase tracking-[2px] transition-all active:scale-95"
            >
              Confirm Booking
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Reusable Components ---------------- */

function Input({ icon, ...props }: any) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-semibold"
      />
    </div>
  );
}

function BookingLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xs font-black uppercase tracking-[5px] text-emerald-600 animate-pulse">
        Preparing Your Booking
      </p>
    </div>
  );
}
