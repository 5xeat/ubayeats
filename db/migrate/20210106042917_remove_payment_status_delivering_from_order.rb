class RemovePaymentStatusDeliveringFromOrder < ActiveRecord::Migration[6.0]
  def change
    remove_column :orders, :payment_status, :string
    remove_column :orders, :delivering, :string
  end
end
