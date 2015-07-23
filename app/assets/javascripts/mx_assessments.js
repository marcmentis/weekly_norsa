$(function(){
if ($('body.mx_assessments').length) {

	//VARIABLES
		//textareas
		var width1 = '35em'
		var heightS1 = '20em';
		var heightL1 = '35em';
		var heightEL1 = '55em';

	// STYLING
		//divs
		$('#divMxAssessPageWrapper')
			.addClass('pad_3_sides');
		$('#divMxAssessPageInnerWrapper')
			.addClass('centered')
			.css({'width':'85em',
				'overflow': 'hidden'});
		$('#divTitle')
			.css({'text-align': 'center',
					'color': '#2e6e9e',
					'font-size': '17px',
					'font-weight': 'bold',
					'text-align': 'center',
					'margin': '0 0 7px 0'})
		$('#divMxAssessRtContainer')
			.addClass('float_right form_container')
			.css({'width': '40em'});
		$('#divMxAssessLtContainer')
			.addClass('float_left form_container')
			.css({'width':'40em'});
		$('#divMxAssessToDo')
			.addClass('float_left');
		$('#divMxAssessDone')
			.addClass('float_right');
		$('#divMxAssessLtMiddle')
			.css({'overflow': 'hidden'})
		$('#divMxAssessLtBottom')
			.addClass('clear_both');
		$('#divMxAssessLtTop, #divMxAssessLtMiddle')
			.css({'margin-bottom': '1em'})

		//dates
		$('[id^=dt]')
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
			.css({'width': '18em',
				'overflow': 'hidden'});
		//buttons
		$('[id^=bt]')
			.button();
		$('#btTogNotes')
			.addClass('reduce_button')
			.attr({'value': 'toggle'});
		//textareas
		$('[id^=txa')
			.addClass('texts');
		$('#txa_past_MxAssessments')
			.width(width1)
			.height(heightS1)
			



};	//if ($('body.mx_assessments').length) {
});  //$(function(){