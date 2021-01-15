json.set! :order do
  json.extract! @order, :username, :tel, :address, :num
  json.extract! @store, :store_name, :store_address, :store_phone
end