/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Settings, User, Lock, ShieldCheck, 
  Camera, Save, UserPlus, Ban, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Trash2, Mail, ShieldAlert, Check
} from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");

  // Mock Admin List for Management Feature
  const admins = [
    { id: 1, name: "Ariful Islam", email: "arif@agency.com", role: "Super Admin", status: "Active" },
    { id: 2, name: "Sarah Khan", email: "sarah@agency.com", role: "Admin", status: "Active" },
    { id: 3, name: "Mehedi Hasan", email: "mehedi@agency.com", role: "Editor", status: "Blocked" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-600" />
            Control Center
          </h1>
          <p className="text-slate-500 font-medium mt-1 text-sm">Manage profile, system security, and administrator access.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all">
            System Logs
          </button>
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
            Backup Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Navigation Tabs */}
        <div className="lg:col-span-3 space-y-1">
          {["Profile", "Admin Access", "Security", "Notifications"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-black transition-all ${
                activeTab === tab 
                ? "bg-blue-50 text-blue-600" 
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              }`}
            >
              {tab}
              {activeTab === tab && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />}
            </button>
          ))}
        </div>

        {/* Dynamic Content Area */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* 1. Profile Section */}
          {activeTab === "Profile" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 bg-white border border-slate-100 p-8 rounded-[2.5rem]">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-[2rem] bg-blue-50 border-2 border-white shadow-sm overflow-hidden">
                    <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-full h-full object-cover" />
                  </div>
                  <button className="absolute -bottom-1 -right-1 p-2 bg-blue-600 text-white rounded-lg shadow-md hover:scale-110 transition-transform">
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Personal Information</h3>
                  <p className="text-sm text-slate-400 font-medium">This will be displayed on your profile.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Full Name", val: "Ariful Islam", icon: User },
                  { label: "Email Address", val: "arif@agency.com", icon: Mail },
                ].map((field, i) => (
                  <div key={i} className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{field.label}</label>
                    <div className="relative">
                      <field.icon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                      <input 
                        type="text" defaultValue={field.val}
                        className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none font-bold text-slate-700 transition-all" 
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-4">
                <button className="px-8 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs flex items-center gap-2 shadow-xl shadow-blue-100">
                  <Save className="w-4 h-4" /> Save Profile
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. Admin Access Management (Special Feature) */}
          {activeTab === "Admin Access" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Administrator Management</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">Add, remove or block administrative access.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-slate-800 transition-all">
                  <UserPlus className="w-4 h-4" /> Add New Admin
                </button>
              </div>

              <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-tighter">Admin User</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-tighter">Access Level</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-tighter text-center">Status</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-tighter text-right">Control</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {admins.map((adm) => (
                        <tr key={adm.id} className="hover:bg-slate-50/50 transition-all">
                          <td className="px-6 py-4">
                            <p className="text-sm font-black text-slate-800">{adm.name}</p>
                            <p className="text-xs text-slate-400 font-medium">{adm.email}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-lg">
                              {adm.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center">
                              <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase flex items-center gap-1.5 ${
                                adm.status === 'Active' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
                              }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${adm.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                {adm.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button title="Block Admin" className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                                <Ban className="w-4 h-4" />
                              </button>
                              <button title="Delete Admin" className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. Security Section */}
          {activeTab === "Security" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 bg-white border border-slate-100 p-8 rounded-[2.5rem]">
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  Account Security
                </h3>
                <p className="text-sm text-slate-400 font-medium">Update password and enable two-factor authentication.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none font-bold transition-all" />
                </div>
                <div />
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none font-bold transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none font-bold transition-all" />
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3 text-emerald-600">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">Two-Factor Auth is Active</span>
                </div>
                <button className="px-8 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs shadow-lg">
                  Update Security
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}