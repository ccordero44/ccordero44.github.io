		 var shops = [];
			// $.get( "shops.csv", function( CSVdata) {
	
			  // var data = $.csv.toArrays(CSVdata);
			// shops = data;
		  // });
		  
/*$.ajax({
   type: "GET",
   url: "https://raw.githubusercontent.com/ccordero44/Shops-List/main/shops.csv",
   async: false,
   success: function(CSVdata) { 
		var data = $.csv.toArrays(CSVdata);
		shops = data; }
});*/

var statusCode = 0;

$.ajax({
   type: "GET",
   url: "https://producersnational.sharepoint.com/_api/web/currentuser",
   async: false,
   success: function(data) { 
	console.log('logged in');
	console.log(data);
	statusCode = 1;
$.ajax({
   type: "GET",
   url: "",
   async: false,
    headers: {  'Access-Control-Allow-Origin': 'https://producersnational.sharepoint.com/sites/ProducersNational/Shared%20Documents/General/shops.csv' },
   success: function(CSVdata) { 
		var data = $.csv.toArrays(CSVdata);
	   shops = data;
		console.log(data); }
});
}, 
   error: function(data) {
	console.log('logged out');
	statusCode = 0;
	var newwindow = window.open('https://producersnational.sharepoint.com');
	window.alert('Please log into PNC Sharepoint then click OK.');
	newwindow.close();
	location.reload();
}
});
