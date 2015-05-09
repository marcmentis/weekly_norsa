/*
****   POPULATE SELECT BOX.  ******************
    USE:  $('#SelectID').mjm_addOptions(action, value, display, [firstLine], [allValues]);
	i.e., $('#selectTest').mjm_addOptions('../cfc/entryForm.cfc?method=sForDrops_json&Code=Alphabet','VALUE','DISPLAY',{firstLine: 'Letters',allValues: 'Letters', group: 'DEPARTMENT',asynchranous: 'false'});
	action (required) = url, 
	value (required) = option value of select box, 
	display (required) = option display value
	firstLine (optional) = The string that will follow "Choose" as in "Choose string" as the FIRST value in the option list
	allValues (optional) = The string that will follow "All" as in "ALL string" as the SECOND value in the option list
	group (optional) = The value taken from the query that group the list using the <optgroup> tab.
	   $('#selectNote').mjm_addOptions('../cfc/schedule.cfc?method=sForDrops_json2&Code=noteExpiration','VALUE','DISPLAY',{firstLine: 'Note', group: 'GROUPER'}); 
	     N.B., Need to ORDER THE QUERY appropriately as this function will just loop through results, won't perform grouping   
   asynchranous:  ONLY use 'false', default is true. All values beside 'false' are treated as 'true'.
*/

(function($){
	$.fn.mjm_addOptions=function(code, option){
		var settings = $.extend({
			firstLine: null,
			allValues: null,
			group: null,
			asynchranous: null,
			facility: null
		},option||{});
		return this.each(function(){
			var element = $(this);
			var html = '';  //declare html
			var firstLine = settings.firstLine;
			var allValues = settings.allValues;
			var group = settings.group;
			var async = settings.asynchranous;
			var facility = settings.facility;

			if (async == null) {
				async = true;
			};
			if (group != null) {
				group = 'grouper'
			};

			data_for_params = {'code': code, 'facility': facility}
			$.ajax({
				url: '/for_selects_search',
				type: 'GET',
				data: data_for_params,
				dataType: 'json',
				async: async
			}).done(function(data){
				//Clear Select of both 'options' and 'optgroup'
				element.find('option').remove();
				element.find('optgroup').remove();
				//Set type of first line in html
				if(firstLine != null){html+='<option value="-1">' + firstLine + '</option>';}
				if(allValues != null){html+='<option value="allValues">All '+allValues+'</option>';}


				if (group != null) {
					//Enter the first Grouping Category ONLY if data exists i.e., .length>0
					if(data.length != 0){
						var grpName = data[0].grouper;
						   html+='<optgroup label="'+grpName+'">';
					} 
					//Loop through all data	and add group when it changes
					for(var i = 0; i < data.length; i++) {
						if (grpName == data[i].grouper){
						  html += '<option value="' + data[i].value + '">' + data[i].text + '</option>';
						}else{
						  grpName = data[i].grouper;
						  html+='<optgroup label="'+grpName+'">';
						  html += '<option value="' + data[i].value + '">' + data[i].text + '</option>';
						}		  
					}

				}else{
					for(var i = 0; i < data.length; i++){
						html += '<option value="'+data[i].value+'">' + data[i].text + '</option>'
					}
				}
				element.append(html);			
			}).fail(function(request,status,errorThrown){
				alert('Error in add_options');
			}); //End of ajax/done/fail

			}); //return this.each(function(){

	};  //$.fn.mjm_addOptions=function(){
})(jQuery);