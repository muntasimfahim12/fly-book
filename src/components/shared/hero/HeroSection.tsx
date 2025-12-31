/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconArrowRight, IconTicket, IconDeviceMobile, TablerIcon } from "@tabler/icons-react";

// স্ট্যাটাস আইটেমের জন্য ইন্টারফেস
interface StatItem {
  label: string;
  value: string;
}

interface HeroProps {
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaOnClick?: () => void;
  secondaryCtaText?: string;
  secondaryCtaOnClick?: () => void;
  imageUrl?: string;
  stats?: StatItem[];
}

export const HeroSection: React.FC<HeroProps> = ({
  badgeText = "Bangladesh's Largest Booking Site",
  badgeIcon = <IconTicket size={16} />,
  title,
  subtitle,
  ctaText,
  ctaOnClick,
  secondaryCtaText = "Get App",
  secondaryCtaOnClick,
  imageUrl,
  stats = []
}) => {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen min-h-[600px] lg:h-[75vh] overflow-hidden mb-12 lg:mb-20 flex items-center justify-center">
      
      {/* 🔹 Background Layer with Parallax-ready styling */}
      <div className="absolute inset-0 w-full h-full">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Hero Background"
            className="w-full h-full object-cover object-center scale-105" // scale added for a subtle zoom effect
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#124E3B] to-[#0a2e23]" />
        )}
        
        {/* Modern Multi-layer Overlays */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" /> 
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30" />
      </div>

      {/* 🔹 Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center text-white">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-[#4ade80] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-8"
        >
          {badgeIcon} {badgeText}
        </motion.div>

        {/* Heading: Responsive typography */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-8xl font-extrabold leading-[1.1] mb-6 tracking-tight max-w-5xl"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-200 text-base md:text-xl lg:text-2xl font-light max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full sm:w-auto"
        >
          <button 
            onClick={ctaOnClick}
            className="w-full sm:w-auto bg-[#00A651] hover:bg-[#00c862] text-white px-10 py-4 md:py-5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-3 active:scale-95 group"
          >
            {ctaText} 
            <IconArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={secondaryCtaOnClick}
            className="w-full sm:w-auto bg-white/5 backdrop-blur-xl hover:bg-white/15 text-white border border-white/20 px-10 py-4 md:py-5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <IconDeviceMobile size={18} /> {secondaryCtaText}
          </button>
        </motion.div>

        {/* 🔹 Statistics Section: Fully Dynamic */}
        {stats.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-4 w-full max-w-4xl border-t border-white/10 pt-10"
          >
            {stats.map((stat, index) => (
              <div key={index} className={`flex flex-col items-center ${index === 1 ? 'sm:border-x border-white/10 px-4' : ''}`}>
                <span className="text-3xl md:text-4xl font-black text-[#00A651] mb-1">
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-[11px] uppercase font-semibold text-gray-400 tracking-[0.15em]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};