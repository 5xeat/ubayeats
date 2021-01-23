class AddLatLngToOrder < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :latitude, :decimal
    add_column :orders, :longitude, :decimal
  end
end
