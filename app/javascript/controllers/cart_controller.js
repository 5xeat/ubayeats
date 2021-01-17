import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["detail"]
  static values = { index: Number }
  connect() {
  }
  update(e){
    e.preventDefault()
    const {count, total_price} = e.detail
    this.detailTarget.innerText = `${count}/$${total_price}`
  }
}
