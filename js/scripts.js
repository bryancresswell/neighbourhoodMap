// Knockout
var stationList = [
		{name: "Tiong Bahru Station (EWL)", marker: markersArray['Tiong Bahru Station (EWL)']},
		{name: "Redhill Station (EWL)", marker: markersArray['Redhill Station (EWL)']},
		{name: "Queenstown Station (EWL)", marker: markersArray['Queenstown Station (EWL)']},
		{name: "Outram Park Station (EWL)", marker: markersArray['Outram Park Station (EWL)']},
		{name: "Tanjong Pagar Station (EWL)", marker: markersArray['Tanjong Pagar Station (EWL)']},
		{name: "Commonwealth Station (EWL)", marker: markersArray['Commonwealth Station (EWL)']},
		{name: "Buona Vista Station (EWL)", marker: markersArray['Buona Vista Station (EWL)']},
		{name: "Dover Station (EWL)", marker: markersArray['Dover Station (EWL)']},
		{name: "Clementi Station (EWL)", marker: markersArray['Clementi Station (EWL)']},
		{name: "Jurong East Station (EWL)", marker: markersArray['Jurong East Station (EWL)']},
		{name: "Chinese Garden Station (EWL)", marker: markersArray['Chinese Garden Station (EWL)']},
		{name: "Lakeside Station (EWL)", marker: markersArray['Lakeside Station (EWL)']},
		{name: "Boon Lay Station (EWL)", marker: markersArray['Boon Lay Station (EWL)']},
		{name: "Pioneer Station (EWL)", marker: markersArray['Pioneer Station (EWL)']},
		{name: "Joo Koon Station (EWL)", marker: markersArray['Joo Koon Station (EWL)']},
		{name: "Raffles Place Station (EWL)", marker: markersArray['Raffles Place Station (EWL)']},
		{name: "City Hall Station (EWL)", marker: markersArray['City Hall Station (EWL)']},
		{name: "Bugis Station (EWL)", marker: markersArray['Bugis Station (EWL)']},
		{name: "Lavender Station (EWL)", marker: markersArray['Lavender Station (EWL)']},
		{name: "Aljunied Station (EWL)", marker: markersArray['Aljunied Station (EWL)']},
		{name: "Paya Lebar Station (EWL)", marker: markersArray['Paya Lebar Station (EWL)']},
		{name: "Eunos Station (EWL)", marker: markersArray['Eunos Station (EWL)']},
		{name: "Kembangan Station (EWL)", marker: markersArray['Kembangan Station (EWL)']},
		{name: "Bedok Station (EWL)", marker: markersArray['Bedok Station (EWL)']},
		{name: "Tanah Merah Station (EWL)", marker: markersArray['Tanah Merah Station (EWL)']},
		{name: "Expo Station (EWL)", marker: markersArray['Expo Station (EWL)']},
		{name: "Simei Station (EWL)", marker: markersArray['Simei Station (EWL)']},
		{name: "Tampines Station (EWL)", marker: markersArray['Tampines Station (EWL)']},
		{name: "Pasir Ris Station (EWL)", marker: markersArray['Pasir Ris Station (EWL)']},
		{name: "Changi Airport Station (EWL)", marker: markersArray['Changi Airport Station (EWL)']}
];
// Knockout Model (Station List)
/**
* @description Creates the Stations object
* @constructor
* @param {string} title - The title of the book
* @param {string} author - The author of the book
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
	stationList.forEach(function(stationItem) {
		self.locationList.push(new Stations(stationItem));
	});

	this.currentLocation = ko.observable(this.locationList()[0]);
	this.showMarkerInfo = function(name) {
		var trigger = name.name()
		google.maps.event.trigger(markersArray[trigger], 'click');
	};
	// Filter Function (includes Marker functions that are handled via Knockout's computed observable)
	this.filter = ko.observable("");
	this.filterSearch = ko.computed(function() {
		var filter = self.filter().toLowerCase();
		if (!filter) {
			for (var i = 0; i < self.locationList().length; i ++) {
				self.locationList()[i].marker().setVisible(true);
			}
			return self.locationList();
		} else {
			return ko.utils.arrayFilter(self.locationList(), function(item) {
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

// Helper function to replace ko.utils.stringStartsWith
var stringStartsWith = function (string, startsWith) {
	string = string || "";
	if (startsWith.length > string.length) {
		return false;
	}
	return string.substring(0, startsWith.length) === startsWith;
};

ko.applyBindings(new neighbourhoodMapViewModel());

