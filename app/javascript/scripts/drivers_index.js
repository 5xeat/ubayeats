import Rails from '@rails/ujs';

document.addEventListener('turbolinks:load', () => {
  let rePosition;
  if (document.querySelector('.driver_profiles.index')){
    document.querySelector('.cart-icon').remove()
    const onlineBtn = document.querySelector(".online-btn")
    onlineBtn.addEventListener('click', (e) => {
      e.preventDefault()
      if (onlineBtn.innerText === "上線"){
        onlineBtn.innerText = "下線"
        document.querySelector('.status p').innerText = "等待新訂單..."
      } else {
        onlineBtn.innerText = "上線"
        document.querySelector('.status p').innerText = "未上線"
      }
      Rails.ajax({
        url: '/drivers/online',
        type: 'post',
        success: (resp) => {
          console.log(resp);
        },
        error: function(err) {
          console.log(err)
        }
      })
    })

    window.initMap = () => {
      let map, marker, lat, lng, place, endMarker, leg, request, storeLatitude, storeLongitude, origin, destination;
      
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
      
      let order = document.querySelector('.order')

      rePosition = navigator.geolocation.watchPosition((position) => {
        console.log('watchPosition')
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
          if (order){
            const orderDestination = document.querySelector('.store-name')
            destination = orderDestination.innerText;
            directionMap()
          }
        } else {
          marker.setPosition(origin);
          if (order){
            console.log('rerender')
            directionMap()
          } else {
            map.setCenter(origin)
          }
        }
      })

      if (order){
        // 取得終點位置的placeID
        console.log('order');
        directionMap()
        
        const delivery = document.querySelector('.delivery');    
        delivery.addEventListener('click' , function(){
          delivery.remove();
          // 導航按鈕
          const googleBtn = document.querySelector('.google')
          const takenBtn = document.createElement('div')
          takenBtn.classList.add('take-btn')
          takenBtn.classList.add('btn')
          takenBtn.innerText = "已取餐"
          takenBtn.onclick = function(){
            googleBtn.remove()
            takenBtn.remove()
            directionsDisplay.setMap(null);
            document.querySelector('.distance-matrix p').innerText = ''
            document.querySelector('.steps').remove()
            endMarker.setMap(null)
            document.querySelector('.order').remove()
            order = undefined
            map.setCenter(origin)
          }
  
          document.querySelector('.btn-list').appendChild(takenBtn)
          if (googleBtn){
            document.querySelector('.steps').classList.remove('hidden');
            googleBtn.classList.remove('hidden');
          };
        })
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
            destination: destination,
            avoidFerries: true,
            avoidHighways: true,
            avoidTolls: true,
            travelMode: 'DRIVING'
          };
    
          service.getDistanceMatrix(
            {
              origins: [origin],
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
                const distance = response.rows[0].elements[0].distance.text;
                const time = response.rows[0].elements[0].duration.text;
                document.querySelector('.distance-matrix p').innerText = `${time}(${distance})`;
              }
            }
          )
        } else {
          request.origin = new google.maps.LatLng(lat, lng)
          service.getDistanceMatrix(
            {
              origins: [origin],
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
    
            let googleBtn = document.querySelector('.google')
            if (googleBtn){
              document.querySelector('.steps').innerHTML = `<p>${leg.steps[0].instructions}</p>`
    
              googleBtn.onclick = function(){
                window.open(
                  `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${destination}&travelmode=driving&dir_action=navigate`,
                  '_blank'
                );
              }
            } else {
              // 路線指示
              const steps = document.createElement('div')
              steps.classList.add('steps')
              steps.classList.add('hidden')
              steps.innerHTML = `<p>${leg.steps[0].instructions}</p>`
              document.querySelector('.info').insertAdjacentElement('beforebegin', steps)
    
              // google按鈕
              googleBtn = document.createElement('a');
              googleBtn.classList.add('btn');
              googleBtn.classList.add('google');
              googleBtn.classList.add('hidden');
              googleBtn.innerText = '開啟google map';
              googleBtn.onclick = function(e){
                window.open(
                  `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${destinationInput.value}&destination_place_id=${place.place_id}&travelmode=driving&dir_action=navigate`,
                  '_blank'
                );
              }
              document.querySelector('.btn-list').appendChild(googleBtn)
            }
    
            directionsDisplay.setDirections(result);
          } else {
            console.log(status);
          }
        });
      }    
    }
  } else {
    window.initMap = () => {}
    navigator.geolocation.clearWatch(rePosition)
  }
})

function googlemap(){
}