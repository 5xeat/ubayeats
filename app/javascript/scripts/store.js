document.addEventListener('DOMContentLoaded', function(){
  var myLat;
  var myLng;
  document.querySelector('input[type="submit"]').addEventListener('click', function(e){
    e.preventDefault();
    const geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder) 
    // -----------------------------------
    function geocodeAddress(geocoder) {
      const address = document.getElementById("store_profile_store_address").value;
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          var loc = JSON.stringify(results[0].geometry.location)
          console.log(JSON.parse(loc));
          myLat = JSON.parse(loc).lat
          myLng = JSON.parse(loc).lng
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    }

    const ax = require('axios')
    const token = document.querySelector('[name=csrf-token]').content
    ax.defaults.headers.common['X-CSRF-TOKEN'] = token
    const userId = document.querySelector('#id').dataset.id
    console.log(userId);

    ax({
      method: 'post',
      url: '/stores',
      data: {
        myLat: myLat,
        myLng: myLng
      }
    });


    // ax.post(`/stores`, {
    //   myLat: myLat,
    //   myLng: myLng
    // })
    //     .then(function(resp){
          
    //       console.log('==============');
    //       console.log(resp);
    //       // if (resp.data.status == "OK") {
   
    //       // } else {

    //       // }
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     })


  })
})