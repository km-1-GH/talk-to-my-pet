const dialog = document.getElementById('selectWordCategoryDialog')
const buttons = document.querySelectorAll('#selectWordCategoryList button')
const categoryList = document.getElementById('selectWordCategoryList')

export async function open (categories) {
  dialog.showModal()

  categoryList.innerHTML = '';

  return new Promise((resolve) => {
    categories.forEach((category) => {
      const button = document.createElement('button')
      button.value = category;
      button.textContent = category;

      button.addEventListener('click', () => {
        dialog.close()
        resolve(button.value)
      })

      categoryList.appendChild(button)
    })
  })
}

