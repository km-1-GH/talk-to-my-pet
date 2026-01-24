import * as avater from './avater.js'
import * as menu from './menu.js'
import * as inputWordDialog from './inputWordDialog.js'
import * as selectWordCategoryDialog from './selectWordCategoryDialog.js'
import * as speaker from './speaker.js'
import * as storage from './storage.js'

const words = storage.getWords()
const categories = storage.getWordCategories()
const templates = storage.getTemplates()

avater.view.addEventListener('animal-click', () => {
    menu.open()
})

menu.talkButton.addEventListener('click', async () => {
    console.log('動物と話す')
    menu.close()

    const word = words[Math.floor(Math.random() * words.length)]
    const categoryTemplates = templates.filter(template => template.category == word.category)
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
        return
    }
    
    await speaker.start(`「${content}」を教えました`)

    const wordCategory = await selectWordCategoryDialog.open(categories)

    await speaker.start(`「${wordCategory}」の分野を選びました`)

    words.push({ content, category: wordCategory })

    storage.putWords(words)

    console.log({ words })
})
