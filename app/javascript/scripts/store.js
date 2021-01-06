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
        // document.querySelector('input[type="submit"]').removeAttribute('disabled')
        document.querySelector('#new_store_profile').submit()
      })
    } else {
      // real submit
      canSubmit = false
      return true
    }
  })
// ------------------------------------------------------------
// ------------------------------------------------------------

  // document.querySelector('input[type="submit"]').addEventListener('submit', function(e){
  //   e.preventDefault();
  //   const geocoder = new google.maps.Geocoder();
  //   geocodeAddress(geocoder) 
  //   // -----------------------------------
  //   function geocodeAddress(geocoder) {
  //     const address = document.getElementById("store_profile_store_address").value;
  //     geocoder.geocode({ address: address }, (results, status) => {
  //       if (status === "OK") {
  //         loc = JSON.stringify(results[0].geometry.location)
  //         console.log(loc);
  //         console.log(JSON.parse(loc));
  //         myLatLng = JSON.parse(loc)
  //         myLat = JSON.parse(loc).lat
  //         myLng = JSON.parse(loc).lng
  //         // return [maLatLng, myLat, myLng]
  //         const ax = require('axios')
  //         const token = document.querySelector('[name=csrf-token]').content
  //         ax.defaults.headers.common['X-CSRF-TOKEN'] = token
  //         const userId = document.querySelector('#id').dataset.id
  //         console.log(userId);
  //         let certificate = document.querySelector("#store_profile_store_id_Certificate").value
  //         let list = document.querySelector("#store_profile_store_id_list").value
  //         let name = document.querySelector("#store_profile_store_name").value
  //         let s_type = document.querySelector("#store_profile_store_type").value
  //         let address = document.querySelector("#store_profile_store_address").value
  //         let phone = document.querySelector("#store_profile_store_phone").value
  //         document.getElementById('latitude').value = myLat;
  //         document.getElementById('longitude').value = myLng;
  //         let latitude =  document.getElementById('latitude').value
  //         let longitude =  document.getElementById('longitude').value

  //         let formData = new FormData();
  //         formData.append('store_id_Certificate', certificate);
  //         formData.append('store_id_list', list); 
  //         formData.append('store_name', name); 
  //         formData.append('store_type', s_type); 
  //         formData.append('store_address', address); 
  //         formData.append('store_phone', phone); 
  //         formData.append('latitude', latitude); 
  //         formData.append('longitude', longitude); 

  //         debugger
      
  //         // ax({
  //         //   method: 'post',
  //         //   url: '/stores',
  //         //   data: {
  //         //     store_profile: {
  //         //       // formData
  //         //     }
  //         //   }
  //         // });
      
  //       } else {
  //         alert(
  //           "Geocode was not successful for the following reason: " + status
  //         );
  //       }
  //     });
  //   }


    // let [maLatLng, myLat, myLng] = geocodeAddress(geocoder) 

    // const ax = require('axios')
    // const token = document.querySelector('[name=csrf-token]').content
    // ax.defaults.headers.common['X-CSRF-TOKEN'] = token
    // const userId = document.querySelector('#id').dataset.id
    // console.log(userId);
    // let certificate = document.querySelector("#store_profile_store_id_Certificate").value
    // let list = document.querySelector("#store_profile_store_id_list").value
    // let name = document.querySelector("#store_profile_store_name").value
    // let type = document.querySelector("#store_profile_store_type").value
    // let address = document.querySelector("#store_profile_store_address").value
    // let phone = document.querySelector("#store_profile_store_phone").value

    // ax({
    //   method: 'post',
    //   url: '/stores',
    //   data: {
    //     store_profile: {
    //       // loc: loc,
    //       latitude: myLat,
    //       longitude: myLng,
    //       store_id_Certificate: certificate,
    //       store_id_list: list, 
    //       store_name: name,
    //       store_type: type,
    //       store_address: address,
    //       store_phone: phone
    //     }
        
    //   }
    // });


  // //   ax.post(`/stores`, {
  // //     myLatLng: myLatLng,
  // //     myLat: myLat,
  // //     myLng: myLng
  // //   })
  // //       .then(function(resp){
          
  // //         console.log('==============');
  // //         console.log('resp', resp);
  // //         // if (resp.data.status == "OK") {
   
  // //         // } else {

  // //         // }
  // //       })
  // //       .catch(function(err) {
  // //         console.log('error', err);
  // //       })


  // })
})
