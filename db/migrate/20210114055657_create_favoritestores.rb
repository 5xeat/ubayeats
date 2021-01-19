class CreateFavoritestores < ActiveRecord::Migration[6.0]
  def change
    create_table :favoritestores do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :store_profile, null: false, foreign_key: true

      t.timestamps
    end
  end
end
