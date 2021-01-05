class Order < ApplicationRecord
  belongs_to :user
  belongs_to :store_profile
  has_many :order_items

  include AASM
  aasm column: :state, no_direct_assignment: true do
    state :unpaid, initial: true
    state :paid, :canceled, :preparing, :delivering, :completed
    
    event :close do
      transitions from: :unpaid, to: :canceled
    end

    event :pay do
      transitions from: :unpaid, to: :paid
    end

    event :confirm do
      transitions from: :paid, to: :preparing
    end

    event :prepared do
      transitions form: :preparing, to: :delivering
    end

    event :delivered do
      transitions from: :delivering, to: :completed
    end
  end
end