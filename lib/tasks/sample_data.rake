# Create data for patients
namespace :db do
	desc "Fill database with sample data "
	task populate: :environment do
		250.times do |n|
			firstname = Faker::Name.first_name
			lastname = Faker::Name.last_name
			number = Faker::Number.number(7)


			Patient.create!(firstname: firstname,
						lastname: lastname,
						number: number,
						facility: 0013,
						ward: '81/101')
		end
	end
end