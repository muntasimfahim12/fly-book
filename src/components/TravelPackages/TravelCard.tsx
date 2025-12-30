"use client";

import React from "react";
import Image from "next/image";
import { IconChevronRight, IconBrandWhatsapp, IconBrandApple, IconBrandGooglePlay } from "@tabler/icons-react";

const TravelCard = () => {
  const features = [
    "Faster and easier booking",
    "Easy access to your tickets",
    "Get train alerts before departure",
    "Onboard train with digital tickets",
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10 bg-white rounded-2xl ">
      {/* Image Section */}
      <div className="flex-1 relative w-full h-[250px] md:h-[300px]">
        <Image
          src="/hero/tarvel.png"
          alt="Shohoz Mobile App"
          fill
          className="object-contain rounded-xl"
          priority
        />
      </div>

      {/* Text Section */}
      <div className="flex-1 space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold leading-snug text-gray-900">
          Get More Out of Shohoz with{" "}
          <span className="text-[#2E7D52]">our mobile app</span>
        </h2>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium">
          {features.map((item, index) => (
            <p key={index} className="flex items-center gap-2 text-gray-700">
              <IconChevronRight size={18} className="text-[#2E7D52]" />
              {item}
            </p>
          ))}
        </div>

        {/* App Download & WhatsApp */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
          {/* WhatsApp */}
          <a
            href="https://wa.me/your-number"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <IconBrandWhatsapp size={24} />
            Chat on WhatsApp
          </a>

          {/* App Store */}
          <a
            href="#"
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
          >
            <IconBrandApple size={24} />
            App Store
          </a>

          {/* Play Store */}
          <a
            href="#"
            className="flex items-center gap-2 bg-[#3bccff] text-white px-4 py-2 rounded-lg hover:bg-[#2aa0cc] transition"
          >
            <IconBrandGooglePlay size={24} />
            Google Play
          </a>
        </div>
      </div>
    </section>
  );
};

export default TravelCard;
