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
	$.fn.mjm_addOptions=function(){
		alert('in new function')
	};  //$.fn.mjm_addOptions=function(){
})(jQuery);