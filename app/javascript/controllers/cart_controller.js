import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["detail"]
  static values = { index: Number }
  update(e){
    e.preventDefault()
    const cartIcon = this.detailTarget.parentNode
    if (cartIcon.classList.contains('cart-animation')){
      cartIcon.classList.remove('cart-animation')
      setTimeout(function(){
        cartIcon.classList.add('cart-animation')
      }, 50)
    } else {
      cartIcon.classList.add('cart-animation')
    }
    const {count, total_price} = e.detail
    setTimeout(() => {
      this.detailTarget.innerText = `${count}/$${total_price}`
    }, 500);
  }
}
