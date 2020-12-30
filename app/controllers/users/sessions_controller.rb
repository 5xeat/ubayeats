# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  def new
    super
  end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
    yield resource if block_given?
    respond_to do |format|
      if resource
        format.html { redirect_to root_path }
        format.json { render json: { status: 200, user: current_user, login: true } }
      else
        format.html { render action: 'new', notice:'error!' }
        format.json { render json: { status: 401, error: resources, login: true } }
      end
    end
    # respond_with resource, location: after_sign_in_path_for(resource)
    # render json: { status: 200, login: true, user: current_user }
  end

  # DELETE /resource/sign_out
  def destroy
    super
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  end
end
