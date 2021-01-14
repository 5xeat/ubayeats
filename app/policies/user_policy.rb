class UserPolicy < ApplicationPolicy
  def delivery
    user && user.role == 'driver'
  end

  def start_business
    user && user.role == 'store'
  end

  def user_only
    user && user.role == 'user'
  end
  
  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
