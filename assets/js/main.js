import * as avater from './avater.js'
import * as menu from './menu.js'
import * as inputWordDialog from './inputWordDialog.js'
import * as selectWordCategoryDialog from './selectWordCategoryDialog.js'
import * as speaker from './speaker.js'
import * as api from './api.js'

async function main() {
    const words = await api.getWords()
    const wordCategories = await api.getWordCategories()
    const templates = await api.getTemplates()

    console.log(words)

    avater.view.addEventListener('animal-click', () => {
        menu.open()
    })

    menu.talkButton.addEventListener('click', async () => {
        console.log('動物と話す')
        menu.close()

        const word = words[Math.floor(Math.random() * words.length)]
        const categoryTemplates = templates.filter(template => template.wordCategoryId == word.wordCategoryId)
        const template = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)]
        const message = template.content.replace('{言葉}', word.content)

        avater.view.changeAnimalMotion(template.motion)
        await speaker.start(message)
        avater.view.changeAnimalMotion('idle')
    })

    menu.teachButton.addEventListener('click', async () => {
        console.log('動物に教える')
        menu.close()

        const content = await inputWordDialog.open()
        if (!content) {
            await speaker.start('言葉の入力がキャンセルされました')
        }
        await speaker.start(`「${content}」を教えました`)

        const wordCategory = await selectWordCategoryDialog.open(wordCategories)

        await speaker.start(`「${wordCategory.name}」の分野を選びました`)

        
        const newWord = { content, wordCategoryId: wordCategory.id }
        await api.addWord(newWord)
        
        words.push(newWord)
        console.log({ words })
    })
}

main()
