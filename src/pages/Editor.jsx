import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ArrowLeft, Image as ImageIcon, X } from "lucide-react";
import ReactQuill from "react-quill-new"; // Pastikan pakai 'react-quill-new'
import "react-quill-new/dist/quill.snow.css";

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 1. CEK DATA (Kalau ini mode Edit)
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchPostData(id);
    }
  }, [id]);

  const fetchPostData = async (postId) => {
    const { data } = await supabase.from("journals").select("*").eq("id", postId).single();
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setTags(data.tags ? data.tags.join(", ") : "");
      if (data.image_url) setPreviewUrl(data.image_url);
    }
  };

  // 2. FUNGSI HANDLE GAMBAR (Saat user memilih file)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("📸 File gambar dipilih:", file.name); // Cek Log 1
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 3. FUNGSI UPLOAD KE SUPABASE STORAGE
  const uploadImage = async () => {
    if (!imageFile) return null;

    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      console.log("🚀 Sedang mengupload ke storage:", fileName); // Cek Log 2

      // Upload
      const { error: uploadError } = await supabase.storage.from("journal-images").upload(fileName, imageFile);

      if (uploadError) {
        console.error("❌ Gagal Upload:", uploadError); // Cek Log Error
        throw uploadError;
      }

      // Ambil Public URL
      const { data } = supabase.storage.from("journal-images").getPublicUrl(fileName);
      console.log("✅ Link Publik didapat:", data.publicUrl); // Cek Log 3

      return data.publicUrl;
    } catch (error) {
      console.error("❌ Error di fungsi uploadImage:", error);
      throw error;
    }
  };

  // 4. FUNGSI SIMPAN (SAVE / UPDATE)
  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = previewUrl; // Default pakai URL preview (atau URL lama)

      console.log("💾 Mulai Proses Simpan...");
      console.log("📂 Status Image File Baru:", imageFile ? "ADA File Baru" : "TIDAK ADA File Baru");

      // Kalau ada file baru, upload dulu
      if (imageFile) {
        finalImageUrl = await uploadImage();
      }

      console.log("🔗 URL Gambar Akhir yang akan disimpan:", finalImageUrl);

      const postData = {
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
        image_url: finalImageUrl, // Ini yang masuk ke database
      };

      if (isEditing) {
        // Mode Edit
        const { error } = await supabase.from("journals").update(postData).eq("id", id);
        if (error) throw error;
        alert("Update sukses! 🔄");
      } else {
        // Mode Baru
        const { error } = await supabase.from("journals").insert([postData]);
        if (error) throw error;
        alert("Terbit sukses! 🎉");
      }

      navigate("/brain");
    } catch (error) {
      console.error("❌ ERROR TERJADI:", error);
      alert("Gagal menyimpan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Konfigurasi Toolbar Text Editor
  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline", "strike", "blockquote"], [{ list: "ordered" }, { list: "bullet" }], ["link"], ["clean"]],
  };

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen max-w-3xl mx-auto">
      <button onClick={() => navigate("/brain")} className="flex items-center text-slate-500 hover:text-primary mb-6">
        <ArrowLeft size={18} className="mr-1" /> Batal & Kembali
      </button>

      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">{isEditing ? "Edit Tulisan ✏️" : "Tulis Jurnal Baru ✍️"}</h1>

      <form onSubmit={handlePost} className="space-y-6">
        {/* INPUT GAMBAR */}
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition relative">
          {previewUrl ? (
            <div className="relative">
              <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-md" />
              <button
                type="button"
                onClick={() => {
                  setPreviewUrl(null);
                  setImageFile(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer block">
              <ImageIcon size={40} className="mx-auto text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Klik untuk upload Cover Image</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          )}
        </div>

        {/* INPUT JUDUL */}
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Judul Tulisan</label>
          <input
            type="text"
            className="w-full p-4 text-lg font-bold rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-primary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* RICH TEXT EDITOR */}
        <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700">
          <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} className="h-64 mb-12 text-slate-900 dark:text-white" />
        </div>

        {/* INPUT TAGS */}
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tags (Pisahkan dengan koma)</label>
          <input
            type="text"
            className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-primary"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-sky-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 flex justify-center items-center gap-2 transition"
        >
          <Save size={20} />
          {loading ? "Menyimpan..." : isEditing ? "Update Tulisan" : "Terbitkan Tulisan"}
        </button>
      </form>
    </div>
  );
}
