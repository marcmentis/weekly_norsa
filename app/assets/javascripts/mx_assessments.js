$(function(){
if ($('body.mx_assessments').length) {
	//VARIABLES
		var user_facility = $('#session-facility').val();
		var user_id = $('#session-authen').val();
		var user_name = $('#session-username').val();
		var pat_id = '';
			function set_id(x){pat_id = x};
		var meeting_date = '';
			function set_meeting_date(x){
				meeting_date = moment(x, "YYYY-MM_DD");  // Create a date object
			};
		var mx_assessment_id = -1;
			function set_mx_assessment_id(x) {mx_assessment_id = x};


		//textareas
		var width1 = '33em'
		var heightS1 = '90';
		var heightL1 = '180';
		var heightEL1 = '360';

	// STYLING
		//divs
		$('#divMxAssessPageWrapper')
			.addClass('pad_3_sides');
		$('#divMxAssessPageInnerWrapper')
			.addClass('centered')
			.css({'max-width': '1300px'})
		$('#divTitle')
			.css({'text-align': 'center',
					'color': '#2e6e9e',
					'font-size': '17px',
					'font-weight': 'bold',
					'text-align': 'center',
					'margin': '0 0 7px 0'});
		$('#grid_MxA_RightContainer, #div_MxA_save_message')
			.hide();
		//REMOVE
		$('[id^=divDanger]')
			.hide();
		$('[id^=div_MxA_danger')
			.hide();
		 
			
		//dates
		$('[id^=dt], [id^=date]')
			.datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				changeYear: true,
				yearRange: "-10: +10" })
			.addClass('texts')
			.css({'width':'7em'});


		//selects
		$('#slt_MxA_to_do, #slt_MxA_done')
			.attr({'size': '15',
				'multiple': 'no'})
			.css({'width': '100%'});
		$('#slt_Mxa_drugsChanged, #slt_Mxa_groupChanged')
			.css({'width': '125px'})
		//buttons
		$('[id^=bt]')
			.button()
			.addClass('reduce_button');
		//textareas
		$('[id^=txa]')
			.addClass('text-content left')
			.width('92%')
			.height(heightS1);
			// .css({'white-space': 'pre'});
		$('#txa_MxA_pastAssessments')
			.width('92%') //?? actually recorded as 98%
			.height(heightS1)

		//REMOVE
		$('[id^=textArea')
			.addClass('text-content left')
			.width('92%')
			.height(heightS1);
		
	//SELECT HANDLERS
		//populate selects
		$('#slt_Mxa_drugsChanged').mjm_addOptions('DrugsChanged',{firstLine: 'Drugs Changed'});	
		$('#slt_Mxa_groupChanged').mjm_addOptions('GroupsChanged',{firstLine: 'Group Changed'});
		$('#slt_MxA_ward').mjm_addOptions('ward', {firstLine: 'All Wards', facility: user_facility, group: true})
		$('#slt_MxA_danger_yn, #slt_MxA_pre_date_yesno').mjm_addOptions('YesNo',{firstLine: 'Choose Y/N'});

		//Populate TODO and DONE lists
		$('#slt_MxA_ward, #dt_MxA_newDate, #slt_MxA_date_history')
			.change(function(e){
			var id = $(this).attr('id');
			var ward = $('#slt_MxA_ward').val();
			var date = $('#dt_MxA_newDate').val();
			//Setup and Validation
			//When Ward Changed: (i) Populate slt_MxA_date_history (ii) clear dt_MxA_newDate, (iii) clear TODO lists and past history and input form																		
			if (id == 'slt_MxA_ward') {
				// swal(ward)
				popSelectDateHistory();
				$('#dt_MxA_newDate').val('');
				clear_todo_done_selects();
				clear_all_but_todo_done_lists();
			};

			//When newDate is changed: 
			if (id == 'dt_MxA_newDate') {
				//Check ward has been selected
				if ($('#slt_MxA_ward').val() == '-1') {
					swal('Please choose a ward before selecting a date');
					$('#dt_MxA_newDate').val('');				
					return true;
				};
				//Clear date_history
				$('#slt_MxA_date_history').val('');
				//Set meeting_date to new date value
				set_meeting_date($(this).val());
				//Clear todo, done lists and form data
				clear_todo_done_selects();
				clear_all_but_todo_done_lists();

				
				
			};

			//When DateHistory is changed: (i) set new Date ='', (ii)set meeting_date, (iii) clear all but todo lists
			if (id == 'slt_MxA_date_history') {
				$('#dt_MxA_newDate'). val('');
				set_meeting_date($(this).val());
				clear_all_but_todo_done_lists();
			};

			//Populate lists
			popPatientLists();
			//Hide Right container
			$('#grid_MxA_RightContainer').hide();
		});

		//Choose Patient From ToDo or Done lists (Show Form, get pat data, fill past Mx assessments & forms appropriately)
		$('#slt_MxA_to_do, #slt_MxA_done').change(function(){
			var id = $(this).val();
			set_id(id);
			get_pat_data();
					
		});


		//Expose appropriate questions for drug changes
		$('#slt_Mxa_drugsChanged').change(function(){
			value = $(this).val();
			// swal(value)
			if(value == -1){
				$('#div_MxA_dangerYes_drugNo, #div_MxA_dangerYes_drugYes').hide();
				$('#txa_MxA_drugNoChange, #txa_MxA_drugWhyChange').val('');
				return true;
			};
			if(value == '0-8Weeks'){
				$('#div_MxA_dangerYes_drugYes').show();
                $('#div_MxA_dangerYes_drugNo').hide();
				$('#txa_MxA_drugNoChange').val('');
				return true;
			};
			if(value == 'Gt8Weeks'){
				$('#div_MxA_dangerYes_drugNo').show();
				$('#div_MxA_dangerYes_drugYes').hide();
				$('#txa_MxA_drugWhyChange').val('');
				return true;
			}
		});	

		//Expose appropriate questions for group changes
		$('#slt_Mxa_groupChanged').change(function(){
			value = $(this).val();
			// swal(value);
			if (value == -1) {
				$('#div_MxA_dangerYes_groupYes, #div_MxA_dangerYes_groupNo').hide();
				$ ('#txa_MxA_groupNoChange, txa_MxA_groupWhyChange').val('');
				return true;
			};
			if (value == '0-3Months') {
				$('#div_MxA_dangerYes_groupNo').hide();
				$('#div_MxA_dangerYes_groupYes').show();
				$ ('#txa_MxA_groupWhyChange').val('');
			};
			if (value == 'Gt3Months') {
				$('#div_MxA_dangerYes_groupYes').hide();
				$('#div_MxA_dangerYes_groupNo').show();
				$ ('#txa_MxA_groupNoChange').val('');
			};
		})

		//Expose appropriate divs when danger_yn changed
		$('#slt_MxA_danger_yn').change(function(){
			value = $(this).val();
			if (value == -1) {
				hide_form_divs();
				$('#div_MxA_patient_identification, #div_MxA_dangerQuestion').show();
			}else if (value == 'Y') {
				$('[id^=div_MxA_dangerNo]')
					.hide();
				$('#div_MxA_dangerYes_drug, #div_MxA_dangerYes_group')
					.show();
				$('#div_MxA_dangerYes_drugNo, #div_MxA_dangerYes_groupNo, #div_MxA_dangerYes_drugYes, #div_MxA_dangerYes_groupYes')
					.hide();
			}else if (value == 'N') {
				$('#div_MxA_dangerNo_date').show();
				$('[id^=div_MxA_dangerYes]').hide();
				$('#slt_Mxa_drugsChanged, #slt_Mxa_groupChanged, #slt_MxA_pre_date_yesno').val(-1);
				$('#txa_MxA_drugNoChange, #txa_MxA_drugWhyChange, #txa_MxA_groupNoChange ').val('');
			};
		});

		//Expose appropriate divs when pre_date_yesno changed
		$('#slt_MxA_pre_date_yesno').change(function(){
			value = $(this).val();
			if (value == -1) {
				$('#div_MxA_dangerNo_dateNo, #div_MxA_dangerNo_dateYes').hide();
				$('#dt_MxA_preMeeting, #txa_MxA_PreDateNo').val('');
			}else if (value == 'Y') {
				$('#div_MxA_dangerNo_dateNo').hide();
				$('#div_MxA_dangerNo_dateYes').show();
				$('#dt_MxA_preMeeting').val('');
			}else if (value == 'N') {
				$('#div_MxA_dangerNo_dateYes').hide();
				$('#div_MxA_dangerNo_dateNo').show();
				$('#txa_MxA_PreDateNo').val('');
			};
		});

	//RADIO HANDLERS

	
	//BUTTON HANDLERS
		$('#bt_MxA_save, #bt_MxA_update').click(function(e){
			var element_id = $(this).attr('id');

			//VALIDATE THAT FORM PROPERLY FILLED OUT
				//Question Is patient danger answered yes or no
				if ($('#slt_MxA_danger_yn').val()== '-1') {
					alert('Please answer question: \n"Is patient a danger to self/other..."');
					$('#slt_MxA_danger_yn').focus();
					return true;
				};

				//Danger Yes
					//Danger yes and drugs changed not chosen
					if ($('#slt_MxA_danger_yn').val() == 'Y' 
							&& $('#slt_Mxa_drugsChanged').val() == '-1') {	
						alert('Please answer question: \n "When was medication ... last changed');
						$('#slt_Mxa_drugsChanged').focus();
						return true;
					};

					//Danger yes, Drugs changed 0-8Weeks but reason not given
					if ($('#slt_MxA_danger_yn').val() == 'Y' 
							&& $('#slt_Mxa_drugsChanged').val() == '0-8Weeks'
							&& $('#txa_MxA_drugWhyChange').val() == '') {	
						alert('Please give reason why drugs were changed');
						$('#txa_MxA_drugWhyChange').focus();
						return true;
					};

					//Danger yes, Drugs changed Gt8Weeks but reason not given
					if ($('#slt_MxA_danger_yn').val() == 'Y' 
							&& $('#slt_Mxa_drugsChanged').val() == 'Gt8Weeks'
							&& $('#txa_MxA_drugNoChange').val() == '') {	
						alert('Please give reason why drugs were NOT changed');
						$('#txa_MxA_drugNoChange').focus();
						return true;
					};

					//Danger yes and group/indiv not chosen
					if ($('#slt_MxA_danger_yn').val() == 'Y' 
							&& $('#slt_Mxa_groupChanged').val() == '-1') {
						alert('Please answer question: \n "When was group/indiv ... last changed');
						$('#slt_Mxa_groupChanged').focus();
						return true;
					};

					//Danger yes and group/indiv changed 0-3 months reason not given
					if ($('#slt_MxA_danger_yn').val() == 'Y' 
							&& $('#slt_Mxa_groupChanged').val() == '0-3Months'
							&& $('#txa_MxA_groupWhyChange').val() == '') {
						alert('Please give reason group/indiv therapy WAS changed');
						$('#txa_MxA_groupWhyChange').focus();
						return true;
					};

					//Danger yes and group/indiv changed Gt3Months reason not given
					if ($('#slt_MxA_danger_yn').val() == 'Y' 
							&& $('#slt_Mxa_groupChanged').val() == 'Gt3Months'
							&& $('#txa_MxA_groupNoChange').val() == '') {
						alert('Please give reason group/indiv therapy WAS changed');
						$('#txa_MxA_groupNoChange').focus();
						return true;
					};

				//Danger No
					//Danger No and pre-date not chosen
					if ($('#slt_MxA_danger_yn').val() == 'N' 
							&& $('#slt_MxA_pre_date_yesno').val() == '-1') {	
						alert('Please answer question: \n "Has date been set for Pre-Conference Meeting');
						$('#slt_MxA_pre_date_yesno').focus();
						return true;
					};

					//Danger No, pre-date Yes and date not given
					if ($('#slt_MxA_danger_yn').val() == 'N' 
							&& $('#slt_MxA_pre_date_yesno').val() == 'Y'
							&& $('#dt_MxA_preMeeting').val()== '') {	
						alert('Please enter Date for pre-conference meeting');
						$('#dt_MxA_preMeeting').focus();
						return true;
					};
					//Danger No, pre-date No and reason not given
					if ($('#slt_MxA_danger_yn').val() == 'N' 
							&& $('#slt_MxA_pre_date_yesno').val() == 'N'
							&& $('#txa_MxA_PreDateNo').val()== '') {	
						alert('Please give reason why date for Pre meeting not set');
						$('#txa_MxA_PreDateNo').focus();
						return true;
					};

			// Create strong parameter for all data in form
			var data_for_params = create_strong_parameter_for_form();

			//Pass strong parameter to save or update
			if (element_id == 'bt_MxA_save') {
				var url = '/mx_assessments/';
				var type = 'POST';				
			} else if (element_id == 'bt_MxA_update') {
				var url = '/mx_assessments/'+mx_assessment_id+'';
				var type = 'PATCH';
			};
			// alert('url: '+url+'');
			// alert('type: '+type+'');
			// alert('data_for_params: '+data_for_params+'');
			create_update_mx_assessment (url, type, data_for_params)
		});

		$('#bt_MxA_back').click(function(){
			clear_all_but_todo_done_lists();
			hide_form_divs();
			$('#grid_MxA_RightContainer, #div_MxA_save_message')
				.hide();
		});

		$('#bt_MxA_delete').click(function(){
			var r = confirm("Are you sure?");
			if (r == true) {
				delete_form(); 
			}else {
				return true;
			};
		});


	//TEXT HANDLERS
		$('#bt_MxA_TogNotes').click(function(){
			element = $('#txa_MxA_pastAssessments');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});
		$('#bt_MxA_togDrugWhyChange').click(function(){
			element = $('#txa_MxA_drugWhyChange');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});
		$('#bt_MxA_togDrugNoChange').click(function(){
			element = $('#txa_MxA_drugNoChange');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});
		$('#bt_MxA_togGroupChange').click(function(){
			element = $('#txa_MxA_groupWhyChange');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});
		$('#bt_MxA_togGroupNoChange').click(function(){
			element = $('#txa_MxA_groupNoChange');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});
		$('#bt_MxA_togPreDateNo').click(function(){
			element = $('#txa_MxA_PreDateNo');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});


	
	//	FUNCTIONS CALLED FROM ABOVE

	function popSelectDateHistory () {
		ward = $('#slt_MxA_ward').val();
		var url = '/mxa_date_history/'
		//create strong parameter
		data_for_params = {mx_assessment: {'site': ward}}
		// swal(ward);
		$.ajax({
			url: url,
			type: 'GET',
			data: data_for_params,
			cache: false,
			dataType: 'json'
		}).done(function(data){
			$('#slt_MxA_date_history').find('option').remove();
			var html = '<option value="">Choose Date </option>';
			for(var i = 0; i < data.length; i++){
				if (data[i] !== 'null'){
					meet_date = data[i]
				};

				html += '<option value="'+meet_date+'">' + meet_date + ' </option>'	
			}
			$('#slt_MxA_date_history').append(html);
		}).fail(function(jqXHR,textStatus,errorThrown){
			alert('jqXHR: '+jqXHR+'/n textStatus: '+textStatus+' errorThrown: '+errorThrown+'')
		});
	};

	function create_strong_parameter_for_form (argument) {
		var data_for_params = {};
		var patient_id = pat_id.toString();
		var params_string = $('#f_MxA_rightContainer').serialize();
		//.serialize doesn't work properly with values from text areas
		drugs_not_why = $('#txa_MxA_drugNoChange').val();
		drugs_change_why = $('#txa_MxA_drugWhyChange').val();
		psychsoc_not_why = $('#txa_MxA_groupNoChange').val();
		psychsoc_change_why = $('#txa_MxA_groupWhyChange').val();
		pre_date_no_why = $('#txa_MxA_PreDateNo').val();


		params_string_replace = params_string.replace(/&/g,',')
		params_array = params_string_replace.split(',');

		var params_hash = {};
		// add values to params_hash
		params_hash['patient_id'] = pat_id.toString();
		params_hash['meeting_date'] = moment(meeting_date).format("YYYY-MM-DD"); //need for format the date object
		params_hash['updated_by'] = user_name;
		params_hash['drugs_not_why'] = drugs_not_why;
		params_hash['drugs_change_why'] = drugs_change_why;	
		params_hash['psychsoc_change_why'] = psychsoc_change_why;	
		params_hash['psychsoc_not_why'] = psychsoc_not_why; 
		params_hash['pre_date_no_why'] = pre_date_no_why; 


		for(var i=0, l = params_array.length; i<l; i++){
			string = params_array[i]
			array = string.split('=')
			key = array[0];
			value = array[1]
			params_hash[key] = value;
		}

		//Make strong params
	 	data_for_params = {mx_assessment: params_hash}
	 	return data_for_params
	};

	function create_update_mx_assessment (url, type, data_for_params) {
		
		$.ajax({
			url: url,
			type: type,
			data: data_for_params,
			cache: false,
			dataType: 'json'
		}).done(function(data){
			//Show successful save message for 1.5 secs
			text = 'Successful Save'
			$('#div_MxA_save_message').html(text)
			$('#div_MxA_save_message').show();
			setTimeout(function(){
				$('#grid_MxA_RightContainer, #div_MxA_save_message')
					.hide();
				clear_todo_done_selects();
				clear_all_but_todo_done_lists();
				// popSelectDateHistory();
				popPatientLists();
			},1500);

		}).fail(function(jqXHR,textStatus,errorThrown){
				alert('jqXHR: '+jqXHR+' textStatus: '+textStatus+' errorThrown: '+errorThrown+'')
		});
	};

	function delete_form () {
		url = '/mx_assessments/'+mx_assessment_id+''
		type = 'DELETE'

		$.ajax({
			url: url,
			type: type,
			cache: false,
			dataType: 'json'
		}).done(function(data){
				text = 'Successful Delete'
				$('#div_MxA_save_message').html(text)
				$('#div_MxA_save_message').show();
				setTimeout(function(){
					$('#grid_MxA_RightContainer, #div_MxA_save_message')
						.hide();
					clear_todo_done_selects();
					clear_all_but_todo_done_lists();
					// popSelectDateHistory();
					popPatientLists();
				},1500); 
		}).fail(function(jqXHR,textStatus,errorThrown){
				alert('jqXHR: '+jqXHR+'/n textStatus: '+textStatus+' errorThrown: '+errorThrown+'')
		});
	};

	function clear_todo_done_selects (e) {
		$('#slt_MxA_to_do, #slt_MxA_done').find('option').remove();
	}

	function clear_all_but_todo_done_lists () {
		$('#sp_MxA_pat_name, #sp_MxA_pat_details, #sp_MxA_days_in_hospital, #dt_MxA_preMeeting')
			.val('');
		$('#slt_Mxa_drugsChanged, #slt_Mxa_groupChanged, #slt_MxA_danger_yn, #slt_MxA_pre_date_yesno').val('-1');
		$('[id^=txa]').val('');
		// $('#slt_MxA_to_do, #slt_MxA_done').val('');
	};

	function popPatientLists () { 
		var site = $('#slt_MxA_ward').val();
		var new_date = $('#dt_MxA_newDate').val();
		var date_history = $('#slt_MxA_date_history').val();

		// alert('site: '+site+'');
		// alert('new_date: '+new_date+'');
		// alert('date_history: '+date_history);
				
		var url = 'mxa_pat_lists'
		var data_for_params = {mx_assessment: {'site': site,
												'new_date': new_date,
												'date_history': date_history}}
		$.ajax({
			url: url,
			type: 'GET',
			data: data_for_params,
			cache: false,
			dataType: 'json'
		}).done(function(data){
			to_do = data.pat_all_to_do;
			done = data.pat_all_done;
			todo_id = 'slt_MxA_to_do';
			done_id = 'slt_MxA_done';
			populatePatientListSelects(todo_id, to_do);
			populatePatientListSelects(done_id, done);
		})
	}

	function populatePatientListSelects (slt_name, data) {
		$('#'+slt_name+'').find('option').remove();
			var html = '';
			for(var i = 0; i < data.length; i++){
				id = data[i].id;
				lastname = data[i].lastname;
				firstname = data[i].firstname;
				identifier = data[i].identifier;
				html += '<option value="'+id+'">' + lastname + ' '+firstname+': '+identifier+'</option>'
			}
			$('#'+slt_name+'').append(html);
	}

	function get_pat_data () {
				
		var url = 'mxa_pat_data/';
		var data_for_params = {mx_assessment: {patient_id: pat_id}}
		$.ajax({
			url: url,
			type: 'GET',
			data: data_for_params,
			cache: false,
			dataType: 'json'
		}).done(function(data){
				
				clear_all_but_todo_done_lists();
				$('#grid_MxA_RightContainer').show();	

				// Populate Past Assessment data				
				populate_past_mx_assessments(data);

				//Hide then show divs
					hide_form_divs();
					// Populate form demographics plus content data if meeting data already entered for chosen date
					populate_form_if_data_entered_for_meeting_date (data)				
					show_appropriate_divs(data);

							
				
		}).fail(function(jqXHR,textStatus,errorThrown){
			alert(''+jqXHR+': '+textStatus+':'+errotThrown+'')
		});
	};

	function hide_form_divs() {
		$('#div_MxA_patient_identification').hide();
		$('#div_MxA_dangerQuestion').hide();
		$('[id^=div_MxA_danger]').hide();
		$('[id^=div_MxA_dangerNo]').hide();
	};

	function populate_past_mx_assessments (data) {
		//Get data arrays
		var pat_demog = data.pat_demog;
		var pat_assessments = data.pat_assessments;
		//Pat_demog data				
		var lastname = pat_demog[0].lastname;
		var firstname = pat_demog[0].firstname;
		// var identifier = pat_demog[0].identifier;
		// var site = pat_demog[0].site;
		var doa = moment(pat_demog[0].doa,"YYYY-MM-DD").format('YYYY-MM-DD');
			var name = ''+lastname+' '+firstname+''
			// var details = ''+identifier+': '+site+' DOA: '+doa+''

		//Calculate days in Hosptital to chosen meeting date (meeting date - doa)
		// var duration = moment.duration(meeting_date.diff(doa));
		// var days = Math.floor(duration.asDays())
		// var daysInHosp = '  '+days+' days in hospital';

		// Create the past_mx_text
		var text = '';
		for (var i=0; i < pat_assessments.length; i++) {
			var data_meeting_date = moment(pat_assessments[i].meeting_date, "YYYY-MM-DD")
			var data_meeting_date_formatted = data_meeting_date.format('YYYY-MM-DD')
			var updated_at = moment(pat_assessments[i].updated_at, "YYYY-MM-DD").format('YYYY-MM-DD');
			var updated_by	= pat_assessments[i].updated_by
			//NOTE: calculate Days in hosp to meeting date - WILL REPLACE
				//WHEN ADD COLUMN "DAYS IN HOSPITAL" to database
			var diff = moment.duration(data_meeting_date.diff(doa));
			var days_in_hosp = Math.floor(diff.asDays());

			var dangerYesNo = pat_assessments[i].danger_yn
			var drugs_last_changed = pat_assessments[i].drugs_last_changed
			var drugs_not_why = pat_assessments[i].drugs_not_why
			var drugs_change_why = pat_assessments[i].drugs_change_why
			var psychsoc_last_changed = pat_assessments[i].psychsoc_last_changed
			var psychsoc_not_why = pat_assessments[i].psychsoc_not_why
			var psychsoc_change_why = pat_assessments[i].psychsoc_change_why
			var pre_date_yesno = pat_assessments[i].pre_date_yesno
			var pre_date_no_why = pat_assessments[i].pre_date_no_why
			var pre_date = moment(pat_assessments[i].pre_date, "YYYY-MM-DD").format('YYYY-MM-DD')

			

			//Create and populate past Mx Assessments
			text += '________________________________________________'
			text += '\nMEETING DATE:  '+data_meeting_date_formatted+''
			text += '\nSAVED BY:  '+updated_by+'      ON: '+updated_at+''
			text += '\nNAME: '+name+'    DOA:  '+doa+'  DAYS In HOSP: '+days_in_hosp+''
			text += '\n\nPATIENT DANGEROUS (SELF/OTHERS) IF IN APPROVED HOUSING:  '+dangerYesNo+''

			if (dangerYesNo == 'Y') {
				text +='\n   MEDS LAST CHANGED: '+drugs_last_changed+'';
					if (drugs_last_changed == '0-8Weeks') {
						text +='\n'+drugs_change_why+'';
					}else if (drugs_last_changed == 'Gt8Weeks') {
						text +='\n'+drugs_not_why+'';
					};
				text +='\n   PSYCHOSOCIAL LAST CHANGED: '+psychsoc_last_changed+'';
					if (psychsoc_last_changed == '0-3Months') {
						text +='\n'+psychsoc_change_why+'';
					}else if (psychsoc_last_changed == 'Gt3Months') {
						text +='\n'+psychsoc_not_why+'';
					};
			}else if (dangerYesNo == 'N') {
				text +='\n   Date set for Pre-Conference Meeting: '+pre_date_yesno+'';
					if (pre_date_yesno == 'Y') {
						text +='\nDate: '+pre_date+'';
					}else if (pre_date_yesno == 'N') {
						text +='\n'+pre_date_no_why+'';
					};
			};

			text +='\n\n\n'
		};
		//Enter past assessments into txa_MxA_pastAssessments
		$('#txa_MxA_pastAssessments').val(text)
	}

	function populate_form_if_data_entered_for_meeting_date (data) {
		//Get data arrays
		var pat_demog = data.pat_demog;
		var pat_assessments = data.pat_assessments;
		//Pat_demog data				
		var lastname = pat_demog[0].lastname;
		var firstname = pat_demog[0].firstname;
		var identifier = pat_demog[0].identifier;
		var site = pat_demog[0].site;
		var doa = moment(pat_demog[0].doa,"YYYY-MM-DD").format('YYYY-MM-DD');
			var name = ''+lastname+' '+firstname+''
			var details = ''+identifier+': '+site+' DOA: '+doa+''

		//Calculate days in Hosptital to chosen meeting date (meeting date - doa)
		var duration = moment.duration(meeting_date.diff(doa));
		var days = Math.floor(duration.asDays())
		var daysInHosp = '  '+days+' days in hospital';

		//Get pat_assessment for the date chosen if it exists
		for (var i = 0; i < pat_assessments.length; i++) {
			data_meeting_date = moment(pat_assessments[i].meeting_date, "YYYY_MM_DD").format("YYYY-MM-DD")
			meeting_date_formatted = moment(meeting_date).format("YYYY-MM-DD");
			if (data_meeting_date == meeting_date_formatted) {
				var id = pat_assessments[i].id;
					set_mx_assessment_id(id);

				var updated_at = moment(pat_assessments[i].updated_at, "YYYY-MM-DD").format('YYYY-MM-DD');
				var updated_by	= pat_assessments[i].updated_by

				var dangerYesNo = pat_assessments[i].danger_yn
				var drugs_last_changed = pat_assessments[i].drugs_last_changed
				var drugs_not_why = pat_assessments[i].drugs_not_why
				var drugs_change_why = pat_assessments[i].drugs_change_why
				var psychsoc_last_changed = pat_assessments[i].psychsoc_last_changed
				var psychsoc_not_why = pat_assessments[i].psychsoc_not_why
				var psychsoc_change_why = pat_assessments[i].psychsoc_change_why
				var pre_date_yesno = pat_assessments[i].pre_date_yesno
				var pre_date_no_why = pat_assessments[i].pre_date_no_why
				var pre_date = moment(pat_assessments[i].pre_date, "YYYY-MM-DD").format('YYYY-MM-DD')
			};
		};

		//Populate Demographics
		$('#sp_MxA_pat_name').html(name);
		$('#sp_MxA_pat_details').html(details)
		$('#sp_MxA_days_in_hospital').html(daysInHosp)
		//Danger Assessment
		if (dangerYesNo == 'Y') {
			// $('#rd_MxA_danger_yes').attr('checked',true);
			$('#slt_MxA_danger_yn').val('Y')
				$('#slt_Mxa_drugsChanged').val(drugs_last_changed);
				if (drugs_last_changed == '0-8Weeks') {					
					$('#txa_MxA_drugWhyChange').val(drugs_change_why);
				}else if (drugs_last_changed == 'Gt8Weeks') {
					$('#txa_MxA_drugNoChange').val(drugs_not_why);
				};

				$('#slt_Mxa_groupChanged').val(psychsoc_last_changed);
			 	if (psychsoc_last_changed == '0-3Months') {
					$('#txa_MxA_groupWhyChange').val(psychsoc_change_why);
				}else if (psychsoc_last_changed == 'Gt3Months') {
					$('#txa_MxA_groupNoChange').val(psychsoc_not_why);
				};

		}else if (dangerYesNo == 'N') {
			$('#slt_MxA_danger_yn').val('N');
			var pre_date_yesno = pre_date_yesno;
			if (pre_date_yesno == 'Y') {
				$('#slt_MxA_pre_date_yesno').val('Y')
				var pre_date = moment(pre_date, "YYYY-MM-DD").format('YYYY-MM-DD')
				$('#dt_MxA_preMeeting').val(pre_date);
			}else if (pre_date_yesno == 'N') {
				$('#slt_MxA_pre_date_yesno').val('N');
				$('#txa_MxA_PreDateNo').val(pre_date_no_why);
			};
		};
	}

	function show_appropriate_divs (data) {
		//Get data arrays
		// var pat_demog = data.pat_demog;
		var pat_assessments = data.pat_assessments;
		//Demographics
		$('#div_MxA_patient_identification').show();
		//Questions
		$('#div_MxA_dangerQuestion').show();

		for (var i = 0; i < pat_assessments.length; i++) {
			data_meeting_date = moment(pat_assessments[i].meeting_date, "YYYY_MM_DD").format("YYYY-MM-DD")
			meeting_date_formatted = moment(meeting_date).format("YYYY-MM-DD");
			if (data_meeting_date == meeting_date_formatted) {

				// var updated_at = moment(pat_assessments[i].updated_at, "YYYY-MM-DD").format('YYYY-MM-DD');
				// var updated_by	= pat_assessments[i].updated_by
				//GET APPROPRIAT VARIABLES
				var dangerYesNo = pat_assessments[i].danger_yn
				var drugs_last_changed = pat_assessments[i].drugs_last_changed
				// var drugs_not_why = pat_assessments[i].drugs_not_why
				// var drugs_change_why = pat_assessments[i].drugs_change_why
				var psychsoc_last_changed = pat_assessments[i].psychsoc_last_changed
				// var psychsoc_not_why = pat_assessments[i].psychsoc_not_why
				// var psychsoc_change_why = pat_assessments[i].psychsoc_change_why
				var pre_date_yesno = pat_assessments[i].pre_date_yesno
				// var pre_date_no_why = pat_assessments[i].pre_date_no_why
				// var pre_date = moment(pat_assessments[i].pre_date, "YYYY-MM-DD").format('YYYY-MM-DD')

				
		

				//Dangerousness
				if (dangerYesNo == 'Y') {
						$('#div_MxA_dangerYes_drug').show();
						if (drugs_last_changed == '0-8Weeks') {					
							$('#div_MxA_dangerYes_drugYes').show();
						}else if (drugs_last_changed == 'Gt8Weeks') {
							$('#div_MxA_dangerYes_drugNo').show();
						};

						$('#slt_Mxa_groupChanged').val(psychsoc_last_changed);
						$('#div_MxA_dangerYes_group').show();
					 	if (psychsoc_last_changed == '0-3Months') {
							$('#div_MxA_dangerYes_groupYes').show();
						}else if (psychsoc_last_changed == 'Gt3Months') {
							$('#div_MxA_dangerYes_groupNo').show();
						};

				}else if (dangerYesNo == 'N') {
					$('#div_MxA_dangerNo_date').show();
					if (pre_date_yesno == 'Y') {
						$('#div_MxA_dangerNo_dateYes').show();
					}else if (pre_date_yesno == 'N') {
						$('#div_MxA_dangerNo_dateNo').show();
					};
				};
				
			};
		};
	}

};	//if ($('body.mx_assessments').length) {
});  //$(function(){