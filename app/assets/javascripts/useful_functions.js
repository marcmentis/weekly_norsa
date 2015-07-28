
function ajax_error1 (header, msg, divname, msec) {
        //Usage:  Insert error list in respons to ajax fail/error (also jqGrid etc.)
            // 'header' - header for error list - describe where it came from
            // 'msg'  - json object (key,value) listing one or more error messages
            // 'divname' - id of div container for error message list. 
                // SSH for div: $('#ForSelectErrors').addClass('error_explanation').hide();
            // 'msec' [OPTIONAL] - length of time error message will be displayed
                // Error remains if omitted
            // EXAMPLE:
            // if (jqXHR.responseText.includes("Pundit::NotAuthorizedError")) {
            //                 msg = {"error": "User not authorized"};                           
            //             } else {
            //                 msg = {'HTTP status code': '' + jqXHR.status + '', 
            //                        'textStatus': '' + textStatus + '', 
            //                       'errorThrown ': '' + errorThrown +''
            //                   };
            //             };
            // ajax_error1('Search Error', msg, 'ForSelectErrors', '3000')
		var newHTML;
        newHTML = '<h3>'+header+'</h3>';	
        newHTML += '<ul>';
    	$.each(msg, function(key, value){
	        	newHTML += '<li>'+ value +'</li>';
	        });
        newHTML += '</ul>';
        $('#'+divname+'').show().html(newHTML)
        // msec is optional. Only execute setTimeout if undefined
        if (typeof msec !== "undefined") {
	        setTimeout(function(){
	        	$('#'+divname+'').html('').hide();
	        }, msec);
        };      	
	};

 //Triple Toggle Function 
        function tripleToggle(element, heightS1, heightL1, heightEL1){
         //Toggle textArea size based on size of textArea
            height = element.height();
            if (height == heightS1){
               element.height(heightL1);
            }else if(height == heightL1){
               element.height(heightEL1);
            }else if(height == heightEL1){
                element.height(heightS1)
            }
     }; 