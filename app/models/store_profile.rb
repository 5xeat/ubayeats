class StoreProfile < ApplicationRecord
  belongs_to :user
  mount_uploader :store_id_Certificate, RegistrationUploader
  mount_uploader :store_id_list, RegistrationUploader
  validates :store_id_list, presence: true
end
