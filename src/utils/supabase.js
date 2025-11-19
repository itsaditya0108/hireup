import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const getSupabaseClient = (token) => {
    return createClient(supabaseUrl, supabaseKey, {
        global: {
            headers: token
                ? { Authorization: `Bearer ${token}` }
                : {},
        },
    });
};

export default getSupabaseClient;
