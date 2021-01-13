import { Controller } from "stimulus"
export default class extends Controller {
  static targets = [ "number" ]

  connect() {
      console.log('hi')
  }
  addtocart() {
    console.log(123)
  }
}
