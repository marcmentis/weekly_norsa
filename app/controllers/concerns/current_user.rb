module CurrentUser
	def current_user
		# Use .first because array require not ActiveRecord Relation
		user = User.where('authen = :authen',{authen: session[:authen]}).first
	end
end