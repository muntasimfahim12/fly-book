"use client"; // কারণ আমরা useEffect/useState ব্যবহার করব

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PackageType {
  id: number;
  title: string;
  country: string;
  image: string;
  days: string;
  people: string;
  price: number;
  details?: string;
}

interface PageProps {
  params: {
    id: string;
  };
}

const PackageDetailsPage = ({ params }: PageProps) => {
  const [pkg, setPkg] = useState<PackageType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/allpackge/${params.id}`
        );
        if (!res.ok) throw new Error("Failed to fetch package");
        const data = await res.json();
        setPkg(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [params.id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 font-semibold">
        Loading package details...
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        Package not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-10">
      {/* Left: Images */}
      <div className="flex-1 space-y-4">
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Right: Details */}
      <div className="flex-1">
        <h1 className="text-3xl font-extrabold mb-4">{pkg.title}</h1>
        <p className="text-green-600 font-semibold mb-6">{pkg.country}</p>

        <p className="text-gray-600 mb-6">{pkg.details}</p>

        <div className="bg-gray-50 p-6 rounded-xl shadow-md space-y-4 mb-6">
          <p>
            <span className="text-gray-500">Duration:</span>{" "}
            <span className="font-semibold">{pkg.days}</span>
          </p>
          <p>
            <span className="text-gray-500">Number of People:</span>{" "}
            <span className="font-semibold">{pkg.people}</span>
          </p>
          <p>
            <span className="text-gray-500">Price:</span>{" "}
            <span className="font-extrabold text-green-600 text-xl">
              BDT {pkg.price}
            </span>
          </p>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition">
          Book Holiday Package
        </button>

        <div className="mt-6">
          <Link
            href="/packages"
            className="text-green-600 font-medium hover:text-green-800"
          >
            &larr; Back to Packages
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsPage;
