class OrdersController < ApplicationController
  def index
  end


  def new
    # @order = Order.new #(購物車params)
  end

  def create
    # @order = Order.new
    # @order.pay!
  end

  def preparing
    # order.confirm! if "店家在新訂單頁面按下確認鍵"
  end

  def delivering
    # order.prepared! if 
  end

  def record
  end

  private
  def order_params
    params.require(:order).permit(:username, :tel, :address, :state, :total_price, :responsibility)
  end
end