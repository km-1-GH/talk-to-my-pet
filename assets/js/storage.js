export function getWords() {
    const json = localStorage.getItem('words')
    if (!json) {
        return []
    }
    return JSON.parse(json)
}

export function putWords(words) {
    const json = JSON.stringify(words)
    localStorage.setItem('words', json)
}

export function getWordCategories() {
    return [
        'あいさつ',
        '食べ物',
        '必殺技',
        '場所'
    ]
}

export function getTemplates() {
    return [
        { content: 'おはようからおやすみまで「{言葉}」でお送りしています', category: 'あいさつ', motion: 'idle' },
        { content: '第一声が「{言葉}」？それもう様式美でしょ', category: 'あいさつ', motion: 'shifty' },
        { content: '今日も元気に「{言葉}」していこうな', category: 'あいさつ', motion: 'idle' },
        { content: 'とりあえず「{言葉}」って言っとけば場は持つ', category: 'あいさつ', motion: 'confused' },
        { content: '{言葉}味、想像したら負けなやつ', category: '食べ物', motion: 'confused' },
        { content: '公式がやりそうでやらない「{言葉}」味', category: '食べ物', motion: 'shifty' },
        { content: '見た目はアレだけど味は普通の「{言葉}」', category: '食べ物', motion: 'idle' },
        { content: 'SNSで炎上しそうな「{言葉}」フード', category: '食べ物', motion: 'damaged' },
        { content: '必殺技「{言葉}」発動！（なお効果は未確認）', category: '必殺技', motion: 'attack' },
        { content: '相手は「{言葉}」を理解できなかった', category: '必殺技', motion: 'confused' },
        { content: '伝説の技「{言葉}」※再現性なし', category: '必殺技', motion: 'rolling' },
        { content: '強そうに見えるだけの必殺技「{言葉}」', category: '必殺技', motion: 'shifty' },
        { content: 'だいたいみんな一度は通る「{言葉}」', category: '場所', motion: 'idle' },
        { content: '地図に載ってないけど有名な「{言葉}」', category: '場所', motion: 'shifty' },
        { content: '行くとだいたい迷う「{言葉}」', category: '場所', motion: 'confused' },
        { content: 'なぜか語られがちな場所「{言葉}」', category: '場所', motion: 'rolling' },
    ]
}