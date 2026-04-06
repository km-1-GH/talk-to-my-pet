
export async function getWordCategories() {
    const response = await fetch('/api/word-categories')
    const wordCategories = await response.json()
    return wordCategories
}

export async function addWord(word) {
    const response = await fetch('/api/words', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
    })
    const newWord = await response.json()
    return newWord
}

export async function createLine() {
    const response = await fetch('/api/lines', {
        method: 'POST'
    })

    const line = await response.json()
    return line
}
