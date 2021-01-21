import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {
  const room_element = document.getElementById('room-id');
  if (room_element){
    const room_id = room_element.getAttribute('data-room-id');

    consumer.subscriptions.subscriptions.forEach((subscription) => {
      consumer.subscriptions.remove(subscription)
    })
  
    consumer.subscriptions.create({ channel: "RoomChannel", room_id: room_id }, {
      connected() {
        console.log("已連結上" + room_id)
        // Called when the subscription is ready for use on the server
      },
    
      disconnected() {
        // Called when the subscription has been terminated by the server
      },
    
      received(data) {
        console.log(data)
        const user_element = document.getElementById('user-id');
        const user_id = Number(user_element.getAttribute('data-user-id'));
        const content = document.getElementById('message_content');
    
        let html;
    
        if (user_id === data.message.user_id){
          html = data.mine
          content.value = ''
        } else {
          html = data.theirs
          if(Notification.permission === "granted"){
            var title = '您有新訊息'
            var body  = data.content
            var options = { body: body }
            new Notification(title, options)
          }
        }
    
        const messageContainer = document.getElementById('messages')
        messageContainer.innerHTML = messageContainer.innerHTML + html
        document.querySelector('#messages').scrollTo(0,document.querySelector('#messages').scrollHeight);
      }
    });
  }
})
