// KNOCKOUT
function neighbourhoodMapViewModel() {
	var self = this;
	// Non editable model data
	self.locations = [
		{name: "Tiong Bahru Station (EWL)"},
		{name: "Redhill Station (EWL)"},
		{name: "Queenstown Station (EWL)"},
		{name: "Outram Park Station (EWL)"},
		{name: "Tanjong Pagar Station (EWL)"},
		{name: "Commonwealth Station (EWL)"},
		{name: "Buona Vista Station (EWL)"},
		{name: "Dover Station (EWL)"},
		{name: "Clementi Station (EWL)"},
		{name: "Jurong East Station (EWL)"},
		{name: "Chinese Garden Station (EWL)"},
		{name: "Lakeside Station (EWL)"},
		{name: "Boon Lay Station (EWL)"},
		{name: "Pioneer Station (EWL)"},
		{name: "Joo Koon Station (EWL)"},
		{name: "Raffles Place Station (EWL)"},
		{name: "City Hall Station (EWL)"},
		{name: "Bugis Station (EWL)"},
		{name: "Lavender Station (EWL)"},
		{name: "Aljunied Station (EWL)"},
		{name: "Paya Lebar Station (EWL)"},
		{name: "Eunos Station (EWL)"},
		{name: "Kembangan Station (EWL)"},
		{name: "Bedok Station (EWL)"},
		{name: "Tanah Merah Station (EWL)"},
		{name: "Expo Station (EWL)"},
		{name: "Simei Station (EWL)"},
		{name: "Tampines Station (EWL)"},
		{name: "Pasir Ris Station (EWL)"},
		{name: "Changi Airport Station (EWL)"}
	];
}

ko.applyBindings(new neighbourhoodMapViewModel());