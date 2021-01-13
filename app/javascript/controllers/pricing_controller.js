import { Controller } from "stimulus"
import Rails from '@rails/ujs'
export default class extends Controller {
  static targets = []

  addToCart(e){
    const productId = this.data.get('id');
    // console.log(productId)
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
      },
      error: err => {
        console.log('err');
      }
    })
  }
}
