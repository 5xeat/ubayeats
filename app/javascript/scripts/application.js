document.addEventListener('turbolinks:load', () => {
  const flash = document.querySelector('#flash')
  if (flash){
    setTimeout(function(){
      flash.remove();
    }, 2000);
  }
})