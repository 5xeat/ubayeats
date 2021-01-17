# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_16_134037) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "driver_profiles", force: :cascade do |t|
    t.string "taiwan_id_front"
    t.string "taiwan_id_back"
    t.string "license"
    t.string "car_number"
    t.string "account"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "online", default: false
    t.index ["user_id"], name: "index_driver_profiles_on_user_id"
  end

  create_table "favoritestore_profiles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "store_profile_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["store_profile_id"], name: "index_favoritestore_profiles_on_store_profile_id"
    t.index ["user_id"], name: "index_favoritestore_profiles_on_user_id"
  end

  create_table "favoritestores", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "store_profile_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["store_profile_id"], name: "index_favoritestores_on_store_profile_id"
    t.index ["user_id"], name: "index_favoritestores_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.text "content"
    t.bigint "user_id", null: false
    t.bigint "room_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["room_id"], name: "index_messages_on_room_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "order_items", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.integer "quantity"
    t.bigint "order_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "price"
    t.integer "total_price"
    t.index ["order_id"], name: "index_order_items_on_order_id"
    t.index ["product_id"], name: "index_order_items_on_product_id"
  end

  create_table "orders", force: :cascade do |t|
    t.string "username"
    t.string "tel"
    t.string "address"
    t.string "state"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "total_price"
    t.bigint "store_profile_id", null: false
    t.string "driver_id"
    t.string "num"
    t.string "transaction_id"
    t.datetime "paid_at"
    t.index ["store_profile_id"], name: "index_orders_on_store_profile_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.integer "price"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "deleted_at"
    t.string "state", default: "unavailable"
    t.string "picture"
    t.bigint "store_profile_id"
    t.index ["deleted_at"], name: "index_products_on_deleted_at"
    t.index ["store_profile_id"], name: "index_products_on_store_profile_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "order_id", null: false
    t.index ["order_id"], name: "index_rooms_on_order_id"
  end

  create_table "store_profiles", force: :cascade do |t|
    t.string "store_certificate"
    t.string "store_photo"
    t.string "store_name"
    t.string "store_type"
    t.string "store_mail"
    t.string "store_address"
    t.string "store_phone"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "account"
    t.decimal "latitude"
    t.decimal "longitude"
<<<<<<< HEAD
=======
    t.string "account"
    t.string "place_id"
>>>>>>> develop
    t.index ["user_id"], name: "index_store_profiles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.string "role", default: "user"
    t.string "provider"
    t.string "uid"
    t.string "phone"
    t.string "address"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "driver_profiles", "users"
  add_foreign_key "favoritestore_profiles", "store_profiles"
  add_foreign_key "favoritestore_profiles", "users"
  add_foreign_key "favoritestores", "store_profiles"
  add_foreign_key "favoritestores", "users"
  add_foreign_key "messages", "rooms"
  add_foreign_key "messages", "users"
  add_foreign_key "order_items", "orders"
  add_foreign_key "order_items", "products"
  add_foreign_key "orders", "store_profiles"
  add_foreign_key "orders", "users"
  add_foreign_key "rooms", "orders"
  add_foreign_key "store_profiles", "users"
end
