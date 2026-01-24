export async function GET(req, res) {
    return new Response(JSON.stringify([
        { id: 1, name: 'あいさつ' },
        { id: 2, name: '食べ物' },
        { id: 3, name: '必殺技' },
        { id: 4, name: '場所' },
    ]))
}
