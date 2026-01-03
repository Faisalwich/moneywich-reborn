import React from "react";
import { Github, Linkedin, Instagram, Mail, Heart } from "lucide-react";
import { contactInfo } from "../data";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-auto transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Kiri: Brand & Copyright */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">MoneyWich.</h3>
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Faisal. All Rights Reserved.</p>
        </div>

        {/* Tengah: Dibuat dengan Cinta */}
        <div className="text-xs text-slate-400 flex items-center gap-1">Made with React & Supabase</div>

        {/* Kanan: Social Links */}
        <div className="flex gap-4">
          <a href={`mailto:${contactInfo.email}`} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition">
            <Mail size={20} />
          </a>
          <a href={contactInfo.linkedin} target="_blank" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition">
            <Linkedin size={20} />
          </a>
          <a
            href={contactInfo.github}
            target="_blank"
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition"
          >
            <Github size={20} />
          </a>
          <a href={contactInfo.instagram} target="_blank" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-pink-600 hover:text-white transition">
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
