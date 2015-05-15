class Patient < ActiveRecord::Base
	validates :firstname, presence: true
	validates :lastname, presence: true
	validates :number, 
		uniqueness: true,
		presence: true
end
