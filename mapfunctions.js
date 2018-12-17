function AutocompleteDirectionsHandler(map) {

            this.map = map;
            this.originPlaceId = null;
            this.travelMode = 'DRIVING';
            var originInput = document.getElementById('origin-input');
            this.directionsService = new google.maps.DirectionsService;
            this.directionsDisplay = new google.maps.DirectionsRenderer;
            this.directionsDisplay.setMap(map);

            var btnClickme = document.getElementById('clickMe');
            var clearMap = document.getElementById('clear');

            var originAutocomplete = new google.maps.places.Autocomplete(
                originInput, {
                    placeIdOnly: true
                });
            this.setupPlaceChangedListener(originAutocomplete, 'ORIG');

        }

        AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (autocomplete, mode) {
            var me = this;
            autocomplete.bindTo('bounds', this.map);
            autocomplete.addListener('place_changed', function () {
                var place = autocomplete.getPlace();
                if (!place.place_id) {
                    window.alert("Please select an option from the dropdown list.");
                    return;
                }
                me.originPlaceId = place.place_id;
                me.originName = place.name;
                me.originIcon = place.icon;
                me.originPhotos = place.photos;
                var isEmpty = document.getElementById("origin-input");
                var geocoder = new google.maps.Geocoder();
                var service = new google.maps.places.PlacesService(map);
                geocoder.geocode({
                    'address': isEmpty.value
                }, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
						
                        var str3 = results[0].geometry.location;
                      input = str3;
						displayCoordinates(str3);
                        marker = new google.maps.Marker({
                            position: str3,
                            title: 'Origin Location',
                            animation: google.maps.Animation.DROP,
                            map: map
                        });
                       
                        
                        quickDist();
                        map.setZoom(10);
                        map.setCenter(marker.getPosition());
                        tempmarker.push(marker);
                        
                        google.maps.event.addListener(marker, 'click', function () {
                        var terr;
                        
                        if (parseInt(dist, 10) < 50) {
                        	 terr = "Bob's territory (" + dist + ")";
                        }else
                        	terr = "Out of area";
                        
                            infowindow.setContent('<div><b>' + me.originName + '</b></br></br>' + terr + '<br></div>');
								
                            infowindow.open(map, this);
                            map.setZoom(20);
                            map.setCenter(marker.getPosition());
                        });
                        var inputtest = document.getElementById("origin-input");
                        inputtest.addEventListener('click', function () {
                            removeMarkers();
                        });
  			
				
                        document.getElementById("clickMe").disabled = false;

                    }
                });
            });
        }

        function removeMarkers() {
			for (i=0; i < custommarker.length; i++) {
			custommarker[i].setMap(null);
			}
            for (i = 0; i < tempmarker.length; i++) {
                tempmarker[i].setMap(null);
      
            }
        }
         function showPoly() {
		//map.setMapTypeId(google.maps.MapTypeId["TERRAIN"]);
            for (i = 0; i < tempcounties.length; i++) {
                tempcounties[i].setMap(map);
            }
        }
        function hidePoly() {
        //map.setMapTypeId(google.maps.MapTypeId["ROADMAP"]);
            for (i = 0; i < tempcounties.length; i++) {
                tempcounties[i].setMap(null);
            }
        }
     function clicky() {
        document.getElementById("testDiv").style.display = "none";
        document.getElementById("dvTable").style.display = "none";
            infowindow.close();
            map.setOptions({
                mapTypeControl: false,
            });
            geocoder.geocode({
                'address': document.getElementById('origin-input').value
            },
		
                function (results, status) {
                
                    if (status == google.maps.GeocoderStatus.OK) {


                        var sizeMap = document.getElementById("map");
                        document.getElementById("myForm").style.visibility = "visible";
                        document.getElementById("wholetable").style.display = "inherit";
                        sizeMap.style.width = "55%";

                        var srt = document.getElementById("orig"),
                            srt1 = document.getElementById("origin-input");
                        srt.value = srt1.value;

                        var origin = document.getElementById("origin-input"),
                            service = new google.maps.DistanceMatrixService();
				
					
                        service.getDistanceMatrix({
                            origins: [origin.value],
                            destinations: alldestinations,
                            unitSystem: google.maps.UnitSystem.IMPERIAL,
                            travelMode: google.maps.TravelMode.DRIVING,
                            avoidHighways: false,
                            avoidTolls: false

                        },
						
                            callback
                        );
                       
					
				
                        function callback(response, status) {
                       
                            var orig = document.getElementById("orig");
							var destinations = response.destinationAddresses;
                            if (status == "OK") {
                            



                                for (i = 0; i < shops.length; i++) {

                                    
                                    
	var tablelist = new Array();
	tablelist.push(["Shop Name", "Travel Distance", "Travel Time", "Time", "Dist"]);

	var table = document.createElement("TABLE");
	   
	var columnCount = tablelist[0].length;

	var row = table.insertRow(-1);

	    var headerCell1 = document.createElement("TH");
	    var headerCell2 = document.createElement("TH");
	    var headerCell3 = document.createElement("TH");
	    var headerCell4 = document.createElement("TH");
	    var headerCell5 = document.createElement("TH");
	
	    headerCell1.innerHTML = tablelist[0][0];
	    headerCell1.setAttribute('class', "sorttable_nosort");
	    headerCell2.innerHTML = tablelist[0][1];
	    headerCell2.setAttribute('class', "sorttable_nosort");
	    headerCell3.innerHTML = tablelist[0][2];
	    headerCell3.setAttribute('class', "sorttable_nosort");
	    headerCell4.innerHTML = tablelist[0][3];
	    headerCell4.setAttribute('style', "display: none;");
	    headerCell5.innerHTML = tablelist[0][4];
		headerCell5.setAttribute('style', "display: none;");
	    row.appendChild(headerCell1);
	    row.appendChild(headerCell2);
	    row.appendChild(headerCell3);
	    row.appendChild(headerCell4);
	    row.appendChild(headerCell5);
	    

	for (var i = 0; i < shops.length; i++) {
	    row = table.insertRow(-1);
	    	var myClick = "myClick(" + i + ");";
	    	var cell1 = document.createElement('td'); //row.insertCell(-1);
			var cell2 = document.createElement('td'); //row.insertCell(0);
			var cell3 = document.createElement('td'); //row.insertCell(1);
			var cell4 = document.createElement('td');
			var cell5 = document.createElement('td');
	        cell2.innerHTML = '<a href="#" onclick="' + myClick + '">' + shops[i][0] + '</a>'
	        cell2.setAttribute('id', "shop" + i);
	        cell3.innerHTML = response.rows[0].elements[i].distance.text;
	        cell3.setAttribute('id',"dist" + i);
	        cell1.innerHTML = response.rows[0].elements[i].duration.text;
	        cell1.setAttribute('id',"time" + i);
	        cell4.innerHTML = response.rows[0].elements[i].duration.value;
	        cell4.setAttribute('id', "timeVal" + i);
	        cell4.setAttribute('class', "sorttable_numeric");
	        cell4.setAttribute('style', "display: none;");
	        cell5.innerHTML = response.rows[0].elements[i].distance.value;
	        cell5.setAttribute('id', "distVal" + i);
	        cell5.setAttribute('class', "sorttable_numeric");
	        cell5.setAttribute('style', "display: none;");
	      	row.appendChild(cell2);
	      	row.appendChild(cell3);
	      	row.appendChild(cell1);
	      	row.appendChild(cell4);
	      	row.appendChild(cell5);
	
	}
	
	var myTable = document.getElementById("myTable");
		
		while(myTable.hasChildNodes())
		{
		   myTable.removeChild(myTable.firstChild);
		}
	myTable.appendChild(table);
    sorttable.makeSortable(table);
                                    


                                }

                                sortDist();
								

                            } 
                            
							
                        } 
					

                    } 

                });



        }
		
	function testtable() {
			var tablelist = new Array();
			    tablelist.push(["Shop Name", "Travel Distance", "Travel Time", "Time", "Dist"]);
			 
			    var table = document.createElement("TABLE");
			       
			    var columnCount = tablelist[0].length;

			    var row = table.insertRow(-1);
			        var headerCell1 = document.createElement("TH");
			        var headerCell2 = document.createElement("TH");
			        var headerCell3 = document.createElement("TH");
			        var headerCell4 = document.createElement("TH");
			        var headerCell5 = document.createElement("TH");
			   
			        headerCell1.innerHTML = tablelist[0][0];
			        headerCell2.innerHTML = tablelist[0][1];
			        headerCell3.innerHTML = tablelist[0][2];
			        headerCell4.innerHTML = tablelist[0][3];
			        headerCell4.setAttribute('style', "display: none;");
			        headerCell5.innerHTML = tablelist[0][4];
			    	headerCell5.setAttribute('style', "display: none;");
			        row.appendChild(headerCell1);
			        row.appendChild(headerCell2);
			        row.appendChild(headerCell3);
			        row.appendChild(headerCell4);
			        row.appendChild(headerCell5);

			    for (var i = 0; i < shops.length; i++) {
			        row = table.insertRow(-1);
			        	var myClick = "myClick(" + i + ");";
			        	var cell1 = document.createElement('td'); //row.insertCell(-1);
						var cell2 = document.createElement('td'); //row.insertCell(0);
						var cell3 = document.createElement('td'); //row.insertCell(1);
						var cell4 = document.createElement('td');
						var cell5 = document.createElement('td');
			            cell2.innerHTML = '<a href="#" onclick="' + myClick + '">' + shops[i][0] + '</a>'
			            cell2.setAttribute('id', "shop" + i);
			            cell3.innerHTML = response.rows[0].elements[i].distance.text;
			            cell3.setAttribute('id',"dist" + i);
			            cell1.innerHTML = response.rows[0].elements[i].duration.text;
			            cell1.setAttribute('id',"time" + i);
			            cell4.innerHTML = response.rows[0].elements[i].duration.value;
			            cell4.setAttribute('id', "timeVal" + i);
			            cell4.setAttribute('class', "sorttable_numeric");
			            cell4.setAttribute('style', "display: none;");
			            cell5.innerHTML = response.rows[0].elements[i].distance.value;
			            cell5.setAttribute('id', "distVal" + i);
			            cell5.setAttribute('class', "sorttable_numeric");
			            cell5.setAttribute('style', "display: none;");
			          	row.appendChild(cell2);
			          	row.appendChild(cell3);
			          	row.appendChild(cell1);
			          	row.appendChild(cell4);
			          	row.appendChild(cell5);
			 
			    }
			 
			    var myTable = document.getElementById("myTable");
			    	
					while(myTable.hasChildNodes())
					{
					   myTable.removeChild(myTable.firstChild);
					}
			    myTable.appendChild(table);
	}
	
     function quickDist() {
     
            geocoder.geocode({
                'address': document.getElementById('origin-input').value
            },
                function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var srt = document.getElementById("orig"),
                            srt1 = document.getElementById("origin-input");
                        srt.value = srt1.value;

                        var origin = document.getElementById("origin-input"),
                            service = new google.maps.DistanceMatrixService();
                        service.getDistanceMatrix({
                            origins: [origin.value],
                            destinations: alldestinations,
                            unitSystem: google.maps.UnitSystem.IMPERIAL,
                            travelMode: google.maps.TravelMode.DRIVING,
                            avoidHighways: false,
                            avoidTolls: false
                        },
                            callback
                        );
                        function callback(response, status) {
                            var orig = document.getElementById("orig");
                            if (status == "OK") {
				
							var tablelist = new Array();
			    tablelist.push(["Shop Name", "Travel Distance", "Travel Time", "Time", "Dist"]);
			 
		
			    var table = document.createElement("TABLE");
			       
		
			    var columnCount = tablelist[0].length;
		
			    var row = table.insertRow(-1);
		
			        var headerCell1 = document.createElement("TH");
			        var headerCell2 = document.createElement("TH");
			        var headerCell3 = document.createElement("TH");
			        var headerCell4 = document.createElement("TH");
			        var headerCell5 = document.createElement("TH");
			   
			        headerCell1.innerHTML = tablelist[0][0];
			        headerCell2.innerHTML = tablelist[0][1];
			        headerCell3.innerHTML = tablelist[0][2];
			        headerCell4.innerHTML = tablelist[0][3];
			        headerCell4.setAttribute('style', "display: none;");
			        headerCell5.innerHTML = tablelist[0][4];
			    	headerCell5.setAttribute('style', "display: none;");
			        row.appendChild(headerCell1);
			        row.appendChild(headerCell2);
			        row.appendChild(headerCell3);
			        row.appendChild(headerCell4);
			        row.appendChild(headerCell5);
			        

			    for (var i = 0; i < shops.length; i++) {
			        row = table.insertRow(-1);
			        	var myClick = "myClick(" + i + ");";
			        	var cell1 = document.createElement('td'); //row.insertCell(-1);
						var cell2 = document.createElement('td'); //row.insertCell(0);
						var cell3 = document.createElement('td'); //row.insertCell(1);
						var cell4 = document.createElement('td');
						var cell5 = document.createElement('td');
			            cell2.innerHTML = '<a href="#" onclick="' + myClick + '">' + shops[i][0] + '</a>'
			            cell2.setAttribute('id', "shop" + i);
			            cell3.innerHTML = response.rows[0].elements[i].distance.text;
			            cell3.setAttribute('id',"dist" + i);
			            cell1.innerHTML = response.rows[0].elements[i].duration.text;
			            cell1.setAttribute('id',"time" + i);
			            cell4.innerHTML = response.rows[0].elements[i].duration.value;
			            cell4.setAttribute('id', "timeVal" + i);
			            cell4.setAttribute('class', "sorttable_numeric");
			            cell4.setAttribute('style', "display: none;");
			            cell5.innerHTML = response.rows[0].elements[i].distance.value;
			            cell5.setAttribute('id', "distVal" + i);
			            cell5.setAttribute('class', "sorttable_numeric");
			            cell5.setAttribute('style', "display: none;");
			          	row.appendChild(cell2);
			          	row.appendChild(cell3);
			          	row.appendChild(cell1);
			          	row.appendChild(cell4);
			          	row.appendChild(cell5);
			 
			    }
			 
			    var myTable = document.getElementById("myTable");
			    	
					while(myTable.hasChildNodes())
					{
					   myTable.removeChild(myTable.firstChild);
					}
			    myTable.appendChild(table);
							
		
                                for (i = 0; i < shops.length; i++) {
                                    var dist = "dist" + i;
                                    var distElement = document.getElementById(dist);
								if (typeof(distElement) != 'undefined' && distElement != null)
									{
									  distElement.innerHTML = response.rows[0].elements[i].distance.text;
									}

                                };

                            } else {
                                window.alert("Error: " + status);
                            }
                        }
                    } else {
                        window.alert("Error: line 1152" + status);
                    }
                });
        }

        function getDir() {
        
		document.getElementById("dvTable").style.display = "none";
		var temporigin = document.getElementById("origin-input").value
		    geocoder.geocode({
                'address': temporigin
            },

                function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var origin = results[0].geometry.location;
                        var str = document.getElementById("markerPos").innerHTML;
                        var str2 = str.replace("(", "");
                        var str3 = str2.replace(")", "");
                        var destination = str3

                        var request = {
                            origin: origin,
                            destination: destination,
                            travelMode: google.maps.DirectionsTravelMode.DRIVING

                        };

                        directionsService.route(request, function (response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(response);
                            }
                        });

                        if (!!activeInfoWindow) {
                            activeInfoWindow.close();
                        }
                    } else {
                        document.getElementById('clientAddress').value =
                            "Directions cannot be computed at this time.";
                        window.alert("Please enter a location and select an option from the dropdown list.");

                    }

                });

        }
        
         function sortAlpha() {
            var myTH = document.getElementsByTagName("th")[0];
            sorttable.innerSortFunction.apply(myTH, []);
        }

        function sortTime() {
        	document.getElementById("sortMe").style.display = "none";
            var myTH = document.getElementsByTagName("th")[3];
            sorttable.innerSortFunction.apply(myTH, []);
            document.getElementById("sortedBy").innerHTML = '<i class="fas fa-clock sortIcon"></i>' + " (SHOPS BEING SORTED BY TIME) " + '<i class="fas fa-clock sortIcon"></i>'
            
            document.getElementById("sortMe2").style.display = "inherit";
        }
        function sortDist() {
        	document.getElementById("sortMe2").style.display = "none";
            var myTH = document.getElementsByTagName("th")[4];
            sorttable.innerSortFunction.apply(myTH, []);
            document.getElementById("sortedBy").innerHTML = '<i class="fas fa-map-marked-alt sortIcon"></i>' + " (SHOPS BEING SORTED BY DISTANCE) " + '<i class="fas fa-map-marked-alt sortIcon"></i>'
            
            document.getElementById("sortMe").style.display = "inherit";
        }

