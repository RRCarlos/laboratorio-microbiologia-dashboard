import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xahpjrfypxzeaspjnyuq.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_4kdEZJzkVu5Pdmi19X-r_Q_7zov6nY-"

export const supabase = createClient(supabaseUrl, supabaseKey)