class Order < ApplicationRecord
  belongs_to :user
  belongs_to :store_profile
  has_many :order_items

  include AASM
  aasm column: :payment_status, no_direct_assignment: true do
    state :unpaid, initial: true
    state :paid, :canceled
    
    event :pay do
      transitions from: :unpaid, to: :paid
    end

    event :close do
      transitions from: :unpaid, to: :canceled
    end
  end

  aasm column: :state, no_direct_assignment: true do
    state :accepted, initial: true
    state :preparing, :completed
    
    event :confirm do
      transitions from: :accepted, to: :preparing
    end

    event :conplete do
      transitions from: :preparing, to: :completed
    end
  end

  aasm column: :delivering, no_direct_assignment: true do
    state :accepted, initial: true
    state :delivering, :arrived
    
    event :go do
      transitions from: :accepted, to: :delivering
    end

    event :arrive do
      transitions from: :delivering, to: :arrived
    end
  end
end