import { Controller } from "stimulus"
import Rails from '@rails/ujs'

export default class extends Controller {
    static targets = ["cartquantity"]
    static values = { index: Number }

    connect() {
        // console.log(this.indexValue)
      }

  //   initialize() {   
  //   this.indexValue = parseInt(this.element.getAttribute(this.index))
  //   this.quantitySlide()
  // }

  // 加購物車
  next(e) {
    e.preventDefault()
    console.log('add')
    this.indexValue += 1
    this.quantitySlide()
    
  }
// 減購物車
  previous(e) {
      console.log('xxx')
      if indexValue < 1
      else
      this.indexValue -= 1
    this.quantitySlide()
    end
  }

  quantitySlide() {  
    this.cartquantityTargets.forEach((element, index) => {
      element.hidden = (index != this.index)
    })
  }

 
    value(e) {
    const {count} = e.cartquantity
    this.detailTarget.innerText = `${count}`
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