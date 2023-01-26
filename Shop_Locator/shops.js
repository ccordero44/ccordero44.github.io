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
   success: function(CSVdata) { 
	console.log('logged in');
	console.log(CSVdata);
	statusCode = 1;
	   var data = $.csv.toArrays(CSVdata);
	shops = data;
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
   error: function(CSVdata) {

       
	   var newwindow = window.open('https://producersnational.sharepoint.com');
	console.log('logged out');
	statusCode = 0;
	
	var answer = confirm('Please log into PNC Sharepoint then click OK.');
	   if (answer) {
		newwindow.close();
	location.reload();
	   }else{
	location.reload();
   };
	
}
});
