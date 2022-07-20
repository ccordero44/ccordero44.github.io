		 var shops = [];
			// $.get( "shops.csv", function( CSVdata) {
	
			  // var data = $.csv.toArrays(CSVdata);
			// shops = data;
		  // });
		  
$.ajax({
   type: "GET",
   url: "\\10.74.11.100\unique_data\Claims\TOOLKIT\Shop%20Locator\shops.csv",
   async: false,
   success: function(CSVdata) { 
		var data = $.csv.toArrays(CSVdata);
		shops = data; }
});
