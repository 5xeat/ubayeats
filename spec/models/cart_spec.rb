require 'rails_helper'

RSpec.describe Cart, type: :model do
  it "可以將餐點加入購物車，購物車就有東西了" do
    cart = Cart.new
    cart.add_item 1
    expect(cart.empty?).to be false
  end
end
