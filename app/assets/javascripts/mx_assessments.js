$(function(){
if ($('body.mx_assessments').length) {
	//VARIABLES
		var user_facility = $('#session-facility').val();
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
					'margin': '0 0 7px 0'})
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
		});

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


		

};	//if ($('body.mx_assessments').length) {
});  //$(function(){