module SessionValues

	def check_session
		if session[:authen].blank?
			create_session
		end
	end

	private
		def create_session

			# Get 'request' and 'response' objects from Authentication system
		    @request = request
		    @response = response
		    
		    # Raise a NoMethodError if user not in Users database
		    # ? Differentiate between 'development' and 'production' for how this is done
		    if @request.headers["HTTP_REMOTE_USER"].blank?
			      # Artificially set session
			      begin
			        session[:authen] = 'pgmdmjm'
			        @user = User.find_by(authen: session[:authen])
			        session[:facility] = @user.facility
			        session[:email] = @user.email
			        session[:firstname] = @user.firstname
			        session[:lastname] = @user.lastname
			        session[:firstinitial] = @user.firstinitial
			        session[:middleinitial] = @user.middleinitial
			        session[:name] = ''+@user.firstinitial+' '+@user.middleinitial+' '+@user.lastname+''
			       

			        # @for_select = ForSelect.where('value = ?', session[:facility]).first
			        # session[:facilityname] = @for_select.text
			      rescue NoMethodError
			        render file: "#{Rails.root}/public/user_error", layout: false
			      end
		      
		    else
				begin
				session[:authen] = @request.headers["HTTP_REMOTE_USER"]
				@user = User.find_by(authen: session[:authen])
				# session[:facility] = @request.headers["HTTP_OMHFACILITYNUM"]
				# session[:email] = @request.headers["HTTP_CTEMAIL"]
				# session[:firstname] = @request.headers["HTTP_CTFN"]
				# session[:lastname] = @request.headers["HTTP_CTLN"]
				# session[:firstinitial] = @request.headers["HTTP_CTFN"]
				# session[:middleinitial] = @request.headers["HTTP_INITIALS"]
				session[:facility] = @user.facility
				session[:email] = @user.email
				session[:firstname] = @user.firstname
				session[:lastname] = @user.lastname
				session[:firstinitial] = @user.firstinitial
				session[:middleinitial] = @user.middleinitial
				session[:name] = ''+@user.firstinitial+' '+@user.middleinitial+' '+@user.lastname+''


				@for_select = ForSelect.where('value = ?', session[:facility]).first
				session[:facilityname] = @for_select.text
				rescue NoMethodError
				    render file: "#{Rails.root}/public/user_error", layout: false
				end
		 	end
		end
	
end