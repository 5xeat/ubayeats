module ApplicationCable
  class Connection < ActionCable::Connection::Base
    # identified_by :current_user

    # def connect
    #   self.current_user = find_verified_user
    # end

    # # def connet_store
    # #   self.current_user= find_verified_store
    # # end

    # private
    #   def find_verified_user
    #     if verified_user = env['warden.user']
    #       verified_store = verified_user.orders.last.store_profile
    #       verified_store
    #     else
    #       reject_unauthorized_connection
    #     end
    #   end
    #   def find_verified_store
    #     if verified_store = User.find_by(id: cookies.encrypted[:user_id]).order
    #       verified_user
    #     else
    #       reject_unauthorized_connection
    #     end
    #   end
  end
end
