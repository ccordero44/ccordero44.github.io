		 var shops = [];
			// $.get( "shops.csv", function( CSVdata) {
	
			  // var data = $.csv.toArrays(CSVdata);
			// shops = data;
		  // });
		  
$.ajax({
   type: "GET",
   url: "https://cors-anywhere.herokuapp.com/https://producersnational.sharepoint.com/sites/ProducersNational/Shared%20Documents/General/shops.csv",
   async: false,
   success: function(CSVdata) { 
		var data = $.csv.toArrays(CSVdata);
		shops = data; }
});
