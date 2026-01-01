/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  ShieldCheck, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MoreHorizontal, 
  UserPlus,
  ShieldAlert,
  Calendar,
  Trash2,
  Edit
} from "lucide-react";
import { motion } from "framer-motion";

const initialUsers = [
  { id: "USR-001", name: "Ariful Islam", email: "arif@example.com", role: "Admin", joined: "Oct 2023", status: "Active", img: "https://i.pravatar.cc/150?u=1" },
  { id: "USR-002", name: "Sarah Khan", email: "sarah.k@mail.com", role: "Customer", joined: "Jan 2024", status: "Active", img: "https://i.pravatar.cc/150?u=2" },
  { id: "USR-003", name: "Mehedi Hasan", email: "mehedi@agency.com", role: "Moderator", joined: "Mar 2024", status: "Inactive", img: "https://i.pravatar.cc/150?u=3" },
  { id: "USR-004", name: "Jannat Tara", email: "tara@web.com", role: "Customer", joined: "May 2024", status: "Active", img: "https://i.pravatar.cc/150?u=4" },
];

export default function UsersPage() {
  const [users] = useState(initialUsers);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span className="p-2.5 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
              <Users className="w-6 h-6 text-white" />
            </span>
            Users Control
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Manage platform members and their access levels.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
          <UserPlus className="w-5 h-5" />
          Add New Member
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Members", val: "4,250", icon: Users, color: "text-indigo-600 bg-indigo-50" },
          { label: "Active Now", val: "1,120", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50" },
          { label: "Restricted", val: "12", icon: ShieldAlert, color: "text-rose-600 bg-rose-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">{stat.label}</p>
              <p className="text-xl font-black text-slate-900 mt-1">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, email or role..." 
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-[1.5rem] text-sm font-semibold focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
          />
        </div>
        <button className="px-6 py-4 bg-white border border-slate-100 rounded-[1.5rem] text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm">
          <Filter className="w-4 h-4 text-indigo-600" /> Sort & Filter
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">User Profile</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Access Role</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Joined Date</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: idx * 0.05 }}
                  key={user.id} 
                  className="hover:bg-indigo-50/20 transition-all group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={user.img} alt="" className="w-11 h-11 rounded-2xl object-cover ring-2 ring-slate-100" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{user.name}</p>
                        <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                      user.role === 'Admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-300" />
                      {user.joined}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                      <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
                      <span className="ml-2 text-[11px] font-black text-slate-700 uppercase">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all border border-transparent hover:border-rose-100">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest tracking-tighter">Total 4,250 Registered Users</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-black text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all uppercase">Next Page</button>
          </div>
        </div>
      </div>
    </div>
  );
}