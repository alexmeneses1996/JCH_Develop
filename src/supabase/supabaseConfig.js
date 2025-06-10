import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vqtqlzyxgazravgixkou.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxdHFsenl4Z2F6cmF2Z2l4a291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NjYwNTEsImV4cCI6MjA2MDM0MjA1MX0.bF61xnrOyXjWY_NnDjYVwVDiYzmGfPP3TUvpzU1dLDg";

export const supabase = createClient(supabaseUrl, supabaseKey);



const supabaseUrl_otro = "https://awxwbbswdxfiecluewaj.supabase.co";
const supabaseKey_otro =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3eHdiYnN3ZHhmaWVjbHVld2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMTU0MjgsImV4cCI6MjA2NDg5MTQyOH0.PynTVWxEhwSTTPMfq991A903e5p6Odbhl6mEjjz4LgM";

export const supabase_otro = createClient(supabaseUrl_otro, supabaseKey_otro);



