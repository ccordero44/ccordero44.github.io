var hailMarkers = [];
var hailCircleMin, hailCircleMax;
var hailInfoWindow;
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
	   for (i = 0; i < hailMarkers.length; i++) {
                hailMarkers[i].setMap(null);
            }
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
					 google.maps.event.addListener(hailMarker, 'click', (function (hailMarker, i) {
					return function() {
						 map.setZoom(18);
                        			map.setCenter(hailMarkers[i].getPosition());
						hailInfoWindow.setContent(this.content);
						 hailInfoWindow.setOptions({maxWidth:'fit-content'});
						hailInfoWindow.open(map, this);
						activeInfoWindow = hailInfoWindow;
						 if (!!hailCircleMin) {
						                hailCircleMin.setMap(null);
						            }
						if (!!hailCircleMax) {
						                hailCircleMax.setMap(null);
						            }
						hailCircleMax = new google.maps.Circle({
						        center: hailMarker.getPosition(),
						        radius: 4 * 1000,
						        fillColor: "#f5f500",
						        fillOpacity: 0.2,
						        map: map,
						        strokeColor: "#000000",
						        strokeOpacity: 0.1,
						        title: 'Maximum radius of hail event is 4km',
						        strokeWeight: 2
						      });
						 hailCircleMin = new google.maps.Circle({
						        center: hailMarker.getPosition(),
						        radius: 1 * 1000,
						        fillColor: "#00f500",
						        fillOpacity: 0.2,
						        map: map,
						        strokeColor: "#000000",
						        strokeOpacity: 0.1,
						        title: 'Minimum radius of hail event is 1km',
						        strokeWeight: 2
						      });
						google.maps.event.addListener(hailCircleMin,'mouseover',function(){
						             this.getMap().getDiv().setAttribute('title',this.get('title'));});
		
						google.maps.event.addListener(hailCircleMin,'mouseout',function(){
						             this.getMap().getDiv().removeAttribute('title');}); 
						 
						google.maps.event.addListener(hailCircleMax,'mouseover',function(){
						             this.getMap().getDiv().setAttribute('title',this.get('title'));});
						
						google.maps.event.addListener(hailCircleMax,'mouseout',function(){
						             this.getMap().getDiv().removeAttribute('title');}); 
						
						
					};
					})(hailMarker, i));
					google.maps.event.addListener(map, "click", function (event) {
						if (hailCircleMin){hailCircleMin.setMap(null);}
						if (hailCircleMax){hailCircleMax.setMap(null);}
					});
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
