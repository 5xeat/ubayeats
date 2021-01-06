class AddStoreprofilesRefToOrders < ActiveRecord::Migration[6.0]
  def change
    add_reference :orders, :store_profile, null: false, foreign_key: true
  end
end
