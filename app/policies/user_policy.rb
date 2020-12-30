class UserPolicy < ApplicationPolicy
  def delivery
    user && user.role == 'driver'
  end

  def start_business
    user && user.role == 'store'
  end
  
  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
