json.set! :order do
  json.extract! @new_order, :username, :tel, :address, :num
  json.set! :store, StoreProfile.find(@new_order.store_profile_id)
end