import { Controller } from "stimulus"
import Rails from '@rails/ujs'

export default class extends Controller {
    static targets = ["quantity","count","price","subtotal"]
    static values = { index: Number}
    connect() {
        // console.log(this.indexValue)
      }
  // 加購物車
  
  next(e) {
    // console.log(this.indexValue)
    this.indexValue += 1
    e.currentTarget.previousSibling.previousSibling.value = this.indexValue
    const subprice =  this.priceTarget.innerText * this.indexValue
    this.subtotalTarget.innerText = `${subprice}`

    const totalprice =  this.priceTarget.innerText * this.indexValue
    document.querySelector('.total').innerText = `${totalprice}`
  }
// 減購物車
  previous(e) {
    this.indexValue -= 1
    if (this.indexValue <= 0){
      this.indexValue = 1;
    }
    e.target.parentNode.nextSibling.nextSibling.value = this.indexValue

    const subprice =  this.priceTarget.innerText * this.indexValue
    this.subtotalTarget.innerText = `${subprice}`
    const totalprice =  this.priceTarget.innerText * this.indexValue
    document.querySelector('.total').innerText = `${totalprice}`
 }
  



  
  // Rails.ajax({
  //   url: `/carts/add_item/${productId}`
  //   type:'post',
  //   success: resp => {
  //     const event = new CustomEvent('click',{
  //       detail: {
  //         count: resp.count,
  //         total_price: resp.total_price
  //       }  
  //     })
  //     window.dispatchEvent(event)
  //   },
  //   error: err => {
  //     console.log('err');
  //   }
  // })

}