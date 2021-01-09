document.addEventListener('turbolinks:load', () => {
  let rePosition;
  if (document.querySelector('.driver_profiles.index')){
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
      document.querySelector('.destination').classList.toggle('hidden')
    })

    window.initMap = () => {
      console.log('loader');
      let map, marker, lat, lng, place, endMarker, leg, request;
      
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
    
      const calcBtn = document.querySelector(".calc-btn")
      const destinationInput = document.getElementById("destination-input");
      const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);
      calcBtn.addEventListener("click", (e) => {
        if (destinationInput.value !== ""){
          // 取得終點位置的placeID
          place = destinationAutocomplete.getPlace();
          console.log('click calcBtn')
          console.log(lat)
          console.log(lng)
          directionMap()
          
          const delivery = document.createElement('div');
          delivery.classList.add('btn')
          delivery.classList.add('delivery')
          delivery.innerText = '接單'
    
          delivery.onclick = function(){
            delivery.remove();
            // 導航按鈕
            const googleBtn = document.querySelector('.google')
            const stepsList = document.querySelector('.steps-list')
            const stepsBtn = document.createElement('div')
            stepsBtn.classList.add('steps-btn')
            stepsBtn.classList.add('btn')
            stepsBtn.innerHTML = '<i class="fas fa-route"></i> 路線指示'
            stepsBtn.onclick = function(){
              stepsList.classList.remove('hidden');
            }
            const takenBtn = document.createElement('div')
            takenBtn.classList.add('take-btn')
            takenBtn.classList.add('btn')
            takenBtn.innerText = "已取餐"
            takenBtn.onclick = function(){
              googleBtn.remove()
              takenBtn.remove()
              stepsBtn.remove()
              directionsDisplay.setMap(null);
              document.querySelector('.distance').innerText = ''
              document.querySelector('.time').innerText = ''
              document.querySelector('.steps-list').remove()
              endMarker.setMap(null)
              place = undefined
            }
    
            document.querySelector('.btn-list').appendChild(stepsBtn)
            document.querySelector('.btn-list').appendChild(takenBtn)
            if (googleBtn){
              googleBtn.classList.remove('hidden');
            };
          }
          document.querySelector('.btn-list').appendChild(delivery)
          destinationInput.value = ''
        }
      })
    
      rePosition = navigator.geolocation.watchPosition((position) => {
        console.log('watchPosition')
        lat = position.coords.latitude;
        lng = position.coords.longitude;
    
        if (map === undefined){
          // 初始化地圖
          map = new google.maps.Map(document.getElementById('map'), {
              zoom: 18,
              center: new google.maps.LatLng(lat, lng),
              mapId: 'c57b36ae7dbc5a40',
              mapTypeControl: false,
              streetViewControl: false,
              zoomControl: false,
              fullscreenControl: false
          });
    
          marker = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: map,
            animation: google.maps.Animation.BOUNCE,
            icon: icons.start
          });
        } else {
          marker.setPosition(new google.maps.LatLng(lat, lng));
          if (place === undefined){
            map.setCenter(new google.maps.LatLng(lat, lng))
          } else {
            console.log('rerender')
            console.log(lat)
            console.log(lng)
    
            directionMap()
          }
        }
      })
    
      function directionMap(){
        // 計算路程時間距離
        const service = new google.maps.DistanceMatrixService();
    
        // 放置路線圖層
        directionsDisplay.setMap(map);
    
        // 路線相關設定
        if (request === undefined){
          request = {
            origin: { lat: lat, lng: lng },
            destination: { placeId: place.place_id },
            avoidFerries: true,
            avoidHighways: true,
            avoidTolls: true,
            travelMode: 'DRIVING'
          };
    
          service.getDistanceMatrix(
            {
              origins: [{ lat: lat, lng: lng }],
              destinations: [{placeId: place.place_id}],
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
                document.querySelector('.distance').innerText = `路程：${distance}`;
                document.querySelector('.time').innerText = `時間：${time}`;
              }
            }
          )
        } else {
          request.origin = new google.maps.LatLng(lat, lng)
          service.getDistanceMatrix(
            {
              origins: [new google.maps.LatLng(lat, lng)],
              destinations: [{placeId: place.place_id}],
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
                document.querySelector('.distance').innerText = `路程：${distance}`;
                document.querySelector('.time').innerText = `時間：${time}`;
              }
            }
          )
        }
    
        // 繪製路線
        directionsService.route(request, function (result, status) {
          if (status == 'OK') {
            leg = result.routes[0].legs[0];
            console.log(leg.steps);
            
            // 導航終點標記
            if (endMarker === undefined){
              endMarker = new google.maps.Marker({
                position: leg.end_location,
                map: map,
                animation: google.maps.Animation.DROP
              })
            }
    
            let googleBtn = document.querySelector('.google')
            let stepsList = document.querySelector('.steps-list')
            if (googleBtn){
              stepsList.innerHTML = '';
              leg.steps.map((step) => {
                const steps = document.createElement('div')
                steps.classList.add('steps')
                steps.innerHTML = `<p>${step.instructions}</p>`
                document.querySelector('.steps-list').appendChild(steps)
              })
    
              googleBtn.onclick = function(){
                window.open(
                  `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${destinationInput.value}&destination_place_id=${place.place_id}&travelmode=driving&dir_action=navigate`,
                  '_blank'
                );
              }
            } else {
              // 路線指示
              stepsList = document.createElement('div')
              stepsList.classList.add('steps-list')
              document.querySelector('.order').appendChild(stepsList)
    
              leg.steps.map((step) => {
                const steps = document.createElement('div')
                steps.classList.add('steps')
                steps.innerHTML = `<p>${step.instructions}</p>`
                document.querySelector('.steps-list').classList.add('hidden')
                document.querySelector('.steps-list').appendChild(steps)
              })
    
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
    navigator.geolocation.clearWatch(rePosition)
  }
})

function googlemap(){
}