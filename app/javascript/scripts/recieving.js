document.addEventListener('turbolinks:load', () => {
  const recieving = document.querySelector('.recieving')
  recieving.addEventListener('click', recieving)
  function recieving(event){
    event.preventDefault();
    
    const right = document.querySelector('.right')
    right.innerHTML = '<%= render "order/recieving" %>'
  }
  
  function clean(event){
    event.currentTarget.innerHTML = ''
  }
})

