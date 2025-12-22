/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { IconX, IconMapPin, IconUser, IconClock, IconCalendar, IconMessageCircle, IconPhone, IconCheck } from "@tabler/icons-react";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  packageData: {
    price: string;
    spots: string[];
    duration: string;
    people: number;
    pickup: string;
  };
}

const HolidayFormModal: React.FC<ModalProps> = ({ open, setOpen, packageData }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4 py-8 overflow-auto">
      <div className="bg-white w-full max-w-7xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">

        {/* Left Side - Form */}
        <div className="md:w-2/3 p-8 md:p-12 overflow-y-auto relative">
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 tracking-tight mb-2">Request Holiday Package</h2>
            <p className="text-gray-500">in 3 easy steps</p>
          </div>

          {/* Steps */}
          <div className="flex flex-col md:flex-row gap-6 mb-10">
            <div className="flex items-start gap-3">
              <div className="bg-green-600 text-white p-2 rounded-full">
                <IconMessageCircle size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Tell us about your plans</h4>
                <p className="text-gray-500 text-sm">Provide your trip details and preferences</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-green-600 text-white p-2 rounded-full">
                <IconPhone size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Trip planner reaches out</h4>
                <p className="text-gray-500 text-sm">Our planner will contact you for a personalized plan</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-green-600 text-white p-2 rounded-full">
                <IconCheck size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Confirm Booking</h4>
                <p className="text-gray-500 text-sm">Finalize your holiday plan and confirm your booking</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              />
              <input
                type="date"
                placeholder="Preferred Journey Date"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              />
            </div>

            <textarea
              rows={3}
              placeholder="Additional Requirements"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            />

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-sm transition shadow-md hover:shadow-lg">
              SUBMIT REQUEST
            </button>
          </div>
        </div>

        {/* Right Side - Package Info */}
        <div className="md:w-1/3 bg-gray-50 p-8 md:p-12 border-l overflow-y-auto flex flex-col justify-start">
          <h3 className="text-2xl font-bold text-green-600 mb-6 tracking-tight">Package Details</h3>

          <div className="mb-6">
            <p className="text-gray-500 uppercase tracking-wide text-sm mb-1">Starting From</p>
            <h4 className="text-3xl font-bold text-green-600">{packageData.price}</h4>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-2 flex items-center gap-2 text-gray-700 text-lg">
              <IconMapPin /> Holiday Package Spots
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {packageData.spots.map((spot, idx) => (
                <li key={idx}>{spot}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4 flex items-center gap-2 text-gray-700">
            <IconClock /> <span>Duration: {packageData.duration}</span>
          </div>

          <div className="mb-4 flex items-center gap-2 text-gray-700">
            <IconUser /> <span>Number of People: {packageData.people}</span>
          </div>

          <div className="mb-4 flex items-center gap-2 text-gray-700">
            <IconMapPin /> <span>Pickup: {packageData.pickup}</span>
          </div>

          <div className="mt-auto">
            <p className="text-gray-400 text-sm italic">Fill the form and our travel experts will reach out with your personalized trip plan.</p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6 bg-white p-2 rounded-full hover:bg-gray-100 shadow-md"
        >
          <IconX size={22} />
        </button>
      </div>
    </div>
  );
};

export default HolidayFormModal;
