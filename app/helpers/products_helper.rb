module ProductsHelper

  def check_product_state?(product)
    product.may_publish?
  end


end
