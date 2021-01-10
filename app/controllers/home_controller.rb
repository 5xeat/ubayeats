class HomeController < ApplicationController
  def index
     
  end

  def distance_filter
    lat = params[:latitude]
    lng = params[:longitude]
    lat1 = 25.042493505554233
    lng1 = 121.51374312619893
    p '==============================='
    p params[:latitude], params[:longitude]
    # p lat
    p '==============================='
    lat = params[:latitude]
    lng = params[:longitude]
    if params[:latitude]
      stores = StoreProfile.calc_distance(lat1, lng1)
      StoreProfile.where(id: stores)
      p '==============================='
      p StoreProfile.where(id: stores)
      p '==============================='
    end
  end
end
