class AddColumnStoreProfiles < ActiveRecord::Migration[6.0]
  def change
    add_column :store_profiles, :account, :string
  end
end
