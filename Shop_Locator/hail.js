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
				hailMarkers.push(hailMarker);
				//console.log(lat + "," + long);
				};
				
			}, 
   error: function(data) {

	return;
}
});
}
