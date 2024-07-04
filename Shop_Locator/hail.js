var hailMarkers = [];
var nowDate = new Date();
var nowYear = nowDate.getFullYear();
var nowMonth = String(nowDate.getMonth() + 1).padStart(2, '0');
var nowDay = String(nowDate.getDate()).padStart(2, '0');
callHailMarkers(nowYear+nowMonth+nowDay);
function callHailMarkers(date) {
$.ajax({
   type: "GET",
   url: "https://www.ncdc.noaa.gov/swdiws/json/nx3hail/" + date,
   async: false,
   success: function(data) { 
	   			hailMarkers = [];
				var regExp = /\(([^)]+)\)/;
				var results = data.result;
				var hailMarker;
				for (var i = 0;i<data.result.length;i++) {
				//console.log(data.result[i].SHAPE);
				var matches = regExp.exec(data.result[i].SHAPE)
				var lat =  Number(matches[1].split(' ')[1]);
				var long = Number(matches[1].split(' ')[0]);
				hailMarker = new google.maps.Marker({
		                    position: new google.maps.LatLng(lat, long),
		                    clickable: true,
		                    title: "Hail Reported",
		                    icon: 'hail.png'
		
		                });
					var prob = data.result[i].PROB;
					var size = data.result[i].MAXSIZE;
					hailInfoWindow = new google.maps.InfoWindow();
					hailInfoWindow.setContent('');
					 google.maps.event.addListener(hailMarker, 'click', (function () {
						hailInfoWindow.setContent('<div>Hail Size: ' + size + '"</div><div>Probability: ' + prob + '%</div><div>Date: ' + nowDate.toDateString() + '</div>');
						 hailInfoWindow.setOptions({maxWidth:'fit-content'});
						hailInfoWindow.open(map, hailMarker);
						activeInfoWindow = hailInfoWindow;
						 
					}));
				hailMarkers.push(hailMarker);
				//console.log(lat + "," + long);
				};
				
			}, 
   error: function(data) {

	return;
}
});
}
