import consumer from "./consumer"
import Rails from '@rails/ujs';
import Swal from 'sweetalert2';

consumer.subscriptions.create("NotificationChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    let store = JSON.parse(document.querySelector('#navbar_component').dataset.id)
    if(data.receiver === store){
      let notice = document.createElement('div')
      notice.textContent = `您有一筆${data.price}元的訂單，請立即查看!訂單編號${data.orderId}`
      const $right = document.querySelector('.right')
      $right && $right.insertAdjacentElement('afterbegin', notice)
      const $recieving = document.querySelector('.recieving')
      $recieving && $recieving.classList.add("bg-red-600");
    } 
    
    let user = JSON.parse(document.querySelector('#navbar_component').dataset.id)
    if(data.receiver === user){
      if (data.order_state === 'preparing'){
        document.querySelector(".j-preparing").classList.remove('bg-gray-300')
        document.querySelector(".j-preparing").classList.add('bg-red-400')
        document.querySelector(".j-order-state-text").textContent = '店家已接受您的訂單，正在準備中...'
      } else if (data.order_state === 'delivering') {
        document.querySelector(".j-delivering").classList.remove('bg-gray-300')
        document.querySelector(".j-delivering").classList.add('bg-red-400')
        document.querySelector(".j-order-state-text").textContent = '店家已完成您的餐點，正在等待外送員領取...'
      } else if (data.order_state === 'completed') {
        let driverPosition = new google.maps.LatLng(data.latitude, data.longitude)
        let destination =  document.querySelector(".address-text").innerText;

        if (data.notice === '外送員位置更新'){
          if (document.querySelector('.map-container').classList.contains('hidden')){
          } else {
            $map.setCenter(driverPosition)
            $marker.setPosition(driverPosition)  
            calcTime(driverPosition, destination)
          }
        } else {
          $map.setCenter(driverPosition)
          $marker.setPosition(driverPosition)
          calcTime(driverPosition, destination)
    
          document.querySelector('.map-container').classList.remove('hidden')
          document.querySelector(".j-completed").classList.remove('bg-gray-300')
          document.querySelector(".j-completed").classList.add('bg-red-400')
          document.querySelector(".j-order-state-text").textContent = '外送員已領取餐點，正在前往您的位置...'
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
              } else {
                const time = response.rows[0].elements[0].duration.text;
                document.querySelector('.time').innerText = time;
              }
            }
          )
        }

        document.querySelector('#latitude').value = data.latitude
        document.querySelector('#longitude').value = data.longitude
        
      } else if (data.order_state=== 'arrived') {
        document.querySelector(".j-arrived").classList.remove('bg-gray-300')
        document.querySelector(".j-arrived").classList.add('bg-red-400')
        document.querySelector('.map-container').classList.add('hidden')
        document.querySelector('.time').innerText = "---"
        document.querySelector(".j-order-state-text").textContent = '外送員已送達，用餐愉快!'
      }
    }
  }
});
