const dialog = document.getElementById('selectWordCategoryDialog')
const categoryList = document.getElementById('selectWordCategoryList')

export async function open(wordCategories) {
    dialog.showModal()

    categoryList.innerHTML = '';

    return new Promise((resolve) => {
        wordCategories.forEach((wordCategory) => {
            const button = document.createElement('button')
            button.value = wordCategory.id;
            button.textContent = wordCategory.name;

            button.addEventListener('click', () => {
                dialog.close()
                resolve(wordCategory)
            })

            categoryList.appendChild(button)
        })
    })
}
