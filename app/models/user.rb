class User < ApplicationRecord
  include AASM
  has_many :orders
  has_many :messages
  has_many :rooms, through: :messages
  has_one :driver_profile
  has_one :store_profile

  has_many :favoritestores
  has_many :my_favorites, through: :favoritestores,source: 'store_profile'
 
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: [:google_oauth2]

  def favorite?(store)
    my_favorites.include?(store)
  end

  def display_name
    name.blank? ? email : name
  end

  def self.create_from_provider_data(provider_data)
    where(email: provider_data.info.email).first_or_create do |user|
      user.password = Devise.friendly_token[0, 20]
      user.name = provider_data.info.last_name
      user.provider = provider_data.provider
      user.uid = provider_data.uid
    end
  end

  aasm(column: 'role', no_direct_assignment: true) do 
    state :user, initial: true
    state :driver, :store

    event :become_driver do
      transitions from: :user, to: :driver
    end

    event :become_store do
      transitions from: :user, to: :store
    end
  end
end
