"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import allData from "../../../data/all.json"; 
import {
  IconCalendar,
  IconUser,
  IconMapPin,
  IconFilter
} from "@tabler/icons-react";
import HolidayFormModal from "../HolidayFormModal";

const PackageDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);

  const toggleFilter = (duration: string) => {
    setSelectedDurations((prev) =>
      prev.includes(duration)
        ? prev.filter((d) => d !== duration)
        : [...prev, duration]
    );
  };

  const resetFilters = () => setSelectedDurations([]);

  // ✅ single allData থেকে search
  const packageItem = allData.find((item) => item.id.toString() === id);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filteredData = useMemo(() => {
    if (selectedDurations.length === 0) return allData;
    return allData.filter((item) =>
      selectedDurations.some((d) => item.days.includes(d))
    );
  }, [selectedDurations]);

  if (!packageItem) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-xl font-semibold text-gray-500">Package not found!</p>
        <button onClick={() => router.back()} className="mt-4 text-green-600 underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* TOP NAVIGATION / BREADCRUMB */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-800">Explore Packages</h1>
          <p className="text-gray-500 text-sm">Home / Packages / {packageItem.country}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* LEFT FILTERS */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 font-bold text-gray-800">
                  <IconFilter size={20} />
                  <span>Filters</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-green-600 hover:bg-green-50 px-2 py-1 rounded transition"
                >
                  RESET
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider text-[11px]">Duration</p>
                  {["Day Tour", "5 Days", "4 Days", "3 Days"].map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 text-gray-600 hover:text-green-600 cursor-pointer mb-3 group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDurations.includes(item)}
                        onChange={() => toggleFilter(item)}
                        className="w-4 h-4 accent-green-600 rounded border-gray-300"
                      />
                      <span className="text-[14px] group-hover:font-medium transition-all">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <main className="lg:col-span-3 space-y-6">
            <div className="group border border-gray-100 rounded-2xl bg-white p-5 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-shadow duration-300">

              {/* IMAGE */}
              <div className="relative w-full md:w-72 h-48 rounded-xl overflow-hidden shadow-inner bg-gray-100">
                <Image
                  src={packageItem.image}
                  alt={packageItem.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 uppercase">
                  <IconMapPin size={12} className="text-green-400" />
                  {packageItem.country}
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2 leading-tight group-hover:text-green-700 transition-colors">
                    {packageItem.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                    {packageItem.details || "Experience the beauty of " + packageItem.country + " with our premium travel package. Quality service guaranteed."}
                  </p>

                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg text-sm text-gray-600 font-medium">
                      <IconCalendar size={18} className="text-green-600" />
                      {packageItem.days}
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg text-sm text-gray-600 font-medium">
                      <IconUser size={18} className="text-green-600" />
                      {packageItem.people}
                    </div>
                  </div>
                </div>
              </div>

              {/* PRICE & BUTTON */}
              <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-[160px]">
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[1px]">Starting From</p>
                  <p className="text-green-600 font-black text-2xl">
                    BDT {packageItem.price}
                  </p>
                  <p className="text-[11px] text-gray-400">Per person</p>
                </div>

                <button
                  onClick={() => router.push(`/all/${packageItem.id}`)}
                  className="w-full mt-4 bg-green-600 hover:bg-black text-white text-xs font-bold py-3 rounded-xl shadow-lg shadow-green-100 hover:shadow-none transition-all duration-300"
                >
                  PACKAGE DETAILS
                </button>

              </div>
            </div>
          </main>
        </div>

        {/* CUSTOM PLAN */}
        <div className="mt-24 bg-green-50 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 border border-green-100">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <Image
              src="/hero/icon.png"
              alt="Custom Plan"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4 leading-tight">
              Request for a <span className="text-green-600">custom holiday</span> package plan
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl">
              Cannot find what you are looking for? Tell us your requirements and our expert trip planners will reach out with a personalized plan just for you!
            </p>

            <button
              onClick={() => setOpen(true)}
              className="bg-green-600 hover:bg-black text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-green-200 transition-all duration-300 transform hover:-translate-y-1"
            >
              START PLANNING
            </button>

            <HolidayFormModal open={open} setOpen={setOpen} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default PackageDetails;
