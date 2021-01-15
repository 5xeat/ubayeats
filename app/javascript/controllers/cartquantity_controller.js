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
  remove(){
    console.log(remove);
    // const row =  e.currentTarget.parentElement.parentElement.parentElement
    // const product_id = row.getAttribute('id')
    // // '/carts/remove_item/' + product_id.to_s 
    // Rails.ajax({
    //     url: `/carts/remove_item/${product_id}`,
    //     type: 'delete',
    //     success: (resp) => {
    //       console.log(resp);
    //       // resp.target.remove()
    //     },
    //     error: (err) => {
    //         console.log(err)
    //     }
    // })

    // calcCart()
  }
}
function updateCart(){
  const subtotal = document.querySelectorAll('span.subtotal') 
  const total = document.querySelector('.total')
  const quantity = document.querySelector('.cart-item.quantity')
  const price = document.querySelector('.cart-item.price')
  total.textContent = (quantity * price)
  let itemtotal = 0
  subtotal.forEach(item => {
   itemtotal += Number(item.textContent)
  })

  total.textContent = itemtotal
}

// document.addEventListener('turbolinks:load',()=>{
//     document.querySelectorAll('.remove-item-btn').forEach(btn => {
//         btn.addEventListener('click', setRemoveItemBtn)
//         })
//     document.querySelectorAll('.cart .quantity').forEach(input =>{
//             input.addEventListener('change', setQuantity)
//         })
// })

// function calcCart(){
//     const cartItems = document.querySelectorAll('.cart .cart-item')
//   const remove = document.querySelectorAll('.remove-item-btn').forEach(btn => {
//     btn.addEventListener('click', setRemoveItemBtn)


//     let total = 0
//     cartItems.forEach(item => {
//         const quantity = item.querySelector('.quantity').value
//         const price = item.querySelector('.price').innerText
//         total += (quantity * price)
//     })

//      document.querySelector('.total-price').innerText = total.textContent
// }