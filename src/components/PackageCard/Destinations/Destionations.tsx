"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/destinations`
        );
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

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-500 font-semibold">
        Loading destinations...
      </div>
    );
  }

  return (
    <section className="w-full bg-gray-50 py-16 px-6 mt-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Popular Destinations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <Link
              key={dest._id}
              href={`/destinations/${dest._id}`}   
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                
                {/* Image */}
                <div className="relative w-full h-60">
                  <Image
                    src={dest.image}
                    alt={dest.country}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {dest.country}
                  </h3>

                  <p className="text-green-600 font-semibold mb-2">
                    {dest.region}
                  </p>

                  <p className="text-gray-600 text-sm line-clamp-3">
                    {dest.details}
                  </p>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
