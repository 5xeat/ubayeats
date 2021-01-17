import { Controller } from "stimulus"
import Rails from '@rails/ujs'
import Swal from 'sweetalert2';

export default class extends Controller {
  static targets = []

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
        } else {
          Swal.fire({
            title: "是否建立新訂單？",
            html: `您的訂單含有 <b>${resp.store}</b> 的餐點。` + 
                  `建立新訂單，即可新增 <b>${resp.new_store}</b> 提供的餐點。`,
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
