class AddNumToOrder < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :num, :string
  end
end
