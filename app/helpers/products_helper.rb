module ProductsHelper
  def check_publish?(product)
    policy(product).publish?
  end

  def check_delist?(product)
    policy(product).delist?
  end
end
