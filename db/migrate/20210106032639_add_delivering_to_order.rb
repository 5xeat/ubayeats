class AddDeliveringToOrder < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :delivering, :string, default: 'accepted'
  end
end
