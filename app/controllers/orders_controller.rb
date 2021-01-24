class OrdersController < ApplicationController
  before_action :session_required
  before_action :set_orders, only: [:recieving, :preparing, :delivering, :record]
  before_action :find_order, only: [:receiving_update, :preparing_update, :delivering_update, :record_update, :driver_take_order, :update_driver_position, :display_driver_position]


  def index
    @orders = current_user.orders.order(id: :desc)
  end

  def show
    @order = Order.find(params[:id])
    @store = StoreProfile.find(@order.store_profile_id)
    @room = @order.room
    if driver_profile = DriverProfile.find_by(id: @order.driver_id)
      @driver = driver_profile.user
    end
  end

  def receiving
    @receiving_orders = @orders.where(state: 'paid').order(id: :desc)
  end

  def receiving_update
    @order.confirm! if @order.paid?
      order_user = User.find(@order.user_id)
      ActionCable.server.broadcast("notifications", {
        receiver: order_user.id, notice: "店家已經接受您的訂單，正在準備中!" , order_state: "preparing"
      })
    redirect_to store_profiles_path, notice:'有新訂單已準備'
  end

  def preparing
    @receiving_orders = @orders.where(state: 'preparing').order(id: :desc)
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
    @receiving_orders = @orders.where(state: 'delivering').order(id: :desc)
  end

  def delivering_update
    if @order.delivering?
      @order.go!
      order_user = User.find(@order.user_id)
      latitude = JSON.parse(params.keys.filter{|i| i[/.latitude/]}.first)["latitude"]
      longitude = JSON.parse(params.keys.filter{|i| i[/.longitude/]}.first)["longitude"]
      ActionCable.server.broadcast("notifications", {
        receiver: order_user.id, notice: "外送員已領取餐點，正在前往您的位置..." , order_state: "completed", latitude: latitude, longitude: longitude
      })
    else
      render json: {
        error: "店家尚未準備好餐點唷！",
        status: 404
      }, status: 404
    end
  end

  def record
    @receiving_orders = @orders.where(state: ['completed', 'arrived']).order(id: :desc)
  end

  def record_update
    @order.arrive! if @order.completed?
    order_user = User.find(@order.user_id)
    ActionCable.server.broadcast("notifications", {
      receiver: order_user.id, notice: "外送員已抵達，請準備取餐!", order_state: "arrived"
    })
  end

  def driver_take_order
    driver = current_user.driver_profile
    order_user = User.find(@order.user_id)
    if (Order.where(driver_id: driver.id, state: ['preparing', 'delivering']).length) == 0
      @order.update(driver_id: driver.id)
      ActionCable.server.broadcast("notifications", {
        receiver: order_user.id, notice: "外送員已接單！", driver: current_user.name
      })
    else
      redirect_to driver_profiles_path, notice: '不要太貪心唷！請先把訂單送達'
    end
  end

  def update_driver_position
    latitude = JSON.parse(params.keys.filter{|i| i[/.latitude/]}.first)["latitude"]
    longitude = JSON.parse(params.keys.filter{|i| i[/.longitude/]}.first)["longitude"]
    @order.update(driver_latitude: latitude, driver_longitude: longitude)
    order_user = User.find(@order.user_id)
    ActionCable.server.broadcast("notifications", {
      receiver: order_user.id, notice: "外送員位置更新", latitude: latitude, longitude: longitude, order_state: "completed"
    })
  end

  def display_driver_position
    render json: { driver_latitude: @order.driver_latitude,
                   driver_longitude: @order.driver_longitude }
  end

  private
  def order_params
    params.require(:order).permit(:username, :tel, :address, :state, :total_price, :responsibility)
  end

  def set_orders
    @orders = current_user.store_profile.orders.all
  end

  def find_order
    if params[:order]
      num = params[:order][:num]
    else
      num = JSON.parse(params.keys.filter{|i| i[/.num/]}.first)["num"]
    end
    @order = Order.find_by!(num: num)
  end
end