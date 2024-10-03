Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;
    // if the argument is the same array, we can be sure the contents are same as well
    if(array === this)
        return true;
    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});
Array.prototype.findFirstSubstring = function(s) {
            for(var i = 0; i < this.length;i++)
            {
                if(this[i].indexOf(s) !== -1)
                    return i;
            }
            return -1;
        };
var shops = [];
		 var myKey = "AIzaSyCZNNUOZf14n7usyKe9lhiXhODiOtPJcj8";	
		 var appraisers = [];
		var rateTableArray = ["NORTHERN IL #1","NORTHERN IL #2","NORTHERN IL #3","NORTHERN IL #4","NORTHERN IL #5","NORTHERN IL #6","NORTHERN IL #7","SOUTH & CTR IL #1","SOUTH & CTR IL #2","SOUTH & CTR IL #3","SOUTH & CTR IL #4","SOUTH & CTR IL #7","SOUTH & CTR IL #8","SOUTH & CTR IL #9","INDIANA #1","INDIANA #2","INDIANA #3","INDIANA #4","INDIANA #5","INDIANA #6","INDIANA #7","INDIANA #8","INDIANA #9","MISSISSIPPI #1","GEORGIA #1","NEW MEXICO #1","TEXAS #1","TEXAS #2","TEXAS #3","TEXAS #4","ARIZONA #1","ARIZONA #2","UTAH #1","OHIO #1","TENNESSEE #2","TENNESSEE #1"]
		var statusCode = 0;
