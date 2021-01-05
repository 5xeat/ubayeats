class DriverProfilesController < ApplicationController
  before_action :session_required
  before_action :driver_pundit, except: [:new, :create]
  before_action :set_driver, only: [:edit, :update]

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

  def edit
  end

  def update
    if @driver_profile.update(params_driver)
      redirect_to root_path, notice: '成功編輯資料'
    else
      render :edit
    end
  end



  private
  def params_driver
    params.require(:driver_profile).permit(:taiwan_id_front, :taiwan_id_back, :license, :car_number, :account)
  end

  def driver_pundit
    authorize current_user, :delivery
  end

  def set_driver
    @driver_profile = current_user.driver_profile
  end
end