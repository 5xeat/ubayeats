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
    redirect_to store_profiles_path, notice:'有新訂單已準備'
  end

  def preparing
    @recieving_orders = @orders.where(state: 'preparing')
  end

  def preparing_update
    @order.complete! if @order.preparing?
    redirect_to store_profiles_path, notice:'有訂單等待外送員取餐'
  end

  def delivering
    @recieving_orders = @orders.where(state: 'delivering')
  end

  def delivering_update
    @order.go! if @order.delivering?
    redirect_to store_profiles_path, notice:'有訂單外送中'
  end

  def record
    @recieving_orders = @orders.where(state: 'completed')
  end

  def record_update
    @order.arrive! if @order.completed?
    redirect_to record_orders_path, notice:'訂單送達，辛苦了'
  end

  def driver_take_order
    order = Order.find_by!(num: params[:order])
    driver = current_user.driver_profile
    if (Order.where(driver_id: driver.id, state: 'preparing').length) == 0
      order.update(driver_id: driver.id)
    else
      redirect_to driver_profiles_path, notice: '不要太貪心唷！請先把訂單送達'
    end
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