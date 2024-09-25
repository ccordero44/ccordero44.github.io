function callTheftMarkers(year) {
try {
$.ajax({
   type: "GET",
   url: "https://data.cityofchicago.org/resource/crimes.json?iucr=0810&IUCR=0930&$limit=100000&year=" + year,
   async: false,
   success: function(data) { 
	   for (i = 0; i < theftMarkers.length; i++) {
                theftMarkers[i].setMap(null);
            }
	   			theftMarkers = [];
				var regExp = /\(([^)]+)\)/;
				var results = data;

	   			
	   			$('#theftCount').text("(" + data.length + ")");
				for (var i = 0;i<data.length;i++) {
				var theftDate = new Date(data[i].date);
				var options = { timeStyle: 'short', hour12: true };
				var theftTime = theftDate.toLocaleTimeString('en-US', options);
				
				var lat =  data[i].latitude;
				var long = data[i].longitude;
				theftMarker = new google.maps.Marker({
		                    position: new google.maps.LatLng(lat, long),
		                    clickable: true,
		                    title: "Motor Vehicle Theft",
		                    icon: 'alertSmall.png',
				    content: '<b>Motor Vehicle Theft</b><br />Date: ' + theftDate.toDateString() + '<br />Case Number: ' + data[i].case_number + '<br /><br /><a href="GeneralFOIAFormforDepts.pdf" target="_blank" download="FOIA Request.pdf">FOIA Request</a>'
		                });
				
					theftInfoWindow = new google.maps.InfoWindow();
					theftInfoWindow.setContent('');
					 google.maps.event.addListener(theftMarker, 'click', (function (theftMarker, i) {
					 
					return function() {
						if (activeInfoWindow) activeInfoWindow.close();
						 map.setZoom(13);
                        			map.setCenter(theftMarkers[i].getPosition());
						theftInfoWindow.setContent(this.content);
						 theftInfoWindow.setOptions({maxWidth:'fit-content'});
						theftInfoWindow.open(map, this);
						activeInfoWindow = theftInfoWindow;


						
					};
					})(theftMarker, i));
					
				theftMarkers.push(theftMarker);
			
				};
				
			}, 
   error: function(data) {
	   console.log(data.responseJSON.error);
	callTheftMarkers(new Date().getFullYear());
	return;
}
});
}catch (error){
	console.log(error);
var alertdiv= document.createElement('div');
alertdiv.innerHTML = "There was an error connecting to the City of Chicago Data Portal. Please try again later."

$(alertdiv).dialog({
                        resizable: false,
			modal: true,
   			closeOnEscape: false,
    			title: "City of Chicago Data Portal Error",
			show: "scale",
			hide: "scale",
			buttons: [{ 
			text: "Ok", 
	                	click: function () {  
					$('.ui-dialog-content').dialog('close');
				} 
			}],
	            open: function() {
			$(".ui-dialog-titlebar-close").hide();
                    	$('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-dialog-buttons').css('scale', '.8');
			$('.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix').css('padding','0');
	            	$('div.ui-dialog-buttonset button.ui-button span.ui-button-text').each(function() {
    				$(this).html($(this).parent().attr('text'));
				$(this).parent().css('scale', '.8').css("background","DodgerBlue").css("color", "white").css("margin", "0");
			});
			 },
	            close: function() {
	                $(alertdiv).dialog('destroy');
	            },
		  
	        }).prev(".ui-dialog-titlebar").css("background","DodgerBlue").css("color", "white");
		
}
}
