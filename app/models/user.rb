class User < ApplicationRecord
  include AASM
  has_many :orders
  has_many :messages
  has_many :rooms, through: :messages
  has_one :driver_profile
  has_one :store_profile
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: [:google_oauth2]

  def display_name
    name.blank? ? email : name
  end

  def self.create_from_provider_data(provider_data)
    where(provider: provider_data.provider, uid: provider_data.uid).first_or_create do |user|
      user.email = provider_data.info.email
      user.password = Devise.friendly_token[0, 20]
    end
  end

  aasm(column: 'role', no_direct_assignment: false) do 
    state :user, initial: true
    state :driver, :store

    event :become_driver do
      transitions from: :user, to: :driver
    end

    event :become_store do
      transitions from: :user, to: :store
    end

    # event :store do
    #   transitions from: :driver, to: :store

   

  end
end
