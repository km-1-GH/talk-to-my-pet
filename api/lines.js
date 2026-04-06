import { getSupabaseClient } from "./supabase";

export async function POST() {
    const supabase = getSupabaseClient()

    const { data: words} = await supabase.from('words').select('*').order('id')
    const { data: templates } = await supabase.from('templates').select('*').order('id')

    const word = words[Math.floor(Math.random() * words.length)]

    const categoryTemplates = templates.filter(template => template.word_category_id === word.word_category_id)
    
    const template = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)]

    const message = template.content.replace('{言葉}', word.content)

    return new Response(JSON.stringify({
        message: message,
        motion: template.motion
    }))
}