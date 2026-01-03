import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nhicngtwiokccasqisay.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oaWNuZ3R3aW9rY2Nhc3Fpc2F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwOTczMjEsImV4cCI6MjA4MjY3MzMyMX0.6t47HPGNwEtlrcWey_6xRKMqY6N_MiXDztGfDeXDvb4";

export const supabase = createClient(supabaseUrl, supabaseKey);
