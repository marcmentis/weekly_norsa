class ApplicationController < ActionController::Base
# Expose methods in these modules to all applicatins/views
	# I.E. DON"T have to have 'include SessionValues' in each controller
  include SessionValues
  include CurrentUser
  include Pundit

  before_action :test_before_action



  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private
  	def rfc_authorized?
  		if request.headers["HTTP_REMOTE_USER"].blank?
  			return false
  		else
  			return true
  		end
  	end
  	def current_user
		# Use .first because array require not ActiveRecord Relation
		# user = User.where('authen = :authen',{authen: session[:authen]}).first
		# return user.role

		# If session[:authen] = nil then 
			# Expression returns nil and @_corrent_user = nil
			# Regardless if User.find_by(authen: session) !=nil
		# If session[:authen] != nil and User.find_by(authen: session) = nil
			# Expression returns nil
			# @_current_user = session[:authen]
		# If session[:authen] != nil and User.find_by(authen: session) != nill
			# Expression returns User.find_by(authen: session)
			# @_current_user = User.find_by(authen: session)
		@_current_user ||= session[:authen] && User.find_by(authen: session[:authen])
	end
  
end
