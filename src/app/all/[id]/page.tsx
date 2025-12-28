/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { Clock, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import CustomHolidayHeroPage from "../../planing/page";

interface PackageType {
  _id: string;
  title: string;
  country: string;
  images: string[];
  days: string;
  people: string;
  price: number;
  details?: string;
  highlights?: string[];
}

const DetailPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [pkg, setPkg] = useState<PackageType | null>(null);
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/packge/${id}`
        );

        if (!res.ok) throw new Error("Failed to fetch package");

        const data: PackageType = await res.json();
        setPkg(data);
        setError(null);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPackage();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500 font-semibold">
        Loading package details...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-20 text-xl text-red-500">
        {error}
      </div>
    );

  if (!pkg)
    return (
      <div className="text-center mt-20 text-xl text-red-500">
        Package not found
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-600 mb-2">
          {pkg.title}
        </h1>
        <p className="text-gray-500 mb-6">
          {pkg.country} · {pkg.days} · {pkg.people}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* MAIN SLIDER */}
          {pkg.images?.length ? (
            <Swiper
              modules={[Navigation, Pagination, Thumbs, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              thumbs={{ swiper: thumbsSwiper }}
              loop
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg"
            >
              {pkg.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <Image
                    src={img}
                    alt={`${pkg.title} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-gray-500">No images available</p>
          )}

          {/* THUMBNAILS */}
          {pkg.images?.length && (
            <Swiper
              onSwiper={setThumbsSwiper}
              slidesPerView={4}
              spaceBetween={10}
              freeMode
              watchSlidesProgress
              className="mt-4 h-24"
            >
              {pkg.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative w-full h-20 rounded-lg overflow-hidden border">
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* DETAILS */}
          {pkg.details && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-3">Package Details</h2>
              <p className="text-gray-700">{pkg.details}</p>

              {pkg.highlights?.length && (
                <ul className="list-disc list-inside mt-4 space-y-2">
                  {pkg.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="bg-white shadow-xl rounded-2xl p-6 sticky top-20 space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-gray-500">Starting From</p>
          <p className="text-3xl font-extrabold text-green-600">
            BDT {pkg.price}
          </p>

          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <Clock size={16} /> {pkg.days}
            </p>
            <p className="flex items-center gap-2">
              <Users size={16} /> {pkg.people}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> {pkg.country}
            </p>
          </div>

          <button
            onClick={() => router.push(`/all/${pkg._id}/booking`)}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            BOOK HOLIDAY PACKAGE
          </button>
        </motion.div>
      </div>

      <CustomHolidayHeroPage />
    </div>
  );
};

export default DetailPage;
