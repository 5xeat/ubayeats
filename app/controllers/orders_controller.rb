class OrdersController <  ApplicationController
  def index
    @orders = Order.all
  end

  def new
  end

  def preparing
  end

  def delivering
  end

  def record
  end
end