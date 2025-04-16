import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://<tu-url>.supabase.co';
const supabaseKey = '<tu-clave-publica>';

export const supabase = createClient(supabaseUrl, supabaseKey);
