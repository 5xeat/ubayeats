class CartItem
  attr_reader :item_id, :quantity, :product_name, :product_price

  def initialize(item_id, quantity = 1)
    @item_id = item_id
    @quantity = quantity
    @product = product_name
    @price = product_price
    @product_id
  end

  def increment(n = 1)
    @quantity += n
  end

  def add_product(product)

    @product_id = product.id
  end

  def product_name
    @procduct
  end

  def product
   @product =  Product.find_by(id: item_id)  #回傳指定商品
  end

  def total_price
    @product =  Product.find_by(id: item_id)
    # product.price * quantity
    @quantity.to_i * @product.price
  end
end