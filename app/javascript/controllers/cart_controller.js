import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["detail"]
  static values = { index: Number }
  connect() {
  }
  // total_price
  update(e){
    e.preventDefault()
    const {count, total_price} = e.detail
    // console.log(this.detailTarget)
    this.detailTarget.innerText = `${count}/$${total_price}`
  }

 
}
