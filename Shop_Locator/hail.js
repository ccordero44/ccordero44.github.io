var hailMarkers = [];
var nowDate = new Date();
var nowYear = nowDate.getFullYear();
var nowMonth = String(nowDate.getMonth() + 1).padStart(2, '0');
var nowDay = String(nowDate.getDate()).padStart(2, '0');
//callHailMarkers(nowYear+nowMonth+nowDay);
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
	   			
	   			$('#hailCount').text("(" + data.result.length + ")");
				for (var i = 0;i<data.result.length;i++) {
				
				var matches = regExp.exec(data.result[i].SHAPE)
				var lat =  Number(matches[1].split(' ')[1]);
				var long = Number(matches[1].split(' ')[0]);
				hailMarker = new google.maps.Marker({
		                    position: new google.maps.LatLng(lat, long),
		                    clickable: true,
		                    title: "Hail Event",
		                    icon: 'hail.png',
				    content: '<div>Hail Size: ' + data.result[i].MAXSIZE + '"</div><div>Probability: ' + data.result[i].PROB + '%</div><div>Date: ' + nowDate.toDateString() + '</div>'
		
		                });
				
					hailInfoWindow = new google.maps.InfoWindow();
					hailInfoWindow.setContent('');
					 google.maps.event.addListener(hailMarker, 'click', (function () {
						 
						hailInfoWindow.setContent(this.content);
						 hailInfoWindow.setOptions({maxWidth:'fit-content'});
						hailInfoWindow.open(map, this);
						activeInfoWindow = hailInfoWindow;
						 
					}));
				hailMarkers.push(hailMarker);
				//console.log(lat + "," + long);
				};
				
			}, 
   error: function(data) {
	   console.log(data.responseJSON.error);
	callHailMarkers(new Date().getFullYear()+String(new Date().getMonth() + 1).padStart(2, '0')+String(new Date().getDate()).padStart(2, '0'));
	return;
}
});
}
