"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    IconCalendar,
    IconUser,
    IconMapPin,
    IconSearch,
} from "@tabler/icons-react";

interface PackageType {
    id: number | string;
    title: string;
    country: string;
    image: string;
    days: string;
    people: string;
    price: number;
    details?: string;
}

const AllPackagesPage = () => {
    const [search, setSearch] = useState("");
    const [allData, setAllData] = useState<PackageType[]>([]);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allpackge`);
                if (!res.ok) throw new Error("Failed to fetch packages");
                const data: PackageType[] = await res.json();
                setAllData(data);

                // Set initial max price
                const maxPrice = Math.max(...data.map(p => p.price));
                setPriceRange(maxPrice);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredData = useMemo(() => {
        return allData.filter(
            (item) =>
                (item.title.toLowerCase().includes(search.toLowerCase()) ||
                    item.country.toLowerCase().includes(search.toLowerCase())) &&
                item.price <= priceRange
        );
    }, [search, priceRange, allData]);

    if (loading) {
        return <div className="text-center py-20 text-gray-500 font-semibold">Loading packages...</div>;
    }

    const prices = allData.map((item) => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* 🔍 SEARCH BAR */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
                <div className="max-w-7xl mx-auto px-4 py-4 flex gap-3">
                    <div className="flex items-center w-full rounded-xl border bg-gray-50 px-4 py-2 focus-within:ring-2 focus-within:ring-green-500">
                        <IconSearch size={18} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search destinations, tours..."
                            className="w-full bg-transparent outline-none px-3 text-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* 🧩 LAYOUT */}
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* 🧱 FILTERS */}
                <aside className="bg-white rounded-2xl p-6 shadow-sm h-fit">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-sm">Filters</h3>
                        <button
                            onClick={() => setPriceRange(maxPrice)}
                            className="text-xs text-green-600 font-semibold hover:underline"
                        >
                            Reset
                        </button>
                    </div>

                    {/* 💰 PRICE RANGE */}
                    <div className="mb-8">
                        <p className="text-xs font-semibold mb-4">Price Range</p>

                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full accent-green-600 cursor-pointer"
                        />

                        <div className="flex justify-between text-xs text-gray-500 mt-3">
                            <span>৳ {minPrice.toLocaleString()}</span>
                            <span className="font-semibold text-green-600">
                                ৳ {priceRange.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </aside>

                {/* 📦 PACKAGES */}
                <section className="lg:col-span-3 space-y-6">
                    {filteredData.length === 0 && (
                        <p className="text-center text-sm text-gray-500">
                            No packages found
                        </p>
                    )}

                    {filteredData.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col md:flex-row"
                        >
                            {/* Image */}
                            <div className="relative w-full md:w-72 h-52 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-500"
                                    unoptimized
                                />
                                <span className="absolute top-3 left-3 bg-green-600 text-white text-[11px] px-3 py-1 rounded-full flex items-center gap-1 shadow">
                                    <IconMapPin size={12} />
                                    {item.country}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-5">
                                <h2 className="font-semibold text-base mb-2 group-hover:text-green-600 transition">
                                    {item.title}
                                </h2>

                                <p className="text-xs text-gray-500 line-clamp-2">
                                    {item.details}
                                </p>

                                <div className="flex gap-5 mt-4 text-xs text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <IconCalendar size={14} />
                                        {item.days}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <IconUser size={14} />
                                        {item.people}
                                    </span>
                                </div>
                            </div>

                            {/* PRICE */}
                            <div className="w-full md:w-60 p-5 border-t md:border-l flex md:flex-col justify-between items-center">
                                <div className="text-right">
                                    <p className="text-green-600 font-bold text-xl">
                                        ৳ {item.price.toLocaleString()}
                                    </p>
                                    <p className="text-[11px] text-gray-400">per person</p>
                                </div>

                                <Link
                                    href={`/allpackge/${item.id}`}  
                                    className="mt-3 md:mt-6 bg-green-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-green-700 transition"
                                >
                                    View Details
                                </Link>

                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default AllPackagesPage;
