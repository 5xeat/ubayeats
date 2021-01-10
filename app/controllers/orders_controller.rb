class OrdersController < ApplicationController
  before_action :session_required
  before_action :set_orders, only: [:recieving, :preparing, :delivering, :record]
  before_action :find_order, only: [:recieving_update, :preparing_update, :delivering_update, :record_update]

  def index
    @orders = current_user.orders
  end

  def show
    @order = Order.find(params[:id])
  end

  def recieving
    @recieving_orders = @orders.where(state: 'paid')
  end

  def recieving_update
    @order.confirm! if @order.paid?
    render 'store_profiles/show', notice:'有新訂單已準備'
  end

  def preparing
    @recieving_orders = @orders.where(state: 'preparing')
  end

  def preparing_update
    @order.conplete! if @order.preparing?
    render 'store_profiles/show', notice:'有訂單已完成'
  end

  def delivering
    @recieving_orders = @orders.where(state: 'delivering')
  end

  def delivering_update
    @order.go! if @order.delivering?
    render 'store_profiles/show', notice:'有訂單外送中'
  end

  def record
    @recieving_orders = @orders.where(state: 'completed')
  end

  def record_update
    @order.arrive! if @order.completed?
    redirect_to record_orders_path, notice:'訂單送達，辛苦了'
  end

  private
  def order_params
    params.require(:order).permit(:username, :tel, :address, :state, :total_price, :responsibility)
  end

  def set_orders
    @orders = current_user.store_profile.orders.all
  end

  def find_order
    @order = Order.find_by(tel: params[:order][:tel])
  end
end