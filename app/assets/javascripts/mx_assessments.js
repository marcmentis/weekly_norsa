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
			

			



};	//if ($('body.mx_assessments').length) {
});  //$(function(){