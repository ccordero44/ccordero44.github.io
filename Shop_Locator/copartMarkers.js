function copartLocations(lat,lng,dist) {
	try {
	$.ajax({
				   type: "GET",
				   url: "https://www.copart.com/public/data/location/near-by/coordinates/" + lat + "/" + lng + "?distance=" + dist,
				   
				}).done(function(data) {
					var copartMarker;
					
					for (var i = 0; i < data.data.length; i++) {
						var yardURL = 'https://www.copart.com' + data.data[i].locationUrl;
						var yardLat = data.data[i].yardLatitude;
						var yardLng = data.data[i].yardLongitude;
						var yardName = data.data[i].yardName;
						var yardNumber = data.data[i].yardNumber;
						var yardCity = data.data[i].yardCity;
						var yardHoursStart = data.data[i].yardHours.split(" to ")[0];
						var yardHoursEnd = data.data[i].yardHours.split(" to ")[1];
						var yardHours = tConvert(yardHoursStart) + ' - ' + tConvert(yardHoursEnd); //data.data[i].yardHours;
						var startDay = data.data[i].yardBeginDay;
						var endDay = data.data[i].yardEndDay;
						var re = new RegExp(startDay + '(.*?)' + endDay, 'g');
						var yardClosedDays = daysArray.filter(function(item) {
									  return !daysArray.join().match(re)[0].split(',').includes(item.split('.')[0]);
									})
						var yardDays = "<span class='copartHours' title='Toggle Location Hours' style='padding:0;'><i class='bi bi-clock'></i></span><ol hidden='hidden' class='hoursList copartHoursList'><label><b>Hours</b></label><li>" + daysArray.join().match(re)[0].split(',').join(": " + yardHours + "</li><li>") + ": " + yardHours + "</li><li>" + yardClosedDays.join(": Closed</li><li>") + ": Closed</li></ol>"; //data.data[i].yardDays;
						var yardPhone = data.data[i].yardPhoneAreaCode + data.data[i].yardPhoneNumber;
						var yardFax = data.data[i].yardFaxAreaCode + data.data[i].yardFaxNumber;
						var yardGMEmail = data.data[i].gmEmail;
						var yardGMName = data.data[i].gmFullName;
						var yardRMEmail = data.data[i].rmEmail;
						var yardRMName = data.data[i].rmFullName;
						var yardMailingAddress1 = data.data[i].yardMailingAddress1;
						var yardMailingAddress2 = ' ' + data.data[i].yardMailingAddress2;
						var yardMailingCity = data.data[i].yardMailingCity;
						var yardMailingStateCode = data.data[i].yardMailingStateCode;
						var yardMailingZip = data.data[i].yardMailingZip;
						var yardFullAddress;

						if (data.data[i].yardMailingAddress2 !== '') {
							yardFullAddress = yardMailingAddress1 + yardMailingAddress2 + '<br>' + yardMailingCity + ', ' + yardMailingStateCode + ' ' + yardMailingZip;
						}else{
							yardFullAddress = yardMailingAddress1 + '<br>' + yardMailingCity + ', ' + yardMailingStateCode + ' ' + yardMailingZip;
						};
						copartMarker = new google.maps.Marker({
								position: new google.maps.LatLng(yardLat, yardLng),
								clickable: true,
								title: "Copart " + yardNumber,
								icon: 'copart.png',
								content: '<div class="titleTxt" style="white-space: nowrap;">' + yardName + ' (Yard ' + yardNumber + ')</div><div>' + yardFullAddress + '</div><div><i class="bi bi-telephone"></i><a href="tel://' + yardPhone + '"> ' + formatPhoneNumber(yardPhone) + '</a></div><div><i class="bi bi-envelope"></i> <a href="mailto://titlesyard' + lpad(yardNumber, 3) + '@copart.com">titlesyard' + lpad(yardNumber, 3) + '@copart.com</a></div><div>' + yardDays + '</div><br><div><b>General Manager:</b> <a href="mailto://' + yardGMEmail + '"> ' + yardGMName + '</a></div><br><div><b>Regional Manager:</b> <a href="mailto://' + yardRMEmail + '"> ' + yardRMName + '</a></div><br><div><a target="_blank" href="' + yardURL + '">' + yardURL + '</a></div>'
							});
							copartInfoWindow = new google.maps.InfoWindow();
							copartInfoWindow.setContent('');
							google.maps.event.addListener(copartMarker, 'click', (function (copartMarker, i) {
								 if (activeInfoWindow) activeInfoWindow.close();
								return function() {
									 map.setZoom(13);
									 map.setCenter(copartMarker.getPosition());
									 copartInfoWindow.setContent(this.content);
									 copartInfoWindow.setOptions({maxWidth:'fit-content'});
									 copartInfoWindow.open(map, this);
									 activeInfoWindow = copartInfoWindow; 
									 activeMarker = copartMarker;
									// $('.titleTxt').parent().css('white-space','nowrap');
																 
								};
								
							})(copartMarker, i));
								
								copartMarkers.push(copartMarker);
									
					};
					
				});
	}catch (error){
	console.log(error);
		var alertdiv= document.createElement('div');
		alertdiv.innerHTML = "There was an error connecting to the Copart server. Please try again later."

		$(alertdiv).dialog({
					resizable: false,
					modal: true,
					closeOnEscape: false,
					title: "Copart Error",
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
	
function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
}
function tConvert(time) {
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}
function lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}

