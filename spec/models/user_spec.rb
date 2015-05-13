require 'rails_helper'

RSpec.describe User, type: :model do
	# before(:each) do
	# 	@user = FactoryGirl.build(:user)
	# end
	let(:user) {FactoryGirl.build(:user)}
	it "can be instantiated" do
		user = User.new
		expect(user).to be_a User
	end
	it "has first name" do
		expect(user.firstname).to eq("Abe")
	end
	it "has last name" do
		expect(user.lastname).to eq("Ableson")
	end
	it "has authen" do
		expect(user.authen).to eq("pgmdmjm")
	end
	it "has facility" do
		expect(user.facility).to eq("0013")
	end
	it "has email" do
		expect(user.email).to eq("name@somewhere.com")
	end
	it "has firstinitial" do
		expect(user.firstinitial).to eq("A")
	end
	it "has middleinitial" do
		expect(user.middleinitial).to eq("B")
	end
	it "has updated_by" do
		expect(user.updated_by).to eq("James")
	end


end