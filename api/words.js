export async function GET() {
    return new Response(JSON.stringify([
        { id: 1, content: 'おざまーっす', wordCategoryId: 1 },
        { id: 2, content: 'くわいの煮物', wordCategoryId: 2 },
        { id: 3, content: 'ドラゴンブレイク', wordCategoryId: 3 },
        { id: 4, content: '秘密基地', wordCategoryId: 4 },
    ]))
}

export async function POST(req) {
    const data = await req.json()
    console.log('新しい言葉を受け取りました:', data)

    // TODO: データベースに保存する処理

    return new Response(JSON.stringify({ id: 5, ...data }), { status: 201 })
}