module SessionValues

	def check_rsa_authorization
		# @request = request
		# session[:authen] = 'pgmdmjmff'

		# if Rails.env == 'production'
		if Rails.env == 'development' || Rails.env == 'test'
			if true 
				session[:authen] = 'pgmdmjm'
				# puts 'CHECK_AUTHORIZATION DEVELOPMENT'
				# puts "session[:authen]: #{session[:authen]}"
				@current_user ||= session[:authen] && User.find_by(authen: session[:authen])
				if @current_user.blank?
					@error = 'User has no privileges in this application'
					render file: "#{Rails.root}/public/user_error", layout: false		
				end
			else
				@error = 'User has not passed RSA authentication'
				render file: "#{Rails.root}/public/user_error", layout: false
			end
			
		# elsif Rails.env == 'development' || Rails.env == 'test'
		elsif Rails.env == 'production'
			if rfc_authorized? 
				session[:authen] = request.headers["HTTP_REMOTE_USER"]
				# @current_user logic
					# If session[:authen] = nil then 
						# Expression returns nil and @_corrent_user = nil
						# Regardless if User.find_by(authen: session) !=nil
					# If session[:authen] != nil and User.find_by(authen: session) = nil
						# Expression returns nil
						# @_current_user = session[:authen]
					# If session[:authen] != nil and User.find_by(authen: session) != nill
						# Expression returns User.find_by(authen: session)
						# @_current_user = User.find_by(authen: session)
				@current_user ||= session[:authen] && User.find_by(authen: session[:authen])
				# @current_user = current_user
				if @current_user.blank?
					@error = 'User has no privileges in this application'
					render file: "#{Rails.root}/public/user_error", layout: false		
				end
			else
				@error = 'User has not passed RSA authentication'
				render file: "#{Rails.root}/public/user_error", layout: false
			end
		end 
		
	end

	private
		def rfc_authorized?
			request.headers["HTTP_REMOTE_USER"].blank? ? false : true

	  	end
	 #  	def current_user				
		# 	# @current_user logic
		# 			# If session[:authen] = nil then 
		# 				# Expression returns nil and @_corrent_user = nil
		# 				# Regardless if User.find_by(authen: session) !=nil
		# 			# If session[:authen] != nil and User.find_by(authen: session) = nil
		# 				# Expression returns nil
		# 				# @_current_user = session[:authen]
		# 			# If session[:authen] != nil and User.find_by(authen: session) != nill
		# 				# Expression returns User.find_by(authen: session)
		# 				# @_current_user = User.find_by(authen: session)
		# 	@_current_user ||= session[:authen] && User.find_by(authen: session[:authen])
		# 	# @_current_user ||= User.find_by(authen: 'pgmdmjm')
		# end

		# def create_session

		# 	# # Get 'request' and 'response' objects from Authentication system
		#  #    @request = request
		#  #    @response = response
		    
		#  #    # Raise a NoMethodError if user not in Users database
		#  #    # ? Differentiate between 'development' and 'production' for how this is done
		#  #    if @request.headers["HTTP_REMOTE_USER"].blank?
		# 	#       # Artificially set session
		# 	#       begin
		# 	#         session[:authen] = 'pgmdmjm'
		# 	#         @user = User.find_by(authen: session[:authen])
		# 	#         session[:facility] = @user.facility
		# 	#         session[:email] = @user.email
		# 	#         session[:firstname] = @user.firstname
		# 	#         session[:lastname] = @user.lastname
		# 	#         session[:firstinitial] = @user.firstinitial
		# 	#         session[:middleinitial] = @user.middleinitial
		# 	#         session[:name] = ''+@user.firstinitial+' '+@user.middleinitial+' '+@user.lastname+''
			       

		# 	#         # @for_select = ForSelect.where('value = ?', session[:facility]).first
		# 	#         # session[:facilityname] = @for_select.text
		# 	#       rescue NoMethodError
		# 	#         render file: "#{Rails.root}/public/user_error", layout: false
		# 	#       end
		      
		#  #    else
		# 	# 	begin
		# 	# 	session[:authen] = @request.headers["HTTP_REMOTE_USER"]
		# 	# 	@user = User.find_by(authen: session[:authen])
		# 	# 	# session[:facility] = @request.headers["HTTP_OMHFACILITYNUM"]
		# 	# 	# session[:email] = @request.headers["HTTP_CTEMAIL"]
		# 	# 	# session[:firstname] = @request.headers["HTTP_CTFN"]
		# 	# 	# session[:lastname] = @request.headers["HTTP_CTLN"]
		# 	# 	# session[:firstinitial] = @request.headers["HTTP_CTFN"]
		# 	# 	# session[:middleinitial] = @request.headers["HTTP_INITIALS"]
		# 	# 	session[:facility] = @user.facility
		# 	# 	session[:email] = @user.email
		# 	# 	session[:firstname] = @user.firstname
		# 	# 	session[:lastname] = @user.lastname
		# 	# 	session[:firstinitial] = @user.firstinitial
		# 	# 	session[:middleinitial] = @user.middleinitial
		# 	# 	session[:name] = ''+@user.firstinitial+' '+@user.middleinitial+' '+@user.lastname+''


		# 	# 	@for_select = ForSelect.where('value = ?', session[:facility]).first
		# 	# 	session[:facilityname] = @for_select.text
		# 	# 	rescue NoMethodError
		# 	# 	    render file: "#{Rails.root}/public/user_error", layout: false
		# 	# 	end
		#  # 	end
		# end
	
end