import Rails from '@rails/ujs';
import Swal from 'sweetalert2';

document.addEventListener('turbolinks:load', () => {
  let rePosition

  if (document.querySelector('.driver_profiles.order_deliver')){
    document.querySelector('.cart-icon').remove()
    window.initMap = async() => {
      const geocoder = new google.maps.Geocoder()
      let map, marker, lat, lng, endMarker, leg, request, origin, destination, storeDestination, userDestination;
      
      storeDestination = document.querySelector('.store-address').innerText
      userDestination = document.querySelector('.order-address span').innerText
      await geocoder.geocode({'address': storeDestination}, function (results, status) {
        if (status == 'OK') {
          storeDestination = results[0]
        }
        else {
          alert('Geocode was not successful for the following reason: ' +    status);
        }
      });

      await geocoder.geocode({'address': userDestination}, function (results, status) {
        if (status == 'OK') {
          userDestination = results[0]
        }
        else {
          alert('Geocode was not successful for the following reason: ' +    status);
        }
      });  
      
      // 載入路線服務與路線顯示圖層
      let directionsService = new google.maps.DirectionsService();
      let directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions:{strokeColor:"#EF4444",strokeWeight:5}, suppressMarkers: true});
    
      // 客製化使用者定位icon
      const icons = {
        start: {
          url: 'https://i.imgur.com/5UTYP4Q.png',
          scaledSize: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 0)
        },
        end: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: 'white',
          strokeColor: 'white'
        }
      };
      
      rePosition = navigator.geolocation.watchPosition((position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;

        origin = new google.maps.LatLng(lat, lng);
    
        if (map === undefined){
          // 初始化地圖
          map = new google.maps.Map(document.getElementById('map'), {
            zoom: 18,
            center: origin,
            mapId: 'c57b36ae7dbc5a40',
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
            fullscreenControl: false
          });
    
          marker = new google.maps.Marker({
            position: origin,
            map: map,
            animation: google.maps.Animation.BOUNCE,
            icon: icons.start
          });
          destination = storeDestination;
          directionMap()
        } else {
          marker.setPosition(origin);
          directionMap()
        }
      })

      const takenMealBtn = document.querySelector('.take-meal-btn')
      if (takenMealBtn){
        takenMealBtn.addEventListener('click', setTakeMealBtn)
      }

      function setTakeMealBtn(){
        const takenMealBtn = document.querySelector('.take-meal-btn')
        takenMealBtn.remove()

        const completeBtn = document.createElement('div')
        completeBtn.classList.add('btn', 'complete-btn')
        completeBtn.innerText = "已送達"
        completeBtn.onclick = setCompleteBtn
        document.querySelector('.btn-list').appendChild(completeBtn)

        destination = userDestination
        endMarker.setPosition(userDestination.geometry.location)

        const ordererphone = document.querySelector('.orderer-phone').innerText
        document.querySelector('.phone a').setAttribute('href', `tel:+886${ordererphone}`)

        const orderer = document.querySelector('.orderer')
        orderer.innerText = orderer.querySelector('span').innerText
        orderer.classList.add('font-medium', 'text-2xl', 'mr-5')
        orderer.classList.remove('orderer')
        document.querySelector('.title').insertAdjacentElement('afterbegin', orderer)
        document.querySelector('.store-name').remove()
        document.querySelector('.store-address').remove()

        directionMap()
      }

      async function setCompleteBtn(){
        document.querySelector('.distance-matrix p').innerText = ''
        document.querySelector('.steps').remove()
        document.querySelector('.order').remove()  
        directionsDisplay.setMap(null)
        endMarker.setMap(null)
        map.setCenter(origin)
        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: '此筆訂單已送達，辛苦了！',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.href = '/drivers'
      }

      function directionMap(){
        // 計算路程時間距離
        const service = new google.maps.DistanceMatrixService();
    
        // 放置路線圖層
        directionsDisplay.setMap(map);
    
        // 路線相關設定
        if (request === undefined){
          request = {
            origin: origin,
            destination: {placeId: String(destination.place_id)},
            avoidFerries: true,
            avoidHighways: true,
            avoidTolls: true,
            travelMode: 'DRIVING'
          };
    
          service.getDistanceMatrix(
            {
              origins: [origin],
              destinations: [{placeId: String(destination.place_id)}],
              travelMode: google.maps.TravelMode.DRIVING,
              unitSystem: google.maps.UnitSystem.METRIC,
              avoidHighways: true,
              avoidTolls: true,
            },
            (response, status) => {
              if (status !== "OK") {
                console.log(status);
              } else {
                const distance = response.rows[0].elements[0].distance.text;
                const time = response.rows[0].elements[0].duration.text;
                document.querySelector('.distance-matrix p').innerText = `${time}(${distance})`;
              }
            }
          )
        } else {
          request.origin = new google.maps.LatLng(lat, lng)
          request.destination = {placeId: String(destination.place_id)}
          service.getDistanceMatrix(
            {
              origins: [origin],
              destinations: [{placeId: String(destination.place_id)}],
              travelMode: google.maps.TravelMode.DRIVING,
              unitSystem: google.maps.UnitSystem.METRIC,
              avoidHighways: true,
              avoidTolls: true,
            },
            (response, status) => {
              if (status !== "OK") {
                console.log(status);
              } else {
                const distance = response.rows[0].elements[0].distance.text;
                const time = response.rows[0].elements[0].duration.text;
                document.querySelector('.distance-matrix p').innerText = `${time}(${distance})`;
              }
            }
          )
        }
    
        // 繪製路線
        directionsService.route(request, function (result, status) {
          if (status == 'OK') {
            leg = result.routes[0].legs[0];
            
            // 導航終點標記
            if (endMarker === undefined){
              endMarker = new google.maps.Marker({
                position: leg.end_location,
                map: map,
                animation: google.maps.Animation.DROP
              })
            }
            document.querySelector('.steps p').innerHTML = leg.steps[0].instructions
            let googleBtn = document.querySelector('.google')
            googleBtn.onclick = function(){
              window.open(
                `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${destination.geometry.location}&travelmode=driving&dir_action=navigate`,
                '_blank'
              );
            }
            directionsDisplay.setDirections(result);
          } else {
            console.log(status);
          }
        });
      }    
    }
  }
})