module ProductsHelper
  def check_publish?(product)
    product.may_publish? && policy(product).publish?
  end

  def check_delist?(product)
    product.may_delist? && policy(product).delist?
  end
end
