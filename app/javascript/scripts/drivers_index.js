import Rails from '@rails/ujs';

document.addEventListener('turbolinks:load', () => {
  let rePosition
  if (document.querySelector('.driver_profiles.index')){
    document.querySelector('.cart-icon').remove()
    window.initMap = async() => {
      const geocoder = new google.maps.Geocoder()
      let lat, lng, origin;
      let orders = document.querySelector('.order')
      
      const onlineBtn = document.querySelector(".online-btn")
      onlineBtn.addEventListener('click', (e) => {
        // e.preventDefault()
        // if (onlineBtn.innerText === "上線"){
        //   onlineBtn.innerText = "下線"
        //   document.querySelector('.status p').innerText = "等待新訂單..."

        //   Rails.ajax({
        //     url: '/drivers.json',
        //     type: 'get',
        //     success: (resp) => {
        //       console.log(resp);
        //       if (resp !== {}){
        //         resp.map(async(order) => {
        //           const ordercard = document.createElement('div')
        //           ordercard.classList.add('p-4', 'xl:w-1/4', 'md:w-1/2', 'w-full')
        //           await geocoder.geocode({'address': order.store.store_address}, function (results, status) {
        //             if (status == 'OK') {
        //               console.log(results[0].place_id);
        //               storeDestination.push(results[0].place_id)
        //             }
        //             else {
        //               console.log('errrrrrrrrr1');
        //               alert('Geocode was not successful for the following reason: ' +    status);
        //             }
        //           });
        //           storeDestination.map((store) => {
        //             directionMap(store)
        //           })
        //           order.innerHTML = `
        //           <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
        //             <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
        //               ${order.num}
        //             </h2>
        //             <h1 class="text-3xl text-gray-900 pb-4 mb-0 leading-none">
        //               ${order.store.store_name}
        //             </h1>
        //             <p class="store-address flex items-center text-gray-600 pb-2 border-b border-gray-200">
        //               ${order.store.store_address}
        //             </p>
        //             <p class="flex items-center text-gray-600 mb-2 text-xl">
        //               距離/時間
        //             </p>
        //             <button class="take-order-btn flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
        //               接單
        //               <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
        //                 <path d="M5 12h14M12 5l7 7-7 7"></path>
        //               </svg>
        //             </button>
        //           </div>
        //           `
        //           document.querySelector('.order-lists').appendChild(ordercard)
        //           document.querySelector('.take-order-btn').addEventListener('click' , setTakeOrderBtn);
                  
        //           directionMap()
        //         })
        //       }
        //     },
        //     error: function(err) {
        //       console.log(err)
        //     }
        //   })  
        // } else {
        //   onlineBtn.innerText = "上線"
        //   document.querySelector('.status p').innerText = "未上線"
          
        //   if (order){
        //     order.remove()
        //     order = undefined
        //     endMarker.setMap(null)
        //     map.setCenter(origin)
        //     directionsDisplay.setMap(null);
        //     const steps = document.querySelector('.steps')
        //     if (steps){
        //       steps.remove()
        //     }
        //   }
        // }
        // Rails.ajax({
        //   url: '/drivers/online',
        //   type: 'post',
        //   success: (resp) => {
        //     console.log(resp);
        //   },
        //   error: function(err) {
        //     console.log(err)
        //   }
        // })
      })  
      
      rePosition = navigator.geolocation.watchPosition((position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console.log(lat);
        console.log(lng);

        origin = new google.maps.LatLng(lat, lng);

        if (orders){
          console.log('recalc');
          const orders = document.querySelectorAll('.order')
          orders.forEach((order) => {
            const address = order.querySelector('.store-address').innerText
            geocoder.geocode({'address': address}, function (results, status) {
              if (status == 'OK') {
                console.log(results[0].place_id);
                const placeId = results[0].place_id
                directionMap(order, placeId)
              }
              else {
                console.log('err');
                alert('Geocode was not successful for the following reason: ' +    status);
              }
            });  
            order.querySelector('.take-order-btn').addEventListener('click', setTakeOrderBtn)
          })
        }
      })

      function setTakeOrderBtn(e){
        console.log(e.target.parentNode.querySelector('.order-num').innerText);
        const num = e.target.parentNode.querySelector('.order-num').innerText
        Rails.ajax({
          url: '/orders/driver_take_order',
          type: 'post',
          data: new URLSearchParams({'order': num}),
          success: (resp) => {
            console.log('suc');
            window.location.href = `/drivers/order_deliver?order=${num}`
          },
          error: function(err) {
            console.log('err')
            console.log(err)
          }
        })
      }

      function directionMap(order, placeId){
        // 計算路程時間距離
        const service = new google.maps.DistanceMatrixService();
    
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [{placeId: String(placeId)}],
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
              order.querySelector('.distance').innerText = `${time}(${distance})`;
            }
          }
        )
      }
    }
  } else {
    window.initMap = () => {}
    navigator.geolocation.clearWatch(rePosition)
  }
})