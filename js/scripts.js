// Knockout
var STATION_LIST = [
		{name: "Tiong Bahru MRT Station"},
		{name: "Redhill MRT Station"},
		{name: "Queenstown MRT Station"},
		{name: "Outram Park MRT Station"},
		{name: "Tanjong Pagar MRT Station"},
		{name: "Commonwealth MRT Station"},
		{name: "Buona Vista MRT Station"},
		{name: "Dover MRT Station"},
		{name: "Clementi MRT Station"},
		{name: "Jurong East MRT Station"},
		{name: "Chinese Garden MRT Station"},
		{name: "Lakeside MRT Station"},
		{name: "Boon Lay MRT Station"},
		{name: "Pioneer MRT Station"},
		{name: "Joo Koon MRT Station"},
		{name: "Raffles Place MRT Station"},
		{name: "City Hall MRT Station"},
		{name: "Bugis MRT Station"},
		{name: "Lavender MRT Station"},
		{name: "Aljunied MRT Station"},
		{name: "Paya Lebar MRT Station"},
		{name: "Eunos MRT Station"},
		{name: "Kembangan MRT Station"},
		{name: "Bedok MRT Station"},
		{name: "Tanah Merah MRT Station"},
		{name: "Expo MRT Station"},
		{name: "Simei MRT Station"},
		{name: "Tampines MRT Station"},
		{name: "Pasir Ris MRT Station"},
		{name: "Changi Airport MRT Station"}
];
// Knockout Model (Station List)
/**
* @description Creates the Stations object
* @constructor
* @param {Object} data - Data contains two properties per entry, name and marker
*/
var Stations = function(data) {
	this.name = ko.observable(data.name);
	this.marker = ko.observable(data.marker);
};

// Knockout ViewModel
var NeighbourhoodMapViewModel = function() {
	var self = this;
	this.locationList = ko.observableArray([]);
	this.holdingList = ko.observableArray([]);
	STATION_LIST.forEach(function(stationItem) {
		self.locationList.push(new Stations(stationItem));
	});
	/**
	* @description Shows marker info for a particular list element
	* @param {Object} name 
	*/
	this.showMarkerInfo = function(name) {
		var trigger = name.name();
		google.maps.event.trigger(markersArray[trigger], 'click');
	};
	// Filter Function (includes Marker functions that are handled via Knockout's computed observable)
	this.filter = ko.observable("");
	// Computed observable from Knockout which filters out arrays and markers from the input
	this.filterSearch = ko.computed(function() {
		var filter = self.filter().toLowerCase();
		if (markerLoaded) {
			if (!filter) {
				for (var i = 0; i < self.locationList().length; i ++) {
					self.locationList()[i].marker.setVisible(true);
					self.locationList()[i].marker.setAnimation(null);
				}
				return self.locationList();
			} else {
				return ko.utils.arrayFilter(self.locationList(), function(item) {
					var result = stringStartsWith(item.name().toLowerCase(), filter);
					if (result) {
						if (item.marker) {
							item.marker.setVisible(true);
						}
					} else {
						if (item.marker) {
							item.marker.setVisible(false);
						}
					}
					return result;
				});
			}
		} else {
			return self.locationList();
		}
	});
};
/**
* @description Helper function to replace ko.utils.stringStartsWith
* @param {string} string
* @param {string} startsWith
* @returns {boolean} Boolean indicating if the string found matches the input
*/
var stringStartsWith = function (string, startsWith) {
	string = string || "";
	if (startsWith.length > string.length) {
		return false;
	}
	return string.substring(0, startsWith.length) === startsWith;
};

var vm = new NeighbourhoodMapViewModel();
ko.applyBindings(vm);
