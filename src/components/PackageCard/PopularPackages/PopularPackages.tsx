
"use client";

import Image from "next/image";
import Link from "next/link";
import data from "../../../data/all.json";
import { IconCalendar, IconUser, IconMapPin } from "@tabler/icons-react";

const PopularPackages = () => {
    return (
        <div>
            {/* Title */}
            <div className="text-center mt-10 font-bold text-4xl text-green-600">
                <h1>Popular Packages</h1>
            </div>

            {/* Cards Grid */}
            <div className="max-w-7xl mx-auto px-4 py-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {data.map((item) => (
                    <Link key={item.id} href={`/all/${item.id}`}>
                        <div className="group rounded-xl shadow-md hover:shadow-xl bg-white border border-gray-100 cursor-pointer transition-transform transform hover:scale-105">
                            {/* Top Section: Image and Badges */}
                            <div className="relative w-full h-52">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                    priority
                                />

                                {/* Country Label */}
                                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                    <IconMapPin size={12} className="text-green-400" />
                                    {item.country}
                                </div>

                                {/* Stats Overlay */}
                                <div className="absolute bottom-3 left-0 right-0 px-3 flex justify-between items-center text-white drop-shadow-lg">
                                    <div className="flex items-center gap-1 text-[11px] font-medium bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-[2px]">
                                        <IconCalendar size={14} />
                                        {item.days}
                                    </div>
                                    <div className="flex items-center gap-1 text-[11px] font-medium bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-[2px]">
                                        <IconUser size={14} />
                                        {item.people}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Section: Content */}
                            <div className="p-5">
                                <h2 className="text-[15px] font-bold text-gray-800 leading-snug mb-3 overflow-hidden h-10">
                                    {item.title}
                                </h2>
                                <div className="flex flex-col">
                                    <p className="text-[#10B981] font-extrabold text-xl">
                                        BDT {item.price}
                                    </p>
                                    <p className="text-gray-400 text-[11px] font-medium mt-0.5">
                                        Per person
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="text-center mt-6">
                <Link
                    href="/packages"
                    className="group inline-flex items-center gap-1.5 text-green-600 font-medium text-sm transition-all duration-200 hover:text-green-800 hover:font-semibold"
                >
                    <span className="transition-transform duration-200 group-hover:translate-x-[1px]">
                        See All Packages
                    </span>
                    <svg
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default PopularPackages;
