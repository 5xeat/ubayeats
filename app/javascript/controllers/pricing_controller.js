import { Controller } from "stimulus"
import Rails from '@rails/ujs'
import Swal from 'sweetalert2';

export default class extends Controller {
  static targets = ["icon"]

  addToCart(e){
    const productId = this.data.get('id');
    Rails.ajax({
      url: `/carts/add_item/${productId}`,
      type:'post',
      success: resp => {
        if (resp.status === 'ok'){
          const event = new CustomEvent('addToCart',{
            detail: {
              count: resp.count,
              total_price: resp.total_price
            }  
          })
          window.dispatchEvent(event)
          const cartIcon = this.iconTarget
          if (cartIcon.classList.contains('copy')){
            cartIcon.classList.remove('copy')
            cartIcon.classList.add('copy')
            setTimeout(() => {
              cartIcon.classList.remove('copy')
            }, 1000);
          } else {
            cartIcon.classList.add('copy')
            setTimeout(() => {
              cartIcon.classList.remove('copy')
            }, 500);
          }
        } else {
          Swal.fire({
            title: "是否建立新訂單？",
            html: `您的訂單尚有 <b>${resp.store}</b> 的餐點未結帳！<br>建立新訂單，即可新增 <b>${resp.new_store}</b> 提供的餐點。`,
            showCloseButton: true,
            confirmButtonColor: '#EF4444',
            confirmButtonText: '建立新訂單',
          }).then((result) => {
            if (result.isConfirmed) {
              Rails.ajax({
                url: '/carts',
                type:'delete',
                success: resp => {
                  Rails.ajax({
                    url: `/carts/add_item/${productId}`,
                    type:'post',
                    success: resp => {
                      const event = new CustomEvent('addToCart',{
                        detail: {
                          count: resp.count,
                          total_price: resp.total_price
                        }  
                      })
                      window.dispatchEvent(event)
                      const cartIcon = this.iconTarget
                      cartIcon.classList.add('copy')
                      setTimeout(() => {
                        cartIcon.classList.remove('copy')
                      }, 500);
                    }
                  })
                },
                error: err => {
                  console.log('err');
                }
              })
            }
          })
        }
      },
      error: err => {
        console.log('err');
      }
    })
  }
}
