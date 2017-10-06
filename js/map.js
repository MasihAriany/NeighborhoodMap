var markers = [];

var pin = function Pin(map, name, lat, lng, text) {
	
	var marker;
	this.name = ko.observable(name);
	this.lat = ko.observable(lat);
	this.lng = ko.observable(lng);
	this.text = ko.observable(text);
	
	// making a Google Map Marker for the selected location.
	marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lon),
		animation: google.maps.Animation.DROP
	});
	
	this.isVisible.subscribe(function(currentState) {
		if (currentState) {
			marker.setMap(map);
		} else {
			marker.setMap(null);
		}
	});

	this.isVisible(true);
}

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: mapCenter.coords
	});
	for(var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			position: locations[i].coords,
			map: map,
			title: locations[i].name,
			html: locations[i].name
		});
	};
	
	//infoWindow for displaying the name of the place which is clicked.
	var contentString = "";
	var infowindow = new google.maps.InfoWindow();
	
	//marker.addListener('click', function() {
	//	infowindow.open(map, marker);
	//});
	
	
}