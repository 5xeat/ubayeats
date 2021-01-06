document.addEventListener('turbolinks:load', () => {
  if (document.querySelector('.driver_profiles.new')){
    const form = document.querySelector('.new_driver_profile')
    const submitBtn = form.querySelector('.btn-submit')
    const idFront = form.querySelector('#driver_profile_taiwan_id_front')
    const idBack = form.querySelector('#driver_profile_taiwan_id_back')
    const license = form.querySelector('#driver_profile_license')
    const car = form.querySelector('#driver_profile_car_number')
    const account = form.querySelector('#driver_profile_account')
    
    idFront.addEventListener('focusout', () => {
      checkIdFront()
    })
  
    idBack.addEventListener('focusout', () => {
      checkIdBack()
    })
  
    license.addEventListener('focusout', () => {
      checkLicense()
    })
  
    car.addEventListener('focusout', () => {
      checkCar()
    })

    account.addEventListener('focusout', () => {
      checkAccount()
    })

    submitBtn.addEventListener('click', (e) => {
      e.preventDefault()
      checkInputs()
    })
  
    function checkInputs(){
      checkIdFront()
      checkIdBack()
      checkLicense()
      checkCar()
      checkAccount()
      
      if (form.querySelector('.error') === null){
        form.submit()
      }
    }
  
    function checkIdFront(){
      const idFrontValue = idFront.value.trim()
      if (idFrontValue === ''){
        setErrorFor(idFront, "此欄位不得空白")
      } else {
        setSuccessFor(idFront)
      }
    }

    function checkIdBack(){
      const idBackValue = idBack.value.trim()
      if (idBackValue === ''){
        setErrorFor(idBack, "此欄位不得空白")
      } else {
        setSuccessFor(idBack)
      }
    }

    function checkLicense(){
      const licenseValue = license.value.trim()
      if (licenseValue === ''){
        setErrorFor(license, "此欄位不得空白")
      } else {
        setSuccessFor(license)
      }
    }

    function checkCar(){
      const carValue = car.value.trim()
      if (carValue === ''){
        setErrorFor(car, "此欄位不得空白")
      } else {
        setSuccessFor(car)
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

