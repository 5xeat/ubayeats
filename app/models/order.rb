class Order < ApplicationRecord
  belongs_to :user
  belongs_to :store_profiles
  has_many :order_items
end