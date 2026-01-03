import { Code, Layout, Server, Database, Smartphone, Globe } from "lucide-react";

export const skills = [
  {
    title: "Web Development",
    icon: Layout,
    desc: "Membangun antarmuka yang responsif, cepat, dan modern.",
    items: ["React.js & Vite", "Tailwind CSS", "Bootstrap 5", "HTML5 & Semantic"],
  },
  {
    title: "Backend & System",
    icon: Database,
    desc: "Merancang alur data dan logika bisnis yang aman.",
    items: ["Supabase (PostgreSQL)", "Node.js Basic", "REST API Integration", "Authentication"],
  },
  {
    title: "Tools & Workflow",
    icon: Server,
    desc: "Alat bantu untuk produktivitas development.",
    items: ["Git & GitHub", "VS Code", "Figma", "Postman"],
  },
];

export const projects = [
  {
    title: "SIMRS Commercial Pro",
    category: "Web App / SaaS",
    desc: "Sistem Manajemen Rumah Sakit Fullstack. Fitur mencakup pendaftaran pasien, rekam medis dokter, kasir otomatis potong stok, dan laporan keuangan real-time.",
    tech: ["React", "Vite", "Supabase", "Tailwind", "Recharts"],
    linkDemo: "https://Faisalwich.github.io/simsrs-commercial/", // Link Deploy tadi
    linkRepo: "https://github.com/Faisalwich/simsrs-commercial", // Link Repo tadi
    image: "/simsrs.png", // Placeholder RS
    featured: true,
  },
  {
    title: "Kopi Kuy E-Commerce",
    category: "UMKM Digital",
    desc: "Platform toko online untuk kedai kopi lokal. Membantu pemilik toko mencatat pesanan online dan memperluas jangkauan pasar.",
    tech: ["Bootstrap 5", "Javascript DOM", "HTML/CSS"],
    linkDemo: "#",
    linkRepo: "https://github.com/Faisalwich/kopi-kuy",
    image: "/kopi-kuy.png",
    featured: false,
  },
];

export const timeline = [
  {
    year: "2026 (Target)",
    title: "Lulus dengan Predikat Cum Laude",
    desc: "Menyelesaikan skripsi tentang implementasi AI dalam Sistem Informasi Bisnis.",
    status: "future",
  },
  {
    year: "2025 (Target)",
    title: "Fullstack Developer Intern",
    desc: "Magang di perusahaan teknologi Unicorn atau Startup yang bergerak di bidang Fintech.",
    status: "future",
  },
  {
    year: "DES 2025",
    title: "Membangun Personal Branding",
    desc: "Meluncurkan website MoneyWich v1.0 dan mendalami JavaScript Lanjutan.",
    status: "current",
  },
  {
    year: "2024",
    title: "Proyek Freelance Pertama",
    desc: "Berhasil mengerjakan landing page untuk klien UMKM lokal.",
    status: "past",
  },
  {
    year: "2022",
    title: "Mulai Kuliah Sistem Informasi",
    desc: "Pertama kali mengenal algoritma, basis data, dan dunia pemrograman.",
    status: "past",
  },
];

export const nowStatus = [
  {
    icon: "📚",
    title: "Membaca",
    desc: '"Atomic Habits" oleh James Clear.',
  },
  {
    icon: "🎮",
    title: "Bermain",
    desc: "Push rank eFootball Mobile.",
  },
  {
    icon: "💻",
    title: "Side Project",
    desc: "Eksperimen membuat aplikasi pengelola keuangan pribadi.",
  },
];

export const contactInfo = {
  email: "faisalwich@gmail.com", // Ganti email aslimu
  linkedin: "https://linkedin.com/in/faisalwich", // Ganti link aslimu
  github: "https://github.com/faisalwich",
  instagram: "https://instagram.com/faisalwich",
};
