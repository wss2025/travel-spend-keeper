// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mecpteczkgheiqtckdor.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lY3B0ZWN6a2doZWlxdGNrZG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNDE4MjgsImV4cCI6MjA1NDkxNzgyOH0.yazTdK1ltGl7JkJmhWzNGeVvakuI8hNJsnsyq_oV_Zg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);