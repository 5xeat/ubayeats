document.addEventListener('turbolinks:load', () => {
  if (document.querySelector('.stores.new')){
    const form = document.querySelector('.new_store_profile')
    const submitBtn = form.querySelector('.btn-submit')
    const certificate = form.querySelector('#store_profile_store_certificate')
    const photo = form.querySelector('#store_profile_store_photo')
    const name = form.querySelector('#store_profile_store_name')
    const type = form.querySelector('#store_profile_store_type')
    const address = form.querySelector('#store_profile_store_address')
    const phone = form.querySelector('#store_profile_store_phone')
    const account = form.querySelector('#store_profile_account')
    
    certificate.addEventListener('focusout', () => {
      checkCertificate()
    })
  
    photo.addEventListener('focusout', () => {
      checkPhoto()
    })
  
    name.addEventListener('focusout', () => {
      checkName()
    })
  
    type.addEventListener('focusout', () => {
      checkType()
    })

    address.addEventListener('focusout', () => {
      checkAddress()
    })

    phone.addEventListener('focusout', () => {
      checkPhone()
    })

    account.addEventListener('focusout', () => {
      checkAccount()
    })
  
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault()
      checkInputs()
    })
  
    function checkInputs(){
      checkCertificate()
      checkPhoto()
      checkName()
      checkType()
      checkAddress()
      checkPhone()
      checkAccount()
      
      if (form.querySelector('.error') === null){
        form.submit()
      }
    }
  
    function checkCertificate(){
      const certificateValue = certificate.value.trim()
      if (certificateValue === ''){
        setErrorFor(certificate, "此欄位不得空白")
      } else {
        setSuccessFor(certificate)
      }
    }

    function checkPhoto(){
      const photoValue = photo.value.trim()
      if (photoValue === ''){
        setErrorFor(photo, "此欄位不得空白")
      } else {
        setSuccessFor(photo)
      }
    }

    function checkName(){
      const nameValue = name.value.trim()
      if (nameValue === ''){
        setErrorFor(name, "此欄位不得空白")
      } else {
        setSuccessFor(name)
      }
    }

    function checkType(){
      const typeValue = type.value.trim()
      if (typeValue === ''){
        setErrorFor(type, "此欄位不得空白")
      } else {
        setSuccessFor(type)
      }
    }

    function checkAddress(){
      const addressValue = address.value.trim()
      if (addressValue === ''){
        setErrorFor(address, "此欄位不得空白")
      } else {
        setSuccessFor(address)
      }
    }

    function checkPhone(){
      const phoneValue = phone.value.trim()
      if (phoneValue === ''){
        setErrorFor(phone, "此欄位不得空白")
      } else {
        setSuccessFor(phone)
      }
    }
  
    function checkAccount(){
      const accountValue = account.value.trim()
      if (accountValue === ''){
        setErrorFor(account, "此欄位不得空白")
      } else {
        setSuccessFor(account)
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
  }
})

