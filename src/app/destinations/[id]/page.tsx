"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { IconMapPin, IconCalendar, IconUser, IconCheck } from "@tabler/icons-react";
import CustomHolidayHeroPage from "../../planing/page";

interface DestinationType {
    _id: string;
    country: string;
    region: string;
    image: string;
    details: string;
    duration: string;
    people: string;
    price: string;
}

const DestinationDetailPage: React.FC = () => {
    const { id } = useParams();
    const router = useRouter();
    const [destination, setDestination] = useState<DestinationType | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [showAllFilters, setShowAllFilters] = useState(false);

    const filters = [
        "Day Tour", "One Day", "Two Day", "Three Day",
        "Four Day", "Five Day", "Six Day", "Seven Day", "Eight Day"
    ];

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations/${id}`);
                if (!res.ok) throw new Error("Failed to fetch destination details");
                const data: DestinationType = await res.json();
                setDestination(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchDestination();
    }, [id]);

    const handleFilterChange = (filter: string) => {
        setSelectedFilters((prev) =>
            prev.includes(filter)
                ? prev.filter((f) => f !== filter)
                : [...prev, filter]
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-green-600 font-bold text-lg">
                Loading...
            </div>
        );
    }

    if (!destination) {
        return (
            <div className="text-center mt-20 text-red-500 text-lg font-semibold">
                Destination not found
            </div>
        );
    }

    return (
        <div className="bg-[#F3F4F6] min-h-screen py-10 px-4">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                {/* LEFT SIDEBAR: Filters */}
                <aside className="w-full lg:w-64 bg-white p-6 rounded-2xl shadow-lg self-start sticky top-10 h-fit transition-all">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800 text-lg">Filters</h3>
                        <button
                            className="text-[#209053] text-xs font-bold border border-[#209053] px-2 py-1 rounded hover:bg-[#209053] hover:text-white transition-all"
                            onClick={() => setSelectedFilters([])}
                        >
                            RESET
                        </button>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[#FF7D3E] text-sm font-bold uppercase tracking-wider">
                            Duration
                        </h4>

                        {(showAllFilters ? filters : filters.slice(0, 2)).map((filter) => (
                            <label key={filter} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.includes(filter)}
                                    onChange={() => handleFilterChange(filter)}
                                    className="w-4 h-4 border-gray-300 rounded text-[#209053] focus:ring-[#209053]"
                                />
                                <span className="text-sm text-gray-600 group-hover:text-[#209053] transition-colors">
                                    {filter}
                                </span>
                            </label>
                        ))}

                        <button
                            onClick={() => setShowAllFilters(!showAllFilters)}
                            className="mt-2 text-[#1069F5] text-xs font-bold flex items-center gap-1 uppercase hover:underline transition-all"
                        >
                            {showAllFilters ? "Show Less ▲" : "Show More ▼"}
                        </button>
                    </div>
                </aside>

                {/* RIGHT CONTENT: Destination Card */}
                <main className="flex-1">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-2xl hover:scale-[1.01] duration-300">

                        {/* Image Section */}
                        <div className="relative w-full md:w-[360px] h-64 md:h-auto group overflow-hidden">
                            <Image
                                src={destination.image}
                                alt={destination.region}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                unoptimized
                            />
                            <div className="absolute top-3 left-3 bg-[#384C3F]/80 p-2 rounded-md shadow-md">
                                <IconMapPin size={18} className="text-white" />
                            </div>
                        </div>

                        {/* Content Details */}
                        <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-3">
                                    {destination.region}
                                </h2>
                                <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-5">
                                    {destination.details ||
                                        "Discover the best of two iconic Southeast Asian cities with this tour experience..."}
                                </p>

                                <div className="flex flex-wrap gap-6 items-center text-sm font-semibold text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <IconCalendar size={18} className="text-[#209053]" />
                                        <span>{destination.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IconUser size={18} className="text-[#209053]" />
                                        <span>{destination.people}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price & Action Section */}
                        <div className="w-full md:w-[220px] bg-white md:border-l border-gray-100 p-6 flex flex-col items-center justify-center text-center transition-all">
                            <div className="mb-8">
                                <p className="text-[#209053] text-2xl font-black">
                                    BDT {destination.price}
                                </p>
                                <p className="text-xs text-gray-400 font-medium">Per person</p>
                            </div>

                            <button
                                onClick={() => router.push(`/all/  /${destination._id}`)}
                                className="w-full bg-[#209053] hover:bg-[#1a7a45] text-white font-bold py-3 rounded-lg text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                            >
                                <IconCheck size={18} /> PACKAGE DETAILS
                            </button>
                        </div>

                    </div>
                </main>

            </div>
            <div>
                <CustomHolidayHeroPage />
            </div>
        </div>
    );
};

export default DestinationDetailPage;