function resetSelectElement(selectElement) {
    	selectElement.selectedIndex = 0;  // first option is selected, or
                                     // -1 for no option selected
		}
function resetSelectCounty(selectElement) {
    	selectElement.selectedIndex = 1;  // first option is selected, or
                                     // -1 for no option selected
		}
function clearDir() {
var dropdown = document.getElementById("dropdownContent");

//dropdown.style.display = "none";

  	var marker;
  			if (clickCo == null) {
				}else
			if (clickCo.fillOpacity == .1){
				clickCo.setOptions({fillOpacity:0.2});
				myWindow.style.display = "none";
			}

//			document.getElementById("centerControlDiv").style.display = "inherit";
		//	document.getElementById("mapControlDiv").style.display = "none";
		//	document.getElementById("satControlDiv").style.display = "inherit";

		//	document.getElementById("mapButton").innerHTML = "Map";
			document.getElementById("myTable").innerHTML = "";

  			infowindow.close();
  			document.getElementById("origin-input").focus();
        	resetSelectElement(document.getElementById("testDiv"));
        	document.getElementById("infoDivWrapper").style.display = "none";
        	hidePoly();
        	
        
        	Myappraisers.setMap(null);
            removeMarkers();
            for (i = 0; i < shopmarkers.length; i++) {
                shopmarkers[i].setMap(map);
            }
            document.getElementById("checkbox0").checked = true;
            document.getElementById("checkbox1").checked = false;
            document.getElementById("checkbox2").checked = false;
            document.getElementById("checkbox3").checked = false;
            map.setMapTypeId('roadmap');
            document.getElementById("clickMe").disabled = true;
            document.getElementById("testDiv").style.display = "inherit";
            if (!!activeInfoWindow) {
                activeInfoWindow.close();
            }
            document.getElementById("origin-input").value = null
            var sizeMap = document.getElementById("map");
            document.getElementById("myForm").style.visibility = "hidden";
            document.getElementById("wholetable").style.display = "none";
            document.getElementById("dvTable").style.display = "none";
            sizeMap.style.width = "100%";
            directionsDisplay.set('directions', null);
            map.setCenter(resetBounds.getCenter());
            map.fitBounds(resetBounds);
 

        }

        function checkPlaceholder() {
            var isEmpty = document.getElementById("origin-input");
            var geocoder = new google.maps.Geocoder();
            var service = new google.maps.places.PlacesService(map);
            geocoder.geocode({
                'address': isEmpty.value
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var str3 = results[0].geometry.location
                    //window.alert(str3);
                    service.textSearch({
                        'location:': str3
                    }, function callback(results, status) {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            

                        } else { document.getElementById("clickMe").disabled = true; }
                    });
                }
            });
        }


        function myClick(id) {
            google.maps.event.trigger(markers[id], 'click');

        }

