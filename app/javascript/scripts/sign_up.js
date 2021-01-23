import Rails from '@rails/ujs'
import Swal from 'sweetalert2';

document.addEventListener('turbolinks:load', () => {
  if (document.querySelector('.registrations.new')){
    const form = document.querySelector('.new_user')
    const submitBtn = form.querySelector('.btn-submit')
    const email = form.querySelector('#user_email')
    const password = form.querySelector('#user_password')
    const passwordConfirm = form.querySelector('#user_password_confirmation')
    const name = form.querySelector('#user_name')

    document.querySelector('.cart-icon').remove()
  
    email.addEventListener('keyup', (e) => {
      checkEmail()
    })
  
    email.addEventListener('focusout', () => {
      checkEmail()
    })
  
    password.addEventListener('focusout', () => {
      checkPassword()
    })
  
    passwordConfirm.addEventListener('focusout', () => {
      checkPasswordConfirm()
    })
  
    name.addEventListener('focusout', () => {
      checkName()
    })
  
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault()
      checkInputs()
    })
  
    function checkInputs(){
      checkEmail()
      checkPassword()
      checkPasswordConfirm()
      checkName()
      
      if (form.querySelector('.error') === null){
        Swal.fire({
          title: '註冊中...',
          didOpen: () => {
            Swal.showLoading()
          }
        })
        submitBtn.disabled = true
        submitBtn.value = '註冊中...'
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
        Rails.ajax({
          url: '/unique_email',
          type: 'post',
          data: new URLSearchParams(`?email=${emailValue}`),
          success: (resp) => {
            if (resp === 'OK'){
              setSuccessFor(email)
            } else {
              setErrorFor(email, "此信箱已有人使用")
            }
          },
          error: function(err) {
            console.log(err)
          }
        })
      }
    }
  
    function checkPassword(){
      const passwordValue = password.value.trim()
      if (passwordValue === ''){
        setErrorFor(password, "密碼欄位不得空白")
      } else if (passwordValue.length < 6){
        setErrorFor(password, "密碼至少需6個字元")
      } else {
        setSuccessFor(password)
      }
    }
  
    function checkPasswordConfirm(){
      const passwordValue = password.value.trim()
      const passwordConfirmValue = passwordConfirm.value.trim()
      if (passwordConfirmValue === ''){
        setErrorFor(passwordConfirm, "密碼確認欄位不得空白")
      } else if (passwordConfirmValue !== passwordValue){
        setErrorFor(passwordConfirm, "請再次確認密碼")
      } else {
        setSuccessFor(passwordConfirm)
      }
    }
  
    function checkName(){
      const nameValue = name.value.trim()
      if (nameValue === ''){
        setErrorFor(name, "暱稱欄位不得空白")
      } else {
        setSuccessFor(name)
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
      formItem.classList.add('correct')
    }
  
    function isEmail(email){
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    }
  }
})

