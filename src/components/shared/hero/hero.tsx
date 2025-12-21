"use client";

import { SetStateAction, useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IconChevronDown } from "@tabler/icons-react";

const Page = () => {
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [outDate, setOutDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [openTravelers, setOpenTravelers] = useState(false);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);

  return (
    <section className="relative h-[60vh] w-full md:h-[55vh]">
      {/* Background */}
      <Image
        src="/hero/hero.png"
        alt="Flight Search"
        fill
        priority
        className="object-cover brightness-75"
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Search Card */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl backdrop-blur-sm">
          {/* Trip Type */}
          <div className="mb-5 flex justify-center gap-8 text-sm font-semibold text-gray-700">
            {["oneway", "roundtrip"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer transition hover:text-green-600"
              >
                <input
                  type="radio"
                  name="trip"
                  checked={tripType === type}
                  onChange={() => setTripType(type)}
                  className="accent-green-600"
                />
                {type === "oneway" ? "One Way" : "Round Trip"}
              </label>
            ))}
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            {/* From */}
            <div className="rounded-lg border border-gray-300 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase text-gray-500">
                From
              </p>
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="City or Airport"
                className="w-full text-sm font-medium text-gray-900 outline-none"
              />
            </div>

            {/* To */}
            <div className="rounded-lg border border-gray-300 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase text-gray-500">
                To
              </p>
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="City or Airport"
                className="w-full text-sm font-medium text-gray-900 outline-none"
              />
            </div>

            {/* Journey Date */}
            <div className="rounded-lg border border-gray-300 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase text-gray-500">
                Journey Date
              </p>
              <DatePicker
                selected={outDate}
                onChange={(date: SetStateAction<Date | null>) => setOutDate(date)}
                className="w-full text-sm font-medium text-gray-900 outline-none"
                placeholderText="Select date"
              />
            </div>

            {/* Return Date */}
            {tripType === "roundtrip" && (
              <div className="rounded-lg border border-gray-300 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase text-gray-500">
                  Return Date
                </p>
                <DatePicker
                  selected={returnDate}
                  onChange={(date: SetStateAction<Date | null>) => setReturnDate(date)}
                  className="w-full text-sm font-medium text-gray-900 outline-none"
                  placeholderText="Select date"
                />
              </div>
            )}

            {/* Travelers */}
            <div className="relative">
              <div
                onClick={() => setOpenTravelers(!openTravelers)}
                className="flex h-full items-center justify-between rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium cursor-pointer hover:border-green-600 transition"
              >
                {adult + child} Traveler(s)
                <IconChevronDown size={18} />
              </div>

              {openTravelers && (
                <div className="absolute z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                  <div className="flex justify-between py-1 text-sm">
                    Adult
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAdult(Math.max(1, adult - 1))}
                        className="w-6 h-6 rounded-full bg-gray-200 hover:bg-green-100 text-gray-700 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span>{adult}</span>
                      <button
                        onClick={() => setAdult(adult + 1)}
                        className="w-6 h-6 rounded-full bg-gray-200 hover:bg-green-100 text-gray-700 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between py-1 text-sm">
                    Child
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setChild(Math.max(0, child - 1))}
                        className="w-6 h-6 rounded-full bg-gray-200 hover:bg-green-100 text-gray-700 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span>{child}</span>
                      <button
                        onClick={() => setChild(child + 1)}
                        className="w-6 h-6 rounded-full bg-gray-200 hover:bg-green-100 text-gray-700 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <button className="rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition">
              Search Flights
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
