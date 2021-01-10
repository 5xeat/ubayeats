class AddPaidAtToOrder < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :paid_at, :datetime
  end
end
