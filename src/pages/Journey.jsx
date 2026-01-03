import React from "react";
import { motion } from "framer-motion";
import { timeline, nowStatus } from "../data";
import { Clock, Flag, MapPin } from "lucide-react";

export default function Journey() {
  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 text-xs font-bold tracking-wider mb-4">LIFE UPDATE</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Perjalanan & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">Fokus</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">Dari mana saya berasal, apa yang saya kerjakan sekarang, dan ke mana saya akan pergi.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* KOLOM KIRI: TIMELINE */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
              <MapPin size={20} className="text-primary" /> My Roadmap
            </h3>

            <div className="border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-12 pb-10">
              {timeline.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="relative pl-8">
                  {/* TITIK (MARKER) */}
                  <div
                    className={`absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-white dark:border-slate-900 ${
                      item.status === "current" ? "bg-primary ring-4 ring-primary/20" : item.status === "future" ? "bg-slate-300 dark:bg-slate-600" : "bg-slate-800 dark:bg-white"
                    }`}
                  ></div>

                  {/* ISI KONTEN */}
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded border mb-2 inline-block ${
                      item.status === "current" ? "bg-primary text-white border-primary" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {item.year}
                  </span>

                  <h4 className={`text-lg font-bold mt-1 ${item.status === "future" ? "text-slate-400 dark:text-slate-500" : "text-slate-900 dark:text-white"}`}>{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* KOLOM KANAN: NOW PAGE (STICKY) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 relative overflow-hidden">
                {/* Efek Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full"></div>

                <h3 className="text-xl font-bold mb-1 flex items-center gap-2 relative z-10">
                  <Clock size={20} className="text-yellow-400" /> Now Page
                </h3>
                <p className="text-xs text-slate-400 mb-6 relative z-10">
                  Update terakhir: <span className="text-white font-bold">Desember 2025</span>
                </p>

                <div className="space-y-4 relative z-10">
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                    <h6 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">FOKUS UTAMA</h6>
                    <p className="font-bold text-lg">Menuntaskan Semester 7 🎓</p>
                    <p className="text-sm text-slate-400 mt-1">Sibuk dengan tugas ERP & Mobile Programming.</p>
                  </div>

                  <div className="grid gap-3">
                    {nowStatus.map((now, i) => (
                      <div key={i} className="flex gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-primary/50 transition">
                        <span className="text-xl">{now.icon}</span>
                        <div>
                          <h6 className="font-bold text-sm">{now.title}</h6>
                          <p className="text-xs text-slate-400">{now.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
