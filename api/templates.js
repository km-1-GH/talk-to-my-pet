export async function GET() {
    return new Response(JSON.stringify([
        { id: 1, content: "おはようからおやすみまで「{言葉}」でお送りしています", wordCategoryId: 1, motion: 'idle' },
        { id: 2, content: "第一声が「{言葉}」？それもう様式美でしょ", wordCategoryId: 1, motion: 'shifty' },
        { id: 3, content: "今日も元気に「{言葉}」していこうな", wordCategoryId: 1, motion: 'idle' },
        { id: 4, content: "とりあえず「{言葉}」って言っとけば場は持つ", wordCategoryId: 1, motion: 'confused' },
        { id: 5, content: "{言葉}味、想像したら負けなやつ", wordCategoryId: 2, motion: 'confused' },
        { id: 6, content: "公式がやりそうでやらない「{言葉}」味", wordCategoryId: 2, motion: 'shifty' },
        { id: 7, content: "見た目はアレだけど味は普通の「{言葉}」", wordCategoryId: 2, motion: 'idle' },
        { id: 8, content: "SNSで炎上しそうな「{言葉}」フード", wordCategoryId: 2, motion: 'damaged' },
        { id: 9, content: "必殺技「{言葉}」発動！（なお効果は未確認）", wordCategoryId: 3, motion: 'attack' },
        { id: 10, content: "相手は「{言葉}」を理解できなかった", wordCategoryId: 3, motion: 'confused' },
        { id: 11, content: "伝説の技「{言葉}」※再現性なし", wordCategoryId: 3, motion: 'rolling' },
        { id: 12, content: "強そうに見えるだけの必殺技「{言葉}」", wordCategoryId: 3, motion: 'shifty' },
        { id: 13, content: "だいたいみんな一度は通る「{言葉}」", wordCategoryId: 4, motion: 'idle' },
        { id: 14, content: "地図に載ってないけど有名な「{言葉}」", wordCategoryId: 4, motion: 'shifty' },
        { id: 15, content: "行くとだいたい迷う「{言葉}」", wordCategoryId: 4, motion: 'confused' },
        { id: 16, content: "なぜか語られがちな場所「{言葉}」", wordCategoryId: 4, motion: 'rolling' },
    ]))
}
