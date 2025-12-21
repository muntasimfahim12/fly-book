"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  IconMenu2,
  IconX,
  IconPhoneCall,
  IconPlane,
  IconUser,
} from "@tabler/icons-react";

const navItems = [
  { name: "Flights", link: "#flights" },
  { name: "Hotels", link: "#hotels" },
  { name: "Deals", link: "#deals" },
  { name: "Support", link: "#support" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{
        height: scrolled ? 64 : 80,
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        backgroundColor: scrolled
          ? "rgba(255,255,255,0.85)"
          : "rgba(255,255,255,0.65)",
      }}
      transition={{ type: "spring", stiffness: 180, damping: 26 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-black/10 dark:border-white/10 dark:bg-black/60"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2 font-semibold text-[18px] tracking-wide text-black">
          <IconPlane className="text-black" />
          <span>FlyBook</span>
        </div>


        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="text-black 
        text-[14.5px] 
        font-medium 
        tracking-wide
        transition 
        hover:opacity-80"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Call Button */}
          <a
            href="tel:+880123456789"
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10 transition"
          >
            <IconPhoneCall size={18} />
            Call Us
          </a>

          {/* Login Button */}
          <button className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 transition">
            <IconUser size={18} />
            Login
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700 dark:text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <IconX /> : <IconMenu2 />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="md:hidden bg-white dark:bg-black px-6 py-6 space-y-4 border-t dark:border-white/10"
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              onClick={() => setOpen(false)}
              className="   block 
      text-black 
      text-sm 
      font-medium 
      tracking-wide
      transition 
      hover:opacity-80"
            >
              {item.name}
            </a>
          ))}

          <div className="pt-4 space-y-3">
            <a
              href="tel:+880123456789"
              className="flex items-center justify-center gap-2 rounded-lg border py-2 text-sm dark:text-white"
            >
              <IconPhoneCall size={18} />
              Call Us
            </a>

            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-2 text-sm font-semibold text-white">
              <IconUser size={18} />
              Login
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
