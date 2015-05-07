$(function(){
if ($('body.static_pages').length) {
	//button
	$('[id^=bt]').button().addClass('reduce_button')
	$('#lastname').addClass('input_field')
			$('#bEdit').click(function(){
				alert('from alert')
			});
	//dates
	$('[id^=dt]').datepicker().css({'width':'7em'});

	//dialog
	$('[id^=dbx]').hide();
	$('#btModalDialog').click(function(){
		$('#dbxModalDialog').dialog({
			modal: true, 
			buttons: {
		        Ok: function() {
		          $( this ).dialog( "close" );
		        }
	      }
	    });
	});
	$('#btDialogConfirm').click(function(){
		$('#dbxDialogConfirm').dialog({
			resizable: false,
			height:240,
			modal: true,
			buttons: {
				"Delete all items": function(){
					$(this).dialog('close');
				},
				Cancel: function(){
					$(this).dialog('close')
				}
			}
		});
	});



	$('[id^=dt]').datepicker();

	$('[id^=bt]').button();

};
});
