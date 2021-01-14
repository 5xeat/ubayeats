class StoreProfile < ApplicationRecord
  # association
  belongs_to :user
  has_many :orders
  has_many :products

  has_many :my_favorite, through: :favorite_products,source: 'products'
  #p1 = favorite_users
  # upload
  mount_uploader :store_certificate, RegistrationUploader
  mount_uploader :store_photo, RegistrationUploader

  # validations
  validates :store_certificate, presence: true
  validates :store_photo, presence: true
  validates :store_name, presence: true
  validates :store_type, presence: true
  validates :store_address, presence: true
  validates :store_phone, presence: true
  validates :account, presence: true
  

def favorite?(product)
  my_favorite.include?(product)
end

end
