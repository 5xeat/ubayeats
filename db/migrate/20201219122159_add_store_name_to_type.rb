class AddStoreNameToType < ActiveRecord::Migration[6.0]
  def change
    add_column :store_profiles, :store_type, :string
    remove_column :store_profiles, :store_sype, :string
  end
end
