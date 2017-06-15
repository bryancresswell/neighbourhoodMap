// Knockout
var STATION_LIST = [
		{name: "Tiong Bahru MRT Station", marker: markersArray['Tiong Bahru MRT Station']},
		{name: "Redhill MRT Station", marker: markersArray['Redhill MRT Station']},
		{name: "Queenstown MRT Station", marker: markersArray['Queenstown MRT Station']},
		{name: "Outram Park MRT Station", marker: markersArray['Outram Park MRT Station']},
		{name: "Tanjong Pagar MRT Station", marker: markersArray['Tanjong Pagar MRT Station']},
		{name: "Commonwealth MRT Station", marker: markersArray['Commonwealth MRT Station']},
		{name: "Buona Vista MRT Station", marker: markersArray['Buona Vista MRT Station']},
		{name: "Dover MRT Station", marker: markersArray['Dover MRT Station']},
		{name: "Clementi MRT Station", marker: markersArray['Clementi MRT Station']},
		{name: "Jurong East MRT Station", marker: markersArray['Jurong East MRT Station']},
		{name: "Chinese Garden MRT Station", marker: markersArray['Chinese Garden MRT Station']},
		{name: "Lakeside MRT Station", marker: markersArray['Lakeside MRT Station']},
		{name: "Boon Lay MRT Station", marker: markersArray['Boon Lay MRT Station']},
		{name: "Pioneer MRT Station", marker: markersArray['Pioneer MRT Station']},
		{name: "Joo Koon MRT Station", marker: markersArray['Joo Koon MRT Station']},
		{name: "Raffles Place MRT Station", marker: markersArray['Raffles Place MRT Station']},
		{name: "City Hall MRT Station", marker: markersArray['City Hall MRT Station']},
		{name: "Bugis MRT Station", marker: markersArray['Bugis MRT Station']},
		{name: "Lavender MRT Station", marker: markersArray['Lavender MRT Station']},
		{name: "Aljunied MRT Station", marker: markersArray['Aljunied MRT Station']},
		{name: "Paya Lebar MRT Station", marker: markersArray['Paya Lebar MRT Station']},
		{name: "Eunos MRT Station", marker: markersArray['Eunos MRT Station']},
		{name: "Kembangan MRT Station", marker: markersArray['Kembangan MRT Station']},
		{name: "Bedok MRT Station", marker: markersArray['Bedok MRT Station']},
		{name: "Tanah Merah MRT Station", marker: markersArray['Tanah Merah MRT Station']},
		{name: "Expo MRT Station", marker: markersArray['Expo MRT Station']},
		{name: "Simei MRT Station", marker: markersArray['Simei MRT Station']},
		{name: "Tampines MRT Station", marker: markersArray['Tampines MRT Station']},
		{name: "Pasir Ris MRT Station", marker: markersArray['Pasir Ris MRT Station']},
		{name: "Changi Airport MRT Station", marker: markersArray['Changi Airport MRT Station']}
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
var neighbourhoodMapViewModel = function() {
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
		if (!filter) {
			ginfo.close()
			for (var i = 0; i < self.locationList().length; i ++) {
				self.locationList()[i].marker().setVisible(true);
				self.locationList()[i].marker().setAnimation(null);
			}
			return self.locationList();
		} else {
			return ko.utils.arrayFilter(self.locationList(), function(item) {
				ginfo.close();
				var result = stringStartsWith(item.name().toLowerCase(), filter);
				if (result) {
					item.marker().setVisible(true);
				} else {
					item.marker().setVisible(false);
				}
				return result;
			});
		}
	});
}
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

ko.applyBindings(new neighbourhoodMapViewModel());

