class Cart
  attr_reader :items

  def initialize
    @items = []
  end

  def add_item(item_id, quantity = 1)
    # 判斷是否為重複的項目
    found_item = @items.find { |item| item.item_id == item_id }
    
    if found_item
      found_item.increment(quantity)             # 增加數量
    else
      @items << CartItem.new(item_id, quantity)  # 增加一個新CartItem
    end
  end

  def empty?
    @items.empty?
  end

  def total_price
    items.reduce(0) { |sum, item| sum + item.price }
  end
end