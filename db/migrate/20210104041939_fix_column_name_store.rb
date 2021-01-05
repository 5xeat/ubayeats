class FixColumnNameStore < ActiveRecord::Migration[6.0]
  def change
    rename_column :store_profiles, :store_id_Certificate, :store_certificate
    rename_column :store_profiles, :store_id_list, :store_photo
  end
end
