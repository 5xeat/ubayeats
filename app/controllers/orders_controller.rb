class OrdersController < ApplicationController
  before_action :session_required
  before_action :set_orders, only: [:recieving, :preparing, :delivering, :record]
  before_action :find_order, only: [:recieving_update, :preparing_update, :delivering_update, :record_update, :driver_take_order]

  def index
    @orders = current_user.orders
  end

  def show
    @order = Order.find(params[:id])
    @room = @order.room
  end

  def recieving
    @recieving_orders = @orders.where(state: 'paid')
  end

  def recieving_update
    @order.confirm! if @order.paid?
      order_user = User.find(@order.user_id)
      ActionCable.server.broadcast("notifications", {
        receiver: order_user.id, notice: "店家已經接受您的訂單，正在準備中!" , order_state: "preparing"
      })
    redirect_to store_profiles_path, notice:'有新訂單已準備'
  end

  def preparing
    @recieving_orders = @orders.where(state: 'preparing')
  end

  def preparing_update
    @order.complete! if @order.preparing?
    order_user = User.find(@order.user_id)
    ActionCable.server.broadcast("notifications", {
      receiver: order_user.id, notice: "店家已完成您的餐點，正在等待外送員領取..." , order_state: "delivering"
    })
    redirect_to store_profiles_path, notice:'有訂單等待外送員取餐'
  end

  def delivering
    @recieving_orders = @orders.where(state: 'delivering')
  end

  def delivering_update
    if @order.delivering?
      @order.go!
      order_user = User.find(@order.user_id)
      ActionCable.server.broadcast("notifications", {
        receiver: order_user.id, notice: "外送員已領取餐點，正在前往您的位置..." , order_state: "completed"
      })
    else
      render json: {
        error: "店家尚未準備好餐點唷！",
        status: 404
      }, status: 404
    end
  end

  def record
    @recieving_orders = @orders.where(state: 'completed')
  end

  def record_update
    @order.arrive! if @order.completed?
    order_user = User.find(@order.user_id)
    ActionCable.server.broadcast("notifications", {
      receiver: order_user.id, notice: "外送員已抵達，請準備取餐!" ,order_state: "arrived"
    })
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
    @order = Order.find_by!(num: params[:num] || params[:order][:num])
  end
end