		 var shops = [];
			// $.get( "shops.csv", function( CSVdata) {
	
			  // var data = $.csv.toArrays(CSVdata);
			// shops = data;
		  // });
		  
$.ajax({
   type: "GET",
   url: "https://raw.githubusercontent.com/ccordero44/Shops-List/d92e39cd2a2e5848682db030371bc5f4dd548a7a/shops.csv",
   async: false,
   success: function(CSVdata) { 
		var data = $.csv.toArrays(CSVdata);
		shops = data; }
});

/*$.ajax({
   type: "GET",
   url: "",
   async: false,
    headers: {  'Access-Control-Allow-Origin': 'https://producersnational.sharepoint.com/sites/ProducersNational/Shared%20Documents/General/shops.csv' },
   success: function(CSVdata) { 
		var data = $.csv.toArrays(CSVdata);
	   shops = data;
		console.log(data); }
});*/
