class Order < ApplicationRecord
  belongs_to :user
  belongs_to :store_profile
  has_many :order_items
  # 結帳 validations
  validates :username, presence: true
  validates :tel, presence: true
  validates :address, presence: true

  before_create :generate_order_num

  include AASM

  aasm column: :state, no_direct_assignment: true do
    state :unpaid, initial: true
    state :canceled, :paid, :preparing, :delivering, :completed, :arrived
    
    event :pay do
      transitions from: :unpaid, to: :paid
      # after_transaction :pay_after
      before do |args|
        self.transaction_id = args[:transaction_id]
        self.paid_at = Time.now
      end
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

  def generate_order_num
    self.num = SecureRandom.hex(5) unless num
  end
end