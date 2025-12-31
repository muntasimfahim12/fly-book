/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  PlaneTakeoff, 
  Hotel, 
  Briefcase, 
  BookOpenCheck, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Search,
  Bell,
  Command
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle Navbar Shadow on Scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Flights", icon: PlaneTakeoff, href: "/dashboard/flights" },
    { name: "Hotels", icon: Hotel, href: "/dashboard/hotels" },
    { name: "Packages", icon: Briefcase, href: "/dashboard/packages" },
    { name: "Bookings", icon: BookOpenCheck, href: "/dashboard/bookings" },
    { name: "Users", icon: Users, href: "/dashboard/users" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans">
      
      {/* --- SIDEBAR (Desktop) --- */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="hidden md:flex flex-col bg-white border-r border-slate-200 z-40 relative shadow-sm"
      >
        {/* Brand Logo */}
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <span className="text-white font-bold text-lg">FB</span>
            </div>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500"
                >
                  FlyBook
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div className={`relative flex items-center p-3 rounded-xl transition-all duration-200 group mb-1 ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-100" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}>
                  <item.icon className={`w-5 h-5 min-w-[20px] ${isActive ? "text-white" : "group-hover:scale-110 transition-transform"}`} />
                  {isSidebarOpen && (
                    <span className="ml-3 font-medium text-sm whitespace-nowrap">{item.name}</span>
                  )}
                  {isActive && isSidebarOpen && (
                    <motion.div layoutId="activeNav" className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-24 bg-white border border-slate-200 rounded-full p-1.5 hover:bg-slate-50 shadow-md z-50 transition-transform active:scale-90"
        >
          <ChevronRight className={`w-4 h-4 text-slate-600 transition-transform duration-300 ${isSidebarOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Admin Card (Bottom) */}
        {isSidebarOpen && (
          <div className="p-4 mx-4 mb-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3">
              <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" className="w-8 h-8 rounded-full" alt="Admin" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-700 truncate">Super Admin</p>
                <p className="text-[10px] text-slate-500 truncate">admin@flybook.com</p>
              </div>
            </div>
            <button className="mt-3 flex items-center justify-center w-full gap-2 p-2 text-xs font-bold text-red-500 bg-white border border-red-100 rounded-lg hover:bg-red-50 transition-colors">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        )}
      </motion.aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* Top Professional Header */}
        <header className={`h-20 flex items-center justify-between px-6 sticky top-0 z-30 transition-all ${
          scrolled ? "bg-white/80 backdrop-blur-md border-b shadow-sm" : "bg-transparent"
        }`}>
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 bg-white rounded-lg border shadow-sm" onClick={() => setIsMobileOpen(true)}>
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            
            {/* Search Bar (Modern) */}
            <div className="hidden lg:flex items-center bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl w-80 focus-within:ring-2 ring-blue-100 transition-all">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search bookings, flights..." 
                className="bg-transparent border-none outline-none ml-2 text-sm w-full text-slate-700 placeholder:text-slate-400"
              />
              <div className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border text-[10px] text-slate-400 font-mono">
                <Command className="w-2.5 h-2.5" /> K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-700">Rahat Khan</p>
                <p className="text-[11px] text-blue-600 font-medium">System Manager</p>
              </div>
              <img 
                src="https://ui-avatars.com/api/?name=Rahat+Khan&background=random" 
                className="w-10 h-10 rounded-xl border-2 border-white shadow-sm cursor-pointer hover:ring-2 ring-blue-100 transition-all" 
                alt="Profile" 
              />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-[1400px] mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm md:hidden" 
              onClick={() => setIsMobileOpen(false)} 
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[70] w-72 bg-white shadow-2xl md:hidden p-6 flex flex-col"
            >
               <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">FB</div>
                    <span className="font-bold text-xl uppercase tracking-tight">FlyBook</span>
                  </div>
                  <button onClick={() => setIsMobileOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                    <X className="w-6 h-6" />
                  </button>
               </div>
               <nav className="space-y-3 flex-1">
                  {menuItems.map((item) => (
                    <Link key={item.name} href={item.href} onClick={() => setIsMobileOpen(false)}>
                      <div className={`flex items-center p-3.5 rounded-xl ${pathname === item.href ? "bg-blue-600 text-white shadow-lg" : "text-slate-600 hover:bg-slate-50"}`}>
                        <item.icon className="w-5 h-5 mr-3" />
                        <span className="font-semibold text-sm">{item.name}</span>
                      </div>
                    </Link>
                  ))}
               </nav>
               <div className="border-t pt-6">
                  <button className="flex items-center gap-3 w-full p-4 text-red-500 bg-red-50 rounded-xl font-bold">
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}</style>
    </div>
  );
}