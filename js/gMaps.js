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
	{name:"Tiong Bahru Station (EWL)", position: {lat:1.28498, lng:103.82283}},
	{name:"Redhill Station (EWL)", position: {lat:1.289521, lng:103.816951}},
	{name:"Queenstown Station (EWL)", position: {lat:1.295428, lng:103.805623}},
	{name:"Outram Park Station (EWL)", position: {lat:1.281395, lng:103.838932}},
	{name:"Tanjong Pagar Station (EWL)", position: {lat:1.276407, lng:103.846700}},
	{name:"Commonwealth Station (EWL)", position: {lat:1.302320, lng: 103.798039}},
	{name:"Buona Vista Station (EWL)", position: {lat:1.307382, lng: 103.790325}},
	{name:"Dover Station (EWL)", position: {lat:1.311278, lng:103.778552}},
	{name:"Clementi Station (EWL)", position: {lat:1.315325, lng:103.764659}},
	{name:"Jurong East Station (EWL)", position: {lat:1.333133, lng:103.742213}},
	{name:"Chinese Garden Station (EWL)", position: {lat:1.342491, lng:103.732606}},
	{name:"Lakeside Station (EWL)", position: {lat:1.344155,lng:103.720819}},
	{name:"Boon Lay Station (EWL)", position: {lat:1.338659, lng:103.705894}},
	{name:"Pioneer Station (EWL)", position: {lat: 1.337461, lng:103.696780}},
	{name:"Joo Koon Station (EWL)", position: {lat: 1.327817, lng: 103.678311}},
	{name:"Raffles Place Station (EWL)", position: {lat:1.283879, lng:103.851012}},
	{name:"City Hall Station (EWL)", position: {lat:1.293241, lng:103.852166}},
	{name:"Bugis Station (EWL)", position: {lat:1.300910, lng:103.856685}},
	{name:"Lavender Station (EWL)", position: {lat:1.307137, lng:103.863122}},
	{name:"Aljunied Station (EWL)", position: {lat:1.316419, lng:103.882856}},
	{name:"Paya Lebar Station (EWL)", position: {lat:1.317792, lng:103.893756}},
	{name:"Eunos Station (EWL)", position: {lat: 1.319766, lng:103.902597}},
	{name:"Kembangan Station (EWL)", position: {lat:1.321053,lng:103.912811}},
	{name:"Bedok Station (EWL)", position: {lat:1.324056, lng:103.930195}},
	{name:"Tanah Merah Station (EWL)", position: {lat: 1.327402, lng:103.946374}},
	{name:"Expo Station (EWL)", position: {lat:1.334953, lng:103.961823}},
	{name:"Simei Station (EWL)", position: {lat: 1.343234, lng:103.953412}},
	{name:"Tampines Station (EWL)", position: {lat: 1.353071, lng: 103.945246}},
	{name:"Pasir Ris Station (EWL)", position: {lat: 1.373077, lng:103.949436}},
	{name:"Changi Airport Station (EWL)", position: {lat:1.357558, lng:103.988891}}
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
		google.maps.event.addListener(marker, 'click', (function(marker, name) {
			return function() {
				if (currentMarker) currentMarker.setAnimation(null);
				currentMarker = marker;
				marker.setAnimation(google.maps.Animation.BOUNCE);
				map.setCenter(marker.getPosition());
				infoWindow.setContent(name);
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
	

// // AJAX for MRT API
// $.ajax({
// 	url: 'https://mrtapi.com/api/v1.1/getTrainArrival&TIB',
// 	dataType: 'json',
// 	data: 'stnCode:TIB'
// 	success: function(data) {
// 		alert("lol");
// 	}
// });



// Google Maps auto resize	
$(window).resize(function() {
	var h = $(window).height(),
	offsetTop = 0;
	$('#map').css('height', (h-offsetTop));
	$('.sidebar').css('height', (h-offsetTop));
}).resize();