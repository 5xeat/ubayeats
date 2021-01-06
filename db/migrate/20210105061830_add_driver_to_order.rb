class AddDriverToOrder < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :driver, :string
  end
end
