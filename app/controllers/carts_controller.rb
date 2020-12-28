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

end
