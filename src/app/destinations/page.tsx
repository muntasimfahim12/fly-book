"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface DestinationType {
  _id: string;
  country: string;
  region: string;
  image: string;
  details: string;
}

const DestinationsPage: React.FC = () => {
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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  if (loading)
    return <p className="text-center py-16 text-gray-500">Loading destinations...</p>;

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <Link
            key={dest._id}
            href={`/destinations/${dest._id}`}  // ✅ Correct route
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="relative w-full h-60">
                <Image src={dest.image} alt={dest.country} fill className="object-cover" unoptimized />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{dest.country}</h3>
                <p className="text-green-600 font-semibold">{dest.region}</p>
                <p className="text-gray-600 text-sm line-clamp-3">{dest.details}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DestinationsPage;
