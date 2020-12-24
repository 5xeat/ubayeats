class AddAvailableToProduct < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :available, :boolean, default: false
  end
end
