import Swal from 'sweetalert2';

document.addEventListener('turbolinks:load', () => {
  if (document.querySelector('.carts.checkout')){
    const form = document.querySelector('#new_order')
    const orderName = form.querySelector('#order_username')
    const orderAddress = form.querySelector('#order_address')
    const orderPhone = form.querySelector('#order_tel')
    const submitBtn = document.querySelector('.submit-btn')

    document.querySelector('.cart-icon').remove()
    window.initMap = () => {
      const input = document.getElementById("order_address");
      const autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.setFields([
        "address_components",
        "geometry",
        "icon",
        "name",
      ]);

      submitBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const orderNameValue = orderName.value.trim()
        const orderPhoneValue = orderPhone.value.trim()
        const orderAddressValue = orderAddress.value
  
        submitBtn.disabled = true
        submitBtn.value = '...'
        
        if (orderNameValue !== '' && orderPhoneValue !== ''){
          checkAddress(orderAddressValue)
        } else {
          Swal.fire({
            icon: 'error',
            title: '訂單欄位不得空白唷！',
          })
          submitBtn.disabled = false
          submitBtn.value = '確認付款'
        }
      })

      function checkAddress(address) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
          if (status !== "OK") {
            console.log('error1');
            Swal.fire({
              icon: 'error',
              title: '送達地址為無效地址！',
              text: '請正確填寫外送員才不會迷路～'
            })
            submitBtn.disabled = false
            submitBtn.value = '確認付款'
            return;
          } else {
            if (results[0].formatted_address.includes('台灣' || 'Taiwan')){
              Swal.fire({
                position: 'top-end',
                didOpen: () => {
                  Swal.showLoading()
                },
                title: '即將導向LinePay付款請勿關閉視窗...',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                form.submit();
              });
            } else {
              console.log('error2');
              Swal.fire({
                icon: 'error',
                title: '送達地址為無效地址！',
                text: '請正確填寫外送員才不會迷路～'
              })
              submitBtn.disabled = false
              submitBtn.value = '確認付款'
            }
          }
        })  
      }  
    }
  }
})