function GenerateTable() {
	
	clearDir();
	
	document.getElementById("dvTable").style.display = "inherit";

	directionsDisplay.set('directions', null);
    
    var shoplist = new Array();
    shoplist.push(["Shop Name", "Street", "City/State/Zip", "Phone", "Fax", "Email"]);
 
    var table = document.createElement("TABLE");
       
     var columnCount = shoplist[0].length;
 
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = shoplist[0][i];
        row.appendChild(headerCell);
       
    }
 
    for (var i = 0; i < shops.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);

            cell.innerHTML = shops[i][j]
          }
 
    }
 
    var dvTable = document.getElementById("dvTable");
    	
		while(dvTable.hasChildNodes())
		{
		   dvTable.removeChild(dvTable.firstChild);
		}
    dvTable.appendChild(table);
    sorttable.makeSortable(table);
    sortAlpha();
    
    for (i = 0; i < shops.length; i++) {
    if (shops[i][8] == ' Tow Service') {
        
    	var cell = table.rows[i+1].cells[0];
    	var text = document.createTextNode(" *");
    	cell.appendChild(text);
       }
      
       
	}
	        var e = document.getElementById("dvTable");
	        
        	var dvPopup = document.getElementById("dvPopup");
		if (dvPopup) {
		e.onmouseover = function() {
  				dvPopup.style.display = "inherit";
			}
		e.onmouseout = function() {
  				dvPopup.style.display = "none";
			}
		}	
}

