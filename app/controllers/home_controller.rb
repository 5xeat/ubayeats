class HomeController < ApplicationController
  def index
    @store_profiles = StoreProfile.all
  end
end
