"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  IconCircleCheck,
  IconPlaneDeparture,
  IconDownload,
  IconHome,
} from "@tabler/icons-react";

export default function BookingSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-white rounded-[36px] p-10 shadow-xl border border-emerald-100 text-center"
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
            <IconCircleCheck size={44} className="text-emerald-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-black mb-3">
          Booking Confirmed!
        </h1>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Your flight booking has been successfully completed.  
          A confirmation email with your ticket details will be sent shortly.
        </p>

        {/* Booking Info Card */}
        <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-200 text-left">
          <div className="flex items-center gap-3 mb-4">
            <IconPlaneDeparture className="text-emerald-600" />
            <p className="font-black text-sm uppercase tracking-wider">
              Flight Details
            </p>
          </div>

          <div className="space-y-2 text-sm font-semibold text-slate-600">
            <p>Booking Status: <span className="text-emerald-600">Confirmed</span></p>
            <p>Ticket Type: Economy Class</p>
            <p>Payment: Successful</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-black text-white py-4 rounded-2xl text-xs font-black uppercase tracking-[2px] transition-all active:scale-95"
          >
            <IconDownload size={16} />
            Download Ticket
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-black py-4 rounded-2xl text-xs font-black uppercase tracking-[2px] transition-all active:scale-95"
          >
            <IconHome size={16} />
            Go Home
          </button>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-[10px] uppercase tracking-[3px] text-slate-400">
          Thank you for choosing FlyBook ✈️
        </p>
      </motion.div>
    </div>
  );
}
