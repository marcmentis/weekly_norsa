$(function(){
if($('body.for_selects').length) {

	//DECLARE VARIABLES
		var ID = '';
		  	function set_id(x){ID = x};

	//STYLING
		$('#divForSelectPageWrapper').addClass('pad_3_sides');
		$('#divForSelectPageInnerWrapper').addClass('centered')
										.css({'width':'75em'});
		$('#divForSelectAsideRt').addClass('float_right form_container')
								.css({'width':'250px'})
								.hide();
		$('#ForSelectAsideRtErrors').addClass('error_explanation')
									.hide();

		$('#fForSelectSearch').addClass('form_container').css({'width':'692px'});
		// Can't use .hide() as wont work with IE 10
		$('#b_for_selects_select').addClass('move_off_page')

		//button
		$('[id^=b]').button().addClass('reduce_button')
		$('#lastname').addClass('input_field')

		//dates
		// $('[id^=dt]').datepicker().css({'width':'7em'});

	//SELECTS
		//TO DO show appropriate only if Admin2
		$('#slt_for_selects_S_facility').mjm_addOptions('facility', {firstLine: 'All Facilities'})


	// RUN ON OPENING
	refreshgrid_for_selects('nil');
	// complex_search1();
	//*****************************************************
	//FUNCTIONS CALLED FROM ABOVE
	function refreshgrid_for_selects(url){

		if (url == 'nil') {url = '/for_selects'};

		
		//Create Table and Div for grid and navigation "pager" 
	 	// $("#gridWork").remove();         
		$('#divGrid_for_selects').html('<table id="divTable" style="background-color:#E0E0E0"></table><div id="divPager"></div>');
		//Define grid
		$("#divTable").jqGrid({
			url: url,
			datatype:"json",
			mtype:"GET",
			colNames:["id","Code","Value","Text","Grouper", "Order", "Facility"],
			colModel:[
				{name:"id",index:"id",width:55, hidden:true},
				{name:"code",index:"code",width:100,align:"center"},
				{name:"value",index:"value",width:100,align:"center",editable:true},
				{name:"text",index:"text",width:100,align:"center"},
				{name:"grouper",index:"grouper",width:100,align:"center"},
				{name:"option_order",index:"option_order",width:50,align:"center"},
				{name:"facility",index:"facility",width:100,align:"center"}
			],
			editurl:"/for_select/update",
			pager:"#divPager",
			height:390,
			width: 700,
			altRows: true,
			rowNum:15,
			rowList:[15,25,40],
			sortname:"code",
			sortorder:"asc",
			viewrecords:true,
			gridview: true, //increased speed can't use treeGrid, subGrid, afterInsertRow
			// loadonce: true,  //grid load data only once. datatype set to 'local'. Futher manip on client. 'Pager' functions disabled
			caption:"For Selects ",

		        loadComplete: function(){
		        	// alert('in loadComplete')
		        },

				onSelectRow:function(id) { 
					set_id(id);  //set the ID variable
					data_for_params = {patient: {id: id}}

					$.ajax({ 
							  // url: '/inpatient_show',
							  url: '/patients/'+id+'',
							  data: data_for_params,
							  //type: 'POST',
							  type: 'GET',
							  dataType: 'json'
						}).done(function(data){
							clearFields();
							$('#bPatientSubmit').attr('value','Edit');
							$('#divPatientAsideRt, #bPatientSubmit, #bPatientBack').show();
							$('#id').val(data.id);
							$('#firstname').val(data.firstname);
							$('#lastname').val(data.lastname);
							$('#number').val(data.number);
							$('#facility').val(data.facility);
							$('#ward').val(data.ward);

													  
						}).fail(function(){
							alert('Error in: /inpatient');
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
				clearFields();
				// $('#divPatientAsideRt, #bNew, #bBack').show();
				// $('#bDelete, #bEdit').hide();

				$('#divPatientAsideRt, #bPatientSubmit, #bPatientBack').show();
				$('#bPatientSubmit').attr('value','New');
			},
			position:'last'
		})
		.navButtonAdd('#divPager', {
			caption: 'Delete',
			buttonicon: '',
			onClickButton: function(){	
				if (ID.length > 0) {	
					if(confirm("Are you sure you want to delete this patient")){
						patients_ajax1('/patients/'+ID+'', 'DELETE');	
					} else {
						return true;
					};
				};
			},
			position:'last'
		});
	};
};
});  //$(function)(){