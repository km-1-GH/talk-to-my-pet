const root = document.getElementById('speaker')
const contentText = document.getElementById('speakerContent')

export async function start(content) {
    contentText.textContent = content
    root.hidden = false;

    return new Promise((resolve) => {
        const characters = Array.from(content)

        for (let i = 0; i < characters.length; i++) {
            const isLast = i === characters.length - 1
            const duration = i * 100
            setTimeout(() => {
                const targetCharacters = characters.slice(0, i + 1)
                contentText.textContent = targetCharacters.join('')
            }, duration)

            if (isLast) {
                setTimeout(() => {
                    root.hidden = true;
                    resolve()
                }, duration + 1000)
            }
        }
    })
}
