import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // ✅ SUDAH DIPERBAIKI: Ada useNavigate
import { Search, Loader2, Hash, Calendar, Copy, Check, X, Maximize2, ArrowRight, PlusCircle } from "lucide-react";

// --- KOMPONEN KECIL: CODE SNIPPET (Statis) ---
const SnippetCard = ({ title, lang, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden mb-6 group">
      <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700">
        <span className="text-xs font-mono text-blue-400 font-bold">
          {lang.toUpperCase()} : {title}
        </span>
        <button onClick={handleCopy} className="text-slate-400 hover:text-white transition flex items-center gap-1 text-xs">
          {copied ? (
            <>
              <Check size={14} className="text-green-400" /> Copied!
            </>
          ) : (
            <>
              <Copy size={14} /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-sm text-slate-300 font-mono overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default function Brain() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  // ✅ SUDAH DIPERBAIKI: Definisi Session & Navigate
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();

    // ✅ SUDAH DIPERBAIKI: Cek status login
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from("journals").select("*").order("created_at", { ascending: false });

    if (error) console.log("Error:", error);
    else setPosts(data);
    setLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Helper untuk membuang tag HTML biar preview-nya rapi (hanya teks)
  const stripHtml = (html) => {
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const truncateText = (text, limit) => {
    const cleanText = stripHtml(text);
    if (cleanText.length <= limit) return cleanText;
    return cleanText.substring(0, limit) + "...";
  };

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs font-bold tracking-wider mb-4">SECOND BRAIN</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Isi Kepala <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Developer</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">Kumpulan potongan kode yang sering lupa, catatan belajar, dan jurnal harian.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* KOLOM KIRI: JOURNAL LIST */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-purple-500" /> Jurnal Terbaru
            </h3>

            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    layoutId={`card-${post.id}`}
                    onClick={() => setSelectedPost(post)}
                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition">{post.title}</h4>
                      <span className="text-xs text-slate-500 font-mono">{formatDate(post.created_at)}</span>
                    </div>
                    {/* Preview text bersih tanpa HTML tag */}
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{truncateText(post.content, 150)}</p>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {post.tags &&
                          post.tags.map((tag, i) => (
                            <span key={i} className="flex items-center text-xs font-medium text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded">
                              <Hash size={10} className="mr-1" />
                              {tag}
                            </span>
                          ))}
                      </div>
                      <span className="text-xs font-bold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                        Baca <Maximize2 size={12} />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* KOLOM KANAN: SNIPPETS */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Hash size={20} className="text-blue-500" /> Saved Snippets
            </h3>
            <SnippetCard title="Centering Div" lang="css" code={`.center { \n  display: flex; \n  justify-content: center; \n  align-items: center;\n}`} />
            <SnippetCard title="Git Push" lang="bash" code={`git add .\ngit commit -m "update"\ngit push origin main`} />
          </div>
        </div>
      </div>

      {/* --- POPUP MODAL AREA --- */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>

            <motion.div
              layoutId={`card-${selectedPost.id}`}
              className="bg-white dark:bg-slate-800 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl relative z-10 border border-slate-200 dark:border-slate-700"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition text-slate-500 dark:text-white"
              >
                <X size={20} />
              </button>

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-mono text-slate-500 mb-2 block">{formatDate(selectedPost.created_at)}</span>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedPost.title}</h2>
                  </div>

                  {/* TOMBOL LINK FULL PAGE */}
                  <Link
                    to={`/brain/${selectedPost.id}`}
                    className="flex items-center gap-2 text-xs font-bold text-primary border border-primary/30 px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition"
                    title="Buka di halaman terpisah"
                  >
                    <Maximize2 size={14} /> Full Page
                  </Link>
                </div>

                {selectedPost.tags && (
                  <div className="flex gap-2 mb-6 border-b border-slate-100 dark:border-slate-700 pb-6">
                    {selectedPost.tags.map((tag, i) => (
                      <span key={i} className="flex items-center text-xs font-medium text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded">
                        <Hash size={10} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* ✅ SUDAH DIPERBAIKI: Menggunakan dangerouslySetInnerHTML agar HTML render rapi */}
                <div
                  className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed break-words whitespace-normal"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ✅ SUDAH DIPERBAIKI: Tombol hanya muncul jika ada Session (Login) */}
      {session && (
        <button
          onClick={() => navigate("/editor")}
          className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-purple-700 transition-all duration-300 z-50 flex items-center gap-2 font-bold group"
          title="Tulis Jurnal Baru"
        >
          <PlusCircle size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          <span className="hidden md:inline">Tulis Baru</span>
        </button>
      )}
    </div>
  );
}
