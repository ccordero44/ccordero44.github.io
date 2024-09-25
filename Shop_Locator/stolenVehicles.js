$.ajax({
    url: "https://data.cityofchicago.org/resource/crimes.json?$limit=10000000&IUCR=0930",
    type: "GET",
}).done(function(data) {

var theft = {
			url: 'theft.png'

		}

	
for (i = 0; i < data.length; i++) {

                theftMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
                    clickable: true,
                    title: 'Motor Vehicle Theft',
                    icon: theft

                });
			theftMarkers.push(theftMarker);

			addInfoWindow(theftMarkers[i], '<b>Motor Vehicle Theft</b><br />Date: ' + data[i].date + '<br />Case Number: ' + data[i].case_number + '<br /><br /><a href="GeneralFOIAFormforDepts.pdf" target="_blank" download="FOIA Request.pdf">FOIA Request</a>');
       }
             google.maps.event.addListener(map, 'zoom_changed', function() {
    
 
 }
});
});
function addInfoWindow(tmarker, message) {


            google.maps.event.addListener(tmarker, 'click', function () {
		    if (activeInfoWindow) activeInfoWindow.close();
            theftInfoWindow.setContent(message);
                theftInfoWindow.open(map, tmarker);
		activeInfoWindow = theftInfoWindow;
            });
        }
