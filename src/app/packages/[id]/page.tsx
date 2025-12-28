// "use client";

// import React, { useEffect, useState, useMemo } from "react";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import {
//   IconCalendar,
//   IconUser,
//   IconMapPin,
//   IconFilter,
// } from "@tabler/icons-react";
// import CustomHolidayHero from "../../planing/page";

// type PackageType = {
//   id: number | string;
//   title: string;
//   country: string;
//   image: string;
//   days: string;
//   people: string;
//   price: number;
//   details?: string;
//   pickup?: string;
//   spots?: string[];
// };

// const PackageDetails = () => {
//   const { id } = useParams();
//   const router = useRouter();

//   const [allData, setAllData] = useState<PackageType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDurations, setSelectedDurations] = useState<string[]>([]);

//   // 🔹 Fetch data from server
//   useEffect(() => {
//     const fetchPackage = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allpackge/${id}`);
//         if (!res.ok) throw new Error("Package not found");
//         const data = await res.json();
//         setAllData([data]);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackage();
//   }, [id]);



//   const toggleFilter = (duration: string) => {
//     setSelectedDurations((prev) =>
//       prev.includes(duration)
//         ? prev.filter((d) => d !== duration)
//         : [...prev, duration]
//     );
//   };

//   const resetFilters = () => setSelectedDurations([]);

//   const filteredData = useMemo(() => {
//     if (selectedDurations.length === 0) return allData;
//     return allData.filter((item) =>
//       selectedDurations.some((d) => item.days?.includes(d))
//     );
//   }, [selectedDurations, allData]);

//   const packageItem = filteredData.find(
//     (item) => item.id?.toString() === id
//   );

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center text-gray-500">
//         Loading package details...
//       </div>
//     );
//   }

//   if (!packageItem) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center">
//         <p className="text-xl font-semibold text-gray-500">
//           Package not found!
//         </p>
//         <button
//           onClick={() => router.back()}
//           className="mt-4 text-green-600 underline"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 py-10">

//         {/* 🔥 UI / DESIGN — untouched */}
//         {/* TOP NAVIGATION */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-extrabold text-gray-800">
//             Explore Packages
//           </h1>
//           <p className="text-gray-500 text-sm">
//             Home / Packages / {packageItem.country}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

//           {/* LEFT FILTERS */}
//           <aside className="lg:col-span-1">
//             <div className="sticky top-24 border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
//               <div className="flex justify-between items-center mb-6">
//                 <div className="flex items-center gap-2 font-bold text-gray-800">
//                   <IconFilter size={20} />
//                   <span>Filters</span>
//                 </div>
//                 <button
//                   onClick={resetFilters}
//                   className="text-xs font-bold text-green-600 hover:bg-green-50 px-2 py-1 rounded"
//                 >
//                   RESET
//                 </button>
//               </div>

//               {["Day Tour", "5 Days", "4 Days", "3 Days"].map((item) => (
//                 <label
//                   key={item}
//                   className="flex items-center gap-3 text-gray-600 cursor-pointer mb-3"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedDurations.includes(item)}
//                     onChange={() => toggleFilter(item)}
//                     className="accent-green-600"
//                   />
//                   <span className="text-sm">{item}</span>
//                 </label>
//               ))}
//             </div>
//           </aside>

//           {/* RIGHT CONTENT */}
//           <main className="lg:col-span-3 space-y-6">
//             <div className="group border rounded-2xl bg-white p-5 flex flex-col md:flex-row gap-6">

//               {/* IMAGE */}
//               <div className="relative w-full md:w-72 h-48 rounded-xl overflow-hidden">
//                 <Image
//                   src={packageItem.image}
//                   alt={packageItem.title}
//                   fill
//                   className="object-cover"
//                   unoptimized
//                 />
//                 <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
//                   <IconMapPin size={12} className="text-green-400" />
//                   {packageItem.country}
//                 </div>
//               </div>

//               {/* TEXT */}
//               <div className="flex-1">
//                 <h2 className="text-xl font-bold mb-2">
//                   {packageItem.title}
//                 </h2>
//                 <p className="text-sm text-gray-500 mb-4">
//                   {packageItem.details}
//                 </p>

//                 <div className="flex gap-4">
//                   <span className="flex items-center gap-1">
//                     <IconCalendar size={16} />
//                     {packageItem.days}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <IconUser size={16} />
//                     {packageItem.people}
//                   </span>
//                 </div>
//               </div>

//               {/* PRICE */}
//               <div className="text-right min-w-[150px]">
//                 <p className="text-green-600 font-black text-2xl">
//                   BDT {packageItem.price}
//                 </p>
//                 <button
//                   onClick={() => router.push(`/all/${packageItem.id}`)}
//                   className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl"
//                 >
//                   PACKAGE DETAILS
//                 </button>
//               </div>
//             </div>
//           </main>
//         </div>
//         {/* CUSTOM PLAN */}
//         <div className="mt-24 bg-green-50 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 border border-green-100">
//           <CustomHolidayHero></CustomHolidayHero>




//         </div>


//       </div>
//     </div>
//   );
// };

// export default PackageDetails;
  