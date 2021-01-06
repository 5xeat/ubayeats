class AddResponsibilityToOrder < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :responsibility, :string
  end
end
