"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CustomHolidayHero = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mt-12 px-4 md:px-0">
      {/* Image Section */}
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <Image
          src="/hero/icon.png"
          alt="Custom Plan"
          fill
          className="object-contain"
        />
      </div>

      {/* Text Section */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4 leading-tight">
          Request for a <span className="text-green-600">custom holiday</span> package plan
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-xl">
          Cannot find what you are looking for? Tell us your requirements and our expert trip planners will reach out with a personalized plan just for you!
        </p>

        <button
          onClick={() => router.push("/modal/")}
          className="bg-green-600 hover:bg-black text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-green-200 transition-all duration-300 transform hover:-translate-y-1"
        >
          START PLANNING
        </button>
      </div>
    </div>
  );
};

export default CustomHolidayHero;
