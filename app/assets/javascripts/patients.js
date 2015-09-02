$(function(){
// $(document).on("ready page:change", function(){ on_opening
if ($('body.patients').length) {

	//DECLARE VARIABLES
		// var ID = '';
		//   	function set_id(x){ID = x};
		

	// STYLING
		$('#divPatientPageWrapper').addClass('pad_3_sides')
		$('#divPatientPageInnerWrapper').addClass('centered')
										.css({'width':'75em'});
		$('#divPatientAsideRt').addClass('float_right form_container')
								.css({'width':'250px'})
								.hide();
		$('#PatientAsideRtErrors').addClass('error_explanation')
									.hide();

		$('#fPatientSearch').addClass('form_container').css({'width':'692px'});
		// Can't use .hide() as wont work with IE 10
		$('#btnSubmit').addClass('move_off_page')
		$('.error_message').hide();

		//button
		//REMOVE id^=b
		$('[id^=b]').button().addClass('reduce_button')
		$('[id^=bt').button().addClass('reduce_button')
		// $('#lastname').addClass('input_field')

		//dates
		$('[id^=dt]')
			.datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				changeYear: true,
				yearRange: "-10: +10" })
			.addClass('texts')
			.css({'width':'7em'});

		//text
		$('#Pat_ID').addClass('hidden');

	// SELECTS
		//selects
		if ($('#session-admin3').val() !== 'true') {
			$('#slt_S_facility, #slt_F_facility').attr("disabled", true);
		};


		// Show appropriate wards in
		$('#slt_S_facility').change(function(){
			var chosen_facility = $('#slt_S_facility').val();
			$('#slt_S_ward').mjm_addOptions('ward', {firstLine: 'All Wards', facility: chosen_facility, group: true})
		});
		$('#slt_F_facility').change(function(){
			var chosen_facility = $('#slt_F_facility').val();
			$('#slt_F_ward').mjm_addOptions('ward', {firstLine: 'All Wards', facility: chosen_facility, group: true})
		});

		// Filter when Facility changed
		$('#slt_S_facility').change(function(e){
			complex_search1();
		});

		//Filter when ward changed
		$('#slt_S_ward').change(function(e){
			complex_search1();
		});

		//Search Authoritative source if only number filled out
		$('#txt_Pat_number').change(function(){
			firstname = $('#txt_Pat_firstname').val();
			lastname = $('#txt_Pat_lastname').val();
			if (firstname == '' && lastname == '') {
				alert ('Will search Authoritative source and fill fields if found')
			};
		});


	//FORM VALIDATION, SUBMIT HANDLER
		//Validate and Submit fPatientAsideRt
		// $('#fPatientAsideRt').validate({
		// 	rules: {
		// 		firstname: {
		// 			required: true,
		// 			minlength: 2
		// 		},
		// 		lastname: {
		// 			required: true,
		// 			minlength: 4
		// 		}
		// 	},
		// 	messages: {
		// 		firstname: {
		// 			required: "Firstname is required",
		// 			minlength: "Two characters required"
		// 		},
		// 		lastname: {
		// 			required: "Lastname is required",
		// 			minlength: "Four chararcters required"
		// 		}
		// 	},
		// 	submitHandler: function(form){
		// 		//Get value of submit button to determine which AJAX call to make
		// 		submit_value = $(form).find('input[type=submit]').attr('value')
		// 		switch(submit_value){
		// 			case 'New':
		// 				patients_ajax1('/patients/', 'POST');
		// 				break;
		// 			case 'Edit':
		// 				ID = $('#Pat_ID').val();
		// 				patients_ajax1('/patients/'+ID+'', 'PATCH');
		// 				break;
		// 			default:
		// 				alert('submit_id not found');
		// 				return false;
		// 		};
				
		// 	}
		// });

	// BUTTONS
		//Submit complex search on fPatientSearch using hidden submit button
			// $('#btnSubmit').click(function(e){
			$('#fPatientSearch').submit(function(e){
				e.preventDefault();
				complex_search1();
			});
			$('#bPatientBack').click(function(){
				$('#divPatientAsideRt, #bPatientSubmit, #bPatientBack').hide();
				clearFields();
			});

		//Submit New, Edit from input form
			$('#fPatientAsideRt').submit(function(e){		
	 			e.preventDefault();
	 			//Validate that form properly filled out
	 			remove_error_divs_if_corrected()

	 			if ($('#txt_Pat_firstname').val() == '') {
	 				$('#txt_Pat_firstname')
	 					.after('<div class="error_message">Please enter First Name</div>')
	 					.focus();
	 				return true;
	 			};
	 			if ($('#txt_Pat_lastname').val() == '') {
	 				$('#txt_Pat_lastname')
	 					.after('<div class="error_message">Please enter Last Name</div>')
	 					.focus();
	 				return true;
	 			};
	 			if ($('#txt_Pat_number').val() == '') {
	 				$('#txt_Pat_number')
	 					.after('<div class="error_message">Please enter Number</div>')
	 					.focus();
	 				return true;
	 			};

function remove_error_divs_if_corrected() {
	if ($('#txt_Pat_firstname').val().length > 0) {
		$('#txt_Pat_firstname').nextAll('.error_message').remove();
	};
	if ($('#txt_Pat_lastname').val().length > 0) {
		$('#txt_Pat_lastname').nextAll('.error_message').remove();
	};
	if ($('#txt_Pat_number').val().length > 0) {
		$('#txt_Pat_number').nextAll('.error_message').remove();
	};
}
	 			

	 			//Get value of submit button to determine which AJAX call to make
				submit_value = $(this).find('input[type=submit]').attr('value')
				switch(submit_value){
					case 'New':
						patients_ajax1('/patients/', 'POST');
						break;
					case 'Edit':
						ID = $('#Pat_ID').val();
						patients_ajax1('/patients/'+ID+'', 'PATCH');
						break;
					default:
						alert('submit_id not found');
						return false;
				};
	  			
	  		});

	
	// RUN ON OPENING
	if ($('#session-admin3').val() == 'true') {
		facility = '-1';
		//Make sure 'facility' and ward selects are populated before running 'complex_search1'
		$('#slt_S_facility').mjm_addOptions('facility', {
											firstLine: 'All Facilities', 
											complete: function(){
												pat_on_opening(facility);
											}
										})
		$('#slt_F_facility').mjm_addOptions('facility', {
											firstLine: 'All Facilities', 
											complete: function(){
												$('#slt_F_ward').mjm_addOptions('ward', {
													firstLine: 'All Wards', 
													facility: facility, 
													group: true
													});
											}
										})

		// $('#slt_S_ward').mjm_addOptions('ward', {firstLine: 'All Wards', facility: '-1', group: true})
	} else { 
		facility = $('#session-facility').val();
		//Make sure 'facility' and 'ward' selects are populated before running 'complex_search1'
		$('#slt_S_facility').mjm_addOptions('facility', {
											firstLine: 'All Facilities',
											complete: function(){
												pat_on_opening(facility);
											}
										});
		$('#slt_F_facility').mjm_addOptions('facility', {
											firstLine: 'All Facilities', 
											complete: function(){
												$('slt_F_facility').val(''+facility+'');
												$('#slt_F_ward').mjm_addOptions('ward', {
													firstLine: 'All Wards', 
													facility: facility, 
													group: true,
													complete: function(){
														$('#slt_F_facility').val(facility)
													}
													});

											}
										})
		// $('#slt_S_ward, #slt_F_ward').mjm_addOptions('ward', {firstLine: 'All Wards', facility: facility, group: true})
	};


};   //if ($('body.patients').length) {
});  // $(function(){
