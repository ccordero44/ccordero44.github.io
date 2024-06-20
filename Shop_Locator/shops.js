		 var shops = [];
		 var myKey = "AIzaSyActTShUbrnDKcB4P94Qh4cj3JpsvdAjyE";	
		  

var statusCode = 0;
$.ajax({
		   type: "GET",
		   url: "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1UMuKB3q_Al9y0Oe-THMar0wa55-wsar6",
		   async: false,
		   success: function(response) { 
				
					$(response).find("Folder").eq(0).find("Placemark").each(function () {
						var newShop = [];
		                var _name = $(this).find('name').html();
						var _desc = $(this).find('description').html();
						var _coords = $(this).find('Point').find('coordinates').text().trim().split(',');
						var _towingIcon = $(this).find('styleUrl').text();
						var _towing;
						if (_towingIcon === "#icon-503-4186F0") {
						_towing = "yesTow";
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
								shops.push(newShop);
									//console.log(newShop);
														}
						});
					};
					}); 
										}
		});
		


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
