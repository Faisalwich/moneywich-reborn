import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabaseClient";

// Import Komponen Navigasi
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // 👈 Jangan lupa import ini

// Import Halaman
import Home from "./pages/Home";
import Brain from "./pages/Brain";
import BrainDetail from "./pages/BrainDetail";
import Journey from "./pages/Journey";
import Login from "./pages/Login";
import Editor from "./pages/Editor";

// Komponen Pelindung (Supaya cuma admin yang bisa masuk Editor)
const ProtectedRoute = ({ children, session }) => {
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Cek sesi login saat aplikasi dibuka
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Dengarkan perubahan login/logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      {/* Container Utama: Mengatur layout jadi kolom (atas ke bawah) */}
      <div className="bg-white dark:bg-slate-900 min-h-screen text-slate-900 dark:text-white transition-colors duration-300 flex flex-col font-sans">
        {/* 1. NAVBAR (Selalu di Atas) */}
        <Navbar session={session} />

        {/* 2. AREA KONTEN (Tengah - Bisa Memanjang) */}
        {/* 'flex-grow' artinya: Isi ruang kosong yang tersisa. Ini yang mendorong Footer ke bawah. */}
        <div className="flex-grow">
          <Routes>
            {/* Halaman Utama */}
            <Route path="/" element={<Home />} />

            {/* Halaman Brain (List Tulisan) */}
            <Route path="/brain" element={<Brain />} />

            {/* Halaman Brain Detail (Baca Tulisan) */}
            <Route path="/brain/:id" element={<BrainDetail />} />

            {/* Halaman Journey (Timeline) */}
            <Route path="/journey" element={<Journey />} />

            {/* Halaman Login */}
            <Route path="/login" element={<Login />} />

            {/* Halaman Editor (Khusus Admin) */}
            {/* Tanda tanya :id? artinya ID itu opsional (bisa buat baru, bisa edit) */}
            <Route
              path="/editor/:id?"
              element={
                <ProtectedRoute session={session}>
                  <Editor />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        {/* 3. FOOTER (Selalu di Bawah) */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
