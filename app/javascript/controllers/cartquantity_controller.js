import { Controller } from "stimulus"
import Rails from '@rails/ujs'
export default class extends Controller {
  static targets = ["quantity","count","price","subtotal"]
  static values = { index: Number}

  add(e) {
    this.indexValue += 1
    e.currentTarget.previousSibling.previousSibling.value = this.indexValue
    const subprice =  this.priceTarget.innerText * this.indexValue
    this.subtotalTarget.innerText = `${subprice}`

    const id = this.data.get('id')
    Rails.ajax({
      url: `/carts/cart_add_item/${id}`,
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
  minus(e) {
    this.indexValue -= 1
    if (this.indexValue <= 0){
      this.indexValue = 1;
    } else {
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

  change(e){
    console.log("test");
    if (e.currentTarget.value <= 0 || (Number(e.currentTarget.value)%1) != 0){
      e.currentTarget.value = 1;
      this.indexValue = e.currentTarget.value
      const subprice =  this.priceTarget.innerText * this.indexValue
      this.subtotalTarget.innerText = `${subprice}`
      updateCart()
    } else {
      this.indexValue = e.currentTarget.value
      console.log(e.currentTarget.value);
      console.log(this.indexValue);
      const subprice =  this.priceTarget.innerText * this.indexValue
      this.subtotalTarget.innerText = `${subprice}`
      
      const quantity = parseInt(e.currentTarget.value);
      const id = this.data.get('id')
      Rails.ajax({
        url: `/carts/change_quantity/${id}`,
        type:'post',
        data: JSON.stringify({quantity: quantity}),
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

  empty(e) {
    const row = e.currentTarget.parentElement
    const id = this.data.get('id')

    row.remove()
    Rails.ajax({
      url: `/carts/remove_item/${id}`,
      type: 'delete',
      success: (resp) => {
        updateCart()
      },
      error: (err) => {
        console.log(err)
      }
    })
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
