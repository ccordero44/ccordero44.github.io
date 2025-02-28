
$.ajax({
    url: "https://data.cityofchicago.org/resource/thvf-6diy.json",
    type: "GET",
}).done(function(data) {
//  alert("Retrieved " + data.length + " records from the dataset!");
//  console.log(data);
var redCam = {
			url: 'redCamSmall.png'
			//scaledSize: scaledsize
		}
	//$('#redcamCount').text("(" + data.length + ")");
	//var count = Number($('#redcamCount').text().replace("(", "").replace(")", ""));
	var count = Number(data.length);
	var redCamcount = Number(austinRedCamMarkers.length);
	var totalCount = count + redCamcount;
$('#redcamCount').text("(" + numberWithCommas(totalCount) + ")");
	
for (i = 0; i < data.length; i++) {

                redCamMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
                    //map: map,
                    clickable: true,
                    title: 'Red Light Camera',
                    icon: redCam

                });
			redCamMarkers.push(redCamMarker);
			var link = "GeneralFOIAFormforDepts.pdf"; 
			addInfoWindow(redCamMarkers[i], '<b>Red Light Camera</b><br />Intersection: ' + data[i].intersection + '<br />First Approach: ' + data[i].first_approach + '<br /><a href="https://pay.chicago.gov/workflows/tickets" target="_blank">Search for Tickets</a><br /><a href="GeneralFOIAFormforDepts.pdf" target="_blank" download="FOIA Request.pdf">FOIA Request</a>');
       }
             google.maps.event.addListener(map, 'zoom_changed', function() {
    
    // iterate over markers and call setVisible
 for (i = 0; i < data.length; i++) {
       if (map.getZoom() >= 14) {
       redCamMarkers[i].setMap(map);
       }else{
       redCamMarkers[i].setMap(null);
       }

 }
});
});
function addInfoWindow(RCmarker, message) {

//            var redcamInfoWindow = new google.maps.InfoWindow({
//                content: message
//            });
     //  google.maps.event.addListener(map, "click", function (event) {
                   // redcamInfoWindow.close();
           //     });
            google.maps.event.addListener(RCmarker, 'click', function () {
		    if (activeInfoWindow) activeInfoWindow.close();
            redcamInfoWindow.setContent(message);
                redcamInfoWindow.open(map, RCmarker);
		activeInfoWindow = redcamInfoWindow;
            });
        }
