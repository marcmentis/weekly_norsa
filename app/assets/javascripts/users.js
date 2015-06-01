$(function(){
if($('body.users').length) {

	//DECLARE VARIABLES
		var ID = '';
		  	function set_id(x){ID = x};

	//STYLING
		$('#divUserPageWrapper').addClass('pad_3_sides');
		$('#divUserPageInnerWrapper').addClass('centered')
									.css({'width':'75em'});
		$('#divUserAsideRt').addClass('float_right form_container')
							.css({'width':'250px'})
							.hide();
		$('#UserAsideRtErrors').addClass('error_explanation')
								.hide();

		$('#fUserSearch').addClass('form_container').css({'width':'692px'});
		// Can't use .hide() as wont work with IE 10
		$('#b_user_select').addClass('move_off_page')

		//button
		$('[id^=b_]').button().addClass('reduce_button')

		//dates
		// $('[id^=dt]').datepicker().css({'width':'7em'});

		//WIP
		// $('#divUserRwrapper')
		$('#divUserRwrapper').addClass('form_container')
								.hide();
		$('#divUserRLt').css({'float': 'left'});
		$('#divUserRCnr').css({'float': 'left'});
		$('#divUserRRt').css({'float': 'left'});
		$('#divUserBreaker').css({'clear':'both'})

		$('#slt_user_R_userRoles, #slt_user_R_allRoles, #slt_user_R_usersWithRoles').attr({
						size: "12",
						multiple: "yes"
					});
		

	//SELECTS
		//TO DO show appropriate only if Admin2
		$('#slt_user_S_facility, #slt_user_Rt_facility').mjm_addOptions('facility', {firstLine: 'Facilities'})

		//Filter when facility changed
		$('#slt_user_S_facility').change(function(){
			user_complex_search1();
		});

	//FORM VALIDATION, SUBMIT HANDLER
		//Validate and Submit fPatientAsideRt
		$('#fUserAsideRt').validate({
			rules: {
				ftx_user_Rt_firstname: {
					required: true,
					minlength: 2
				},
				ftx_user_Rt_lastname: {
					required: true,
					minlength: 2
				}
			},
			messages: {
				code: {
					required: "FirstName is required",
					minlength: "Two characters required"
				},
				value: {
					required: "LastName is required",
					minlength: "Two chararcters required"
				}
			},
			submitHandler: function(form){
				//Get value of submit button to determine which AJAX call to make
				submit_value = $(form).find('input[type=submit]').attr('value')
				switch(submit_value){
					case 'New':
						user_ajax1('/users', 'POST');
						break;
					case 'Edit':
						user_ajax1('/users/'+ID+'', 'PATCH');
						break;
					default:
						alert('submit_id not found');
						return false;
				};
				
			}
		});


	// BUTTONS
		//Submit complex search on fPatientSearch using hidden submit button
		// $('#btnSubmit').click(function(e){
		$('#fUserSearch').submit(function(e){
			e.preventDefault();
			user_complex_search1();
		});
		$('#b_user_Rt_Back').click(function(){
			$('#divUserAsideRt, #b_user_Rt_Submit, #b_user_Rt_Back').hide();
			user_clearFields();
		});

		$('#b_user_R_addRole').click(function(){
			role_name = $('#slt_user_R_allRoles').val();
			alert(role_name)
			add_role(role_name, ID)
		});

		function add_role(role_name, user_id){
			data_for_params = {user: {id: user_id, role_name: role_name}};
			url = '/users_add_role/'+ID+'';
			type = 'POST'

			$.ajax({
				url: url,
				type: type,
				data: data_for_params,
				dataType: 'json'
			}).done(function(data){
				alert('success') 
				
			}).fail(function(jqXHR,textStatus,errorThrown){
				alert('HTTP status code: ' + jqXHR.status + '\n' +
		              'textStatus: ' + textStatus + '\n' +
		              'errorThrown: ' + errorThrown);
		        alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
			});
		};

	// RUN ON OPENING
	// user_refreshgrid('nil');
	user_complex_search1();

	//*****************************************************
	//FUNCTIONS CALLED FROM ABOVE

	function user_refreshgrid(url){

		if (url == 'nil') {url = '/users'};
		
		//Create Table and Div for grid and navigation "pager" 
	 	// $("#divUserGrid").remove();         
		$('#divUserGrid').html('<table id="divTable" style="background-color:#E0E0E0"></table><div id="divPager"></div>');
		//Define grid

		$("#divTable").jqGrid({
			url: url,
			datatype:"json",
			mtype:"GET",
			colNames:["id","FirstName","LastName","Authen","eMail", "Finit", "Minit", "Facility"],
			colModel:[
				{name:"id",index:"id",width:55, hidden:true},
				{name:"firstname",index:"firstname",width:125,align:"center"},
				{name:"lastname",index:"lastname",width:125,align:"center"},
				{name:"authen",index:"authen",width:100,align:"center"},
				{name:"email",index:"email",width:200,align:"center"},
				{name:"firstinitial",index:"firstinitial",width:25,align:"center"},
				{name:"middleinitial",index:"middleinitial",width:25,align:"center"},
				{name:"facility",index:"facility",width:75,align:"center"}
			],
			editurl:"/users",
			pager:"#divPager",
			height:390,
			width: 700,
			altRows: true,
			rowNum:15,
			rowList:[15,25,40],
			sortname:"lastname",
			sortorder:"asc",
			viewrecords:true,
			gridview: true, //increased speed can't use treeGrid, subGrid, afterInsertRow
			// loadonce: true,  //grid load data only once. datatype set to 'local'. Futher manip on client. 'Pager' functions disabled
			caption:"Users ",

		        loadComplete: function(){
		        	// alert('in loadComplete')
		        },

				onSelectRow:function(id) { 
					set_id(id);  //set the ID variable
					data_for_params = {user: {id: id}}

					$.ajax({ 
							  url: '/users/'+id+'',
							  data: data_for_params,
							  //type: 'POST',
							  type: 'GET',
							  dataType: 'json'
						}).done(function(data){
							user_clearFields();
							$('#b_user_Rt_Submit').attr('value','Edit');
							$('#divUserAsideRt, #b_user_Rt_Submit, #b_user_Rt_Back').show();
							$('#id').val(data.id);
							$('#ftx_user_Rt_firstname').val(data.firstname);
							$('#ftx_user_Rt_lastname').val(data.lastname);
							$('#ftx_user_Rt_authen').val(data.authen);
							$('#ftx_user_Rt_email').val(data.email);
							$('#ftx_user_Rt_firstinitial').val(data.firstinitial);
							$('#ftx_user_Rt_middleinitial').val(data.middleinitial);
							$('#slt_user_Rt_facility').val(data.facility);

													  
						}).fail(function(jqXHR, textStatus, errorThrown){
							alert('HTTP status code: ' + jqXHR.status + '\n' +
			              'textStatus: ' + textStatus + '\n' +
			              'errorThrown: ' + errorThrown);
							alert('Error in: /user');
						});
				},

				loadError: function (jqXHR, textStatus, errorThrown) {
			        alert('HTTP status code: ' + jqXHR.status + '\n' +
			              'textStatus: ' + textStatus + '\n' +
			              'errorThrown: ' + errorThrown);
			        alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
			    },

			    //The JASON reader. This defines what the JSON data returned should look 
				    //This is the default. Not needed - only if return does NOT look like this
					// jsonReader: { 
					// 	root: "rows", 
					// 	page: "page", 
					// 	total: "total", 
					// 	records: "records", 
					// 	repeatitems: true, 
					// 	cell: "cell", 
					// 	id: "id",
					// 	userdata: "userdata",
					// 	subgrid: { 
					// 	 root:"rows", 
					// 	 repeatitems: true, 
					// 	 cell:"cell" 
					// 	} 
					// },	

		})
		.navGrid('#divPager', 
			{edit:false,add:false,del:false,search:false,refresh:false}
			// {edit:false,add:false,del:true,search:false,refresh:false}
			// {"del":true}, 
			// {"closeAfterEdit":true,"closeOnEscape":true}, 
			// {}, {}, {}, {}
	 	  )
		.navButtonAdd('#divPager', {
			caption: 'New',
			buttonicon: '',
			onClickButton: function(){		
				user_clearFields();

				$('#divUserAsideRt, #b_user_Rt_Submit, #b_user_Rt_Back').show();
				$('#b_user_Rt_Submit').attr('value','New');
			},
			position:'last'
		})
		.navButtonAdd('#divPager', {
			caption: 'Role',
			buttonicon: '',
			onClickButton: function(){		
				//get roles for selected user
				//get all roles
				get_user_roles(''+ID+'');
				get_all_roles();
			},
			position:'last'
		})
		.navButtonAdd('#divPager', {
			caption: 'Delete',
			buttonicon: '',
			onClickButton: function(){	
				if (ID.length > 0) {	
					if(confirm("Are you sure you want to delete this user")){
						user_ajax1('/users/'+ID+'', 'DELETE');	
					} else {
						return true;
					};
				};
			},
			position:'last'
		});
	};

	function get_all_roles(){
		var html = '';
		data_for_params = '';
		url = '/roles';
		type = 'GET'

		$.ajax({
			url: url,
			type: type,
			data: data_for_params,
			dataType: 'json'
		}).done(function(data){
			$('#slt_user_R_allRoles').find('option').remove();
			if(data.length != 0){
				for(var i = 0; i < data.length; i++){
					html += '<option value="' + data[i].name + '">' + data[i].name + '</option>';
				};
			}; 
			$('#divUserRwrapper').show();
			$('#slt_user_R_allRoles').append(html);
			
		}).fail(function(jqXHR,textStatus,errorThrown){
			alert('HTTP status code: ' + jqXHR.status + '\n' +
	              'textStatus: ' + textStatus + '\n' +
	              'errorThrown: ' + errorThrown);
	        alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
		});
	};

	function get_user_roles(userID){
		var html = '';
		data_for_params ={user: {'id': userID}};
		url = '/users_roles/'+userID+'';
		type = 'GET'

		$.ajax({
			url: url,
			type: type,
			data: data_for_params,
			dataType: 'json'
		}).done(function(data){
			$('#slt_user_R_userRoles').find('option').remove();
			var lastname = $('#ftx_user_Rt_lastname').val();
			var firstinitial = $('#ftx_user_Rt_firstinitial').val();
			name = firstinitial + '.' + lastname

			if(data.length != 0){
				for(var i = 0; i < data.length; i++){
					html += '<option value="' + data[i].name + '">' + data[i].name + '</option>';
				};
			}; 
			$('#divUserRwrapper').show();

			$('#s_user_R_name').empty();
			$('#s_user_R_name').text(name);
			$('#slt_user_R_userRoles').append(html);
			
		}).fail(function(jqXHR,textStatus,errorThrown){
			alert('HTTP status code: ' + jqXHR.status + '\n' +
	              'textStatus: ' + textStatus + '\n' +
	              'errorThrown: ' + errorThrown);
	        alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
		});



		
	};


	function user_clearFields(){
		$('#ftx_user_Rt_firstname, #ftx_user_Rt_lastname,\
			#ftx_user_Rt_authen, #ftx_user_Rt_email,\
			#ftx_user_Rt_firstinitial, #ftx_user_Rt_middleinitial,\
			#slt_user_Rt_facility').val('');
		$('#UserAsideRtErrors').html('').hide();
	 };
	
	function user_complex_search1 (){
		var facility = $('#slt_user_S_facility').val();
		var firstname = $('#ftx_user_S_firstname').val();
		var lastname = $('#ftx_user_S_lastname').val();
		var authen = $('#ftx_user_S_authen').val();
		var email = $('#ftx_user_S_email').val();
		var firstinitial = $('#ftx_user_S_firstinitial').val();
		var middleinitial = $('#ftx_user_S_middleinitial').val();

		// $("#gridGrid").remove();         
		url = '/users_search?facility='+facility+'&firstname='+firstname+'&lastname='+lastname+'&authen='+authen+'&email='+email+'&firstinitial='+firstinitial+'&middleinitial='+middleinitial+''
		user_refreshgrid(url);	
	};

	function user_ajax1 (url, type) {
		var firstname = $('#ftx_user_Rt_firstname').val();
		var lastname = $('#ftx_user_Rt_lastname').val();
		var authen = $('#ftx_user_Rt_authen').val();
		var email = $('#ftx_user_Rt_email').val();
		var firstinitial = $('#ftx_user_Rt_firstinitial').val();
		var middleinitial = $('#ftx_user_Rt_middleinitial').val();
		var facility = $('#slt_user_Rt_facility').val();
		// Create strong parameter
		data_for_params ={user: {'firstname': firstname, 'lastname': lastname, 
						'authen': authen, 'email': email, 
						'firstinitial': firstinitial, 
						'middleinitial': middleinitial,
				  		'facility': facility}}

		$.ajax({
			url: url,
			type: type,
			data: data_for_params,
			dataType: 'json'
		}).done(function(data){
			// for_select_refreshgrid('nil');
			user_complex_search1();
			user_clearFields();
			$('#divUserAsideRt, #b_user_Rt_Submit, #b_user_Rt_Back').hide();

		}).fail(function(jqXHR,textStatus,errorThrown){
			// alert('HTTP status code: ' + jqXHR.status + '\n' +
	  //             'textStatus: ' + textStatus + '\n' +
	  //             'errorThrown: ' + errorThrown);
	  //       alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
	        var msg = JSON.parse(jqXHR.responseText)
	        var newHTML;
	        newHTML = '<h3>Validation Error</h3>';	
	        newHTML += '<ul>';        
	        $.each(msg, function(key, value){
	        	newHTML += '<li>'+ value +'</li>';
	        });
	        newHTML += '</ul>';
	        $('#UserAsideRtErrors').show().html(newHTML)
		});
	};

};		//if($('#body.users').length) {
});		//$(function(){






	