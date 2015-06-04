module CurrentUser
	def current_user
		# Use .first because array require not ActiveRecord Relation
		# user = User.where('authen = :authen',{authen: session[:authen]}).first
		# return user.role

		@_current_user ||= session[:authen] && User.find_by(authen: session[:authen])
	end

end