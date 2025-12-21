"use client";

import React from "react";
import { IconX, IconCalendar } from "@tabler/icons-react";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HolidayFormModal: React.FC<ModalProps> = ({ open, setOpen }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-[#f4f7f9] w-full max-w-4xl rounded-2xl shadow-2xl relative overflow-y-auto max-h-[90vh]">

        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <IconX size={20} />
        </button>

        {/* Header */}
        <div className="bg-white py-10 px-6 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-8">
            Request Holiday Package in 3 easy steps
          </h2>
        </div>

        {/* Form */}
        <div className="px-6 py-10">
          <h3 className="text-2xl font-bold text-center text-green-600 mb-2">
            Whats your plan?
          </h3>

          <div className="bg-white rounded-xl p-6 space-y-6 shadow">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Enter your preferred destination"
                className="w-full border rounded-lg px-4 py-3 outline-green-500"
              />

              <div className="relative">
                <input
                  type="date"
                  className="w-full border rounded-lg px-4 py-3 outline-green-500"
                />
                <IconCalendar className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Enter first name"
                className="w-full border rounded-lg px-4 py-3 outline-green-500"
              />
              <input
                type="text"
                placeholder="Enter last name"
                className="w-full border rounded-lg px-4 py-3 outline-green-500"
              />
              <input
                type="tel"
                placeholder="+88 xxxxxxxxxx"
                className="w-full border rounded-lg px-4 py-3 outline-green-500"
              />
              <input
                type="email"
                placeholder="Enter email"
                className="w-full border rounded-lg px-4 py-3 outline-green-500"
              />
            </div>

            <textarea
              rows={4}
              placeholder="Tell us a bit about your requirements"
              className="w-full border rounded-lg px-4 py-3 outline-green-500"
            />

            <button className="w-full bg-green-600 hover:bg-black text-white py-4 rounded-xl font-bold transition">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayFormModal;
