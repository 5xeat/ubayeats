class AddDescriptionToStoreProfiles < ActiveRecord::Migration[6.0]
  def change
    add_column :store_profiles, :description, :string
  end
end
