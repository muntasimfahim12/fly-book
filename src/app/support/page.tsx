"use client";

import React from "react";
import { 
  IconHeadset, 
  IconMail, 
  IconMessageCircle, 
  IconQuestionMark, 
  IconTicket, 
  IconCreditCard, 
  IconPlaneTilt,
  IconSearch,
  IconChevronRight
} from "@tabler/icons-react";

const helpCategories = [
  {
    title: "Booking Issues",
    desc: "Problems with flight or hotel bookings",
    icon: <IconTicket size={32} className="text-blue-500" />,
    link: "#"
  },
  {
    title: "Payments & Refunds",
    desc: "Check status of your refund or payment",
    icon: <IconCreditCard size={32} className="text-green-500" />,
    link: "#"
  },
  {
    title: "Flight Status",
    desc: "Real-time updates on your journey",
    icon: <IconPlaneTilt size={32} className="text-orange-500" />,
    link: "#"
  },
  {
    title: "Account & Safety",
    desc: "Manage your profile and security",
    icon: <IconQuestionMark size={32} className="text-purple-500" />,
    link: "#"
  },
];

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* 1. HERO SECTION WITH SEARCH */}
      <section className="bg-green-600 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            How can we <span className="text-green-200">help you?</span>
          </h1>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-5 flex items-center text-gray-400">
              <IconSearch size={22} />
            </div>
            <input 
              type="text" 
              placeholder="Search for articles, bookings, or topics..." 
              className="w-full pl-14 pr-6 py-5 rounded-2xl border-none focus:ring-4 focus:ring-green-300 text-gray-800 shadow-2xl text-lg font-medium"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-10">
        {/* 2. QUICK ACTION CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {helpCategories.map((cat, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="mb-4 bg-gray-50 w-fit p-4 rounded-2xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{cat.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{cat.desc}</p>
              <div className="mt-4 flex items-center text-green-600 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <IconChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>

        {/* 3. CONTACT SECTION */}
        <section className="py-20 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-black text-gray-900">Still need help? <br /> Our team is <span className="text-green-600">online 24/7</span></h2>
            <p className="text-gray-500 text-lg max-w-md">
              Whether you have a question about bookings, flights or anything else, our team is ready to answer all your questions.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-green-200 transition-colors">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl"><IconMessageCircle size={24}/></div>
                <div>
                  <h4 className="font-bold">Live Chat</h4>
                  <p className="text-sm text-gray-500">Average response time: 2 mins</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-green-200 transition-colors">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><IconHeadset size={24}/></div>
                <div>
                  <h4 className="font-bold">Call Support</h4>
                  <p className="text-sm text-gray-500">+880 1234 567 890</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-green-200 transition-colors">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><IconMail size={24}/></div>
                <div>
                  <h4 className="font-bold">Email Us</h4>
                  <p className="text-sm text-gray-500">support@flybook.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-gray-50">
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email</label>
                  <input type="email" placeholder="john@example.com" className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Subject</label>
                <select className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500">
                  <option>Booking Issue</option>
                  <option>Refund Request</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Message</label>
                <textarea rows={4} placeholder="How can we help?" className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500"></textarea>
              </div>
              <button className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-100 active:scale-95">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SupportPage;