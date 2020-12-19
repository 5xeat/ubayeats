class CreateDriverProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :driver_profiles do |t|
      t.string :taiwan_id_front
      t.string :taiwan_id_back
      t.string :license
      t.string :car_number
      t.string :account
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
