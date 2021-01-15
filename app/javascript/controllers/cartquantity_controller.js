import { Controller } from "stimulus"
import Rails from '@rails/ujs'
export default class extends Controller {
  static targets = ["quantity","count","price","subtotal","total"]
  static values = { index: Number}
  connect() { 
    }  
  next(e) {
    this.indexValue += 1
    e.currentTarget.previousSibling.previousSibling.value = this.indexValue
    const subprice =  this.priceTarget.innerText * this.indexValue
    this.subtotalTarget.innerText = `${subprice}`

    const id = this.data.get('id')
    Rails.ajax({
      url: `/carts/add_item/${id}`,
      type:'post',
      success: resp => {
        const event = new CustomEvent('click',{
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
    updateCart()
  }
  previous(e) {
    this.indexValue -= 1
    if (this.indexValue <= 0){
      this.indexValue = 1;
      }
    e.target.parentNode.nextSibling.nextSibling.value = this.indexValue
    const subprice =  this.priceTarget.innerText * this.indexValue
    this.subtotalTarget.innerText = `${subprice}`

    const id = this.data.get('id')
    Rails.ajax({
      url: `/carts/minus_item/${id}`,
      type:'post',
      success: resp => {
        const event = new CustomEvent('click',{
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
    updateCart()
  }
}

function updateCart(){
  let total = 0
  document.querySelectorAll('.cart-item').forEach((item) => {
    const quantity = item.querySelector('.quantity').value
    const price = item.querySelector('.price').innerText.replace('$', '')
    item.querySelector('.subtotal').innerText =`$${quantity * price}`
    total += (quantity * price)
  })
  document.querySelector('.total').innerText = `$${total}`
}

