class AddLatLngToStoreProfiles < ActiveRecord::Migration[6.0]
  def change
    add_column :store_profiles, :latitude, :decimal
    add_column :store_profiles, :longitude, :decimal
  end
end
