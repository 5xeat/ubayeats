class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.string :username
      t.string :tel
      t.string :address
      t.string :state
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