function showAppraisers() {
//resetSelectCounty(document.getElementById("testDiv"));
var checkbox = document.getElementById("checkbox1");
if (checkbox.checked) {
var dropdown = document.getElementById("dropdownContent");
if (dropdown) {
//dropdown.style.display = "none";
}
Myappraisers.setMap(map);
		map.fitBounds(Myappraisers.getBounds());

}else
Myappraisers.setMap(null);
var dropdown = document.getElementById("dropdownContent");
if (dropdown) {

}
}

function countiesDiv() {

var checkbox = document.getElementById("checkbox2");
if (checkbox.checked) {
var dropdown = document.getElementById("dropdownContent");
if (dropdown) {


}
showPoly();
        var southWest = new google.maps.LatLng(37.067177, -89.285886);
        var northEast = new google.maps.LatLng(42.482513, -87.048794);
        var bounds = new google.maps.LatLngBounds(southWest, northEast); 
        var point = new google.maps.LatLng(39.739182,-89.451439); 
         bounds.extend(point);
         map.fitBounds(bounds); 

}else
hidePoly();
if (clickCo == null) {
				}else
			if (clickCo.fillOpacity == .1){
				clickCo.setOptions({fillOpacity:0.2});
				myWindow.style.display = "none";
			}
var dropdown = document.getElementById("dropdownContent");
if (dropdown) {

}
 }
 
 function satMap() {
var checkbox = document.getElementById("checkbox3");
if (checkbox.checked) {
var dropdown = document.getElementById("dropdownContent");
if (dropdown) {

}
map.setMapTypeId('satellite');

	}else
map.setMapTypeId('roadmap');
var dropdown = document.getElementById("dropdownContent");
if (dropdown) {

}
 }
 
