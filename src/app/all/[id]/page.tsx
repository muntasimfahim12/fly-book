"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import allData from "../../../data/all.json"; 

const DetailPage = () => {
  const { id } = useParams();
  const router = useRouter();

  // id অনুযায়ী প্যাকেজ খোঁজা
  const pkg = allData.find(item => item.id.toString() === id);

  // Thumbnails state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (!pkg) {
    return <div className="text-center mt-20 text-xl">Package not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* TITLE */}
      <h1 className="text-4xl font-black text-green-600 mb-2">{pkg.title}</h1>
      <p className="text-gray-500 mb-6">{pkg.country} · {pkg.days}</p>

      {/* IMAGE SLIDER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
        <div className="lg:col-span-2 space-y-6">
          <Swiper
            modules={[Navigation, Pagination, Thumbs, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            thumbs={{ swiper: thumbsSwiper }}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="w-full h-[500px] rounded-lg overflow-hidden shadow-xl"
          >
            {pkg.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <Image src={img} alt={`${pkg.title} ${index + 1}`} fill className="object-cover rounded-lg" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* THUMBNAILS */}
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={4}
            spaceBetween={10}
            freeMode
            watchSlidesProgress
            className="mt-4 h-24"
          >
            {pkg.images?.map((img, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                <div className="relative w-full h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-green-500 transition">
                  <Image src={img} alt={`Thumb ${index + 1}`} fill className="object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* DETAILS */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-3">Package Details</h2>
            <p className="text-gray-700 leading-relaxed">{pkg.details}</p>

            {pkg.highlights && pkg.highlights.length > 0 && (
              <>
                <h3 className="text-xl font-bold mt-6 mb-3">Highlights</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {pkg.highlights.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* BOOKING CARD */}
        <div className="bg-white shadow-xl rounded-2xl p-6 sticky top-20">
          <p className="text-sm text-gray-500">Starting From</p>
          <p className="text-3xl font-black text-green-600 mb-4">BDT {pkg.price}</p>
          <div className="text-gray-700 mb-2">{pkg.days}</div>
          <div className="text-gray-700 mb-2">{pkg.people}</div>
          <div className="text-gray-700 mb-6">{pkg.country}</div>

          <button
            onClick={() => router.push(`/packages/${pkg.id}`)}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
