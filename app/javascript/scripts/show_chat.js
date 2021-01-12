document.addEventListener('turbolinks:load', () => {
  const chatIcon = document.querySelector('.chat-icon');
  const chatRoom = document.querySelector('.room-wrapper');
  const closeIcon = document.querySelector('.room-close');

  chatIcon.addEventListener('click', () => {
    chatRoom.classList.add('show');
    chatIcon.classList.add('invisible')
  })
  closeIcon.addEventListener('click', () => {
    chatRoom.classList.remove('show');
    chatIcon.classList.remove('invisible');
  })
})