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
        # 回首頁
        redirect_to root_path, notice:'購物車清空'
    end

    
    # remove cart item
    def remove_item  
        filter_res = session[:cart1111]["items"].filter {|item| item["item_id"] != params[:id].to_i}
        session[:cart1111] = { 'items' => filter_res}
        redirect_to carts_path, notice: '已刪除商品'
    end

    def checkout
        @order = Order.new
    end

    def pay
        trade_no = "UB#{Time.zone.now.to_i}"
        body = {
            "amount": current_cart.total_price,
            "confirmUrl":"http://localhost:3000/stores/confirm",
            "productName":"Ubayeats",
            "orderId": trade_no,
            "currency": "TWD"
        }
        headers = {"X-LINE-ChannelId" => "1655372973",
                   "X-LINE-ChannelSecret" => "4b8fd784c0759f04f6cf730bf7d68dda",
                   "Content-Type" => "application/json; charest=UTF-8"}
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
    headers = {"X-LINE-ChannelId" => "1655372973",
               "X-LINE-ChannelSecret" => "4b8fd784c0759f04f6cf730bf7d68dda",
               "Content-Type" => "application/json; charest=UTF-8"}
    res = Net::HTTP.post(url, body.to_json, headers)
    p res.body
    render html: res.body.to_s
    end
end
