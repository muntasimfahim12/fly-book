"use client";

import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#2E7D52] text-white pt-16 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand and Description (Takes 2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-baseline">
               {/* Replace with your actual logo if available */}
               <h1 className="text-4xl font-black tracking-tighter flex items-center italic">
                fly<span className="text-white">@</span>book
               </h1>
            </div>
            <p className="text-[15px] leading-relaxed opacity-90 max-w-sm">
              FlyBook, owned and operated by Shohoj Limited, is Bangladeshs largest online ticket destination, which is committed to making your life convenient, easier and smarter.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-5 tracking-wide">Quick Links</h3>
            <ul className="space-y-3 text-[14px] opacity-80">
              <li><a href="#" className="hover:opacity-100 transition">Home</a></li>
              <li><a href="#" className="hover:opacity-100 transition">About Us</a></li>
              <li><a href="#" className="hover:opacity-100 transition">Contact Us</a></li>
              <li><a href="#" className="hover:opacity-100 transition">Deals & Offers</a></li>
              <li><a href="#" className="hover:opacity-100 transition">Blog</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-5 tracking-wide">Services</h3>
            <ul className="space-y-3 text-[14px] opacity-80">
              <li><a href="#" className="hover:opacity-100 transition">Bus Tickets</a></li>
              <li><a href="#" className="hover:opacity-100 transition">Air Tickets</a></li>
              <li><a href="#" className="hover:opacity-100 transition">Train Tickets</a></li>
              <li><a href="#" className="hover:opacity-100 transition">Launch Tickets</a></li>
              <li><a href="#" className="hover:opacity-100 transition">Event Tickets</a></li>
              <li><a href="#" className="hover:opacity-100 transition">Park Tickets</a></li>
            </ul>
          </div>

          {/* Information & Social */}
          <div>
            <h3 className="text-lg font-bold mb-5 tracking-wide">Information</h3>
            <ul className="space-y-3 text-[14px] opacity-80 mb-8">
              <li><a href="#" className="hover:opacity-100 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:opacity-100 transition">Term & Condition</a></li>
            </ul>

            <div className="mt-6">
               <p className="text-[11px] uppercase tracking-widest opacity-70 mb-3">Authorized by</p>
               <div className="bg-white/10 w-fit px-3 py-1 rounded border border-white/20">
                  <span className="font-bold text-sm tracking-tighter italic">IATA</span>
               </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright */}
          <div className="text-[13px] opacity-70">
            Copyright © 2015-2025 Flybook Ltd. · All Rights Reserved
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a href="#" className="hover:scale-110 transition-transform">
                <IconBrandFacebook size={22} stroke={1.5} />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
                <IconBrandInstagram size={22} stroke={1.5} />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
                <IconBrandLinkedin size={22} stroke={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;