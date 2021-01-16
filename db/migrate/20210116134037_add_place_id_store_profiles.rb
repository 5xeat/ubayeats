class AddPlaceIdStoreProfiles < ActiveRecord::Migration[6.0]
  def change
    add_column :store_profiles, :place_id, :string
  end
end
