var hailMarkers = [];
var hailCircleMin, hailCircleMax;
var hailInfoWindow;
var nowDate = new Date();
var nowYear = nowDate.getFullYear();
var nowMonth = String(nowDate.getMonth() + 1).padStart(2, '0');
var nowDay = String(nowDate.getDate()).padStart(2, '0');
//callHailMarkers(nowYear+nowMonth+nowDay);
function callHailMarkers(date) {
try {
$.ajax({
   type: "GET",
   url: "https://www.ncdc.noaa.gov/swdiws/json/nx3hail/" + date,
   async: true,
   success: function(data) { 
	   for (i = 0; i < hailMarkers.length; i++) {
                hailMarkers[i].setMap(null);
            }
	   			hailMarkers = [];
				var regExp = /\(([^)]+)\)/;
				var results = data.result;
				var hailMarker;
	   			
	   			$('#hailCount').text("(" + numberWithCommas(data.result.length) + ")");
				for (var i = 0;i<data.result.length;i++) {
				var hailDate = new Date(data.result[i].ZTIME);
				var options = { timeStyle: 'short', hour12: true };
				var hailTime = hailDate.toLocaleTimeString('en-US', options);
				var matches = regExp.exec(data.result[i].SHAPE)
				var lat =  Number(matches[1].split(' ')[1]);
				var long = Number(matches[1].split(' ')[0]);
				hailMarker = new google.maps.Marker({
		                    position: new google.maps.LatLng(lat, long),
		                    clickable: true,
		                    title: "Hail Event",
		                    icon: 'hail.png',
				    content: '<div>Hail Size: ' + data.result[i].MAXSIZE + '"</div><div>Probability: ' + data.result[i].PROB + '%</div><div>Date: ' + nowDate.toDateString() + '</div><div>Time: ' + hailTime + '</div>'
		                });
				
					hailInfoWindow = new google.maps.InfoWindow();
					hailInfoWindow.setContent('');
					 google.maps.event.addListener(hailMarker, 'click', (function (hailMarker, i) {
					 
					return function() {
						if (activeInfoWindow) activeInfoWindow.close();
						 map.setZoom(13);
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
						        title: 'Within maximum radius of hail event (4km)',
							zIndex: 1001,
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
						        title: 'Within minimum radius of hail event (1km)',
							 zIndex: 1001,
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
   error: function(xhr, ajaxOptions, thrownError) {
	 
	   $('#hailCount').text("(0)");
	   if(xhr.status==404) {
		var alertdiv= document.createElement('div');
			alertdiv.innerHTML = "There was an error connecting to the National Oceanic and Atmospheric Administration's hail events server. Please try again later."
		
		$(alertdiv).dialog({
                        resizable: false,
			modal: true,
   			closeOnEscape: false,
    			title: "NOAA Hail Events Error",
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
           console.error("Request failed: " + ajaxOptions, thrownError);
	   }else{
		   console.error(xhr.status);
	callHailMarkers(new Date().getFullYear()+String(new Date().getMonth() + 1).padStart(2, '0')+String(new Date().getDate()).padStart(2, '0'));
	   };
	return;
}
}).fail(function(jqXHR, textStatus, errorThrown) {
	$('#hailCount').text("(0)");
	var alertdiv= document.createElement('div');
	alertdiv.innerHTML = "There was an error connecting to the National Oceanic and Atmospheric Administration's hail events server. Please try again later."

$(alertdiv).dialog({
                        resizable: false,
			modal: true,
   			closeOnEscape: false,
    			title: "NOAA Hail Events Error",
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
           console.error("Request failed: " + textStatus, errorThrown);
       });
}catch (error){
	console.log(error);
	$('#hailCount').text("(0)");
var alertdiv= document.createElement('div');
alertdiv.innerHTML = "There was an error connecting to the National Oceanic and Atmospheric Administration's hail events server. Please try again later."

$(alertdiv).dialog({
                        resizable: false,
			modal: true,
   			closeOnEscape: false,
    			title: "NOAA Hail Events Error",
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
