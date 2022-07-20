/**
		 * Recupere les limites d'un polygone
		 *
		 * @method getPolygonBounds
		 * @param {Object} polygon un `polygon` gmap
		 * @return {Object} bounds
		 */
		
		//getPolygonBounds: function(polygon) {
		function getPolygonBounds(polygon) {
			var bounds = new google.maps.LatLngBounds();
			
			for (let i = 0; i < polygon.length; i++) {
			var paths = polygon[i].getPaths();
			
			paths.forEach(function(path) {
				var ar = path.getArray();
				for(var i = 0, l = ar.length;i < l; i++) {
					bounds.extend(ar[i]);
				}
			});
		}
			return bounds;
		}
		