import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://atbzconfosulspunqnib.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0Ynpjb25mb3N1bHNwdW5xbmliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNTY0OTAsImV4cCI6MjEwNTczMjQ5MH0.At6OHDXFwFUEvisTrDhn2_W7d6i751hv-SPzP9zdpqU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);