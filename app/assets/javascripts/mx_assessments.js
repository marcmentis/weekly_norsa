$(function(){
if ($('body.mx_assessments').length) {

	//VARIABLES
		//textareas
		var width1 = '33em'
		var heightS1 = '20em';
		var heightL1 = '35em';
		var heightEL1 = '55em';

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
			.attr({'value': 'toggle'});
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
			.height('1.5em');
		
	//SELECT HANDLERS
		//populate selects
		$('#selectTimeDrugs').mjm_addOptions('DrugsChanged',{firstLine: 'Drugs Changed'});	
		$('#selectTimeGroups').mjm_addOptions('GroupsChanged',{firstLine: 'Group Changed'});

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



};	//if ($('body.mx_assessments').length) {
});  //$(function(){