class DriverProfile < ApplicationRecord
  # association
  belongs_to :user

  # upload
  mount_uploader :taiwan_id_front, RegistrationUploader
  mount_uploader :taiwan_id_back, RegistrationUploader
  mount_uploader :license, RegistrationUploader

  # validations
  validates :taiwan_id_front, presence: true
  validates :taiwan_id_back, presence: true
  validates :license, presence: true
  validates :car_number, presence: true
  validates :account, presence: true
end
