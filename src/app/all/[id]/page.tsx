/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { User, Clock, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import CustomHolidayHeroPage from "../../planing/page";

interface PackageType {
    _id: any;
    id: number | string;
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/packge`);
            if (!res.ok) throw new Error("Failed to fetch packages");
            const packages: PackageType[] = await res.json();

            const found = packages.find(p => p._id === id);
            if (!found) throw new Error("Package not found");

            setPkg(found);
        } catch (err: any) {
            console.error("Error fetching package:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchPackage();
}, [id]);


    if (loading) {
        return <div className="text-center mt-20 text-gray-500 font-semibold">Loading package details...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-xl text-red-500">{error}</div>;
    }

    if (!pkg) {
        return <div className="text-center mt-20 text-xl text-red-500">Package not found</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">

            {/* TITLE */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-4xl md:text-5xl font-extrabold text-green-600 mb-2">{pkg.title}</h1>
                <p className="text-gray-500 mb-6">{pkg.country} · {pkg.days} · {pkg.people} People</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* LEFT: IMAGE + DETAILS */}
                <motion.div
                    className="lg:col-span-2 space-y-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >

                    {/* MAIN SWIPER */}
                    {pkg.images && pkg.images.length > 0 && (
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
                                    <Image src={img} alt={`${pkg.title} ${idx + 1}`} fill className="object-cover rounded-xl" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}

                    {/* THUMBNAILS */}
                    {pkg.images && pkg.images.length > 0 && (
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
                                    <div className="relative w-full h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-green-500 transition">
                                        <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}

                    {/* DETAILS */}
                    {pkg.details && (
                        <div className="mt-6">
                            <h2 className="text-2xl font-bold mb-3">Package Details</h2>
                            <p className="text-gray-700 leading-relaxed">{pkg.details}</p>

                            {pkg.highlights && pkg.highlights.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-xl font-bold mb-3">Highlights</h3>
                                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                                        {pkg.highlights.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>

                {/* RIGHT: BOOKING CARD */}
                <motion.div
                    className="bg-white shadow-xl rounded-2xl p-6 sticky top-20 space-y-4 hover:shadow-2xl hover:-translate-y-1 transition-all"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-sm text-gray-500">Starting From</p>
                    <p className="text-3xl font-extrabold text-green-600">BDT {pkg.price}</p>

                    <div className="space-y-2 text-gray-700">
                        <p className="flex items-center gap-2"><Clock size={16} /> {pkg.days}</p>
                        <p className="flex items-center gap-2"><Users size={16} /> {pkg.people} People</p>
                        <p className="flex items-center gap-2"><MapPin size={16} /> {pkg.country}</p>
                    </div>

                    <button
                        onClick={() => router.push(`/all/${pkg.id}/booking`)}
                        className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold"
                    >
                        BOOK HOLIDAY PACKAGE
                    </button>
                </motion.div>
            </div>

            {/* CUSTOM HERO SECTION */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-green-50 rounded-2xl p-10 space-y-6"
            >
                <h2 className="text-3xl md:text-4xl font-extrabold text-green-600 text-center">Plan Your Holiday With Us</h2>
                <p className="text-gray-700 text-center max-w-3xl mx-auto">
                    Discover exciting travel packages tailored just for you. Our travel experts ensure an unforgettable experience with seamless planning and personalized guidance.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-6">
                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">Explore Packages</button>
                    <button className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-100 transition font-semibold">Contact Travel Expert</button>
                </div>
            </motion.section>

            {/* CUSTOM COMPONENT */}
            <div>
                <CustomHolidayHeroPage />
            </div>

        </div>
    );
};

export default DetailPage;





