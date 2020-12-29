module SessionsHelper
  def user_signed_in?
    if current_user
      return true
    else
      return false
    end
  end
end
