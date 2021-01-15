import consumer from "./consumer"

consumer.subscriptions.create("OrderToStoreChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    console.log(data);
    let store = JSON.parse(document.querySelector('#navbar').getAttribute('data')).id
    if(data.receiver === store){
      let notice = document.createElement('div')
      notice.textContent = `您有一筆${data.price}元的訂單，請立即查看!訂單編號${data.orderId}`
      const $right = document.querySelector('.right')
      $right && $right.insertAdjacentElement('afterbegin', notice)
      const $recieving = document.querySelector('.recieving')
      $recieving && $recieving.classList.add("bg-red-600");

      // form = document.createElement('div')
      // document.querySelector('.store_profiles.show .edit_order').insertAdjacentElement('afterbegin', )
      // 新訂單畫面演戲 後補
    } 
    
    let user = JSON.parse(document.querySelector('#navbar').getAttribute('data')).id
    console.log(`${data.receiver} === ${user}`)
    if(data.receiver === user){
      if (data.order_state=== 'preparing'){
        console.log(data.order_state)
        console.log(document.querySelector(".j-preparing"))
        document.querySelector(".j-preparing").classList.remove('bg-gray-300')
        document.querySelector(".j-preparing").classList.add('bg-red-300')
        document.querySelector(".j-order-state-text").textContent = '店家已接受您的訂單，正在準備中...'
      } else if (data.order_state === 'delivering') {
        document.querySelector(".j-delivering").classList.remove('bg-gray-300')
        document.querySelector(".j-delivering").classList.add('bg-red-300')
        document.querySelector(".j-order-state-text").textContent = '店家已完成您的餐點，正在等待外送員領取...'
      } else if (data.order_state=== 'completed') {
        document.querySelector(".j-completed").classList.remove('bg-gray-300')
        document.querySelector(".j-completed").classList.add('bg-red-300')
        document.querySelector(".j-order-state-text").textContent = '外送員已領取餐點，正在前往您的位置...'
      }else if (data.order_state=== 'arrived') {
        document.querySelector(".j-arrived").classList.remove('bg-gray-300')
        document.querySelector(".j-arrived").classList.add('bg-red-300')
        document.querySelector(".j-order-state-text").textContent = '外送員已抵達，請準備取餐!'
      }
    }
  }
});
