class ProductsController < ApplicationController
  before_action :find_product, only: [:show, :edit, :destroy]

  def index
    @products = Product.order(id: :desc)
  end

  def show
    @user = @product.user
  end

  def new
    @product = Product.new
  end

  def create
    @product = current_user.products.new(params_product)
    
    if @product.save
      redirect_to productlist_stores_path, notice: "新增產品成功"
    else
      render :new
    end
  end

  def edit
  end

  def update
    @product = current_user.products.find_by(id: params[:id])
    if @product.update(params_product)
      redirect_to product_path(@product), notice: '編輯商品成功'
    else
      render :edit
    end
  end

  def destroy
    @user = @product.user
    @product.destroy if @product
    redirect_to productlist_stores_path, notice: '刪除商品成功'
  end

  def publish
    @product = current_user.products.find_by(id: params[:id])
    authorize @product, :publish?
    @product.publish! if @product.may_publish?
    redirect_to product_path(@product)
  end

  def delist
    @product = current_user.products.find_by(id: params[:id])
    authorize @product, :delist?
    @product.delist! if @product.may_delist?
    redirect_to product_path(@product)
  end
  

  private
  def params_product
      params.require(:product).permit(:name, :price, :description)
  end

  def find_product
    @product = Product.find_by(id: params[:id])
  end

  def find_user_id
    @user = User.find_by(id: params[:user_id])
  end
end
