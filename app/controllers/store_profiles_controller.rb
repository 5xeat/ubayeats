class StoreProfilesController < ApplicationController
  before_action :session_required, only: [:new, :create]
  before_action :set_store, only: [:show, :edit, :update]
  before_action :store_pundit, only: [:show, :edit, :update]
  before_action :user_pundit, only: [:new, :create]

  def show
    @orders = current_user.store_profile.orders.all
    @recieving_orders = @orders.where(state: 'paid')
  end

  def delicacy
    @store_profile = StoreProfile.find_by!(id: params[:id])
    @products = @store_profile.products.available
  end
  
  def new
    @store_profile = StoreProfile.new
  end

  def create
     @store_profile = current_user.build_store_profile(params_store)
    if @store_profile.save
      current_user.become_store!
      redirect_to root_path, notice: '成為合作店家'
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @store_profile.update(params_store)
      redirect_to root_path, notice: '編輯成功'
    else
      render :edit
    end
  end

  def search
    user_lat = params[:latitude]
    user_lng = params[:longitude]
    @keyword = params[:keyword]
    if params[:latitude]
      near_stores = StoreProfile.calc_distance(user_lat, user_lng)
      @stores = StoreProfile.where(id: near_stores).where("lower(store_name) || store_type LIKE ?", "%#{@keyword.downcase}%")
    else
      @stores = StoreProfile.where("lower(store_name) || store_type LIKE ?", "%#{@keyword.downcase}%")
    end
  end

  def recommand
    @store_profiles = StoreProfile.all
    render json: @store_profiles
  end

  private
  def params_store
    params.require(:store_profile).permit(:store_certificate, :store_photo, :store_name, :store_type, :store_mail, :store_address, :store_phone, :account, :latitude, :longitude, :place_id)

  end

  def store_pundit
    authorize current_user, :start_business
  end

  def set_store
    @store_profile = current_user.store_profile
  end

  def user_pundit
    authorize current_user, :user_only
  end
end