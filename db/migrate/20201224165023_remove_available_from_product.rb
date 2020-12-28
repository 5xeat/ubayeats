class RemoveAvailableFromProduct < ActiveRecord::Migration[6.0]
  def change
    remove_column :products, :available
  end
end
