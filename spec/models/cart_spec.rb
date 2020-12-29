require 'rails_helper'

RSpec.describe Cart, type: :model do
  it "可以將餐點加入購物車，購物車就有東西了" do
    cart = Cart.new
    cart.add_item(1)
    expect(cart.empty?).to be false
  end

  it "將相同餐點加入購物車，購買項目不會增加，但是餐點數量會改變" do
    cart = Cart.new
    3.times { cart.add_item(1) }
    5.times { cart.add_item(2) }
    expect(cart.items.count).to be 2
  end

  it "餐點可加入購物車，也可從購物車中移除" do
    cart = Cart.new
    p1 = Product.create(name: "珍珠奶茶", price: 500)
    cart.add_item(p1.id)
    expect(cart.items.first.item_id).to be p1.id
  end
end
