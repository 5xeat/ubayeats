class DriverProfile < ApplicationRecord
  belongs_to :user
  mount_uploader :taiwan_id_front, RegistrationUploader
  mount_uploader :taiwan_id_back, RegistrationUploader
  mount_uploader :license, RegistrationUploader
end
