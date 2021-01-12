class RenameColumnOrder < ActiveRecord::Migration[6.0]
  def change
    rename_column :orders, :driver, :driver_id
  end
end