function setMarkers() {
 var checkbox = document.getElementById("checkbox0");
	if (checkbox.checked) {
 			for (i = 0; i < shopmarkers.length; i++) {
                shopmarkers[i].setMap(map);
            }
            map.fitBounds(resetBounds);
    }else
    		for (i = 0; i < shopmarkers.length; i++) {
                shopmarkers[i].setMap(null);
            }
  		
 }
 
function OpenPDF() {
	window.open("Inspection Assignment & Payment Authorization.pdf");
}
function dropdown(){
var dropdown = document.getElementById("dropdownContent");

dropdown.style.display = "block";
}

function changeCSS() {
var wrapper = document.getElementById("mapButton");
var wrapper2 = document.getElementById("container3");
var wrapper3 = document.getElementById("container0");
wrapper3.style.borderRadius = "0px 3px 0px 0px";
wrapper2.style.borderRadius = "0px 0px 3px 3px";
wrapper.style.borderRadius = "3px 3px 0px 3px";
}
function changeCSSback() {
var wrapper = document.getElementById("mapButton");
var wrapper2 = document.getElementById("container3");
wrapper2.style.borderRadius = "0px";
wrapper.style.borderRadius = "3px";
}

function displayCoordinates(pnt) {

          lat = pnt.lat();
          lat = lat.toFixed(4);
          lng = pnt.lng();
          lng = lng.toFixed(4);
   
            input = lat + "," + lng;
     
          
           var latlngStr = input.split(',', 2);
           var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              
              tempAddress = results[0].formatted_address;

            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
        
        var destination = "";
              var origin1 = "1699 Wall St Suite 600, Mt Prospect, IL 60056";
			  var service = new google.maps.DistanceMatrixService();
			service.getDistanceMatrix(
			  {
			    origins: [origin1],
			    destinations: [input],
			    unitSystem: google.maps.UnitSystem.IMPERIAL,
                travelMode: google.maps.TravelMode.DRIVING,
                avoidHighways: false,
                avoidTolls: false
			  }, callback);
			  function callback(response, status) {
			  if (status == "OK") {

               dist =  response.rows[0].elements[0].distance.text;  
              }}         
         
               
      }
      
      
