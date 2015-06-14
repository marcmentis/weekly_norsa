module SessionValues

	def authorized_and_confirmed
		if session[:confirmed] != 'authen_and_in_db'
			if Rails.env == 'development' || Rails.env == 'test'
				check_rsa_authorization_dev
				# puts "NOT AUTHORIZED AND CONFIRMED YET"
			elsif Rails.env == 'production'
				check_rsa_authorization_prod
			end
		end
		# puts "AUTHORIZED AND CONFIRMED"
	end

	private
		def check_rsa_authorization_dev
			session[:authen] = 'pgmdmjm'
			this_user = current_user
			if this_user.blank?
				@error = 'User has no privileges in this application'
				render file: "#{Rails.root}/public/user_error", layout: false		
			else
				session[:confirmed] = 'authen_and_in_db'
				session[:facility] = this_user.facility
			end
				
		end

		def check_rsa_authorization_prod
			if rfc_authorized? 				
				this_user = current_user
				if this_user.blank?
					@error = 'User has no privileges in this application'
					render file: "#{Rails.root}/public/user_error", layout: false		
				else
					session[:authen] = request.headers["HTTP_REMOTE_USER"]
					session[:confirmed] = 'authen_and_in_db'
					session[:facility] = this_user.facility
				end			
			else
				@error = 'User has not passed RSA authentication'
				render file: "#{Rails.root}/public/user_error", layout: false
			end		
		end

		def rfc_authorized?
			request.headers["HTTP_REMOTE_USER"].blank? ? false : true		
	  	end
	
end