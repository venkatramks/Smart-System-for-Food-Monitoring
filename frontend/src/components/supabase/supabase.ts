import { createClient } from '@supabase/supabase-js';

const supabaseUrl = ''; // Replace with your Supabase URL
const supabaseAnonKey = ''; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
