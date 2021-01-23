import Rails from '@rails/ujs';
import Swal from 'sweetalert2';

document.addEventListener('turbolinks:load', () => {
  if (document.querySelector('.orders.show')){
    let positionLatLng, endMarker
    let position =  document.querySelector(".address-text").innerText
    window.initMap = async() => {
      // 客製化使用者定位icon
      const icons = {
        start: {
          url: 'https://i.imgur.com/5UTYP4Q.png',
          scaledSize: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 0)
        },
      };

      const geocoder = new google.maps.Geocoder();
      await geocoder.geocode({ address: position }, (results, status) => {
        if ( status !== 'OK' ) {
          alert("Geocode was not successful for the following reason: " + status);
          return ;
        }
        let loc, myLat, myLng
        loc = JSON.stringify(results[0].geometry.location)
        myLat = JSON.parse(loc).lat
        myLng = JSON.parse(loc).lng
        positionLatLng = new google.maps.LatLng(myLat, myLng)
      })
      
      if (document.querySelector('.j-order-state-text').innerText === '外送員已領取餐點，正在前往您的位置...'){
        document.querySelector('.map-container').classList.remove('hidden')
        let num = document.querySelector(".order-num").innerText

        Rails.ajax({
          url: '/orders/display_driver_position',
          type:'post',
          data: JSON.stringify({num: num}),
          success: async (resp) => {
            const lat = resp.driver_latitude;
            const lng = resp.driver_longitude;
            const driverPosition = await new google.maps.LatLng(lat, lng)
            window.$map = new google.maps.Map(document.getElementById('map'), {
              zoom: 17,
              center: driverPosition,
              mapId: 'c57b36ae7dbc5a40',
              mapTypeControl: false,
              streetViewControl: false,
              zoomControl: false,
              fullscreenControl: false
            });
      
            window.$marker = new google.maps.Marker({
              position: driverPosition,
              map: $map,
              animation: google.maps.Animation.BOUNCE,
              icon: icons.start
            });
      
            endMarker = new google.maps.Marker({
              position: positionLatLng,
              map: $map,
            });      
          },
          error: err => {
            console.log(err);
          }
        })
      } else {
        window.$map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: new google.maps.LatLng(25.040897779251093, 121.51185413844331),
          mapId: 'c57b36ae7dbc5a40',
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: false,
          fullscreenControl: false
        });
  
        window.$marker = new google.maps.Marker({
          position: new google.maps.LatLng(25.040897779251093, 121.51185413844331),
          map: $map,
          animation: google.maps.Animation.BOUNCE,
          icon: icons.start
        });
  
        endMarker = new google.maps.Marker({
          position: positionLatLng,
          map: $map,
        });  
      }

      function calcTime(driverPosition, destination){
        // 計算路程時間距離
        const service = new google.maps.DistanceMatrixService();
    
        service.getDistanceMatrix(
          {
            origins: [driverPosition],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: true,
            avoidTolls: true,
          },
          (response, status) => {
            if (status !== "OK") {
              console.log(status);
            } else {
              const time = response.rows[0].elements[0].duration.text;
              document.querySelector('.time').innerText = time;
            }
          }
        )
      }
    }
  }
})