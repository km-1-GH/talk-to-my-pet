import { createClient } from '@supabase/supabase-js'

let supabaseClient = null

export function getSupabaseClient() {
    // 既にクライアントが存在する場合は再利用
    if (supabaseClient) {
        return supabaseClient
    }

    // 新しいクライアントを作成
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_KEY
    supabaseClient = createClient(supabaseUrl, supabaseKey)

    return supabaseClient
}