class StoresController < ApplicationController
        def new
          @store_profile = StoreProfile.new
        end
      
        def create
          @store_profile = current_user.create_store_profile(params_store)
          if @store_profile.save
            current_user.become_store!
            redirect_to root_path, notice: '成為合作店家'
          else
            render :new
          end
        end
      
      
        private
        def params_store
          params.require(:store_profile).permit(:store_id_Certificate, :store_id_list, :store_name, :store_type, :store_mail, :store_address, :store_phone )
        end
         
end
