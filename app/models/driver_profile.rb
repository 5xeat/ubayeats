class DriverProfile < ApplicationRecord
  belongs_to :user
  mount_uploader :taiwan_id_front, TaiwanIdFrontUploader
  mount_uploader :taiwan_id_back, TaiwanIdBackUploader
  mount_uploader :license, LicenseUploader
end
