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
    document.getElementById("mySidenav").style.width = "250px";
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
	coords: {lat: 40.7582937, lng: -74.0072724}
}

var loc = function(locData){
	this.name = ko.observable(locData.name);
}

var viewModel = function() {
	var self = this;
	var a = "Hi";
	this.locs = ko.observableArray([]);
	
	locations.forEach(function(place) {
		self.locs.push( new loc(place) );
	});
}

ko.applyBindings(new viewModel());