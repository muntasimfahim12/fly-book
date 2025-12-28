"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface DestinationType {
  _id: string;
  country: string;
  region: string;
  image: string;
  details: string;
}

const DestinationDetailPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const [destination, setDestination] = useState<DestinationType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDestination = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations/${id}`);
        if (!res.ok) throw new Error("Destination not found");
        const data: DestinationType = await res.json();
        setDestination(data);
      } catch (err) {
        console.error(err);
        setDestination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading)
    return <p className="text-center py-16 text-gray-500">Loading destination...</p>;

  if (!destination)
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-xl font-semibold text-gray-500">Destination not found!</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-green-600 underline"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-gray-50">
      <h1 className="text-3xl font-extrabold mb-6">{destination.country}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative w-full md:w-1/2 h-80 rounded-2xl overflow-hidden">
          <Image src={destination.image} alt={destination.country} fill className="object-cover" unoptimized />
        </div>
        <div className="md:flex-1">
          <h2 className="text-xl font-bold mb-2">{destination.region}</h2>
          <p className="text-gray-600">{destination.details}</p>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;
