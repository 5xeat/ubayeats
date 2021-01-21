class StoreProfile < ApplicationRecord
  # association
  belongs_to :user
  has_many :orders
  has_many :products

  has_many :favoritestores
  has_many :favorite_users, through: :favoritestores, source: 'user'
  
  # upload
  mount_uploader :store_certificate, RegistrationUploader
  mount_uploader :store_photo, RegistrationUploader

  # validations
  validates :store_certificate, presence: true
  validates :store_photo, presence: true
  validates :store_name, presence: true
  validates :store_type, presence: true, inclusion: { in: %w(日式 韓式 速食 飲料 甜點 蔬食) }
  validates :store_address, presence: true
  validates :store_phone, presence: true
  validates :account, presence: true
  validates_length_of :description, :maximum => 50
  
  def self.calc_distance(user_lat, user_lng)
    lat = user_lat.to_f
    lng = user_lng.to_f
    StoreProfile.where.not(:latitude => nil).where.not(:latitude => nil).where("((latitude - #{lat})^2+(longitude - #{lng})^2)^0.5 < 0.03").limit(12).pluck(:id)
  end
end
