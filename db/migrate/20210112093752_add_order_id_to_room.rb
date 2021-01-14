class AddOrderIdToRoom < ActiveRecord::Migration[6.0]
  def change
    add_reference :rooms, :order, null: false, foreign_key: true
  end
end
