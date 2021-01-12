class Product < ApplicationRecord
  acts_as_paranoid
	belongs_to :store_profile
	validates :name, presence: true
	validates :price, presence: true
	include AASM

  # scope :available, -> { where('available = true') }

  aasm column: 'state', no_direct_assignment: true do
		state :unavailable, initial: true
		state :available

		event :publish do
			transitions from: :unavailable, to: :available
		end

		event :delist do
			transitions from: :available, to: :unavailable
		end
	end
end
