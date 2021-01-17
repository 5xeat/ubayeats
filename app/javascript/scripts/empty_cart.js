import Rails from '@rails/ujs'

document.addEventListener('turbolinks:load', () => {
  if (document.querySelector('.carts.show')){
    document.querySelector('.cart-icon').remove()
    document.querySelector('.empty_cart_btn').addEventListener('click', () => {
      Rails.ajax({
        url: '/carts',
        type:'delete',
        success: (resp) => {
          window.location.href = '/'
        },
        error: function(err) {
          console.log(err)
        }
      })
    })
  }
})