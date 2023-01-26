		 var shops = [];
			// $.get( "shops.csv", function( CSVdata) {
	
			  // var data = $.csv.toArrays(CSVdata);
			// shops = data;
		  // });
		  
/*$.ajax({
   type: "GET",
   url: "shops.csv",
   async: false,
   success: function(CSVdata) { 
		var data = $.csv.toArrays(CSVdata);
		shops = data; }
});*/

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
