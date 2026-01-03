import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login Gagal! Email/Password salah.");
      setLoading(false);
    } else {
      // Kalau sukses, lempar ke halaman Editor
      navigate("/editor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
        <h1 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white">Admin Area 🔒</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-slate-300">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                className="w-full pl-10 p-2.5 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                placeholder="admin@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-slate-300">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                className="w-full pl-10 p-2.5 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-sky-600 text-white font-bold py-2.5 rounded-lg transition flex justify-center">
            {loading ? <Loader2 className="animate-spin" /> : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
