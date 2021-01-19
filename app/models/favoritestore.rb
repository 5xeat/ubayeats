class Favoritestore < ApplicationRecord
  belongs_to :user
  belongs_to :store_profile
end
