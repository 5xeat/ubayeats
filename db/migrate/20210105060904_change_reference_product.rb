class ChangeReferenceProduct < ActiveRecord::Migration[6.0]
  def change
    change_table :products do |t|
      t.remove_references :user
      t.belongs_to :store_profile
    end
  end
end
