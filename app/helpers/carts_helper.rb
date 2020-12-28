module CartsHelper
    def current_cart
        @__cart1111 ||= Cart.from_hash(session[:cart1111])
      end
end
