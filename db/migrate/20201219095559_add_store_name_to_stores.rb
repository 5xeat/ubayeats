class AddStoreNameToStores < ActiveRecord::Migration[6.0]
  def change
    add_column :store_profiles, :store_name, :string
    add_column :store_profiles, :store_type, :string
    
  end
end
