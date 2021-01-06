class OrdersController < ApplicationController
  before_action :set_orders, only: [:recieving, :preparing, :delivering, :record]

  def new
  end

  def recieving
    @recieving_orders = @orders.where(state: 'paid')
  end

  def update_state
    @order = Order.find_by(tel: params[:order][:tel])
    @order.confirm! if @order.paid?
    # @order.conplete! if @order.preparing?
    # @order.go! if @order.completed?
    # @order.arrive! if @order.delivering?
  end

  def preparing
    @recieving_orders = @orders.where(state: 'preparing')
  end

  def delivering
    @recieving_orders = @orders.where(state: delivering)
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