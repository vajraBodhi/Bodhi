define(['jquery', 'stem/utils'], function($, utils) {
	var instance = null;
	var clazz = function(params) {
		this.seedConfig = params.seedConfig;
	};
	clazz.prototype.loadMap = function(mapDiv) {
		var mapFileUrl = this.seedConfig.map.map.url;
		// map is an object with getMap method to get an instance of Map Class
		require([mapFileUrl], function(map) {
			map.getMap(mapDiv).then(function(mapObj) {
				console.log('map loaded');
				utils.publish('mapLoaded', mapObj);
			});
		});
	};

	clazz.getInstance = function(params) {
		if (instance === null) {
			instance = new clazz(params);
		}

		return instance;
	};

	return clazz;
});