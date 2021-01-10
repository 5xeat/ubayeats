class AddColumnDirverProfiles < ActiveRecord::Migration[6.0]
  def change
    add_column :driver_profiles, :online, :boolean, default: false
  end
end
