class OrdersController < ApplicationController
  before_action :set_orders, only: [:recieving, :preparing, :delivering, :record]


  def new
  end

  def update_state
    # @order = Order.find_by(params[user: :id])
  end

  def recieving
    @recieving_orders = @orders.where(state: 'paid')
  end

  def preparing
    # order.confirm! if "店家在新訂單頁面按下確認鍵"
    @recieving_orders = @orders.where(state: 'preparing')
  end


  def delivering
    # order.prepared! if 
    @recieving_orders = @orders.where(state: 'delivering')
  end

  def record
    @recieving_orders = @orders.where(state: 'completed')
  end

  private
  def order_params
    params.require(:order).permit(:username, :tel, :address, :state, :total_price, :responsibility)
  end

  def set_orders
    @orders = current_user.store_profile.orders.all
  end
end