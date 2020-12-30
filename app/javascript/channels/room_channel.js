import consumer from "./consumer"

consumer.subscriptions.create({ channel: "RoomChannel", room_id:2}, {
  connected() {
    console.log("yeah")
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    console.log(data)
    const element = document.getElementById('user-id');
    const user_id = Number(element.getAttribute('data-user-id'));

    let html;

    if (user_id === data.message.user_id){
      html = data.mine
    } else {
      html = data.theirs
    }

    const messageContainer = document.getElementById('messages')
    messageContainer.innerHTML = messageContainer.innerHTML + html
    // Called when there's incoming data on the websocket for this channel
  }
});
