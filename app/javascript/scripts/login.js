document.addEventListener('turbolinks:load', () => {
  if (document.querySelector('.sessions.new')){
    const form = document.querySelector('.new_user')
    const submitBtn = form.querySelector('.btn-submit')
    const email = form.querySelector('#user_email')
    const password = form.querySelector('#user_password')
    
    email.addEventListener('focusout', () => {
      checkEmail()
    })
  
    password.addEventListener('focusout', () => {
      checkPassword()
    })
    
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault()
      checkInputs()
    })
  
    function checkInputs(){
      checkEmail()
      checkPassword()
      
      if (form.querySelector('.error') === null){
        form.submit()
      }
    }
  
    function checkEmail(){
      const emailValue = email.value.trim()
      if (emailValue === ''){
        setErrorFor(email, "此欄位不得空白")
      } else if (!isEmail(emailValue)){
        setErrorFor(email, "信箱格式不正確")
      } else {
        setSuccessFor(email)
      }
    }
  
    function checkPassword(){
      const passwordValue = password.value.trim()
      if (passwordValue === ''){
        setErrorFor(password, "密碼欄位不得空白")
      } else {
        setSuccessFor(password)
      }
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
    }
  
    function isEmail(email){
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    }
  }
})

