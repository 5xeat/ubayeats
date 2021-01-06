import Rails from '@rails/ujs';

document.addEventListener('turbolinks:load', function(){
  console.log('turbolinks load')
  let myLat;
  let myLng;
  let myLatLng;
  let loc;

  let canSubmit = false

  function delayOpenSubmit() {
    setTimeout(() => {
      Rails.enableElement(document.querySelector('input[type="submit"]'))
    }, 500);
  }

  document.querySelector('#new_store_profile').addEventListener('submit', function(e) {
    console.log('submit enter')
    if (!canSubmit) {
      e.preventDefault()
      delayOpenSubmit()

      const address = document.getElementById("store_profile_store_address").value;
      if (address.length === 0) {
        console.log('no address')
        return false
      }

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if ( status !== 'OK' ) {
          alert("Geocode was not successful for the following reason: " + status);
          return ;
        }

        loc = JSON.stringify(results[0].geometry.location)
        console.log(loc);
        console.log(JSON.parse(loc));
        myLatLng = JSON.parse(loc)
        myLat = JSON.parse(loc).lat
        myLng = JSON.parse(loc).lng
        document.getElementById('latitude').value = myLat;
        document.getElementById('longitude').value = myLng;
        canSubmit = true
        Rails.enableElement(document.querySelector('input[type="submit"]'))
        document.querySelector('#new_store_profile').submit()
      })
    } else {
      // real submit
      canSubmit = false
      return true
    }
  })
})
