class HomeController < ApplicationController
  def index
     
  end

  def distance_filter
    @user_lat = params[:latitude]
    @user_lng = params[:longitude]
    stores = StoreProfile.calc_distance(@user_lat, @user_lng)
    @stores = StoreProfile.where(id: stores)
    if params[:latitude]
      render json: @stores
    end
  end
end
