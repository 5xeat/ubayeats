class AddPaymentstatusToOrder < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :payment_status, :string, default: 'unpaid'
    remove_column :orders, :responsibility, :string
  end
end
