# frozen_string_literal: true

# defines user with devise
class Users::RegistrationsController < Devise::RegistrationsController
  # POST /resource
  def create
    params[:user][:first_name].capitalize!
    params[:user][:last_name].capitalize!
    url_set
    super do |resource|
    end
  end

  def one_user
    user ||= (User.find_by(unique_url: params[:params]) || User.find(params[:params]))
    render json: user
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  end

  private

  # Create logic for unique url
  def url_set
    @randomstring = SecureRandom.hex(5)
    if User.where('unique_url = ?', @randomstring).blank?
      params[:user][:unique_url] = @randomstring
    else
      url_set
    end
  end
end
