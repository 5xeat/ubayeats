class ProductPolicy < ApplicationPolicy
  def publish?
    user
  end

  def delist?
    publish?
  end
  
  class Scope < Scope
    def resolve
      scope.all
    end
  end
end