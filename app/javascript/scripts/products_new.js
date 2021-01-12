document.addEventListener('turbolinks:load', () => {
  if (document.querySelector('.products.new')){
    const form = document.querySelector('.new_product')
    const name = form.querySelector('#product_name')
    const price = form.querySelector('#product_price')
    const submitBtn = form.querySelector('.btn-submit')

    name.addEventListener('focusout', () => {
      checkName()
    })

    price.addEventListener('focusout', () => {
      checkPrice()
    })

    submitBtn.addEventListener('click', (e) => {
      e.preventDefault()
      checkInputs()
    })

    function checkInputs() {
      checkName()
      checkPrice()

      if (form.querySelector('error') === null) {
        form.submit()
      }
    }

    function checkName() {
      const nameValue = name.value.trim()
      if (nameValue === '') {
        setErrorFor(name, "產品名稱不得空白")
      } else {
        setSuccessFor(name)
      }
    }

    function checkPrice() {
      const priceValue = price.value.trim()
      if (priceValue === '') {
        setErrorFor(price, "產品價格不得空白")
      } else {
        setSuccessFor(name)
      }
    }

    function setErrorFor(input, message) {
      const formItem = input.parentElement
      const errorMessage = formItem.querySelector('.error-message')
      errorMessage.innerText = message
      formItem.classList.remove('correct')
      formItem.classList.add('error')
      formItem.appendChild(errorMessage)
    }

    function setSuccessFor(input) {
      const formItem = input.parentElement
      formItem.classList.remove('error')
    }    
  }
})