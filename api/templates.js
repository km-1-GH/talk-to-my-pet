// import { getSupabaseClient } from "./supabase.js"

// export async function GET() {
//     const supabase = getSupabaseClient()

//     const { data } = await supabase
//         .from('templates')
//         .select('*')
//         .order('id')

//     const templates = data.map(row => ({
//         id: row.id,
//         content: row.content,
//         wordCategoryId: row.word_category_id,
//         motion: row.motion,
//     }))

//     return new Response(JSON.stringify(templates))
// }
