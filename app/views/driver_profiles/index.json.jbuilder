json.array!(@orders) do |order|
  json.username order.username
  json.tel order.tel
  json.address order.address
  json.total_price order.total_price
  json.num order.num
  json.user User.find(order.user_id)
  json.store StoreProfile.find(order.store_profile_id)
end