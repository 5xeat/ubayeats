class DriversController < ApplicationController
  def index
  end
  
  def new
    @driver_profile = DriverProfile.new
  end

  def create
    @driver_profile = current_user.create_driver_profile(params_driver)
    if @driver_profile.save
      current_user.become_driver!
      redirect_to root_path, notice: '恭喜成為外送員'
    else
      render :new
    end
  end



  private
  def params_driver
    params.require(:driver_profile).permit(:taiwan_id_front, :taiwan_id_back, :license, :car_number, :account)
  end
end