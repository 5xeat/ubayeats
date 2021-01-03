class ApplicationController < ActionController::Base
  include SessionsHelper
  include Pundit
  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from Pundit::NotAuthorizedError, with: :not_authorize

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

  def record_not_found
    render file: 'public/404.html', layout: false, status: 404
  end

  def not_authorize
    render file: 'public/422.html', layout: false, status: 422
  end
end
