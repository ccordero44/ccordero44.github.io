function AutocompleteDirectionsHandler(map) {

            this.map = map;
            this.originPlaceId = null;
            this.travelMode = 'DRIVING';
            var originInput = document.getElementById('origin-input');
           // this.directionsService = new google.maps.DirectionsService;
            this.directionsDisplay = new google.maps.DirectionsRenderer;
            this.directionsDisplay.setMap(map);

            var btnClickme = document.getElementById('clickMe');
            var clearMap = document.getElementById('clear');

            var originAutocomplete = new google.maps.places.Autocomplete(
                originInput, {
                    fields: ['place_id', 'name', 'types', 'photos']
                });
            this.setupPlaceChangedListener(originAutocomplete, 'ORIG');

        }

        AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (autocomplete, mode) {
           
			var me = this;
            autocomplete.bindTo('bounds', this.map);
            autocomplete.addListener('place_changed', function () {
				
				testarr = [];
				allLocationCoords = [];
				removeMarkers();
				
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
						//quickDist();
						codeAddress();
						
                        var str3 = results[0].geometry.location;
                      input = str3;
						
						
			   var icon = "https://mt.googleapis.com/vt/icon/name=icons/onion/1037-biz-house.png";
			   var photos = place.photos;
				 
				//var icon = photos[0].getUrl({maxWidth: 35, maxHeight: 35});
                       var marker = new google.maps.Marker({
                            position: str3,
                            title: 'Origin Location',
                            animation: google.maps.Animation.DROP,
                            map: map,
			    icon: icon
						
                        });
                       
                        
                        
                        map.setZoom(10);
                        map.setCenter(marker.getPosition());
                        tempmarker.push(marker);
                        
               google.maps.event.addListener(marker, 'click', function () {
                        var terr;
                        displayCoordinates(str3);
                        //if (parseInt(dist, 10) < 50) {
							if (inPoly) {
                        	 terr = "Staff appraiser territory (" + polyName + ")";
                        }else
							terr = "Out of staff appraiser area. Use DOAN.";
                        	//terr = "Out of area (" + dist + ")";
                      //  var streetViewDiv = document.createElement('div');
					//streetViewDiv.style.width = '300px';
					//streetViewDiv.style.height = '200px';
					//streetViewDiv.setAttribute("id", "pano");

				



                            infowindow.setContent('<div style="text-align: center; width:100%;"><b>' + me.originName + '</b></br>Location Type: ' + place.types[0].toUpperCase() + '<br /><img title="Click to open Street View" onclick="openStreetView(' + this.getPosition().lat() + ',' + this.getPosition().lng() + ')" style="cursor:pointer;padding: 3px;border-radius:10px; horizontal-align: middle;" src="https://maps.googleapis.com/maps/api/streetview?size=200x100&location=' + this.getPosition().lat() + ',' + this.getPosition().lng() + '&key='+myKey+'"></img></br>' + terr + '</div>');
					        // infowindow.setContent(streetViewDiv);
							 infowindow.open(map, this);
							originInfowindow = infowindow;
							 //var panorama = new google.maps.StreetViewPanorama(
						 // streetViewDiv, {
						//	position: infowindow.getPosition()
						 // });
						//google.maps.event.addListener(infowindow, 'domready', function() {
							//google.maps.event.trigger(panorama, 'resize');
						//});
							google.maps.event.addListener(infowindow, "domready", () => {
								map.setZoom(20);
								map.setCenter(marker.getPosition());
							});
                        });
                        


                        document.getElementById("clickMe").disabled = false;

                    }
                });
				
            });
			
        }

        function removeMarkers() {
        	for (var i = 0; i < shopmarkers.length; i++) {
                shopmarkers[i].setMap(map);
            }

			for (var i = 0; i < PODmarkers.length; i++) {
                PODmarkers[i].setMap(null);
            }
			for (var i=0; i < custommarker.length; i++) {
			custommarker[i].setMap(null);
			}
            for (var i = 0; i < tempmarker.length; i++) {
                tempmarker[i].setMap(null);
		
            }
		for (i = 0; i < hailMarkers.length; i++) {
                hailMarkers[i].setMap(null);
            }
        }
         function showPoly() {
	
            for (i = 0; i < tempcounties.length; i++) {
                tempcounties[i].setMap(map);
            }
        }
        function hidePoly() {
            for (i = 0; i < tempcounties.length; i++) {
                tempcounties[i].setMap(null);
            }
            for (i = 0; i < circles.length; i++) {
                circles[i].setMap(null);
            }
        }
		
	function DistanceMatrixFunction(dest, fn) {
		var results = [];
		var resp;
		var stat;
	
		geocoder.geocode({
                'address': document.getElementById('origin-input').value
            },
		
                function (response, status) {
                
                    if (status == google.maps.GeocoderStatus.OK) {

                         var origin = document.getElementById("origin-input"),
                            service = new google.maps.DistanceMatrixService();
							
			
                         service.getDistanceMatrix({
                            origins: [origin.value],
                            destinations: dest,
                            unitSystem: google.maps.UnitSystem.IMPERIAL,
                            travelMode: google.maps.TravelMode.DRIVING,
                            avoidHighways: false,
                            avoidTolls: false

                        },
						
                           function (response, status) {
								
								if (status == "OK") {
									//results.status = status;
									//results.response = response;
									fn(status, response);
								}
							 });
							
									
					};
				});
				
							//console.log(results.toString())
								//return results;			
	}

  function clicky() {


	
       	document.getElementById("testDiv").style.display = "none";
        document.getElementById("dvTable").style.display = "none";
            infowindow.close();
	  polyInfowindow.close();
            map.setOptions({
                mapTypeControl: false,
            });
           /*  geocoder.geocode({
                'address': document.getElementById('origin-input').value
            },
		
                function (results, status) { */
                
                  //  if (status == google.maps.GeocoderStatus.OK) {


                        var sizeMap = document.getElementById("map");
                        document.getElementById("myForm").style.visibility = "visible";
                        document.getElementById("wholetable").style.display = "inherit";
                        sizeMap.style.width = "55%";

                       /*  var srt = document.getElementById("orig"),
                            srt1 = document.getElementById("origin-input");
                        srt.value = srt1.value;

                        var origin = document.getElementById("origin-input"),
                            service = new google.maps.DistanceMatrixService();
							
			
                         service.getDistanceMatrix({
                            origins: [origin.value],
                            destinations: testarr,
                            unitSystem: google.maps.UnitSystem.IMPERIAL,
                            travelMode: google.maps.TravelMode.DRIVING,
                            avoidHighways: false,
                            avoidTolls: false

                        },
						
                            callback
                        );
					
				 */
					
				
                      //  function callback(response, status) {
						
                            if (DMStatus == "OK") {
  
							// var sorted = response.rows[0].elements.sort((a,b) => a.distance.value - b.distance.value);
                           // var orig = document.getElementById("orig");
							//var destinations = response.destinationAddresses;
							

/* 
                   for (i = 0; i < DMResults.length; i++) {

                                    
                                    
	var tablelist = new Array();
	tablelist.push(["Shop Name", "Travel Distance", "Travel Time", "Time", "Dist"]);
// if ($('#tempShopTable')) {
	// $('#tempShopTable').remove();
// };
//$('#myTable').empty();
	var table = document.createElement("TABLE");
	 // $(table).attr('id', 'tempShopTable');
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
	    row.appendChild(headerCell5); */
	    

	/* for (var i = 0; i < testarr.length; i++) {
		
		//arrEle.push(response.rows[0].elements[i])
	    row = table.insertRow(-1);

	
	    	var myClick = "myClick(" + allLocationCoords[i].index + ");";
	    	var cell1 = document.createElement('td'); //row.insertCell(-1);
			var cell2 = document.createElement('td'); //row.insertCell(0);
			var cell3 = document.createElement('td'); //row.insertCell(1);
			var cell4 = document.createElement('td');
			var cell5 = document.createElement('td');
	        cell2.innerHTML = '<a href="#" onclick="' + myClick + '">' + allLocationCoords[i][0] + '</a>'
	        cell2.setAttribute('id', "shop" + i);
	        cell3.innerHTML = response.rows[0].elements[i].distance.text;
	        cell3.setAttribute('id',"dist" + allLocationCoords[i].index);
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
	
	} */
	// console.log(arrEle);
	/* var myTable = document.getElementById("myTable");
		
		while(myTable.hasChildNodes())
		{
		   myTable.removeChild(myTable.firstChild);
		}
	myTable.appendChild(table); */
    sorttable.makeSortable($('#myForm').find('table').eq(1).get(0));
                                    


                                }

                                sortDist();
								

                           // } 
                            
							
                       // }  
					

                   // } 

                //});



        }
		
	/* function testtable() {
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
	} */
	
     function quickDist(arr) {
     
       /*     geocoder.geocode({
                'address': document.getElementById('origin-input').value
            },
		
                function (results, status) { */
                
                    if (DMStatus == google.maps.GeocoderStatus.OK) {
						

            
                        var srt = document.getElementById("orig"),
                            srt1 = document.getElementById("origin-input");
                        srt.value = srt1.value;
				
                        //var origin = document.getElementById("origin-input"),
                           // service = new google.maps.DistanceMatrixService();
             
		
				/* 		service.getDistanceMatrix({
                            origins: [origin.value],
                            destinations: arr,
                            unitSystem: google.maps.UnitSystem.IMPERIAL,
                            travelMode: google.maps.TravelMode.DRIVING,
                            avoidHighways: false,
                            avoidTolls: false
                        },
                            callback
                        );  */
						
      // function callback(response, status) {
	
							//var sorted = response.rows[0].elements.sort((a,b) => a.distance.value - b.distance.value);
						
						
            if (DMStatus == "OK") {
					//var destinations = response.destinationAddresses;
                            //var orig = document.getElementById("orig");
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
			      
	
			    for (var i = 0; i < arr.length; i++) {
			        row = table.insertRow(-1);
				
			        var myClick = "myClick(" + allLocationCoords[i].index + ");";
			        	var cell1 = document.createElement('td'); //row.insertCell(-1);
						var cell2 = document.createElement('td'); //row.insertCell(0);
						var cell3 = document.createElement('td'); //row.insertCell(1);
						var cell4 = document.createElement('td');
						var cell5 = document.createElement('td');
						if (allLocationCoords[i][10] === "yesTow") {
							cell2.innerHTML = '<a href="#" onclick="' + myClick + '">' + allLocationCoords[i][0] + '</a>'
						}else{
							cell2.innerHTML = '<a href="#" onclick="' + myClick + '">' + allLocationCoords[i][0] + '</a><span class="noTowClass"> (not accepting tows)</span>'
						};
			            cell2.setAttribute('id', "shop" + i);
			            cell3.innerHTML = DMResults.rows[0].elements[i].distance.text;
			            cell3.setAttribute('id',"dist" + allLocationCoords[i].index);
			            cell1.innerHTML = DMResults.rows[0].elements[i].duration.text;
			            cell1.setAttribute('id',"time" + i);
			            cell4.innerHTML = DMResults.rows[0].elements[i].duration.value;
			            cell4.setAttribute('id', "timeVal" + i);
			            cell4.setAttribute('class', "sorttable_numeric");
			            cell4.setAttribute('style', "display: none;");
			            cell5.innerHTML = DMResults.rows[0].elements[i].distance.value;
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
							
		
                                // for (var i = 0; i < arr.length; i++) {
                                    // var dist = "dist" + i;
                                    // var distElement = document.getElementById(dist);
								// if (typeof(distElement) != 'undefined' && distElement != null)
									// {
									  // distElement.innerHTML = DMResults.rows[0].elements[i].distance.text;
									// }

                                // };

                            } else {
                                window.alert("Error: " + status);
                            }
                       // } 
                    } else {
                        window.alert("Error: line 1152" + status);
                    }
               // });
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
								$('#printButton').remove();
								setTimeout(function() {$('#directionsPanel').find('.adp-text').eq(0).closest('tr').append('<td><button title="Print Directions" onclick="printDirections()" id="printButton" style="float:right;"><i class="material-icons">print</i></button></button></td>');},1000);
								
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


  	var marker;
  			if (clickCo == null) {
				}else
			if (clickCo.fillOpacity == .1){
				clickCo.setOptions({fillOpacity:0.2});
				myWindow.style.display = "none";
			}

			document.getElementById("myTable").innerHTML = "";
			redcamInfoWindow.close();
  			infowindow.close();
			polyInfowindow.close();
  			infoPODwindow.close();
  			//document.getElementById("origin-input").focus();
        	resetSelectElement(document.getElementById("testDiv"));
        	document.getElementById("infoDivWrapper").style.display = "none";
        	hidePoly();
        	//for (var j=0; j < Myappraisers.length; j++) {
				//Myappraisers[j].setMap(null);
			//};
	            removeMarkers();
         
            document.getElementById("checkbox0").checked = true;
            document.getElementById("checkbox1").checked = true;
	   showAppraisers();
            document.getElementById("checkbox2").checked = false;
            document.getElementById("checkbox3").checked = false;
			document.getElementById("checkbox4").checked = false;
			document.getElementById("checkbox5").checked = true;
	document.getElementById("checkbox6").checked = false;
			$('#checkbox5').trigger('change');
            map.setMapTypeId('roadmap');
            document.getElementById("clickMe").disabled = true;
            document.getElementById("testDiv").style.display = "inherit";
            if (!!activeInfoWindow) {
                activeInfoWindow.close();
            }
            document.getElementById("origin-input").value = null;
            var sizeMap = document.getElementById("map");
            document.getElementById("myForm").style.visibility = "hidden";
            document.getElementById("wholetable").style.display = "none";
            document.getElementById("dvTable").style.display = "none";
            sizeMap.style.width = "100%";
            directionsDisplay.set('directions', null);
            map.setCenter(resetBounds.getCenter());
            map.fitBounds(resetBounds);
 

        }

  function addScore(score, $domElement) {
    $("<span id='ratingText'></span><span class='stars-container'>")
      .addClass("stars-0")
      .text("\2605\2605\2605\2605\2605")
      .appendTo($domElement);
	 $('.stars-container').attr('style', '--myVar:'+((score/5)*100) + "%")
	 $($domElement).attr('title',score + " out of 5 stars");
	 $('#ratingText').text(score.toFixed(1) + ' ');
	 $("<span class='hours' title='Toggle Shop Hours'><i class='bi bi-clock'></i></span>").appendTo($domElement);
  }

  

        function checkPlaceholder() {
            var isEmpty = document.getElementById("origin-input");
            var geocoder = new google.maps.Geocoder();
            var service = new google.maps.places.PlacesService(map);
            geocoder.geocode({
                'location': new google.maps.LatLng(activeInfoWindow.getPosition().lat(), activeInfoWindow.getPosition().lng())
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var str3 = results[0].geometry.location
                    //window.alert(str3);
                    service.textSearch({
                        location: activeInfoWindow.position,
						query: activeInfoWindow.anchor.title
                    }, function callback(results, status) {
					
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                           
						addScore(results[0].rating, $("#fixture"));
						var request = {
						  placeId: results[0].place_id,
						  fields: ['opening_hours']
						};

						service = new google.maps.places.PlacesService(map);
						service.getDetails(request, callback);

						function callback(place, status) {
						  if (status == google.maps.places.PlacesServiceStatus.OK) {
							
							var list = document.createElement("ol");
							list.innerHTML = "<label>Hours</label>";
							$(list).attr('id','hoursList');
							if (typeof place.opening_hours !== 'undefined') {
								$('.hours').show();
								for (var i = 0; i < place.opening_hours.weekday_text.length; i++) {
									var item = document.createElement("li");
									$(list).attr('hidden', 'hidden');
									item.innerHTML = place.opening_hours.weekday_text[i];
									list.appendChild(item);
								}
								$(list).appendTo('#fixture');
								$(".hours").click(function() {
								$(list).toggle();
								var IWLtLng = new google.maps.LatLng(activeInfoWindow.getPosition().lat(), activeInfoWindow.getPosition().lng());
								
								activeInfoWindow.open(map, activeMarker);
								map.setCenter(activeMarker.getPosition())
							 });
							}else{
								$('.hours').hide();
							};
							
						  }
						}
                        } else { 
						$("#fixture").hide();
						document.getElementById("clickMe").disabled = true; 
						}
                    });
                }
            });
        }


        function myClick(id) {
			
            google.maps.event.trigger(markers[id], 'click');
							//map.setZoom(20);
                            //map.setCenter(activeMarker.getPosition());
							//activeInfoWindow.open(map, activeMarker);
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
       //headerCell.setAttribute('class', "sorttable_nosort");
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

    // $('#dvTable table th:nth-child(4)').css('min-width', '110px');
	 $('#dvTable table tr>td:nth-child(5)').hide();
	 $('#dvTable table th:nth-child(5)').hide();
	 //setTimeout(function() {$('#dvTable table th:nth-child(6)').append('<a title="Print Shop List" onclick="printShopList()" id="printButton2" style="color:black;float:right;cursor:pointer;"><i class="material-icons">print</i></button></a>');},1000);
    $('#dvTable table th:nth-child(6)').append('<a title="Print Shop List" onclick="printShopList()" id="printButton2" style="color:black;float:right;cursor:pointer;"><i class="material-icons">print</i></button></a>');
	
	for (i = 0; i < shops.length; i++) {
    if (shops[i][8] == ' Tow_Service') {
        
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

var checkbox = document.getElementById("checkbox1");
if (checkbox.checked) {
for (var j=0; j < Myappraisers.length; j++) {
Myappraisers[j].setMap(map);
		
};
map.fitBounds(getPolygonBounds(Myappraisers));
}else
for (var j=0; j < Myappraisers.length; j++) {
Myappraisers[j].setMap(null);
};
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
 
 function HideShowPOIs() {
	 var checkbox = document.getElementById("checkbox5");
	 if (checkbox.checked) {
		map.setOptions({ styles: styles["default"] });
	 }else{
		 map.setOptions({ styles: styles["hide"] })
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
var cNumber = $('[id^="container"]').length - 1;
var wrapper = document.getElementById("mapButton");
var wrapper2 = document.getElementById("container" + cNumber);
var wrapper3 = document.getElementById("container0");
wrapper3.style.borderRadius = "0px 3px 0px 0px";
wrapper2.style.borderRadius = "0px 0px 3px 3px";
wrapper.style.borderRadius = "3px 3px 0px 3px";
}
function changeCSSback() {
var cNumber = $('[id^="container"]').length - 1;
var wrapper = document.getElementById("mapButton");
//var wrapper2 = document.getElementById("container" + cNumber);
//wrapper2.style.borderRadius = "0px";
wrapper.style.borderRadius = "3px";
}

function displayCoordinates(pnt) {

          lat = pnt.lat();
          //lat = lat.toFixed(4);
          lng = pnt.lng();
          //lng = lng.toFixed(4);
   
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
              //var origin1 = "1699 Wall St Suite 600, Mt Prospect, IL 60056";
			 // var service = new google.maps.DistanceMatrixService();
			  
			var pBounds;
      for (var j=0; j < Myappraisers.length; j++) {
			
		 inPoly = google.maps.geometry.poly.containsLocation(new google.maps.LatLng(lat, lng), Myappraisers[j]);
		
		pBounds = getPolygonBounds(Myappraisers)
		polyName = appraisers[j].name;
		if (inPoly) {
			break;
		} else {
			polyName = "";	
		};
		};
		
		// var origin1 = new google.maps.LatLng(pBounds.getCenter().lat(), pBounds.getCenter().lng());
			
			// var dmsvc = new google.maps.Geocoder();

		// dmsvc.geocode({
                // 'location': origin1
            // }, function (results, status) {
                // if (status === google.maps.GeocoderStatus.OK) {
                    // polyaddr = results[0].formatted_address
						
// /* 			
			// service.getDistanceMatrix(
			  // {
			    // origins: [polyaddr],
			    // destinations: [input],
			    // unitSystem: google.maps.UnitSystem.IMPERIAL,
                // travelMode: google.maps.TravelMode.DRIVING,
                // avoidHighways: false,
                // avoidTolls: false,
				// region: 'us'
			  // }, callback); */
			  
	// }
            // });
	/* 		  function callback(response, status) {
			  if (status == "OK") {
		
               dist =  response.rows[0].elements[0].distance.text;  
			   console.log(response);
              }}   */       
         
               
      }
      
      
function setPODS() {
 var checkbox = document.getElementById("checkbox4");
	if (checkbox.checked) {
 			for (i = 0; i < PODmarkers.length; i++) {
                PODmarkers[i].setMap(map);
            }
            map.fitBounds(PODbounds);
    }else
    		for (i = 0; i < PODmarkers.length; i++) {
                PODmarkers[i].setMap(null);
            }
  		
 }
function openStreetView() {
			var thisMarker = new google.maps.LatLng(arguments[0],arguments[1]);
	
			var streetViewDiv = document.getElementById('map');
//					streetViewDiv.style.width = '100%';
//					streetViewDiv.style.height = '100%';
//					streetViewDiv.setAttribute("id", "pano");
				var panorama = new google.maps.StreetViewPanorama(
						  streetViewDiv, {
							position: thisMarker,
							enableCloseButton: true,
							addressControl: false
						  });
					
}
function printAnyMaps() {
  const $body = $('body');
  const $mapContainer = $('#map');
  const $mapContainerParent = $mapContainer.parent();
  const $printContainer = $('<div style="position:relative;">');

  $printContainer
    .height($mapContainer.height())
    .append($mapContainer)
    .prependTo($body);

  const $content = $body
    .children()
    .not($printContainer)
    .not('script')
    .detach();

  /**
   * Needed for those who use Bootstrap 3.x, because some of
   * its `@media print` styles ain't play nicely when printing.
   */
  const $patchedStyle = $('<style media="print">')
    .text(`
      .gm-style div > img {position: absolute;}
       img {max-width: auto !important;}
       #legend {display: none;}
       #clear {display: none;}
       #listShops {display: none;}
       #clickMe {display: none;}
       #origin-input {display: none;}
      a[href]:after { content: ""; }
    `)
    .appendTo('head');

  window.print();

  $body.prepend($content);
  $mapContainerParent.prepend($mapContainer);

  $printContainer.remove();
  $patchedStyle.remove();
}

var geocoder = null;
var map = null;
var customerMarker = null;
var gmarkers = [];
var closest = [];

function codeAddress() {
  var numberOfResults = 25;
  var numberOfDrivingResults = 25;
  var address = document.getElementById('origin-input').value;
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      if (customerMarker) customerMarker.setMap(null);
      // customerMarker = new google.maps.Marker({
        // map: map,
        // position: results[0].geometry.location
      // });
      closest = findClosestN(results[0].geometry.location, numberOfResults);
      // get driving distance
	 
      closest = closest.splice(0, numberOfResults);
      calculateDistances(results[0].geometry.location, closest, numberOfDrivingResults);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
  
}

function findClosestN(pt, numberOfResults) {
  var closest = [];
 
// console.log(gmarkers);
  for (var i = 0; i < gmarkers.length; i++) {
	  
    gmarkers[i].distance = google.maps.geometry.spherical.computeDistanceBetween(pt, new google.maps.LatLng(gmarkers[i][6], gmarkers[i][7]));
    gmarkers[i].index = i;
    //gmarkers[i].setMap(null);
    closest.push(gmarkers[i]);

  }

  closest.sort(sortByDist);
  for (var i = 0; i < closest.length; i++) {
	  sIndex.push(closest[i].index);
  };
 
  return closest;
}

function sortByDist(a, b) {

	  return (a.distance - b.distance)
}

function calculateDistances(pt, closest, numberOfResults) {
  var service = new google.maps.DistanceMatrixService();
  var request = {
    origins: [pt],
    destinations: [],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  };

  for (var i = 0; i < closest.length; i++) {
markers[i].index = i;
    request.destinations.push(new google.maps.LatLng(closest[i][6], closest[i][7]));
  }

  service.getDistanceMatrix(request, function(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    } else {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;

      var results = response.rows[0].elements;
      // save title and address in record for sorting
      for (var i = 0; i < closest.length; i++) {
        results[i].title = closest[i].title;
        results[i].address = closest[i];
        results[i].idx_closestMark = i;
      }
      results.sort(sortByDistDM);
	 
      for (var i = 0;
        ((i < numberOfResults) && (i < closest.length)); i++) {
        //closest[i].setMap(map);
		var address = closest[i][1] + ", " + closest[i][2];
		allLocationCoords.push(closest[i]);
		testarr.push(address);
		//alldestinations = [];		
		//alldestinations.push(closest[i]);
		//console.log(allLocationCoords);
          }
		  // quickDist(testarr);
					DistanceMatrixFunction(testarr, function(stat, resp) {
		
							var response = JSON.parse(JSON.stringify(resp));
							
							if (stat === 'OK') {
								
								//return 'done';
								DMResults = response;
								DMStatus = stat;
								quickDist(DMResults.destinationAddresses);
							}
						 });
		 
    }
  });
}

function sortByDistDM(a, b) {
  return (a.distance.value - b.distance.value)
}
function resetTables () {
	var sizeMap = document.getElementById("map");
            document.getElementById("myForm").style.visibility = "hidden";
            document.getElementById("wholetable").style.display = "none";
            document.getElementById("dvTable").style.display = "none";
            sizeMap.style.width = "100%";
            directionsDisplay.set('directions', null);
            map.setCenter(resetBounds.getCenter());
            map.fitBounds(resetBounds);
			
};


function printDirections() 
{
$('#printButton').hide();
  var divToPrint=$('#directionsPanel').clone();

  var newWin=window.open('','Print-Window');

  newWin.document.open();
 newWin.document.write('<html><head><style>html, body {height: 99% !important;page-break-after: avoid;page-break-before: avoid;}.adp,.adp table{font-family:Roboto,Arial,sans-serif;font-weight:300;color:#2c2c2c}.adp b,.adp-list b{font-weight:400}.adp-warnbox{margin:5px 0 3px}.warnbox-content{background:#fff1a8;padding:5px 6px}.warnbox-c1,.warnbox-c2{background:#fff1a8;font-size:1px;height:1px;overflow:hidden}.warnbox-c1{margin:0 2px}.warnbox-c2{margin:0 1px}.adp-list{background:#fff;border:1px solid #cdcdcd;cursor:pointer;padding:4px;font-family:Roboto,Arial,sans-serif;font-weight:300;color:#2c2c2c}.adp-fullwidth{width:100%}.adp-listsel{background:#eee;text-decoration:none}.adp-listheader{padding:4px}.adp-placemark{background:#eee;border:1px solid silver;color:#000;cursor:pointer;margin:10px 0;vertical-align:middle}img.adp-marker{width:22px;height:40px}img.adp-marker2{width:27px;height:43px}.adp-details,.adp-legal{color:#676767}.adp-summary{padding:0 3px 3px}.adp-step,.adp-substep{border-top:1px solid #cdcdcd;margin:0;padding:.3em 3px;vertical-align:top}.adp-list img,.adp-substep img{width:15px;height:15px;position:relative;top:2px;margin-right:3px}.adp-distance{white-space:nowrap}.adp-step,.adp-text{width:100%}.adp-directions{cursor:pointer;border-collapse:collapse}.adp-list .gm-arrow{width:8px;height:9px;margin:5px 0 3px}.adp-agencies{font-size:80%;margin:5px 0}.adp-summary-duration{float:right;margin-left:7px;white-space:nowrap}.adp-substep .gm-line{margin-right:4px}.adp-substep .adp-stepicon{overflow:hidden;position:relative;top:0;left:0;width:16px;height:16px}.adp-substep .adp-stepicon .adp-maneuver{background-size:19px 630px;position:absolute;left:0;width:16px;height:16px}.adp-substep .adp-stepicon .adp-maneuver.adp-ferry{background-position:0 -614px}.adp-substep .adp-stepicon .adp-maneuver.adp-ferry-train{background-position:0 -566px}.adp-substep .adp-stepicon .adp-maneuver.adp-merge{background-position:0 -143px}.adp-substep .adp-stepicon .adp-maneuver.adp-straight{background-position:0 -534px}.adp-substep .adp-stepicon .adp-maneuver.adp-fork-left{background-position:0 -550px}.adp-substep .adp-stepicon .adp-maneuver.adp-ramp-left{background-position:0 -598px}.adp-substep .adp-stepicon .adp-maneuver.adp-roundabout-left{background-position:0 -197px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-left,.adp-substep .adp-stepicon .adp-maneuver.adp-keep-left{background-position:0 -413px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-sharp-left{background-position:0 0}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-slight-left{background-position:0 -378px}.adp-substep .adp-stepicon .adp-maneuver.adp-uturn-left{background-position:0 -305px}.adp-substep .adp-stepicon .adp-maneuver.adp-fork-right{background-position:0 -499px}.adp-substep .adp-stepicon .adp-maneuver.adp-ramp-right{background-position:0 -429px}.adp-substep .adp-stepicon .adp-maneuver.adp-roundabout-right{background-position:0 -232px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-right,.adp-substep .adp-stepicon .adp-maneuver.adp-keep-right{background-position:0 -483px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-sharp-right{background-position:0 -582px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-slight-right{background-position:0 -51px}.adp-substep .adp-stepicon .adp-maneuver.adp-uturn-right{background-position:0 -35px}.adp-substep .adp-stepicon .adp-maneuver {background-image:url(https://maps.gstatic.com/mapfiles/api-3/images/maneuvers.png);}</style><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyActTShUbrnDKcB4P94Qh4cj3JpsvdAjyE" async defer></script><link rel="stylesheet" type="text/css" href="stylesheet.css"><title>' + document.title  + '</title>');
 newWin.document.write('</head><body><script>var delayInMilliseconds = 1000; window.onload = setTimeout(function() {window.print();window.close();},delayInMilliseconds);</script>');
  //newWin.document.write('<html><body></body></html>');
   $(newWin).find('body').html(divToPrint);
   $(newWin).ready(function () {
	   $(newWin.document.body).html(divToPrint);
	   //setTimeout(function() {newWin.window.print();},1000);
   });
   
  //newWin.document.close();

  //setTimeout(function(){newWin.close();},10);
$('#printButton').show();
}

function printShopList(){
 $('#printButton2').hide()
  var divToPrint=$('#dvTable').clone();

  var newWin=window.open('','Print-Window');

 newWin.document.open();
 newWin.document.write('<html><head><style>html, body {height: 99% !important;page-break-after: avoid;page-break-before: avoid;}.adp,.adp table{font-family:Roboto,Arial,sans-serif;font-weight:300;color:#2c2c2c}.adp b,.adp-list b{font-weight:400}.adp-warnbox{margin:5px 0 3px}.warnbox-content{background:#fff1a8;padding:5px 6px}.warnbox-c1,.warnbox-c2{background:#fff1a8;font-size:1px;height:1px;overflow:hidden}.warnbox-c1{margin:0 2px}.warnbox-c2{margin:0 1px}.adp-list{background:#fff;border:1px solid #cdcdcd;cursor:pointer;padding:4px;font-family:Roboto,Arial,sans-serif;font-weight:300;color:#2c2c2c}.adp-fullwidth{width:100%}.adp-listsel{background:#eee;text-decoration:none}.adp-listheader{padding:4px}.adp-placemark{background:#eee;border:1px solid silver;color:#000;cursor:pointer;margin:10px 0;vertical-align:middle}img.adp-marker{width:22px;height:40px}img.adp-marker2{width:27px;height:43px}.adp-details,.adp-legal{color:#676767}.adp-summary{padding:0 3px 3px}.adp-step,.adp-substep{border-top:1px solid #cdcdcd;margin:0;padding:.3em 3px;vertical-align:top}.adp-list img,.adp-substep img{width:15px;height:15px;position:relative;top:2px;margin-right:3px}.adp-distance{white-space:nowrap}.adp-step,.adp-text{width:100%}.adp-directions{cursor:pointer;border-collapse:collapse}.adp-list .gm-arrow{width:8px;height:9px;margin:5px 0 3px}.adp-agencies{font-size:80%;margin:5px 0}.adp-summary-duration{float:right;margin-left:7px;white-space:nowrap}.adp-substep .gm-line{margin-right:4px}.adp-substep .adp-stepicon{overflow:hidden;position:relative;top:0;left:0;width:16px;height:16px}.adp-substep .adp-stepicon .adp-maneuver{background-size:19px 630px;position:absolute;left:0;width:16px;height:16px}.adp-substep .adp-stepicon .adp-maneuver.adp-ferry{background-position:0 -614px}.adp-substep .adp-stepicon .adp-maneuver.adp-ferry-train{background-position:0 -566px}.adp-substep .adp-stepicon .adp-maneuver.adp-merge{background-position:0 -143px}.adp-substep .adp-stepicon .adp-maneuver.adp-straight{background-position:0 -534px}.adp-substep .adp-stepicon .adp-maneuver.adp-fork-left{background-position:0 -550px}.adp-substep .adp-stepicon .adp-maneuver.adp-ramp-left{background-position:0 -598px}.adp-substep .adp-stepicon .adp-maneuver.adp-roundabout-left{background-position:0 -197px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-left,.adp-substep .adp-stepicon .adp-maneuver.adp-keep-left{background-position:0 -413px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-sharp-left{background-position:0 0}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-slight-left{background-position:0 -378px}.adp-substep .adp-stepicon .adp-maneuver.adp-uturn-left{background-position:0 -305px}.adp-substep .adp-stepicon .adp-maneuver.adp-fork-right{background-position:0 -499px}.adp-substep .adp-stepicon .adp-maneuver.adp-ramp-right{background-position:0 -429px}.adp-substep .adp-stepicon .adp-maneuver.adp-roundabout-right{background-position:0 -232px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-right,.adp-substep .adp-stepicon .adp-maneuver.adp-keep-right{background-position:0 -483px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-sharp-right{background-position:0 -582px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-slight-right{background-position:0 -51px}.adp-substep .adp-stepicon .adp-maneuver.adp-uturn-right{background-position:0 -35px}.adp-substep .adp-stepicon .adp-maneuver {background-image:url(https://maps.gstatic.com/mapfiles/api-3/images/maneuvers.png);}</style><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyActTShUbrnDKcB4P94Qh4cj3JpsvdAjyE" async defer></script><link rel="stylesheet" type="text/css" href="stylesheet.css"><title>' + document.title  + '</title>');
 newWin.document.write('</head><body><script>var delayInMilliseconds = 1000; window.onload = setTimeout(function() {window.print();window.close();},delayInMilliseconds);</script>');

   $(newWin).find('body').html(divToPrint);

   $(newWin).ready(function () {
	   $(newWin.document.body).html(divToPrint);
	
   });

 $('#printButton2').show()
}
function printFilteredShopList() {
var shoplist = new Array();
    shoplist.push(["Shop Name", "Street", "City/State/Zip", "Phone", "Distance", "Time", "rawDistance"]);
 
    var table = document.createElement("TABLE");
       
     var columnCount = shoplist[0].length;
 
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = shoplist[0][i];
		
        row.appendChild(headerCell);
       //headerCell.setAttribute('class', "sorttable_nosort");
    }

    for (var i = 0; i < allLocationCoords.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
		if (j === 0) {
			cell.innerHTML = allLocationCoords[i][j].split('<br>')[0];
		//}else if (j === 6) {
			//cell.innerHTML = allLocationCoords[i].distance;
		}else{
            		cell.innerHTML = allLocationCoords[i][j];
		};
          }
       
        	row.cells[4].innerHTML = DMResults.rows[0].elements[i].distance.text;
		row.cells[5].innerHTML = DMResults.rows[0].elements[i].duration.text;
	    	row.cells[6].innerHTML = DMResults.rows[0].elements[i].distance.value
	    	row.cells[6].setAttribute('style', 'display: none;');
    }


$(table).find('td:nth-child(4)').css("width","1%");
$(table).find('td:nth-child(4)').css("white-space","nowrap");
	var newWin=window.open('Shop Locator','Print-Window', 'visible=none');

 newWin.document.open();
 //newWin.document.write('<html><head><style>html, body {height: 99% !important;page-break-after: avoid;page-break-before: avoid;}.adp,.adp table{font-family:Roboto,Arial,sans-serif;font-weight:300;color:#2c2c2c}.adp b,.adp-list b{font-weight:400}.adp-warnbox{margin:5px 0 3px}.warnbox-content{background:#fff1a8;padding:5px 6px}.warnbox-c1,.warnbox-c2{background:#fff1a8;font-size:1px;height:1px;overflow:hidden}.warnbox-c1{margin:0 2px}.warnbox-c2{margin:0 1px}.adp-list{background:#fff;border:1px solid #cdcdcd;cursor:pointer;padding:4px;font-family:Roboto,Arial,sans-serif;font-weight:300;color:#2c2c2c}.adp-fullwidth{width:100%}.adp-listsel{background:#eee;text-decoration:none}.adp-listheader{padding:4px}.adp-placemark{background:#eee;border:1px solid silver;color:#000;cursor:pointer;margin:10px 0;vertical-align:middle}img.adp-marker{width:22px;height:40px}img.adp-marker2{width:27px;height:43px}.adp-details,.adp-legal{color:#676767}.adp-summary{padding:0 3px 3px}.adp-step,.adp-substep{border-top:1px solid #cdcdcd;margin:0;padding:.3em 3px;vertical-align:top}.adp-list img,.adp-substep img{width:15px;height:15px;position:relative;top:2px;margin-right:3px}.adp-distance{white-space:nowrap}.adp-step,.adp-text{width:100%}.adp-directions{cursor:pointer;border-collapse:collapse}.adp-list .gm-arrow{width:8px;height:9px;margin:5px 0 3px}.adp-agencies{font-size:80%;margin:5px 0}.adp-summary-duration{float:right;margin-left:7px;white-space:nowrap}.adp-substep .gm-line{margin-right:4px}.adp-substep .adp-stepicon{overflow:hidden;position:relative;top:0;left:0;width:16px;height:16px}.adp-substep .adp-stepicon .adp-maneuver{background-size:19px 630px;position:absolute;left:0;width:16px;height:16px}.adp-substep .adp-stepicon .adp-maneuver.adp-ferry{background-position:0 -614px}.adp-substep .adp-stepicon .adp-maneuver.adp-ferry-train{background-position:0 -566px}.adp-substep .adp-stepicon .adp-maneuver.adp-merge{background-position:0 -143px}.adp-substep .adp-stepicon .adp-maneuver.adp-straight{background-position:0 -534px}.adp-substep .adp-stepicon .adp-maneuver.adp-fork-left{background-position:0 -550px}.adp-substep .adp-stepicon .adp-maneuver.adp-ramp-left{background-position:0 -598px}.adp-substep .adp-stepicon .adp-maneuver.adp-roundabout-left{background-position:0 -197px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-left,.adp-substep .adp-stepicon .adp-maneuver.adp-keep-left{background-position:0 -413px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-sharp-left{background-position:0 0}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-slight-left{background-position:0 -378px}.adp-substep .adp-stepicon .adp-maneuver.adp-uturn-left{background-position:0 -305px}.adp-substep .adp-stepicon .adp-maneuver.adp-fork-right{background-position:0 -499px}.adp-substep .adp-stepicon .adp-maneuver.adp-ramp-right{background-position:0 -429px}.adp-substep .adp-stepicon .adp-maneuver.adp-roundabout-right{background-position:0 -232px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-right,.adp-substep .adp-stepicon .adp-maneuver.adp-keep-right{background-position:0 -483px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-sharp-right{background-position:0 -582px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-slight-right{background-position:0 -51px}.adp-substep .adp-stepicon .adp-maneuver.adp-uturn-right{background-position:0 -35px}.adp-substep .adp-stepicon .adp-maneuver {background-image:url(https://maps.gstatic.com/mapfiles/api-3/images/maneuvers.png);}</style><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyActTShUbrnDKcB4P94Qh4cj3JpsvdAjyE" async defer></script><link rel="stylesheet" type="text/css" href="stylesheet.css"><title>' + document.title  + '</title>');
newWin.document.write('<html><head><style>html, body {height: 99% !important;page-break-after: avoid;page-break-before: avoid;}.adp,.adp table{font-family:Roboto,Arial,sans-serif;font-weight:300;color:#2c2c2c}.adp b,.adp-list b{font-weight:400}.adp-warnbox{margin:5px 0 3px}.warnbox-content{background:#fff1a8;padding:5px 6px}.warnbox-c1,.warnbox-c2{background:#fff1a8;font-size:1px;height:1px;overflow:hidden}.warnbox-c1{margin:0 2px}.warnbox-c2{margin:0 1px}.adp-list{background:#fff;border:1px solid #cdcdcd;cursor:pointer;padding:4px;font-family:Roboto,Arial,sans-serif;font-weight:300;color:#2c2c2c}.adp-fullwidth{width:100%}.adp-listsel{background:#eee;text-decoration:none}.adp-listheader{padding:4px}.adp-placemark{background:#eee;border:1px solid silver;color:#000;cursor:pointer;margin:10px 0;vertical-align:middle}img.adp-marker{width:22px;height:40px}img.adp-marker2{width:27px;height:43px}.adp-details,.adp-legal{color:#676767}.adp-summary{padding:0 3px 3px}.adp-step,.adp-substep{border-top:1px solid #cdcdcd;margin:0;padding:.3em 3px;vertical-align:top}.adp-list img,.adp-substep img{width:15px;height:15px;position:relative;top:2px;margin-right:3px}.adp-distance{white-space:nowrap}.adp-step,.adp-text{width:100%}.adp-directions{cursor:pointer;border-collapse:collapse}.adp-list .gm-arrow{width:8px;height:9px;margin:5px 0 3px}.adp-agencies{font-size:80%;margin:5px 0}.adp-summary-duration{float:right;margin-left:7px;white-space:nowrap}.adp-substep .gm-line{margin-right:4px}.adp-substep .adp-stepicon{overflow:hidden;position:relative;top:0;left:0;width:16px;height:16px}.adp-substep .adp-stepicon .adp-maneuver{background-size:19px 630px;position:absolute;left:0;width:16px;height:16px}.adp-substep .adp-stepicon .adp-maneuver.adp-ferry{background-position:0 -614px}.adp-substep .adp-stepicon .adp-maneuver.adp-ferry-train{background-position:0 -566px}.adp-substep .adp-stepicon .adp-maneuver.adp-merge{background-position:0 -143px}.adp-substep .adp-stepicon .adp-maneuver.adp-straight{background-position:0 -534px}.adp-substep .adp-stepicon .adp-maneuver.adp-fork-left{background-position:0 -550px}.adp-substep .adp-stepicon .adp-maneuver.adp-ramp-left{background-position:0 -598px}.adp-substep .adp-stepicon .adp-maneuver.adp-roundabout-left{background-position:0 -197px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-left,.adp-substep .adp-stepicon .adp-maneuver.adp-keep-left{background-position:0 -413px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-sharp-left{background-position:0 0}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-slight-left{background-position:0 -378px}.adp-substep .adp-stepicon .adp-maneuver.adp-uturn-left{background-position:0 -305px}.adp-substep .adp-stepicon .adp-maneuver.adp-fork-right{background-position:0 -499px}.adp-substep .adp-stepicon .adp-maneuver.adp-ramp-right{background-position:0 -429px}.adp-substep .adp-stepicon .adp-maneuver.adp-roundabout-right{background-position:0 -232px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-right,.adp-substep .adp-stepicon .adp-maneuver.adp-keep-right{background-position:0 -483px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-sharp-right{background-position:0 -582px}.adp-substep .adp-stepicon .adp-maneuver.adp-turn-slight-right{background-position:0 -51px}.adp-substep .adp-stepicon .adp-maneuver.adp-uturn-right{background-position:0 -35px}.adp-substep .adp-stepicon .adp-maneuver {background-image:url(https://maps.gstatic.com/mapfiles/api-3/images/maneuvers.png);}</style><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyActTShUbrnDKcB4P94Qh4cj3JpsvdAjyE" async defer></script><link rel="stylesheet" type="text/css" href="stylesheet.css"><title>' + "Closest " + allLocationCoords.length + " shops to " + document.getElementById("origin-input").value  + '</title>'); 
newWin.document.write('</head><body><script>var delayInMilliseconds = 1000; window.onload = setTimeout(function() {window.print();window.close();},delayInMilliseconds);</script>');
sorttable.makeSortable(table);
var myTH = $(table).find("th")[6];
sorttable.innerSortFunction.apply(myTH, []);
	//$(table).find("tr").find("td").eq(6).hide();
	$(table).find("th").eq(6).hide();

   $(newWin).find('body').html(table);

   $(newWin).ready(function () {
	   $(newWin.document.body).html(table);
	
   });
}
function syncShops() {
	$("#sync i").addClass("fa-spin");
	$('#sync').attr("disabled",true);
	location.reload();
	return;
shops = [];
	var call2		

var call1 = $.ajax({
		   type: "GET",
		   url: "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1UMuKB3q_Al9y0Oe-THMar0wa55-wsar6",
		   async: true,
		   success: function(response) { 
				$("#sync i").addClass("fa-spin");
			   	$('#sync').attr("disabled",true);
					$(response).find("Folder").eq(0).find("Placemark").each(function () {
						var newShop = [];
		                var _name = $(this).find('name').html();
						var _desc = $(this).find('description').html();
						var _coords = $(this).find('Point').find('coordinates').text().trim().split(',');
						var _towingIcon = $(this).find('styleUrl').text();
						var _towing = "";
						if (_towingIcon === "#icon-503-4186F0") {
						_towing = "yesTow";
						}else{
						_towing = "noTow";
						}
						if (_coords.length > 1) {
						var _phones = _desc.toString().match(/((?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?)/img);
						var _emails = _desc.toString().match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
						var _phone, _email;
							if (_phones) {
								_phone = _phones[0];
							}else{
								_phone = "";
							};
							if (_emails) {
								_email = _emails[0];
							}else{
								_email = "";
							};
							newShop.push(_name.toString().replace(/[\r\n]/g, '').replace(/\s+/g, ' ').replace(/ >/g, '>').replace(/> </g, '><').replace("<![CDATA[", "").replaceAll("<br>", " ").replace("]]>", "").trim())
					 
			 call2 =		 $.ajax({
						   type: "GET",
						   url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + _coords[1] + "," + _coords[0] + "&key=" + myKey,
						   async: true,
						   success: function(result) { 
						   var fullAddress = result.results[0].formatted_address.split(',');
						  var cityState = fullAddress[1] + "," + fullAddress[2]
						  newShop.push(fullAddress[0]);
						  newShop.push(cityState);
						   newShop.push(_phone);
						   newShop.push("");
						   newShop.push(_email);
						   newShop.push(_coords[1]);
						   newShop.push(_coords[0]);
						   newShop.push("");
						   newShop.push("https://maps.googleapis.com/maps/api/streetview?size=276x129&location=" + _coords[1] + "," + _coords[0] + "&key=" + myKey)
						   newShop.push(_towing);
							   if (newShop[0] !== 'UNIQUE/LIGHTHOUSE') {shops.push(newShop);};
								
									
														}
						});
					};
					}); 
				               call2.done(function(){
						$("#sync i").removeClass("fa-spin");
							$('#sync').attr("disabled",false);
							$('#clear').trigger('click');
						});
										}
		});
	
}
		
function showArrays(event) {
	//event.stop();
     this.getMap().getDiv().setAttribute('title', this.content);	
  // var vertices = this.getPath();
    //polyInfowindow.setContent(this.content);
   // polyInfowindow.setPosition(event.latLng);
   // polyInfowindow.open(map);
   // map.setCenter(event.latLng);
	
}
function setHailMarkers() {
 var checkbox = document.getElementById("checkbox6");
	if (checkbox.checked) {
 			for (i = 0; i < hailMarkers.length; i++) {
                hailMarkers[i].setMap(map);
            }
            map.fitBounds(resetBounds);
    }else
    		for (i = 0; i < hailMarkers.length; i++) {
                hailMarkers[i].setMap(null);
            }
  		
 }
function setDatepicker(_this) {
 
            $('#dialog').dialog({
	            open: function() {
	                $("#dialogDate").datepicker({
		                format: "dd/mm/yyyy",
		                orientation: "bottom auto",
		                autoclose: true,
		                showOnFocus: "false"
		            }).blur();
	            },
	            close: function() {
	                $('#dialogDate').datepicker('destroy');
	            },
	        });
            
        }
