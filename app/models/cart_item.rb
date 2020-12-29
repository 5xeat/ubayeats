class CartItem
  attr_reader :item_id, :quantity

  def initialize(item_id, quantity = 1)
    @item_id = item_id
    @quantity = quantity
  end

  def increment(n = 1)
    @quantity += n
  end

  def product
    Product.find_by(id: item_id)  #回傳指定商品
  end
  def price
    product.price * quantity
  end
end