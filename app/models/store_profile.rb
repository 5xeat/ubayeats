class StoreProfile < ApplicationRecord
  belongs_to :user
  mount_uploader :store_certificate, RegistrationUploader
  mount_uploader :store_photo, RegistrationUploader
  
end
