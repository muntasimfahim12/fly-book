/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconMenu2,
  IconX,
  IconPhoneCall,
  IconPlaneTilt,
  IconUser,
  IconChevronRight,
  IconLogout,
} from "@tabler/icons-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { name: "Flights", link: "/flights" },
  { name: "Hotels", link: "/hotels" },
  { name: "Deals", link: "/deals" },
  { name: "Support", link: "/support" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${
          scrolled 
            ? "h-16 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100" 
            : "h-20 bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between h-full px-6">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-green-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <IconPlaneTilt size={24} className="text-white" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-gray-900">
              Fly<span className="text-green-600">Book</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="text-[15px] font-semibold text-gray-600 hover:text-green-600 transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+880123456789" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
              <IconPhoneCall size={20} />
            </a>
            
            <div className="h-6 w-[1px] bg-gray-200 mx-2" />

            {user ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-red-600 transition-all duration-300"
              >
                <IconLogout size={18} /> Logout
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login" className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-green-600 transition">
                  Login
                </Link>
                <Link href="/auth/register" className="px-6 py-2.5 rounded-full bg-green-600 text-white text-sm font-bold hover:bg-green-700 shadow-lg shadow-green-200 transition-all active:scale-95">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button className="md:hidden p-2 text-gray-900" onClick={() => setOpen(true)}>
            <IconMenu2 size={28} />
          </button>
        </div>
      </motion.header>

      {/* MOBILE SIDE DRAWERS */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] md:hidden"
            />

            {/* Side Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white z-[80] shadow-2xl flex flex-col md:hidden"
            >
              <div className="p-6 flex items-center justify-between border-b">
                <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                  <IconPlaneTilt size={24} className="text-green-600" />
                  <span className="font-bold text-xl tracking-tight">FlyBook</span>
                </Link>
                <button onClick={() => setOpen(false)} className="p-2 bg-gray-100 rounded-full">
                  <IconX size={20} />
                </button>
              </div>

              <nav className="flex-1 p-6 space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Main Menu</p>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-green-50 text-gray-700 hover:text-green-700 font-semibold transition-all group"
                  >
                    {item.name}
                    <IconChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                ))}
              </nav>

              <div className="p-6 border-t bg-gray-50 space-y-3">
                {user ? (
                  <button onClick={logout} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-red-50 text-red-600 font-bold">
                    <IconLogout size={20} /> Logout Account
                  </button>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setOpen(false)} className="flex items-center justify-center w-full py-4 rounded-xl bg-white border font-bold text-gray-700">
                      Login
                    </Link>
                    <Link href="/auth/register" onClick={() => setOpen(false)} className="flex items-center justify-center w-full py-4 rounded-xl bg-green-600 text-white font-bold shadow-lg shadow-green-100">
                      Create Account
                    </Link>
                  </>
                )}
                <div className="flex items-center justify-center gap-2 pt-4 text-gray-400">
                  <IconPhoneCall size={16} />
                  <span className="text-xs font-medium">+880 1234 567 890</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}