		 var shops = [];
			// $.get( "shops.csv", function( CSVdata) {
	
			  // var data = $.csv.toArrays(CSVdata);
			// shops = data;
		  // });
		  
$.ajax({
   type: "GET",
   url: "https://producersnational-my.sharepoint.com/:x:/p/ccordero/Eba4ny_YdlZBm6QwTXjCCfEBRt1PwMgPAC7fN_ijZQApmg?e=X88eeP",
   async: false,
   success: function(CSVdata) { 
		var data = $.csv.toArrays(CSVdata);
		shops = data; }
});
