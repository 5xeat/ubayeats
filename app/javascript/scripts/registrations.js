document.addEventListener('turbolinks:load', () => {
  const form = document.querySelector('.new_user')
  const submitBtn = form.querySelector('.btn-submit')
  const email = document.getElementById('user_email')
  const password = document.getElementById('user_password')
  const passwordConfirm = document.getElementById('user_password_confirmation')
  const name = document.getElementById('user_name')

  email.addEventListener('keyup', (e) => {
    if (email.value === ''){
      setErrorFor(email, "此欄位不得空白")
    } else if (!isEmail(email.value)){
      setErrorFor(email, "信箱格式不正確")
    } else {
      setSuccessFor(email)
    }
  })

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    checkInputs()
  })

  function checkInputs(){
    const form = document.querySelector('.new_user')
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()
    const passwordConfirmValue = passwordConfirm.value.trim()
    const nameValue = name.value.trim()

    if (emailValue === ''){
      setErrorFor(email, "此欄位不得空白")
    } else if (!isEmail(emailValue)){
      setErrorFor(email, "信箱格式不正確")
    } else {
      setSuccessFor(email)
    }

    if (passwordValue === ''){
      setErrorFor(password, "此欄位不得空白")
    } else if (passwordValue.length < 6){
      setErrorFor(password, "密碼至少需6個字元")
    } else {
      setSuccessFor(password)
    }

    if (passwordConfirmValue === ''){
      setErrorFor(passwordConfirm, "此欄位不得空白")
    } else if (passwordConfirmValue !== passwordValue){
      setErrorFor(passwordConfirm, "請再次確認密碼")
    } else {
      setSuccessFor(passwordConfirm)
    }

    if (nameValue === ''){
      setErrorFor(name, "此欄位不得空白")
    } else {
      setSuccessFor(name)
    }

    form.submit()
  }

  function setErrorFor(input, message){
    const formItem = input.parentElement
    const errorMessage = formItem.querySelector('.error-message')
    errorMessage.innerText = message
    formItem.classList.remove('correct')
    formItem.classList.add('error')
    formItem.appendChild(errorMessage)
  }

  function setSuccessFor(input){
    const formItem = input.parentElement
    formItem.classList.remove('error')
    formItem.classList.add('correct')
  }

  function isEmail(email){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
  }
})

