class AddTotalPriceToOrders < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :total_price, :integer
  end
end
