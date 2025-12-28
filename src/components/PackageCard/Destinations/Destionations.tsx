"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconMapPin } from "@tabler/icons-react";

interface DestinationType {
  _id: string;
  country: string;
  region: string;
  image: string;
  details: string;
}

const PopularDestinations: React.FC = () => {
  const [destinations, setDestinations] = useState<DestinationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`);
        if (!res.ok) throw new Error("Failed to fetch destinations");
        const data: DestinationType[] = await res.json();
        setDestinations(data);
      } catch (err) {
        console.error("Destination fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading destinations...</p>;

  return (
    <div>
      <div className="text-center mt-10 font-bold text-4xl text-green-600">
        <h1>Popular Destinations</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {destinations.map((item) => (
          <Link key={item._id} href={`/destinations/${encodeURIComponent(item._id)}`}>

            <div className="group rounded-xl shadow-md hover:shadow-xl bg-white border border-gray-100 cursor-pointer transition-transform transform hover:scale-105">
              <div className="relative w-full h-52">
                <Image
                  src={item.image}
                  alt={item.country}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <IconMapPin size={12} className="text-green-400" />
                  {item.country}
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-[15px] font-bold text-gray-800 leading-snug mb-2 overflow-hidden h-10">
                  {item.region}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">{item.details}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link
          href="/seeAllDestinations"
          className="group inline-flex items-center gap-1.5 text-green-600 font-medium text-sm transition-all duration-200 hover:text-green-800 hover:font-semibold"
        >
          <span className="transition-transform duration-200 group-hover:translate-x-[1px]">
            See All Destinations
          </span>
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PopularDestinations;
