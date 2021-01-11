class HomeController < ApplicationController
  def index
     
  end

  def distance_filter
    @user_lat = params[:latitude]
    @user_lng = params[:longitude]
    p params[:latitude]
    p params[:longitude]
    # lat1 = 25.042493505554233
    # lng1 = 121.51374312619893
    # lat = params[:latitude]
    # lng = params[:longitude]
    stores = StoreProfile.calc_distance(@user_lat, @user_lng)
    @stores = StoreProfile.where(id: stores)
    if params[:latitude]
      p "suc"
      render json: @stores
    end
  end
end
