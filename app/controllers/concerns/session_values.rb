module SessionValues

	def check_rsa_authorization
		if rfc_authorized? 				
			this_user = current_user
			if this_user.blank?
				@error = 'User has no privileges in this application'
				render file: "#{Rails.root}/public/user_error", layout: false		
			else
				session[:authen] = request.headers["HTTP_REMOTE_USER"]
				session[:confirmed] = 'authen_and_in_db'
			end
		else
			@error = 'User has not passed RSA authentication'
			render file: "#{Rails.root}/public/user_error", layout: false
		end
	end

	def authorized_and_confirmed
		if session[:confirmed] != 'authen_and_in_db'
			check_rsa_authorization
		end
	end

	private
		def rfc_authorized?
			if Rails.env == 'development' || Rails.env == 'test'
				session[:authen] = 'pgmdmjm'
				return true
			elsif Rails.env == 'production'
				request.headers["HTTP_REMOTE_USER"].blank? ? false : true
			end
			
	  	end
	
end