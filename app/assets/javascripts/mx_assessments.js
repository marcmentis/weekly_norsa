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
		$('[id^=divDanger]')
			.hide();
		 //Rt container
			
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
		$('[id^=select]')
			.css({'width': '125px'})
		//buttons
		$('[id^=bt]')
			.button();
		$('#btTogNotes')
			.addClass('reduce_button')
		$('[id^=b')
			.button()
			.addClass('reduce_button');
		//textareas
		$('[id^=txa]')
			.addClass('text-content left');
		$('#txa_past_MxAssessments')
			.width('92%') //?? actually recorded as 98%
			.height(heightS1)

		$('[id^=textArea')
			.addClass('text-content left')
			.width('92%')
			.height(heightS1);
		
	//SELECT HANDLERS
		//populate selects
		$('#selectTimeDrugs').mjm_addOptions('DrugsChanged',{firstLine: 'Drugs Changed'});	
		$('#selectTimeGroups').mjm_addOptions('GroupsChanged',{firstLine: 'Group Changed'});
		$('#slt_MxA_ward').mjm_addOptions('ward', {firstLine: 'All Wards', facility: user_facility, group: true})

		//Expose appropriate questions for drug changes
		$('#selectTimeDrugs').change(function(){
			value = $(this).val();
			// swal(value)
			if(value == -1){
				$('#divDangerYes1Yes, #divDangerYes1YesChange').hide();
				$('#textAreaDrugNoChange, #textAreaDrugWhyChange').val('');
				return true;
			};
			if(value == '0-8Weeks'){
				$('#divDangerYes1YesChange').show();
                $('#divDangerYes1Yes').hide();
				$('#textAreaDrugNoChange').val('');
				return true;
			};
			if(value == 'Gt8Weeks'){
				$('#divDangerYes1Yes').show();
				$('#divDangerYes1YesChange').hide();
				$('#textAreaDrugWhyChange').val('');
				return true;
			}
		});	

		//Expose appropriate questions for group changes
		$('#selectTimeGroups').change(function(){
			value = $(this).val();
			// swal(value);
			if (value == -1) {
				$('#divDangerYes2YesChange, #divDangerYes2Yes').hide();
				$ ('#textAreaGroupNoChange, textAreaGroupWhyChange').val('');
				return true;
			};
			if (value == '0-3Months') {
				$('#divDangerYes2Yes').hide();
				$('#divDangerYes2YesChange').show();
				$ ('#textAreaGroupWhyChange').val('');
			};
			if (value == 'Gt3Months') {
				$('#divDangerYes2YesChange').hide();
				$('#divDangerYes2Yes').show();
				$ ('#textAreaGroupNoChange').val('');
			};
		});

	//RADIO HANDLERS
		$('#radioDangerYes').click(function(){
			checked = $(this).is(':checked');
			if (checked) {
				$('[id^=divDangerNo]')
					.hide();
				$('#divDangerYes1, #divDangerYes2')
					.show();
				$('#divDangerYes1Yes, #divDangerYes2Yes, #divDangerYes1YesChange, #divDangerYes2YesChange')
					.hide();
			};
		});

		$('#radioDangerNo').click(function(){
			 checked = $(this).is(':checked');
			if(checked){
				$('#divDangerNo1').show();
				$('[id^=divDangerYes]').hide();
				$('[id^=radioPreDat]').attr('checked',false);
				$('#selectTimeDrugs, #selectTimeGroups').val(-1);
				$('#textAreaDrugNoChange, #textAreaDrugWhyChange, #textAreaGroupNoChange ').val('');
			};
		});

		$('#radioPreDateYes').click(function(){
			checked = $(this).is(':checked');
			if (checked) {
				$('#divDangerNo1Yes').hide();
				$('#divDangerNo1No').show();
				$('#datePreMeeting').val('');
			};
		});
		$('#radioPreDateNo').click(function(){
			checked = $(this).is(':checked');
			if (checked) {
				$('#divDangerNo1No').hide();
				$('#divDangerNo1Yes').show();
				$('#textAreaNoPreDate').val('');
			};
		});

	//BUTTON HANDLERS
		$('#btTogNotes').click(function(){
			element = $('#txa_past_MxAssessments');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});

		$('#bTogDrugWhyChange').click(function(){
			element = $('#textAreaDrugWhyChange');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});
		$('#bTogDrugNoChange').click(function(){
			element = $('#textAreaDrugNoChange');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});
		$('#bTogGroupChange').click(function(){
			element = $('#textAreaGroupWhyChange');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});
		$('#bTogGroupNoChange').click(function(){
			element = $('#textAreaGroupNoChange');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});
		$('#bTogNoPreDate').click(function(){
			element = $('#textAreaNoPreDate');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});


		

};	//if ($('body.mx_assessments').length) {
});  //$(function(){