"use client";

import React from "react";
import Image from "next/image";
import { 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  IconTicket, 
  IconClock, 
  IconTag, 
  IconCopy, 
  IconArrowRight,
  IconFlame,
  IconConfetti
} from "@tabler/icons-react";

// মক ডাটা (পরবর্তীতে API থেকে নিতে পারবেন)
const deals = [
  {
    id: 1,
    title: "Summer Vacation Special",
    discount: "30% OFF",
    code: "SUMMER30",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "Valid on all flights to Cox's Bazar and Sylhet.",
    expiry: "2 days left"
  },
  {
    id: 2,
    title: "First Booking Offer",
    discount: "BDT 500 OFF",
    code: "FLYNEW",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&w=800&q=80",
    description: "Only for new users on their first flight ticket booking.",
    expiry: "Ongoing"
  },
  {
    id: 3,
    title: "International Getaway",
    discount: "15% OFF",
    code: "GLOBAL15",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    description: "Flat discount on international flights to Thailand and Bali.",
    expiry: "5 days left"
  }
];

const DealsPage = () => {
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    alert("Coupon code copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#F9FBFC] pt-28 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="relative overflow-hidden bg-gray-900 rounded-[40px] p-8 md:p-16 mb-12 flex flex-col md:flex-row items-center justify-between text-white">
          <div className="z-10 relative space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-green-400 text-xs font-bold uppercase tracking-widest">
              <IconFlame size={16} /> Hot Deals Today
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">
              Unlock the Best <br /> <span className="text-green-500 underline decoration-green-500/30">Travel Deals</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md">
              Save big on your next journey with our handpicked exclusive offers and promo codes.
            </p>
          </div>
          
          <div className="hidden md:block absolute right-[-100px] top-[-50px] opacity-20">
            <IconConfetti size={400} />
          </div>
        </div>

        {/* PROMO CODE SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <div 
              key={deal.id} 
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              {/* Image with Badge */}
              <div className="relative h-48 w-full">
                <Image 
                  src={deal.image} 
                  alt={deal.title} 
                  fill 
                  className="object-cover" 
                  unoptimized
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white text-sm font-black px-4 py-1.5 rounded-xl shadow-lg">
                  {deal.discount}
                </div>
              </div>

              {/* Deal Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1"><IconClock size={14}/> {deal.expiry}</span>
                  <span className="flex items-center gap-1 text-green-600"><IconTag size={14}/> Limited Time</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{deal.title}</h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">{deal.description}</p>

                {/* Promo Box */}
                <div className="mt-auto bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-4 flex items-center justify-between group/code">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Promo Code</p>
                    <p className="text-lg font-black text-gray-800 tracking-widest">{deal.code}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(deal.code)}
                    className="p-3 bg-white text-gray-600 rounded-xl shadow-sm hover:bg-green-600 hover:text-white transition-colors border border-gray-100"
                  >
                    <IconCopy size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM BANNER */}
        <div className="mt-16 bg-green-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border border-green-100">
          <div className="space-y-2 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900">Never miss a price drop!</h2>
            <p className="text-gray-500">Subscribe to get secret deals and low-cost flight alerts.</p>
          </div>
          <div className="flex w-full md:w-fit gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 md:w-64 p-4 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-green-600"
            />
            <button className="bg-green-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200 flex items-center gap-2">
              Join Now <IconArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DealsPage;