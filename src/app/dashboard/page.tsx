"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Plane, 
  Hotel, 
  Briefcase, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  CheckCircle, 
  TrendingUp, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ArrowUpRight,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ArrowDownRight,
  DollarSign
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

// মডার্ন চার্ট ডেটা
const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
];

export default function DashboardPage() {
  
  // Stats Cards Data (Suitcase ফিক্স করে Briefcase করা হয়েছে)
  const stats = [
    { title: "Total Flights", value: "124", grow: "+12%", icon: Plane, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Hotels", value: "85", grow: "+5%", icon: Hotel, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Total Packages", value: "42", grow: "+18%", icon: Briefcase, color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Today Revenue", value: "$12,400", grow: "+22%", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Analytics Dashboard</h1>
          <p className="text-slate-500 mt-1 font-medium">Monitor your business performance at a glance.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
            Download Report
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-xl text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            + New Booking
          </button>
        </div>
      </div>

      {/* Stats Grid with Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className={`${stat.bg} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="flex items-center text-[11px] font-bold px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg">
                <TrendingUp className="w-3 h-3 mr-1" /> {stat.grow}
              </span>
            </div>
            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-500">{stat.title}</p>
              <h3 className="text-2xl font-black mt-1 text-slate-800 tracking-tight">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts & Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue Chart (2/3 width) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Revenue Analytics</h3>
              <p className="text-xs text-slate-400 font-medium">Monthly income overview</p>
            </div>
            <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg px-3 py-2 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="revenue" radius={[6, 6, 6, 6]} barSize={35}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#2563eb' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings (1/3 width) */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800">Latest Bookings</h3>
            <button className="text-blue-600 text-xs font-bold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">View All</button>
          </div>
          
          <div className="space-y-6 flex-1">
            {[
              { user: "Rahat Khan", info: "Flight to NY", price: "$540", status: "Success", color: "bg-emerald-500" },
              { user: "Sabbir Ahmed", info: "Hilton Hotel", price: "$1,200", status: "Pending", color: "bg-amber-500" },
              { user: "Anika Islam", info: "Bali Tour", price: "$850", status: "Success", color: "bg-emerald-500" },
              { user: "Tanvir Hossain", info: "Flight to UK", price: "$620", status: "Failed", color: "bg-rose-500" },
            ].map((booking, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-10 rounded-full ${booking.color}`}></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{booking.user}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{booking.info}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-800">{booking.price}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{booking.status}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs font-bold text-blue-900">Weekly Target</p>
            </div>
            <p className="text-xs font-black text-blue-600">85%</p>
          </div>
        </div>
      </div>
    </div>
  );
}