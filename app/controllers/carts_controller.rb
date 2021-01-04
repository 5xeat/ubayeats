class CartsController < ApplicationController

    def carts
        product = Product.find(params[:id])
        cart = Cart.new
        cart.add_item(product.id)
        redirect_to root_path, notice: '已加入購物車'
    end 

    def show
    end

    def destroy
        session[:cart1111] = nil
        # 回首頁
        redirect_to root_path, notice:'購物車清空'
    end

    def checkout
        @order = Order.new
    end


# 金流    
    def pay
        trade_no = "UB#{Time.zone.now.to_i}"
        # product_names = current_cart.product_names
        
        body = {
            "amount":  "100",
            "confirmUrl":"http://localhost:3000/carts/confirm",
            "productName": "ubayeats",
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
    "amount": "100",

    # current_cart.total_price
    "currency": "TWD"
    }
    headers = {"X-LINE-ChannelId" => "1655372973",
        "X-LINE-ChannelSecret" => "4b8fd784c0759f04f6cf730bf7d68dda",
        "Content-Type" => "application/json; charest=UTF-8"}
    res = Net::HTTP.post(url, body.to_json, headers)
    p res.body
    # render html: res.body.to_s
     redirect_to orderfinish_carts_path '交易完成'
    end

    def orderfinish
    end
end
