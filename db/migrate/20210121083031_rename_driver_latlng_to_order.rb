class RenameDriverLatlngToOrder < ActiveRecord::Migration[6.0]
  def change
    rename_column :orders, :latitude, :driver_latitude
    rename_column :orders, :longitude, :driver_longitude
  end
end
