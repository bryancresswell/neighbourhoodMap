var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 1.3511931, lng: 103.86749268},
		zoom: 15
		});
	}
$(window).resize(function() {
	var h = $(window).height(),
	offsetTop = 0;
	$('#map').css('height', (h-offsetTop));
}).resize();