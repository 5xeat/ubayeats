import consumer from "./consumer"

consumer.subscriptions.create("OrderChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    console.log(data);
    let notice = document.createElement('div')
    notice.textContent = `您有一筆${data.price}元的訂單!請立即查看`
    document.querySelector('.right').insertAdjacentElement('afterbegin', notice)
    document.querySelector('.recieving').classList.add("bg-red-600");
  }
});
