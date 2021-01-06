class ApplicationController < ActionController::Base
  include SessionsHelper
  include Pundit
  before_action :configure_permitted_parameters, if: :devise_controller?

  def session_required
    redirect_to sign_in_users_path, notice: '請先登入會員' if not user_signed_in?
  end

  private
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:phone])
    devise_parameter_sanitizer.permit(:account_update, keys: [:address])
  end
end
