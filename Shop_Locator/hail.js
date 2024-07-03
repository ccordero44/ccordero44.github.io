var hailMarkers = [];
$.ajax({
   type: "GET",
   url: "https://www.ncdc.noaa.gov/swdiws/json/nx3hail/20240222",
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
                    icon: 'https://www.gstatic.com/mapspro/images/stock/1483-weather-snow.png'

                });
				hailMarkers.push(hailMarker);
				//console.log(lat + "," + long);
				};
				
			}, 
   error: function(data) {

	return;
}
});
