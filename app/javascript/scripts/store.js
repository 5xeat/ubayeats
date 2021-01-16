import Rails from '@rails/ujs';

document.addEventListener('turbolinks:load', function(){
  let myLat, myLng, myLatLng, loc;
  let canSubmit = false

  function delayOpenSubmit() {
    setTimeout(() => {
      Rails.enableElement(document.querySelector('input[type="submit"]'))
    }, 500);
  }
  if (document.querySelector('.store_profiles.new')){
    const submitBtn = document.querySelector('.btn-submit')

    window.initMap = () => {
      const input = document.getElementById("store_profile_store_address");
      if (input){
        console.log('hi');
      }
      const autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.setFields([
        "address_components",
      ]);
    }

    document.querySelector('#new_store_profile').addEventListener('submit', function(e) {
      if (!canSubmit) {
        e.preventDefault()
        delayOpenSubmit()

        const address = document.getElementById("store_profile_store_address").value;
        if (address.length === 0) {
          return false
        }

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
          if ( status !== 'OK' ) {
            alert("請填寫正確店家地址！");
            return ;
          }

          if (results[0].plus_code.global_code.substring(0,2) === '7Q'){
            loc = JSON.stringify(results[0].geometry.location)
            myLatLng = JSON.parse(loc)
            myLat = JSON.parse(loc).lat
            myLng = JSON.parse(loc).lng
            document.getElementById('latitude').value = myLat;
            document.getElementById('longitude').value = myLng;
            canSubmit = true
            Rails.enableElement(document.querySelector('input[type="submit"]'))
            document.querySelector('#new_store_profile').submit()  
          } else {
            alert('請填寫正確店家地址！')
          }
        })
      } else {
        // real submit
        submitBtn.disabled = true
        submitBtn.value = '註冊中...'
        canSubmit = false
        return true
      }
    })
  }
  if (document.querySelector('.store_profiles.show')){
    document.querySelector('.cart-icon').remove()
  }
})
