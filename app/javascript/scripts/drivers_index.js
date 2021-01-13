import Rails from '@rails/ujs';
import Swal from 'sweetalert2';

document.addEventListener('turbolinks:load', () => {
  let rePosition
  if (document.querySelector('.driver_profiles.index')){
    document.querySelector('.cart-icon').remove()
    window.initMap = async() => {
      const geocoder = new google.maps.Geocoder()
      let map, marker, lat, lng, endMarker, leg, request, origin, destination, storeDestination, userDestination;
      let order = document.querySelector('.order')
      
      if (order){
        storeDestination = document.querySelector('.store-address').innerText
        userDestination = document.querySelector('.order-address span').innerText
        await geocoder.geocode({'address': storeDestination}, function (results, status) {
          if (status == 'OK') {
            console.log(results[0].place_id);
            storeDestination = results[0]
          }
          else {
            console.log('errrrrrrrrr1');
            alert('Geocode was not successful for the following reason: ' +    status);
         }
        });
  
        await geocoder.geocode({'address': userDestination}, function (results, status) {
          if (status == 'OK') {
            console.log(results);
            userDestination = results[0]
          }
          else {
            console.log('errrrrrrrrr2');
            alert('Geocode was not successful for the following reason: ' +    status);
         }
        });  
      }

      const onlineBtn = document.querySelector(".online-btn")
      onlineBtn.addEventListener('click', (e) => {
        e.preventDefault()
        if (onlineBtn.innerText === "上線"){
          onlineBtn.innerText = "下線"
          document.querySelector('.status p').innerText = "等待新訂單..."

          Rails.ajax({
            url: '/drivers.json',
            type: 'get',
            success: (resp) => {
              console.log(resp);
              if (resp !== {}){
                const order = document.createElement('div')
                order.classList.add('order')
                order.innerHTML = `
                <div class="distance-matrix">
                  <p></p>
                </div>
                <div class="title">
                  <p class="store-name">
                    ${resp.order.store.store_name}
                  </p>
                  <div class="phone">
                    <a href="tel:+886${resp.order.store.store_phone}">
                      <i class="fas fa-phone-alt"></i>
                    </a>
                  </div>
                </div>
                <p class="store-address">${resp.order.store.store_address}</p>
                <p class="order-number">訂單編號：<span>${resp.order.num}</span></p>
                <p class="orderer">訂單人：
                  <span>${resp.order.username}</span>
                  <span class="orderer-phone">${resp.order.tel}</span>
                </p>
                <p class="order-address">訂單地址：<span>${resp.order.address}</span></p>
                <div class="btn-list">
                  <div class="take-order-btn btn">接單</div>
                </div>
                `
                document.querySelector('.info').appendChild(order)
                document.querySelector('.take-order-btn').addEventListener('click' , setTakeOrderBtn);
                destination = storeDestination
                directionMap()
              }
            },
            error: function(err) {
              console.log(err)
            }
          })  
        } else {
          onlineBtn.innerText = "上線"
          document.querySelector('.status p').innerText = "未上線"
          
          if (order){
            order.remove()
            order = undefined
            endMarker.setMap(null)
            map.setCenter(origin)
            directionsDisplay.setMap(null);
            const steps = document.querySelector('.steps')
            if (steps){
              steps.remove()
            }
          }
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
      
      rePosition = navigator.geolocation.watchPosition(async(position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console.log(lat);
        console.log(lng);

        origin = await new google.maps.LatLng(lat, lng);
    
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
            destination = storeDestination;

            const takeOrderBtn = document.querySelector('.take-order-btn')
            if (takeOrderBtn){
              takeOrderBtn.addEventListener('click' , setTakeOrderBtn);
            }
    
            directionMap()
          }
        } else {
          marker.setPosition(origin);

          if (order){
            const takeOrderBtn = document.querySelector('.take-order-btn')
            if (takeOrderBtn){
              takeOrderBtn.addEventListener('click' , setTakeOrderBtn);
            }
            console.log('rerender');
            directionMap()
          } else {
            map.setCenter(origin)
          }
        }
      })

      function setTakeOrderBtn(){
        const takeOrderBtn = document.querySelector('.take-order-btn');
        takeOrderBtn.remove();
        // 導航按鈕
        const googleBtn = document.querySelector('.google')
        const takenMealBtn = document.createElement('div')
        takenMealBtn.classList.add('take-meal-btn', 'btn')
        takenMealBtn.innerText = "已取餐"
        takenMealBtn.onclick = setTakeMealBtn
        document.querySelector('.status').classList.add('hidden')
        document.querySelector('.btn-list').appendChild(takenMealBtn)

        const orderId = document.querySelector('.order-number span').innerText
        Rails.ajax({
          url: '/orders/driver_take_order',
          type: 'post',
          data: new URLSearchParams({'order': orderId}),
          success: (resp) => {
            console.log('suc');
            console.log(resp);
          },
          error: function(err) {
            console.log('err')
            console.log(err)
          }
        })

        if (googleBtn){
          document.querySelector('.steps').classList.remove('hidden');
          googleBtn.classList.remove('hidden');
        };
      }

      function setTakeMealBtn(){
        const takenMealBtn = document.querySelector('.take-meal-btn')
        takenMealBtn.remove()

        const completeBtn = document.createElement('div')
        completeBtn.classList.add('btn', 'complete-btn')
        completeBtn.innerText = "已送達"
        completeBtn.onclick = setCompleteBtn
        document.querySelector('.btn-list').appendChild(completeBtn)

        console.log(userDestination.place_id);
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

      function setCompleteBtn(){
        document.querySelector('.distance-matrix p').innerText = ''
        document.querySelector('.steps').remove()
        document.querySelector('.order').remove()  
        directionsDisplay.setMap(null)
        endMarker.setMap(null)
        order = undefined
        map.setCenter(origin)
        document.querySelector('.status').classList.remove('hidden')
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '此筆訂單已送達，辛苦了！',
          showConfirmButton: false,
          timer: 1500
        })
      }

      function directionMap(){
        // 計算路程時間距離
        const service = new google.maps.DistanceMatrixService();
        console.log(destination);
    
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
    
            let googleBtn = document.querySelector('.google')
            if (googleBtn){
              document.querySelector('.steps').innerHTML = `<p>${leg.steps[0].instructions}</p>`
    
              googleBtn.onclick = function(){
                window.open(
                  `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${destination.geometry.location}&travelmode=driving&dir_action=navigate`,
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
                  `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${destination.geometry.location}&travelmode=driving&dir_action=navigate`,
                  '_blank'
                );
              }
              document.querySelector('.btn-list').appendChild(googleBtn)
            }
    
            directionsDisplay.setDirections(result);
          } else {
            console.log('err');
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