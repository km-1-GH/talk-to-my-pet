const dialog = document.getElementById('inputWordDialog')
const submitButton = document.getElementById('submitInputWordButton')
const cancelButton = document.getElementById('cancelInputWordButton')
const input = document.getElementById('wordInput')

export async function open() {
    dialog.showModal()
    input.value = "";

    return new Promise((resolve) => {
        cancelButton.addEventListener('click', () => {
            dialog.close()
            resolve(null)
        })

        submitButton.addEventListener('click', () => {
            dialog.close()
            resolve(input.value)
        })
    })
}
