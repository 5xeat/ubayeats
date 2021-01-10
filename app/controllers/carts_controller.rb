class CartsController < ApplicationController

  def add_item
    product = Product.find(params[:id])
    # 加車
    current_cart.add_item(product[:id])
    session[:cart1111] = current_cart.serialize
    render json: {
      count: current_cart.items.count,
      total_price: current_cart.total_price
    }
  end

  def minus_item
    product = Product.find(params[:id])
    # 加車
    current_cart.add_item(product[:id],quantity= -1)
    session[:cart1111] = current_cart.serialize
    render json: {
      count: current_cart.items.count,
      total_price: current_cart.total_price
    }
  end

  def index
  end

  def show
  end

  def destroy
    session[:cart1111] = nil
    redirect_to root_path, notice:'購物車清空'
  end

  def checkout
    @order = Order.new
  end
    
  def remove_item  
    filter_res = session[:cart1111]["items"].filter {|item| item["item_id"] != params[:id].to_i}
    session[:cart1111] = { 'items' => filter_res}
    redirect_to carts_path, notice: '已刪除商品'
  end

  def checkout
    @order = Order.new
  end

  def pay
    @order = current_user.orders.new(order_params)
    current_cart.items.each do |item|
    @order.order_items << OrderItem.new(product: item.product, quantity: item.quantity)
    end
    @order.store_profile_id = @order.order_items.first.product.store_profile_id
    @order.save
        
    trade_no = "UB#{Time.zone.now.to_i}"
    body = {
            "amount": current_cart.total_price,
            "confirmUrl":"http://localhost:5000/carts/confirm",
            "productName":"Ubayeats",
            "orderId": @order.num,
            "currency": "TWD"
           }
    headers = {
			        "X-LINE-ChannelId" => "1655372973",
              "X-LINE-ChannelSecret" => "4b8fd784c0759f04f6cf730bf7d68dda",
							"Content-Type" => "application/json; charest=UTF-8"
						  }
    res = Net::HTTP.post(URI('https://sandbox-api-pay.line.me/v2/payments/request'), body.to_json, headers)
    get_url = JSON.parse(res.body)
    redirect_to get_url['info']['paymentUrl']['web']
  end

  def confirm
    url = URI("http://sandbox-api-pay.line.me/v2/payments/#{params[:transactionId]}/confirm")
    body = {
    "amount": current_cart.total_price,
    "currency": "TWD"
    }
    headers = {
							"X-LINE-ChannelId" => "1655372973",
               "X-LINE-ChannelSecret" => "4b8fd784c0759f04f6cf730bf7d68dda",
							 "Content-Type" => "application/json; charest=UTF-8"
							}
    res = Net::HTTP.post(url, body.to_json, headers)
    p res.body
    result = JSON.parse(res.body)
    if result["returnCode"] == "0000"
      order_id = result["info"]["orderId"]
      transaction_id = result["info"]["transactionId"]
  
      # 1. 變更 order 狀態
      order = current_user.orders.find_by(num: order_id)
      order.pay!(transaction_id: transaction_id)
  
      # 2. 清空購物車
      session[:cart1111] = nil
  
      redirect_to root_path, notice: '付款已完成'
      p '付款已完成'
		else
			order = current_user.orders.find_by(num: order_id)
      order.close!(transaction_id: transaction_id)
      redirect_to root_path, notice: '付款發生錯誤'
      p '付款發生錯誤'
    end
  end
    
  private
  def order_params
    params.require(:order).permit(:username, :tel, :address, :state, :total_price, :responsibility)
  end
end
