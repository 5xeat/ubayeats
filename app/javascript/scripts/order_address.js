import Swal from 'sweetalert2';

document.addEventListener('turbolinks:load', () => {
  if (document.querySelector('.carts.checkout')){
    let input, autocomplete;
    let validAddress = false
    const form = document.querySelector('#new_order')
    const orderName = form.querySelector('#order_username')
    const orderAddress = form.querySelector('#order_address')
    const orderPhone = form.querySelector('#order_tel')

    window.initMap = () => {
      input = document.getElementById("order_address");
      autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.setFields([
        "address_components",
        "geometry",
        "icon",
        "name",
      ]);
      autocomplete.addListener("place_changed", checkAddress)

      form.addEventListener('submit', (e) => {
        e.preventDefault()
        const orderNameValue = orderName.value.trim()
        const orderPhoneValue = orderPhone.value.trim()
        console.log(orderNameValue);
        console.log(orderPhoneValue);
  
        if (orderNameValue !== '' && orderPhoneValue !== ''){
          checkAddress()
          if (validAddress){
            delayOpenSubmit()
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: '訂單欄位不得空白唷！',
          })
        }
      })

      function checkAddress() {
        const place = autocomplete.getPlace();
    
        if (!place.geometry) {
          window.alert(
            "此地址為無效地址: '" + place.name + "'"
          );
          validAddress = false
          return;
        } else {
          validAddress = true
        }
      }
  
      function delayOpenSubmit() {
        setTimeout(() => {
          Rails.enableElement(document.querySelector('input[type="submit"]'))
        }, 500);
      }
  
    }
  }
})
