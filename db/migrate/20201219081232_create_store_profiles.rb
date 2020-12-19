class CreateStoreProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :store_profiles do |t|
      t.string :store_id_Certificate
      t.string :store_id_list
      t.string :store_name
      t.string :store_type
      t.string :store_mail
      t.string :store_address
      t.string :store_phone
        
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
