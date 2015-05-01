json.array!(@users) do |user|
  json.extract! user, :id, :firstname, :lastname, :authen, :facility, :role, :email, :firstinitial, :middleinitial, :updated_by, :facility
  json.url user_url(user, format: :json)
end
