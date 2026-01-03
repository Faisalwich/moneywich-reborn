import { createClient } from "@supabase/supabase-js";

// 👇 Perhatikan bagian ini!
// Kita tidak lagi menulis link panjang di sini, tapi memanggil dari .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
