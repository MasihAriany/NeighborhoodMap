/* ****************    MAP    **********************/


var markers = [];

function filtering() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("placesList");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

var locations = [
	{
		name: "'Friends' Apartment",
		coords: {lat: 40.7323981, lng: -74.0053062}
	},
	{
		name: 'Empire State Building',
		coords: {lat: 40.7485405, lng: -73.9858531}
	},
	{
		name: 'Times Square',
		coords: {lat: 40.758895, lng: -73.9851100}
	},
	{
		name: 'Central Park',
		coords: {lat: 40.7828647, lng: -73.9675438}
	},
	{
		name: "St. Patrick's Cathedral",
		coords: {lat: 40.7584349, lng: -73.976100}
	},
	{
		name: "Broadway Theatre",
		coords: {lat: 40.7633581, lng: -73.983060}
	}
	];

var mapCenter = {
	coords: {lat: 40.7582937, lng: -73.990}
}

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: mapCenter.coords
	});
	//for(var i = 0; i < locations.length; i++) {
	//	var marker = new google.maps.Marker({
	//		position: locations[i].coords,
	//		map: map,
	//		title: locations[i].name,
	//		html: locations[i].name
	//	});
	//};
	
	//infoWindow for displaying the name of the place which is clicked.
	var contentString = "";
	var infowindow = new google.maps.InfoWindow();
	
	//marker.addListener('click', function() {
	//	infowindow.open(map, marker);
	//});
	var pin = function pin(map, name, lat, lng, text) {
	
		var marker;
		this.name = ko.observable(name);
		this.lat = ko.observable(lat);
		this.lng = ko.observable(lng);
		this.text = ko.observable(text);
		this.marker = ko.observable(marker);
		
		// making a Google Map Marker for the selected location.
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			animation: google.maps.Animation.DROP,
			title: name,
			map: map
		});
		this.isVisible = ko.observable(false);
		this.isVisible.subscribe(function(currentState) {
			if (currentState) {
				marker.setMap(map);
			} else {
				marker.setMap(null);
			}
		});

		this.isVisible(true);
		markers.push(marker);
	}
	



/* ****************    REST    **********************/


var viewModel = function() {
	var self = this;
	this.locs = ko.observableArray([]);
	self.query = ko.observable('');
	var i = 0;
	locations.forEach(function(place) {
		self.locs.push( new pin(map, place.name, place.coords.lat, place.coords.lng, i) );
		i++;
	});

	
	self.filterPins = ko.computed(function () {
		var search  = self.query().toLowerCase();
		return ko.utils.arrayFilter(self.locs(), function (pin) {
			var doesMatch = pin.name().toLowerCase().indexOf(search) >= 0;
			pin.isVisible(doesMatch);
			return doesMatch;
		});
	});
	
}

ko.applyBindings(new viewModel());
}
window.onload = initMap;