require 'rails_helper'

RSpec.describe Cart, type: :model do
  describe "基本功能" do
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
  
    it "每個CartItem都可以計算金額（小計）" do
      user = User.create(email: "a@a", password: "aaaaaa")  # 因為Product belongs_to User
      p1 = Product.create(name: "珍珠奶茶", price: 500, user_id: user.id)
      p2 = Product.create(name: "雞排", price: 300, user_id: user.id)
      cart = Cart.new
      3.times { cart.add_item(p1.id) }
      5.times { cart.add_item(p2.id) }
      expect(cart.items.first.price).to be 1500
      expect(cart.items.second.price).to be 1500
    end
  
    it "可以計算購物車總金額" do
      cart = Cart.new
      user = User.create(email: "a@a", password: "aaaaaa")
      p1 = Product.create(name: "珍珠奶茶", price: 500, user_id: user.id)
      p2 = Product.create(name: "雞排", price: 300, user_id: user.id)
      3.times { cart.add_item(p1.id) }
      5.times { cart.add_item(p2.id) }
      expect(cart.total_price).to be 3000
    end
  end
end
