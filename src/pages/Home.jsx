import React from "react";
import { motion } from "framer-motion";
import { skills, projects } from "../data";
import { ArrowRight, Github, ExternalLink, Download } from "lucide-react";

// Komponen Animasi Pembungkus (Slide Up)
const FadeUp = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: delay }}>
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute top-0 right-0 -z-10 opacity-30 dark:opacity-20">
          {/* Background Blob Effect */}
          <div className="w-96 h-96 bg-primary rounded-full blur-[120px] absolute top-20 right-0"></div>
          <div className="w-96 h-96 bg-purple-500 rounded-full blur-[120px] absolute bottom-0 left-0"></div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 w-full grid md:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-primary text-xs font-bold tracking-wider mb-4 dark:bg-slate-800">SYSTEM INFORMATION STUDENT</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
              Mengubah Masalah Bisnis Menjadi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Solusi Digital.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg">
              Saya menggabungkan pemahaman proses bisnis dengan kemampuan teknis untuk membangun sistem yang efisien, aman, dan berdampak.
            </p>
            <div className="flex gap-4">
              <a href="#projects" className="px-6 py-3 bg-primary hover:bg-sky-600 text-white font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-primary/30">
                Lihat Proyek <ArrowRight size={20} />
              </a>
              <a
                href="https://github.com/Faisalwich"
                target="_blank"
                className="px-6 py-3 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-white font-bold rounded-xl transition flex items-center gap-2"
              >
                <Github size={20} /> GitHub
              </a>
            </div>
          </FadeUp>

          {/* Code Mockup Visual */}
          <FadeUp delay={0.2}>
            <div className="relative bg-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-800 rotate-2 hover:rotate-0 transition duration-500">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex">
                  <span className="text-purple-400 w-24">const</span>
                  <span className="text-yellow-300">developer</span>
                  <span className="text-white mx-2">=</span>
                  <span className="text-white">{`{`}</span>
                </div>
                <div className="pl-8 text-slate-400">
                  name: <span className="text-green-400">'Faisal'</span>,
                </div>
                <div className="pl-8 text-slate-400">
                  role: <span className="text-green-400">'Fullstack Dev'</span>,
                </div>
                <div className="pl-8 text-slate-400">
                  status: <span className="text-green-400">'Ready to Hire'</span>
                </div>
                <div className="text-white">{`}`}</div>
                <div className="pt-2 text-slate-500">// Efficiency Increased 40%</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-screen-xl mx-auto px-4">
          <FadeUp>
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">Kompetensi Inti</h2>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <FadeUp key={index} delay={index * 0.1}>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition border border-slate-100 dark:border-slate-700 h-full">
                  <div className="bg-blue-100 dark:bg-slate-700 w-14 h-14 rounded-xl flex items-center justify-center text-primary mb-6">
                    <skill.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{skill.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{skill.desc}</p>
                  <ul className="space-y-2">
                    {skill.items.map((item, i) => (
                      <li key={i} className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-20">
        <div className="max-w-screen-xl mx-auto px-4">
          <FadeUp>
            <h2 className="text-3xl font-bold mb-12 text-slate-900 dark:text-white">Project</h2>
          </FadeUp>

          <div className="space-y-20">
            {projects.map((project, index) => (
              <FadeUp key={index}>
                <div className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}>
                  {/* Gambar Project */}
                  <div className="w-full md:w-1/2">
                    <div className="relative group overflow-hidden rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700">
                      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition z-10"></div>
                      <img src={project.image} alt={project.title} className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500" />
                    </div>
                  </div>

                  {/* Deskripsi Project */}
                  <div className="w-full md:w-1/2">
                    <span className="text-primary font-bold tracking-wider text-sm uppercase">{project.category}</span>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2 mb-4">{project.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{project.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <a
                        href={project.linkDemo}
                        target="_blank"
                        className="text-slate-900 dark:text-white font-bold hover:text-primary flex items-center gap-2 border-b-2 border-transparent hover:border-primary transition"
                      >
                        Lihat Demo <ExternalLink size={18} />
                      </a>
                      <a href={project.linkRepo} target="_blank" className="text-slate-600 dark:text-slate-400 hover:text-primary flex items-center gap-2 transition">
                        <Github size={18} /> Source Code
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      {/* --- CONTACT / CTA SECTION --- */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Hiasan */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 dark:from-primary/10 dark:to-purple-900/20 -z-10"></div>

        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeUp>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
              Punya Ide Proyek Menarik? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Mari Kita Wujudkan.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Saya selalu terbuka untuk diskusi tentang pengembangan web, sistem informasi, atau sekadar bertukar pikiran tentang teknologi terbaru.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:moneywicah@gmail.com"
                className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:scale-105 transition shadow-xl flex items-center justify-center gap-2"
              >
                <span className="text-xl">👋</span> Kirim Email Saja
              </a>
              <a
                href="https://www.linkedin.com/in/faisal-wicahyono/"
                target="_blank"
                className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2"
              >
                Hubungi via LinkedIn
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
