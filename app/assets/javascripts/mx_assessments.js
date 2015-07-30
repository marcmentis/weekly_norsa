$(function(){
if ($('body.mx_assessments').length) {
	//VARIABLES
		var user_facility = $('#session-facility').val();

		var pat_id = '';
			function set_id(x){pat_id = x};

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
		$('#grid_MxA_RightContainer').hide();
		//REMOVE
		$('[id^=divDanger]')
			.hide();
		$('[id^=div_MxA_danger')
			.hide();
		 
			
		//dates
		$('[id^=dt], [id^=date]')
			.datepicker({
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

		//Populate TODO and DONE lists
		$('#slt_MxA_ward, #dt_MxA_newDate, #slt_MxA_date_history')
			.change(function(e){
			var id = $(this).attr('id');
			var ward = $('#slt_MxA_ward').val();
			var date = $('#dt_MxA_newDate').val();
			//Setup and Validation
			//When Ward Changed: (i) Populate slt_MxA_date_history (ii) clear dt_MxA_newDate, (iii) clear TODO lists and past history																		
			if (id == 'slt_MxA_ward') {
				// swal(ward)
				popSelectDateHistory(ward);
				$('#dt_MxA_newDate').val('');

			};

			//When newDate is changed: (i) Clear date_history, (ii) clear toDo lists and form data
			if (id == 'dt_MxA_newDate') {
				$('#slt_MxA_date_history').val('-1');
				//the two clears
				clear_todo_done_selects();
			};

			//Populate lists
			popPatientLists()
		});

		//Patient Selected: (i)Show Rt Container, (ii)get pat data
		$('#slt_MxA_to_do').change(function(e){
			var id = $(this).val();
			set_id(id);
			// swal('test', id);
			$('#grid_MxA_RightContainer').show();
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

	//RADIO HANDLERS
		$('#rd_MxA_danger_yes').click(function(){
			checked = $(this).is(':checked');
			if (checked) {
				$('[id^=div_MxA_dangerNo]')
					.hide();
				$('#div_MxA_dangerYes_drug, #div_MxA_dangerYes_group')
					.show();
				$('#div_MxA_dangerYes_drugNo, #div_MxA_dangerYes_groupNo, #div_MxA_dangerYes_drugYes, #div_MxA_dangerYes_groupYes')
					.hide();
			};
		});

		$('#rd_MxA_danger_no').click(function(){
			 checked = $(this).is(':checked');
			if(checked){
				$('#div_MxA_dangerNo_date').show();
				$('[id^=div_MxA_dangerYes]').hide();
				$('[id^=radioPreDat]').attr('checked',false);
				$('#slt_Mxa_drugsChanged, #slt_Mxa_groupChanged').val(-1);
				$('#txa_MxA_drugNoChange, #txa_MxA_drugWhyChange, #txa_MxA_groupNoChange ').val('');
			};
		});

		$('#rd_MxA_preDate_yes').click(function(){
			checked = $(this).is(':checked');
			if (checked) {
				$('#div_MxA_dangerNo_dateNo').hide();
				$('#div_MxA_dangerNo_dateYes').show();
				$('#dt_MxA_preMeeting').val('');
			};
		});
		$('#rd_MxA_preDate_no').click(function(){
			checked = $(this).is(':checked');
			if (checked) {
				$('#div_MxA_dangerNo_dateYes').hide();
				$('#div_MxA_dangerNo_dateNo').show();
				$('#txa_MxA_PreDateNo').val('');
			};
		});

	//BUTTON HANDLERS
		$('#bt_MxA_save').click(function(e){
			// swal('hello')
			data = $('#f_MxA_rightContainer').serialize();
			create_mx_assessment();
		});
function create_mx_assessment () {
	var patient_id = pat_id.toString();
	var url = '/mx_assessments/'
	var params_string = $('#f_MxA_rightContainer').serialize();

	params_string_replace = params_string.replace(/&/g,',')
	params_array = params_string_replace.split(',');
	// alert(params_array);
	// return;
	var params_hash = {};
	for(var i=0, l = params_array.length; i<l; i++){
		first = params_array[i]
		alert(first)
		//split key = value
		// obj[params_array[i]] = x;
	}

	// alert(new_array.length)
	// return;
	var obj = {};
	obj['patient_id'] = '454';
	obj['danger_yn'] = 'Y';
	obj['drugs_last_changed'] = 'd l c';


	// $('#div_MxA_patient_identification').html(replace)


	var data_for_params = {mx_assessment: obj}
	// var data_for_params = $('#f_MxA_rightContainer').serialize();
	// alert(mxassess)
	// return;
	// danger = $('input[name=rd_MxA_danger]:checked').val();
	// alert(danger)
	// var data_for_params = {mx_assessment: {
	// 						patient_id: pat_id.toString(),
	// 						danger_yn: $('input[name=rd_MxA_danger]:checked').val(), 
	// 						drugs_last_changed: $('#slt_Mxa_drugsChanged').val(),
	// 						drugs_not_why: $('#txa_MxA_drugNoChange').val()
	// 						// drugs_change_why: $('#').val(),
	// 						// psychsoc_last_changed: $('#').val(),
	// 						// psychsoc_not_why: $('#').val(),
	// 						// psychsoc_change_why: $('#').val(),
	// 						// meeting_date; $('#').val(),
	// 						// pre_date_yesno: $('#').val(),
	// 						// pre_date_no_why: $('#').val(),
	// 						// pre_date: $('#').val(),
	// 						// updated_by: $('#').val(),
	// 						}
	// 					}

	$.ajax({
		url: url,
		type: 'POST',
		data: data_for_params,
		cache: false,
		dataType: 'json'
	}).fail(function(jqXHR,textStatus,errorThrown){
			alert(''+jqXHR+': '+textStatus+':'+errotThrown+'')
	});
};

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

	//Clear functions
	function clear_todo_done_selects (e) {
		$('#slt_MxA_to_do, #slt_MxA_done').find('option').remove();
	}

	function popPatientLists () { 
		var site = $('#slt_MxA_ward').val();
		var new_date = $('#dt_MxA_newDate').val();
		var date_history = $('#slt_MxA_date_history').val();
		
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

	function popSelectDateHistory (ward) {
		
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
		})
	}

	function get_pat_data () {
		var url = 'mxa_pat_data';
		var data_for_params = {mx_assessment: {id: pat_id}}
		$.ajax({
			url: url,
			type: 'GET',
			data: data_for_params,
			cache: false,
			dataType: 'json'
		}).done(function(data){
				var pat_demog = data.pat_demog;
				lastname = pat_demog.lastname;
				firstname = pat_demog.firstname;
				identifier = pat_demog.identifier;
				site = pat_demog.site;
				doa = data.doa;
				today = getCalendarDate();
				days = datediff(doa,today,'days')

				name = ''+lastname+' '+firstname+''
				details = ''+identifier+': '+site+' DOA: '+doa+''
				daysInHosp = 'Days: '+days+''

				$('#sp_MxA_pat_name').html(name);
				$('#sp_MxA_pat_details').html(details)
				$('#sp_MxA_days_in_hospital').html(daysInHosp)
				
				
		}).fail(function(jqXHR,textStatus,errorThrown){
			alert(''+jqXHR+': '+textStatus+':'+errotThrown+'')
		});
	};

};	//if ($('body.mx_assessments').length) {
});  //$(function(){