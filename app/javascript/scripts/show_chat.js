document.addEventListener('turbolinks:load', () => {
  const chatIcon = document.querySelector('.chat-icon');
  const chatRoom = document.querySelector('.room-wrapper');
  const closeIcon = document.querySelector('.room-close');
  const notification = document.querySelector('.dot')

  if(chatIcon){
    // if (document.querySelector('.driver-name')){
      chatIcon.addEventListener('click', () => {
        chatRoom.classList.add('show');
        chatIcon.classList.add('invisible')
        notification.classList.add('invisible')
        document.querySelector('#messages').scrollTo(0,document.querySelector('#messages').scrollHeight);
      })
    // }
  }
  if(closeIcon){
    closeIcon.addEventListener('click', () => {
      chatRoom.classList.remove('show');
      chatIcon.classList.remove('invisible');
      if (!notification.classList.contains('invisible')){
        notification.classList.add('invisible')
      }
    })
  }
})

