class AddPictureToProduct < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :picture, :string
  end
end
