class Order < ApplicationRecord
  belongs_to :user
  belongs_to :store_profile
  has_many :order_items

  include AASM

  aasm column: :state, no_direct_assignment: true do
    state :unpaid, initial: true
    state :canceled, :paid, :preparing, :delivering, :completed, :arrived
    
    event :pay do
      transitions from: :unpaid, to: :paid
      # after_transaction :pay_after
    end

    event :close do
      transitions from: :unpaid, to: :canceled
    end

    event :confirm do
      transitions from: :paid, to: :preparing
    end

    event :conplete do
      transitions from: :preparing, to: :delivering
    end

    event :go do
      transitions from: :delivering, to: :completed
    end

    event :arrive do
      transitions from: :completed, to: :arrived
    end
  end

  private
  def pay_after
    redirect_to root_path
  end
end