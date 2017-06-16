var map;
var marker;
var markersArray = {};
var CURRENT_LOCATION = {lat: 1.28631490, lng: 103.827403};
// Dark Mode style for Google Maps API
var STYLES_ARRAY =[
	{
		"featureType":"all",
		"elementType":"labels.text.fill",
		"stylers":[
			{"saturation":36},
			{"color":"#000000"},
			{"lightness":40}
		]
	},
	{
		"featureType":"all",
		"elementType":"labels.text.stroke",
		"stylers":[
			{"visibility":"on"},
			{"color":"#000000"},
			{"lightness":16}
		]
	},
	{
		"featureType":"all",
		"elementType":"labels.icon",
		"stylers":[
			{"visibility":"off"}
		]
	},
	{
		"featureType":"administrative",
		"elementType":"geometry.fill",
		"stylers":[
			{"color":"#000000"},
			{"lightness":20}
		]
	},
	{
		"featureType":"administrative",
		"elementType":"geometry.stroke",
		"stylers":[
			{"color":"#000000"},
			{"lightness":17},
			{"weight":1.2}
		]
	},
	{
		"featureType":"landscape",
		"elementType":"geometry",
		"stylers":[
			{"color":"#000000"},
			{"lightness":20}
		]
	},
	{
		"featureType":"poi",
		"elementType":"geometry",
		"stylers":[
			{"color":"#000000"},
			{"lightness":21}
		]
	},
	{
		"featureType":"road.highway",
		"elementType":"geometry.fill",
		"stylers":[
			{"color":"#000000"},
			{"lightness":17}
		]
	},
	{
		"featureType":"road.highway",
		"elementType":"geometry.stroke",
		"stylers":[
			{"color":"#000000"},
			{"lightness":29},
			{"weight":0.2}
		]
	},
	{
		"featureType":"road.arterial",
		"elementType":"geometry",
		"stylers":[
			{"color":"#000000"},
			{"lightness":18}
		]
	},
	{
		"featureType":"road.local",
		"elementType":"geometry",
		"stylers":[
			{"color":"#000000"},
			{"lightness":16}
		]
	},
	{
		"featureType":"transit",
		"elementType":"geometry",
		"stylers":[
			{"color":"#000000"},
			{"lightness":19}
		]
	},
	{
		"featureType":"water",
		"elementType":"geometry",
		"stylers":[
			{"color":"#000000"},
			{"lightness":17}
		]
	}
];
// Object array for markers with 2 params: name, and position (lat, lng)
var MARKERS = [
	{name:"Tiong Bahru MRT Station", position: {lat:1.28498, lng:103.82283}},
	{name:"Redhill MRT Station", position: {lat:1.289521, lng:103.816951}},
	{name:"Queenstown MRT Station", position: {lat:1.295428, lng:103.805623}},
	{name:"Outram Park MRT Station", position: {lat:1.281395, lng:103.838932}},
	{name:"Tanjong Pagar MRT Station", position: {lat:1.276407, lng:103.846700}},
	{name:"Commonwealth MRT Station", position: {lat:1.302320, lng: 103.798039}},
	{name:"Buona Vista MRT Station", position: {lat:1.307382, lng: 103.790325}},
	{name:"Dover MRT Station", position: {lat:1.311278, lng:103.778552}},
	{name:"Clementi MRT Station", position: {lat:1.315325, lng:103.764659}},
	{name:"Jurong East MRT Station", position: {lat:1.333133, lng:103.742213}},
	{name:"Chinese Garden MRT Station", position: {lat:1.342491, lng:103.732606}},
	{name:"Lakeside MRT Station", position: {lat:1.344155,lng:103.720819}},
	{name:"Boon Lay MRT Station", position: {lat:1.338659, lng:103.705894}},
	{name:"Pioneer MRT Station", position: {lat: 1.337461, lng:103.696780}},
	{name:"Joo Koon MRT Station", position: {lat: 1.327817, lng: 103.678311}},
	{name:"Raffles Place MRT Station", position: {lat:1.283879, lng:103.851012}},
	{name:"City Hall MRT Station", position: {lat:1.293241, lng:103.852166}},
	{name:"Bugis MRT Station", position: {lat:1.300910, lng:103.856685}},
	{name:"Lavender MRT Station", position: {lat:1.307137, lng:103.863122}},
	{name:"Aljunied MRT Station", position: {lat:1.316419, lng:103.882856}},
	{name:"Paya Lebar MRT Station", position: {lat:1.317792, lng:103.893756}},
	{name:"Eunos MRT Station", position: {lat: 1.319766, lng:103.902597}},
	{name:"Kembangan MRT Station", position: {lat:1.321053,lng:103.912811}},
	{name:"Bedok MRT Station", position: {lat:1.324056, lng:103.930195}},
	{name:"Tanah Merah MRT Station", position: {lat: 1.327402, lng:103.946374}},
	{name:"Expo MRT Station", position: {lat:1.334953, lng:103.961823}},
	{name:"Simei MRT Station", position: {lat: 1.343234, lng:103.953412}},
	{name:"Tampines MRT Station", position: {lat: 1.353071, lng: 103.945246}},
	{name:"Pasir Ris MRT Station", position: {lat: 1.373077, lng:103.949436}},
	{name:"Changi Airport MRT Station", position: {lat:1.357558, lng:103.988891}}
];
/**
* @description Initializes the Google Map
*/
function initMap() {
	var styledMapType = new google.maps.StyledMapType(STYLES_ARRAY, {name: "Dark Mode"});
	map = new google.maps.Map(document.getElementById('map'), {
		center: CURRENT_LOCATION,
		zoom: 12,
		mapTypeControlOptions: {
			mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
		}
	});
	map.mapTypes.set('styled_map', styledMapType);
	map.setMapTypeId('styled_map');
	var currentMarker = null;
	var infoWindow = new google.maps.InfoWindow();
	ginfo = infoWindow;
	// Centers the map on to the current location with each resize
	google.maps.event.addDomListener(window, 'resize', function() {
		map.setCenter(CURRENT_LOCATION);
	});
	// Creation of markers
	for (var i = 0; i < MARKERS.length; i ++) {
		marker = new google.maps.Marker({
			position: MARKERS[i].position,
			map: map,
			animation: google.maps.Animation.DROP
		});
		var name = MARKERS[i].name;
		markersArray[name] = marker;
		markerListener(marker, name);
		infoWindowListener(marker);
	}

	/**
	* @description Adds a listener to each marker
	* @params {Object} marker - The marker object to be passed through
	* @params {string} name - The name of the station
	*/
	function markerListener(marker, name) {
		
		var contentString = "<div id = 'main'><div id = 'location-name'><h1 id='header'>" + name + "</h1></div><div id = 'wiki-link'></div></div>";
		// Wikipedia AJAX 
		var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + name + '&format=json&callback=wikiCallback';
		// Wikipedia AJAX Error Handling
		var wikiRequestTimeout = setTimeout(function() {
			$("#wiki-link").text("Couldn't load the resources from Wikipedia!");
		}, 8000);
		
		// Renders the content when set up
		marker.addListener('click', function() {
			if (currentMarker) {
				currentMarker.setAnimation(null);
			}
			currentMarker = marker;
			marker.setAnimation(google.maps.Animation.BOUNCE);
			map.setCenter(marker.getPosition());
			$.ajax({
				url: wikiUrl,
				dataType: "jsonp",
				success: function (response) {
					var articleList = response[1];
					var articleStr = articleList[0];
					var url = 'http://en.wikipedia.org/wiki/' + articleStr;
					// To prevent clicking too fast from breaking the page
					if (!($("#wiki-link").has("a").length)) {
						$("#wiki-link").append("<a target = '_blank' href='" + url + "'>" + articleStr + "</a>");
					}
					// Time out if unable to load
					clearTimeout(wikiRequestTimeout);
				}
			});
			infoWindow.setContent(contentString);
			infoWindow.open(map,this);
		});
	}
	/**
	* @description Disables animation on infowindow close
	* @params {Object} marker - The marker object to be passed through
	*/
	function infoWindowListener(marker) {
		infoWindow.addListener('closeclick', function() {
			marker.setAnimation(null);
		});
	}
}