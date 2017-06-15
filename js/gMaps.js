var map;
var marker, i;
window.markersArray = {};
var currentLocation = {lat: 1.28631490, lng: 103.827403};
var stylesArray =[
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
			{"color":"#000000"}
			,{"lightness":19}
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
var markers = [
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
function initMap() {
	var styledMapType = new google.maps.StyledMapType(stylesArray, {name: "Dark Mode"});
	map = new google.maps.Map(document.getElementById('map'), {
		center: currentLocation,
		zoom: 12,
		mapTypeControlOptions: {
			mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
		}
	});
	map.mapTypes.set('styled_map', styledMapType);
	map.setMapTypeId('styled_map');
	// TODO: Knockout to auto update
	var image = {
		url:"https://d3acja3ybn8ixf.cloudfront.net/gfx/default/index/arrow.svg"
	}
	var currentMarker = null;
	var infoWindow = new google.maps.InfoWindow();

	for (var i = 0; i < markers.length; i ++) {
		marker = new google.maps.Marker({
			position: markers[i].position,
			map: map,
			animation: google.maps.Animation.DROP
		});
		var name = markers[i].name;
		var position = markers[i].position;
		google.maps.event.addListener(marker, 'click', (function(marker, name) {
			return function() {
				if (currentMarker) currentMarker.setAnimation(null);
				currentMarker = marker;
				marker.setAnimation(google.maps.Animation.BOUNCE);
				map.setCenter(marker.getPosition());
				console.log(name);
				var contentString = "<div id = 'main'><div id = 'location-name'><h1 id='header'>" + name + "</h1></div><div id = 'wiki-link'></div></div>"
				var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' +  name + '&format=json&callback=wikiCallback';
				var wikiRequestTimeout = setTimeout(function() {
					$("#wiki-link").text("Couldn't load the resources from Wikipedia!");
				}, 4000);
				$.ajax({
					url: wikiUrl,
					dataType: "jsonp",
					success: function (response) {
						var articleList = response[1];
						var articleStr = articleList[0];
						var url = 'http://en.wikipedia.org/wiki/' + articleStr;
						$("#wiki-link").append("<a target = '_blank' href='" + url + "'>" + articleStr + "</a>");
						clearTimeout(wikiRequestTimeout);
					}
				});
				var flickrApiKey = "5a7a63964a36764c6209e30b1e15846d";
				var flickrUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + flickrApiKey + '&lat=' + position.lat + '&lon=' + position.lng + '&accuracy=16&per_page=2&page=1&format=json';
				$.ajax({
					url: flickrUrl,
					dataType: 'json',
					success: function (response) {
						console.log(2323232);
					}
				})
				infoWindow.setContent(contentString);
				infoWindow.open(map,marker);
			}
		})(marker,name));

		google.maps.event.addListener(infoWindow, "closeclick", (function(marker) {
			return function() {
				marker.setAnimation(null);
			}
		})(marker));
		markersArray[name] = marker;
	}
}

function toggleBounce() {
	if (marker.getAnimation() != null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}
	

// AJAX for Wikipedia

	
// AJAX for Flickr



// Google Maps auto resize	
$(window).resize(function() {
	var h = $(window).height(),
	offsetTop = 0;
	$('#map').css('height', (h-offsetTop));
	$('.sidebar').css('height', (h-offsetTop));
}).resize();