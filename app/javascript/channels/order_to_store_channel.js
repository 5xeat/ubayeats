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



  }
});