var storedShops = JSON.parse(localStorage.getItem('shops')) || [];
if (storedShops.length !== 0) {
//if (!shops.equals(storedShops)) {
$.ajax({
		   type: "GET",
		   url: "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1UMuKB3q_Al9y0Oe-THMar0wa55-wsar6",
		   async: false,
		   success: function(response) { 
			
			  
			   var styles = [];
				$(response).find('Style').each(function() {
					var style = {
						id: $(this).attr('id'),
						color: $(this).find('PolyStyle').find('color').text().replace(/(\r\n|\n|\r)/gm, "")
					};
					styles.push(style);	
							});
		
					$(response).find("Folder").eq(0).find("Placemark").each(function(index, ele) {
						var newShop = [];
						var fullAddress, cityState;
		    				var _name = $(this).find('name').html();
						var _desc = $(this).find('description').html() || "";
						var _coords = $(this).find('Point').find('coordinates').text().trim().split(',');
						var _towingIcon = $(this).find('styleUrl').text();
						var polyCoords = $(this).find('Polygon'); //.find('outerBoundaryIs').find('LinearRing').find('coordinates').text().trim();
						var _iconColor = $(this).find('styleUrl').html();
						var _rateTable = "";
						if (polyCoords.length > 0) {
							
						var _style = $(this).find('styleUrl').text().replace("#","");
						var _normal = _style + "-normal";
						var _highlight = _style + "-highlight";
						var _color;
							for (var a = 0; a < styles.length; a++) {
								if (styles[a].id === _normal) {
									_color = "#" + styles[a].color;
								};
							     };
							//for (let i = 0; i < polyCoords.length; i++) {
							$(polyCoords).each(function () {
									var tempCoords = $(this).find('outerBoundaryIs').find('LinearRing').find('coordinates').text().split('\n'); //.trim().split(',');
								
								var coords = [];
								for (let i = 0; i < tempCoords.length; i++) {
									var tempCoord = tempCoords[i].trim().split(',');
									tempCoord.pop();
									if (tempCoord.length > 0) { coords.push({ lat: Number(tempCoord[1]), lng: Number(tempCoord[0]) }) };
								}
								
								
									//var coords = [{ lat: tempCoords[1], lng: tempCoords[0] }];
								
									var name = _name.toString().replace(/[\r\n]/g, '').replace(/\s+/g, ' ').replace(/ >/g, '>').replace(/> </g, '><').replace("<![CDATA[", "").replaceAll("<br>", " ").replace("]]>", "").trim();
									
								var altDesc;
								
								if (_desc) {
									
									if (name !== _desc.toString().replace(/[\r\n]/g, '').replace(/\s+/g, ' ').replace(/ >/g, '>').replace(/> </g, '><').replace("<![CDATA[", "").replaceAll("<br>", " ").replace("]]>", "").trim()) {
										altDesc = name + "\n" + _desc.toString().replace(/[\r\n]/g, '').replace(/\s+/g, ' ').replace(/ >/g, '>').replace(/> </g, '><').replace("<![CDATA[", "").replaceAll("<br>", " ").replace("]]>", "").trim();
									}else{
										altDesc = name; 
								};
								}else{
									altDesc = name; 
								};
								
								var blankAppraiser = { 
										name: name,
										coord: coords,
										desc: altDesc,
										color: _color
									};

								
										appraisers.push(blankAppraiser);
									});
							};
						var _towing = "";
						if (_towingIcon === "#icon-503-4186F0") {
							_towing = "yesTow";
						}else{
							_towing = "noTow";	
						}

						if (_coords.length > 1) {
						var _rateTablesArray = _desc.toString().split("<br>")
						var newArrayRT = [];
							for (var rt = 0; rt < _rateTablesArray.length; rt++) {
								newArrayRT.push(_rateTablesArray[rt].trim());
							}
						var _ratetables = rateTableArray.filter(element => newArrayRT.includes(element))[0]; //_desc.toString().split("<br>")[2];
						var _phones = _desc.toString().match(/((?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?)/img);
						var _emails = _desc.toString().match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
						var _phone, _email;
							if (_ratetables) {
								_rateTable = _ratetables;
							}else{
								_rateTable = 'DATA_ERROR';
								};
							if (_phones) {
								_phone = _phones[0];
							}else{
								_phone = 'DATA_ERROR';
							};
							if (_emails) {
								_email = _emails[0];
							}else{
								_email = 'DATA_ERROR';
							};
							var newName = _name.toString().replace(/[\r\n]/g, '').replace(/\s+/g, ' ').replace(/ >/g, '>').replace(/> </g, '><').replace("<![CDATA[", "").replaceAll("<br>", " ").replace("]]>", "").trim();
							var formattedName;
						
							if ((newName.match(/\(/g) || []).length > 0 && (newName.match(/TESLA/g) || []).length === 0) {
								if ((newName.match(/-/g) || []).length < 2) {
									formattedName = [newName.slice(0,newName.indexOf("(")).split('-')[0], "<br>",newName.slice(newName.indexOf("("))].join('')
								}else{
									var newNameSplit = newName.slice(0,newName.indexOf("(")).split('-')
									newNameSplit.pop();
									newNameSplit = newNameSplit.join('-');
									formattedName = [newNameSplit, "<br>",newName.slice(newName.indexOf("("))].join('');
								};
							}else{
								formattedName = [newName.slice(0,newName.indexOf("(")), "<br>", newName.slice(newName.indexOf("("))].join('');								
							};
							if ((formattedName.match(/\*/g) || []).length > 0) {
								formattedName = [formattedName.slice(0,formattedName.indexOf("*")), "<br>",formattedName.slice(formattedName.indexOf("*"))].join('')
								formattedName = formattedName.replaceAll("*", '')
							}

							 newShop.push(formattedName.replace('<br> <br>', '<br>'));
							
						
					   // if (typeof storedShops[index] !== 'undefined' && (Number(_coords[1]) !== Number(storedShops[index][6]) || Number(_coords[0]) !== Number(storedShops[index][7]))) {
					var newIndex = storedShops.findFirstSubstring(Number(_coords[1]));
						//var newIndex = storedShops.findFirstSubstring(newShop[1]);
						
					//if (newIndex === -1) newIndex = storedShops.findFirstSubstring(Number(_coords[0]));	
					
					//if (typeof storedShops[newIndex] !== 'undefined' || newIndex === -1) {	
					if ((typeof storedShops[newIndex] !== 'undefined' && Number(_coords[1]) !== Number(storedShops[newIndex][6])) || newIndex === -1) {
						//&& (Number(_coords[1]) !== Number(storedShops[newIndex][6])) || Number(_coords[0]) !== Number(storedShops[newIndex][7])
					if (newShop[0] !== 'UNIQUE/LIGHTHOUS<br>E') {
					 $.ajax({
						   type: "GET",
						   url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + _coords[1] + "," + _coords[0] + "&key=" + myKey,
						   async: false,
						   success: function(result) { 
							  
						//if (newShop[0] !== 'UNIQUE/LIGHTHOUSE') {
						  // fullAddress = result.results[0].formatted_address.split(',');
						var _street, _address, _city, _state, _zip;
						 for (var i = 0; i < result.results[0].address_components.length; i++) {
							 if (result.results[0].address_components[i].types[0] === 'street_number') {
								 _street = result.results[0].address_components[i].long_name
							 }
							 if (result.results[0].address_components[i].types[0] === 'route') {
								 _address = result.results[0].address_components[i].short_name
							 }
							 if (result.results[0].address_components[i].types[0] === 'locality') {
								 _city = result.results[0].address_components[i].long_name
							 }
							 if (result.results[0].address_components[i].types[0] === 'administrative_area_level_1') {
								 _state = result.results[0].address_components[i].short_name
							 }
							 if (result.results[0].address_components[i].types[0] === 'postal_code') {
								 _zip = result.results[0].address_components[i].long_name
							 }
						 }
						var fullAddress = _street + " " + _address + ", " + _city + ", " + _state + " " + _zip;
						   //fullAddress = result.results[0].address_components[1].short_name + " " + result.results[0].address_components[2].short_name + ", " + result.results[0].address_components[3].short_name + ", " + result.results[0].address_components[5].short_name + " " + result.results[0].address_components[7].short_name;
						   //cityState = fullAddress[1] + "," + fullAddress[2]
						    cityState = fullAddress.split(',')[1] + "," + fullAddress.split(',')[2]
						    newShop.push(fullAddress.split(',')[0]);
						   newShop.push(cityState);
						   newShop.push(_phone);
						   newShop.push("");
						   newShop.push(_email);
						   newShop.push(Number(_coords[1]));
						   newShop.push(Number(_coords[0]));
						   newShop.push("");
						   newShop.push("https://maps.googleapis.com/maps/api/streetview?size=276x129&location=" + _coords[1] + "," + _coords[0] + "&key=" + myKey)
						   newShop.push(_towing);
						   newShop.push(_rateTable);
						   newShop.push(_iconColor);
						   shops.push(newShop);
						//};
							}
						});
					}  
}else{
						if (typeof storedShops[newIndex] !== 'undefined') {
						//if (!isNaN(Number(storedShops[newIndex][6])) && typeof storedShops[newIndex] !== 'undefined') {		
						   fullAddress = storedShops[newIndex][1]
						   cityState = storedShops[newIndex][2]
						    newShop.push(fullAddress);
						   newShop.push(cityState);
						   newShop.push(_phone);
						   newShop.push("");
						   newShop.push(_email);
						   newShop.push(Number(storedShops[newIndex][6]));
						   newShop.push(Number(storedShops[newIndex][7]));
						   newShop.push("");
						   newShop.push("https://maps.googleapis.com/maps/api/streetview?size=276x129&location=" + _coords[1] + "," + _coords[0] + "&key=" + myKey)
						   newShop.push(_towing);
						   newShop.push(_rateTable);
						   newShop.push(_iconColor);
						   if (newShop[0] !== 'UNIQUE/LIGHTHOUS<br>E') {shops.push(newShop);};	
					    };
							};
								//}
						
					      };
						   
						
					   }); 
					}
		});
//}else{
//	shops = storedShops;
//};		
}else{
	$.ajax({
		   type: "GET",
		   url: "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1UMuKB3q_Al9y0Oe-THMar0wa55-wsar6",
		   async: false,
		   success: function(response) { 
			
			  
			   var styles = [];
				$(response).find('Style').each(function() {
					var style = {
						id: $(this).attr('id'),
						color: $(this).find('PolyStyle').find('color').text().replace(/(\r\n|\n|\r)/gm, "")
					};
					styles.push(style);	
							});
					$(response).find("Folder").eq(0).find("Placemark").each(function(index, ele) {
						var newShop = [];
						var fullAddress, cityState;
		    				var _name = $(this).find('name').html();
						var _desc = $(this).find('description').html();
						var _coords = $(this).find('Point').find('coordinates').text().trim().split(',');
						var _towingIcon = $(this).find('styleUrl').text();
						var polyCoords = $(this).find('Polygon'); //.find('outerBoundaryIs').find('LinearRing').find('coordinates').text().trim();
						var _iconColor = $(this).find('styleUrl').html();
						var _rateTable = "";
						
						if (polyCoords.length > 0) {
							
						var _style = $(this).find('styleUrl').text().replace("#","");
						var _normal = _style + "-normal";
						var _highlight = _style + "-highlight";
						var _color;
							for (var a = 0; a < styles.length; a++) {
								if (styles[a].id === _normal) {
									_color = "#" + styles[a].color;
								};
							     };
							//for (let i = 0; i < polyCoords.length; i++) {
							$(polyCoords).each(function () {
									var tempCoords = $(this).find('outerBoundaryIs').find('LinearRing').find('coordinates').text().split('\n'); //.trim().split(',');
								
								var coords = [];
								for (let i = 0; i < tempCoords.length; i++) {
									var tempCoord = tempCoords[i].trim().split(',');
									tempCoord.pop();
									if (tempCoord.length > 0) { coords.push({ lat: Number(tempCoord[1]), lng: Number(tempCoord[0]) }) };
								}
								
								
									//var coords = [{ lat: tempCoords[1], lng: tempCoords[0] }];
								
									var name = _name.toString().replace(/[\r\n]/g, '').replace(/\s+/g, ' ').replace(/ >/g, '>').replace(/> </g, '><').replace("<![CDATA[", "").replaceAll("<br>", " ").replace("]]>", "").trim();
									
								var altDesc;
								
								if (_desc) {
									
									if (name !== _desc.toString().replace(/[\r\n]/g, '').replace(/\s+/g, ' ').replace(/ >/g, '>').replace(/> </g, '><').replace("<![CDATA[", "").replaceAll("<br>", " ").replace("]]>", "").trim()) {
										altDesc = name + "\n" + _desc.toString().replace(/[\r\n]/g, '').replace(/\s+/g, ' ').replace(/ >/g, '>').replace(/> </g, '><').replace("<![CDATA[", "").replaceAll("<br>", " ").replace("]]>", "").trim();
									}else{
										altDesc = name; 
								};
								}else{
									altDesc = name; 
								};
								
								var blankAppraiser = { 
										name: name,
										coord: coords,
										desc: altDesc,
										color: _color
									};

								
										appraisers.push(blankAppraiser);
									});
							};
						var _towing = "";
						if (_towingIcon === "#icon-503-4186F0") {
							_towing = "yesTow";
						}else{
							_towing = "noTow";	
						}

						if (_coords.length > 1) {
						var _rateTablesArray = _desc.toString().split("<br>")
						var newArrayRT = [];
							for (var rt = 0; rt < _rateTablesArray.length; rt++) {
								newArrayRT.push(_rateTablesArray[rt].trim());
							}
						var _ratetables = rateTableArray.filter(element => newArrayRT.includes(element))[0]; //_desc.toString().split("<br>")[2];
						var _phones = _desc.toString().match(/((?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?)/img);
						var _emails = _desc.toString().match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
						var _phone, _email;
							if (_ratetables) {
								_rateTable = _ratetables;
							}else{
								_rateTable = 'DATA_ERROR';
								};
							if (_phones) {
								_phone = _phones[0];
							}else{
								_phone = 'DATA_ERROR';
							};
							if (_emails) {
								_email = _emails[0];
							}else{
								_email = 'DATA_ERROR';
							};
							var newName = _name.toString().replace(/[\r\n]/g, '').replace(/\s+/g, ' ').replace(/ >/g, '>').replace(/> </g, '><').replace("<![CDATA[", "").replaceAll("<br>", " ").replace("]]>", "").trim();
							var formattedName;
						
							if ((newName.match(/\(/g) || []).length > 0) {
								if ((newName.match(/-/g) || []).length < 2 ) {
									formattedName = [newName.slice(0,newName.indexOf("(")).split('-')[0], "<br>",newName.slice(newName.indexOf("("))].join('')
								}else{
									var newNameSplit = newName.slice(0,newName.indexOf("(")).split('-')
									newNameSplit.pop();
									newNameSplit = newNameSplit.join('-');
									formattedName = [newNameSplit, "<br>",newName.slice(newName.indexOf("("))].join('');
								};
							}else{
								formattedName = newName;
							};
							if ((formattedName.match(/\*/g) || []).length > 0) {
								formattedName = [formattedName.slice(0,formattedName.indexOf("*")), "<br>",formattedName.slice(formattedName.indexOf("*"))].join('')
								formattedName = formattedName.replaceAll("*", '')
							}

							newShop.push(formattedName.replace('<br> <br>', '<br>'));
					
					

					 $.ajax({
						   type: "GET",
						   url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + _coords[1] + "," + _coords[0] + "&key=" + myKey,
						   async: false,
						   success: function(result) { 
						   // fullAddress = result.results[0].formatted_address.split(',');
						   //fullAddress = result.results[0].address_components[1].short_name + " " + result.results[0].address_components[2].short_name + ", " + result.results[0].address_components[3].short_name + ", " + result.results[0].address_components[5].short_name + " " + result.results[0].address_components[7].short_name;
						   var _street, _address, _city, _state, _zip;
						 for (var i = 0; i < result.results[0].address_components.length; i++) {
							 if (result.results[0].address_components[i].types[0] === 'street_number') {
								 _street = result.results[0].address_components[i].long_name
							 }
							 if (result.results[0].address_components[i].types[0] === 'route') {
								 _address = result.results[0].address_components[i].short_name
							 }
							 if (result.results[0].address_components[i].types[0] === 'locality') {
								 _city = result.results[0].address_components[i].long_name
							 }
							 if (result.results[0].address_components[i].types[0] === 'administrative_area_level_1') {
								 _state = result.results[0].address_components[i].short_name
							 }
							 if (result.results[0].address_components[i].types[0] === 'postal_code') {
								 _zip = result.results[0].address_components[i].long_name
							 }
						 }
						 fullAddress = _street + " " + _address + ", " + _city + ", " + _state + " " + _zip;
						   
							   //cityState = fullAddress[1] + "," + fullAddress[2]
						    cityState = fullAddress.split(',')[1] + "," + fullAddress.split(',')[2]
						    newShop.push(fullAddress.split(',')[0]);
						   newShop.push(cityState);
						   newShop.push(_phone);
						   newShop.push("");
						   newShop.push(_email);
						   newShop.push(Number(_coords[1]));
						   newShop.push(Number(_coords[0]));
						   newShop.push("");
						   newShop.push("https://maps.googleapis.com/maps/api/streetview?size=276x129&location=" + _coords[1] + "," + _coords[0] + "&key=" + myKey)
						   newShop.push(_towing);
						   newShop.push(_rateTable);
						   newShop.push(_iconColor);
						   if (newShop[0] !== 'UNIQUE/LIGHTHOUS<br>E') {shops.push(newShop);};
							}
						});
					
						
					      };
						   
						
					   }); 
					}
		});
};

/*$.ajax({
   type: "GET",
   url: "https://producersnational.sharepoint.com/_api/web/currentuser",
   async: false,
   success: function(CSVdata) { 
		console.log('logged in');
		console.log(CSVdata);
		statusCode = 1;
		$.ajax({
		   type: "GET",
		   url: "https://producersnational.sharepoint.com/sites/ProducersNational/Shared%20Documents/General/shops.csv",
		   async: false,
		   success: function(CSVdata) { 
				var data = $.csv.toArrays(CSVdata);
			   shops = data;
				console.log(data); }
		});
	}, 
   error: function(data) {

	    var strcookie = document.cookie;
		if (strcookie !== 'popup') {
	    var newwindow = window.open('https://producersnational.sharepoint.com');
		document.cookie = 'popup';
		};
		console.log('logged out');
		statusCode = 0;
		
		var answer = confirm('Please log into PNC Sharepoint then click OK.');
		   if (answer) {
			if (typeof newwindow !== 'undefined') newwindow.close();
			   document.cookie = 'closed';
		location.reload();
		   }else{
		location.reload();
	   };
	return;
}
});*/
/*
const myRequest = async () => 
     fetch("https://www.google.com/maps/d/kml?forcekml=1&mid=1UMuKB3q_Al9y0Oe-THMar0wa55-wsar6").then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(xmlText => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText,
                                            'text/xml');
var styles = [];
        // Now you can work with the parsed XML document
        $(xmlDoc).find('Style').each(function() {
					var style = {
						id: $(this).attr('id'),
						color: $(this).find('PolyStyle').find('color').text().replace(/(\r\n|\n|\r)/gm, "")
					};
					styles.push(style);	
							});
	    $(xmlDoc).find("Folder").eq(0).find("Placemark").each(function () {
						var newShop = [];
						
		    				var _name = $(this).find('name').html();
						var _desc = $(this).find('description').html();
						var _coords = $(this).find('Point').find('coordinates').text().trim().split(',');
						var _towingIcon = $(this).find('styleUrl').text();
						var polyCoords = $(this).find('Polygon'); //.find('outerBoundaryIs').find('LinearRing').find('coordinates').text().trim();
							
						if (polyCoords.length > 0) {
							
						var _style = $(this).find('styleUrl').text().replace("#","");
						var _normal = _style + "-normal";
						var _highlight = _style + "-highlight";
						var _color;
							for (var a = 0; a < styles.length; a++) {
								if (styles[a].id === _normal) {
									_color = "#" + styles[a].color;
								};
							     };
							//for (let i = 0; i < polyCoords.length; i++) {
							$(polyCoords).each(function () {
									var tempCoords = $(this).find('outerBoundaryIs').find('LinearRing').find('coordinates').text().split('\n'); //.trim().split(',');
								
								var coords = [];
								for (let i = 0; i < tempCoords.length; i++) {
									var tempCoord = tempCoords[i].trim().split(',');
									tempCoord.pop();
									if (tempCoord.length > 0) { coords.push({ lat: Number(tempCoord[1]), lng: Number(tempCoord[0]) }) };
								}
								
								
									//var coords = [{ lat: tempCoords[1], lng: tempCoords[0] }];
								
									var name = _name.toString().replace(/[\r\n]/g, '').replace(/\s+/g, ' ').replace(/ >/g, '>').replace(/> </g, '><').replace("<![CDATA[", "").replaceAll("<br>", " ").replace("]]>", "").trim();
									var altDesc;
								if (_desc) {
									altDesc = _desc.toString().replace(/[\r\n]/g, '').replace(/\s+/g, ' ').replace(/ >/g, '>').replace(/> </g, '><').replace("<![CDATA[", "").replaceAll("<br>", " ").replace("]]>", "").trim();
								}else{
									altDesc = name; 
								};
								var blankAppraiser = { 
										name: name,
										coord: coords,
										desc: altDesc,
										color: _color
									};
								//var blankAppraiser = { 
									//	name: "",
									//	coord: "",
									//	desc: ""
									//};
								//blankAppraiser.name = name;
								//blankAppraiser.coord = coords;
								//if (_desc) {
								//	blankAppraiser.desc = _desc.toString().replace(/[\r\n]/g, '').replace(/\s+/g, ' ').replace(/ >/g, '>').replace(/> </g, '><').replace("<![CDATA[", "").replaceAll("<br>", " ").replace("]]>", "").trim();
								//}else{
								//	blankAppraiser.dec  = name; 
								//};
										//for (let prop of blankAppraiser) {
												//prop.name = name;
												//prop.coord = coords;
												//if (_desc) {
													//	prop.desc = _desc.toString().replace(/[\r\n]/g, '').replace(/\s+/g, ' ').replace(/ >/g, '>').replace(/> </g, '><').replace("<![CDATA[", "").replaceAll("<br>", " ").replace("]]>", "").trim();
													//}else{
													//	prop.desc = name; 
													//};
											//};
								
												appraisers.push(blankAppraiser);
									});
							};
						var _towing = "";
						if (_towingIcon === "#icon-503-4186F0") {
							_towing = "yesTow";
						}else{
							_towing = "noTow";	
						}
						//console.log(_email);
						//console.log(_name.toString().replace("<![CDATA[", "").replaceAll("<br>", " ").replace("]]>", ""));
						//console.log(_coords[0] + ',' + _coords[1]);
						//console.log(_desc.toString().replace("<![CDATA[", "").replaceAll("<br>", ",").replace("]]>", ""));
						if (_coords.length > 1) {
						//var _phone = _desc.toString().replace("<![CDATA[", "").replaceAll("<br>", ",").replace("]]>", "").split(",")[0].replace("Ph# ", "");
						var _phones = _desc.toString().match(/((?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?)/img);
						//var _email = _desc.toString().replace("<![CDATA[", "").replaceAll("<br>", ",").replace("]]>", "").split(",")[1].replace("Email: ", "");
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
					 
					 $.ajax({
						   type: "GET",
						   url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + _coords[1] + "," + _coords[0] + "&key=" + myKey,
						   async: false,
						   success: function(result) { 
						   var fullAddress = result.results[0].formatted_address.split(',');
						  //console.log(fullAddress);
						  //for (i=0; i < fullAddress.length; i++) {
							//newShop.push(fullAddress[i].trim());
						  // }
						  var cityState = fullAddress[1] + "," + fullAddress[2]
						 // console.log(cityState);
						  newShop.push(fullAddress[0]);
						  newShop.push(cityState);
						   //newShop.pop();
						   newShop.push(_phone);
						   newShop.push("");
						   newShop.push(_email);
						   newShop.push(_coords[1]);
						   newShop.push(_coords[0]);
						   newShop.push("");
						   newShop.push("https://maps.googleapis.com/maps/api/streetview?size=276x129&location=" + _coords[1] + "," + _coords[0] + "&key=" + myKey)
						   newShop.push(_towing);
							   if (newShop[0] !== 'UNIQUE/LIGHTHOUSE') {shops.push(newShop);};
								
									//console.log(newShop);
														}
						});
					};
					}); 
    })
    .catch(error => {
        console.error(`There was a problem with
                       the fetch operation:`, error);
    });
*/
