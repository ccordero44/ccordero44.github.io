
$.ajax({
			   type: "GET",
			   url: "https://data.austintexas.gov/resource/b4k4-adkb.geojson?$limit=10000",
			   
			}).done(function(data) {
				var redCam = {
					url: 'redCamSmall.png'
					//scaledSize: scaledsize
				}
				//var count = Number($('#redcamCount').text().replace("(", "").replace(")", ""));
				var count = Number(redCamMarkers.length);
				var lng,lat,id,camStatus,detDirection;
				for (var i = 0; i < data.features.length; i++) {
					
     if (data.features[i].geometry !== null && (data.features[i].properties.camera_status === 'TURNED_ON' )) {
						count += 1;
							var lng,lat,id,camStatus,detDirection;
							lng = data.features[i].geometry.coordinates[0];
							lat = data.features[i].geometry.coordinates[1];
							id = data.features[i].properties.camera_id;
							camStatus = data.features[i].properties.camera_status;
							detDirection = data.features[i].properties.primary_st;
							austinRedCamMarker = new google.maps.Marker({
								position: new google.maps.LatLng(lat, lng),
								clickable: true,
								title: 'Traffic Camera ID #' + id,
								icon: redCam

							});
						austinRedCamMarkers.push(austinRedCamMarker);
						addInfoWindow(austinRedCamMarker, '<b>Red Light Camera ID #' + id + '</b><br />Intersection: ' + data.features[i].properties.location_name + '<br />Primary Street: ' + detDirection + '<br /><a href="https://austin-portal.ecourt.com/public-portal/?q=node/412" target="_blank">Search for Tickets</a><br /><a href="https://APD-austintx.govqa.us/WEBAPP/_rs/RequestOpen.aspx?rqst=3" target="_blank">FOIA Request</a>');
      
						}
						
                    }
					google.maps.event.addListener(map, 'zoom_changed', function() {
    
						 for (var i = 0; i < austinRedCamMarkers.length; i++) {
							   if (map.getZoom() >= 14) {
								austinRedCamMarkers[i].setMap(map);
							   }else{
								austinRedCamMarkers[i].setMap(null);
							   }

						 }
						 
						})
					 $('#redcamCount').text("(" + numberWithCommas(count) + ")");
			});
