class OrdersController < ApplicationController
  before_action :session_required
  before_action :set_orders, only: [:receiving, :preparing, :delivering, :record]
  before_action :find_order, only: [:receiving_update, :preparing_update, :delivering_update, :record_update, :driver_take_order]

  def index
    @orders = current_user.orders.order(id: :desc)
  end

  def show
    @order = Order.find(params[:id])
    @room = @order.room
  end

  def receiving
    @receiving_orders = @orders.where(state: 'paid').order(id: :desc)
  end

  def receiving_update
    @order.confirm! if @order.paid?
    redirect_to store_profiles_path, notice:'有新訂單已準備'
  end

  def preparing
    @receiving_orders = @orders.where(state: 'preparing').order(id: :desc)
  end

  def preparing_update
    @order.complete! if @order.preparing?
    redirect_to store_profiles_path, notice:'有訂單等待外送員取餐'
  end

  def delivering
    @receiving_orders = @orders.where(state: 'delivering').order(id: :desc)
  end

  def delivering_update
    if @order.delivering?
      @order.go!
    else
      render json: {
        error: "店家尚未準備好餐點唷！",
        status: 404
      }, status: 404
    end
  end

  def record
    @receiving_orders = @orders.where(state: 'completed').order(id: :desc)
  end

  def record_update
    @order.arrive! if @order.completed?
  end

  def driver_take_order
    driver = current_user.driver_profile
    if (Order.where(driver_id: driver.id, state: ['preparing', 'delivering']).length) == 0
      @order.update(driver_id: driver.id)
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
    if params.keys.filter{|i| i[/.num/]}
      num = JSON.parse(params.keys.filter{|i| i[/.num/]}.first)["num"]
    end
    @order = Order.find_by!(num: num || params[:order][:num])
  end
end