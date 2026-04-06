import { getSupabaseClient } from "./supabase.js"

// export async function GET() {
//     const supabase = getSupabaseClient()

//     const { data } = await supabase
//         .from('words')
//         .select('*')
//         .order('id')

//     const words = data.map(row => ({
//         id: row.id,
//         content: row.content,
//         wordCategoryId: row.word_category_id
//     }))

//     return new Response(JSON.stringify(words))
// }


export async function POST(request) {
    const supabase = getSupabaseClient()

    const body = await request.json()
    console.log('新しい言葉を受け取りました:', body)

    // データベースに保存する処理
    const { data } = await supabase
        .from('words')
        .insert([
            { content: body.content, word_category_id: body.wordCategoryId }
        ])
        .select()
        .single()

    const word = {
        content: data.content,
        wordCategoryId: data.word_category_id
    }

    return new Response(JSON.stringify(word))
}