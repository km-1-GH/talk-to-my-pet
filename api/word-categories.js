import { getSupabaseClient } from "./supabase.js"

export async function GET(req, res) {
    const supabase = getSupabaseClient()

    const { data } = await supabase
        .from('word_categories')
        .select('*')
        .order('id')

    return new Response(JSON.stringify(data))
}
