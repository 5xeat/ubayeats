# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]
  before_action :session_required, only: [:info]

  def update_resource(resource, params)
    resource.update_without_password(params)
  end

  # DELETE /resource
  def destroy
    super
  end

  def unique_email?
    input = params[:email]
    if User.find_by(email: input) == nil
      render plain: "OK"
    else
      render plain: "repeat"
    end
  end

  def info
    @orders = current_user.orders
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  end

  # The path used after sign up.
  def after_sign_up_path_for(resource)
    super(resource)
  end

  # The path used after sign up for inactive accounts.
  def after_inactive_sign_up_path_for(resource)
    super(resource)
  end
end
