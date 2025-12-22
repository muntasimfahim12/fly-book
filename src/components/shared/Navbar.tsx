"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconMenu2, IconX, IconPhoneCall, IconPlane, IconUser } from "@tabler/icons-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { name: "Flights", link: "#flights" },
  { name: "Hotels", link: "#hotels" },
  { name: "Deals", link: "#deals" },
  { name: "Support", link: "#support" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{
        height: scrolled ? 60 : 80,
        backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
        backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-black/10"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between h-full px-4">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg tracking-wide text-black transition-all duration-300 hover:scale-105"
        >
          <motion.div
            animate={{ width: scrolled ? 32 : 40 }}
            className="flex items-center"
          >
            <IconPlane className="text-green-600" size={24} />
          </motion.div>
          <span className="whitespace-nowrap">FlyBook</span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.link}
              className="relative text-black tracking-wide cursor-pointer"
              initial={{ width: "auto" }}
              whileHover={{ scaleX: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-600 transition-all group-hover:w-full"></span>
            </motion.a>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+880123456789"
            className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            <IconPhoneCall size={18} /> Call Us
          </a>

          {user ? (
            <button
              onClick={logout}
              className="bg-red-600 px-5 py-2 rounded-xl text-white hover:bg-red-700 transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 transition cursor-pointer"
              >
                <IconUser size={18} /> Login
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 border rounded-xl hover:bg-gray-100 transition cursor-pointer"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden text-gray-800" onClick={() => setOpen(!open)}>
          {open ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white px-6 py-6 space-y-5 border-t"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium tracking-wide text-black hover:opacity-80 cursor-pointer"
              >
                {item.name}
              </a>
            ))}

            <div className="pt-4 space-y-3">
              <a
                href="tel:+880123456789"
                className="flex items-center justify-center gap-2 rounded-xl border py-2 text-sm cursor-pointer"
              >
                <IconPhoneCall size={18} /> Call Us
              </a>

              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="bg-red-600 w-full py-2 rounded-xl text-white hover:bg-red-700 transition cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-2 text-sm font-semibold text-white hover:bg-green-700 transition cursor-pointer"
                  >
                    <IconUser size={18} /> Login
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setOpen(false)}
                    className="w-full py-2 border rounded-xl text-center hover:bg-gray-100 transition cursor-pointer"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
