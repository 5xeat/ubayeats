class Cart
  attr_reader :items
  def initialize(items = [])
    @items = items
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
    @items.reduce(0) { |sum, item| sum + item.item_total_price }
  end

  def serialize
    all_items = items.map { |item|
      { "item_id" => item.item_id, "quantity" => item.quantity }
    }
    { "items" => all_items }
  end

  def self.from_hash(hash)
    if hash.nil?
      new []
    else
      new hash["items"].map { |item_hash|
        CartItem.new(item_hash["item_id"], item_hash["quantity"])
      }
    end
  end

end