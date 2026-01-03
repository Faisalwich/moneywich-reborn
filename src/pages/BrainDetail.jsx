import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { ArrowLeft, Calendar, Hash, Loader2, Edit, Trash2 } from "lucide-react";

export default function BrainDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    const { data } = await supabase.from("journals").select("*").eq("id", id).single();
    if (data) setPost(data);
    setLoading(false);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Yakin mau menghapus tulisan ini selamanya? 😱");
    if (confirmDelete) {
      await supabase.from("journals").delete().eq("id", id);
      navigate("/brain");
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  if (!post) return <div className="min-h-screen flex justify-center items-center text-slate-500">Tulisan tidak ditemukan.</div>;

  return (
    // UBAH 1: max-w-3xl (lebih sempit dari sebelumnya) dan mx-auto (tengah)
    <div className="pt-24 pb-20 px-6 min-h-screen max-w-3xl mx-auto font-sans">
      {/* Navigasi */}
      <div className="flex justify-between items-center mb-10">
        <Link to="/brain" className="inline-flex items-center text-slate-500 hover:text-primary transition font-bold text-sm">
          <ArrowLeft size={18} className="mr-2" /> KEMBALI
        </Link>

        {session && (
          <div className="flex gap-2">
            <button onClick={() => navigate(`/editor/${post.id}`)} className="p-2 bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 transition">
              <Edit size={16} />
            </button>
            <button onClick={handleDelete} className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition">
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* HEADER: Judul & Meta */}
      <div className="text-center mb-10">
        <div className="text-primary font-mono text-xs font-bold tracking-widest uppercase mb-4 opacity-80">{formatDate(post.created_at)}</div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">{post.title}</h1>

        {post.tags && (
          <div className="flex justify-center gap-2">
            {post.tags.map((tag, i) => (
              <span key={i} className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* GAMBAR (Cover Image) */}
      {post.image_url && (
        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
          <img src={post.image_url} alt={post.title} className="w-full h-auto object-cover" />
        </div>
      )}

      {/* UBAH 2: ISI KONTEN (THE BODY)
         - text-justify: Biar rata kanan kiri (rapi seperti koran)
         - prose-lg: Ukuran huruf lebih besar dan nyaman
         - mx-auto: Memastikan blok teks ada di tengah
      */}
      <article
        className="prose dark:prose-invert prose-lg md:prose-xl mx-auto text-slate-700 dark:text-slate-300 leading-loose text-justify break-words whitespace-normal"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Footer Kecil */}
      <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-400 text-sm italic">End of Journal.</p>
      </div>
    </div>
  );
}
