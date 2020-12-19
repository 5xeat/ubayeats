class StoreProfile < ApplicationRecord
  belongs_to :user
  mount_uploader :store_id_Certificate, StoreIdCertificateUploader
  mount_uploader :store_id_list, StoreIdListUploader
  
end
