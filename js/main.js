//1. document.ready function
//2. init function
//3. inside init --> when user clicks on submit: prevent default,  store values for both dates as 2 different variables to be used for date_range & scroll page down to the next input section (with map)
//4. when user clicks on search after filling in 2nd input form: store user inputs in variables (neighborhoods, activities, other paramaters (i.e. kid-friendly, free etc.) - also have option for 'any' in neighborhoods)
//5. use all user input values in ajax request 
	//5A. Parameters: api-key, version, response-format, ne/sw (for neighborhood coordinates), date_range, limit (# of results returned), offset (to show more results)
	//5B. Facets: category (activity type - i.e. theater), subcategory (i.e. off broadway), neighborhood, free, kid_friendly, times_pick, event_detail_url
//6. success function for ajax request: display results --> create html elements dynamically using $('<div>')
//7. define how many results we want to show and add  "Show More" & "Search Again" buttons
//8. Allow user to save events into a variable called "myEvents"
	//8A. Save user's events in an array that is displayed in a modal by clicking on "My Events" in top right corner of nav bar
	//8B. Allow user to select events from their list of saved events to print off/email information about (format print versions)

var app = {};
app.neighborhood = '';
app.category = '';


app.init = function () {
	$('.date-submit').on('click', function (e) {
		e.preventDefault();
		$('section.hide').removeClass('hide');
		$('header').addClass('slideOutUp');
	});
	$('.datepicker').each(function () {
    	$(this).datepicker();
    });
	$('form').on('submit', function (e) {
		e.preventDefault();
		$('.neighborhood-question input[type=checkbox]:checked').each(function(){
		    app.neighborhood = app.neighborhood + ' ' + $(this).val();
		    // console.log(app.neighborhood);
		  });
		$('.category-question input[type=checkbox]:checked').each(function() {
			app.category = app.category + ' ' + $(this).val();
			// console.log(app.category);
		});
		var startDate = $('.start-date').datepicker('getDate');
		var endDate = $('.end-date').datepicker('getDate');
		app.dateRange = moment(startDate).format('YYYY-MM-DD') + ':' + moment(endDate).format('YYYY-MM-DD');
		// console.log(dateRange);
		app.getInfo(app.dateRange, app.category, app.neighborhood);
	});
};

L.mapbox.accessToken = 'pk.eyJ1Ijoiam9hbm5hc3RlY2V3aWN6IiwiYSI6IjIzNmNhNjJmNzgxMjhkMzI3M2ZhYjU2Yjk1YmNlZWZmIn0.rA-ceyz6zzzlwCw0Hv0CMQ';
    var map = L.mapbox.map('map', 'mapbox.emerald')
       .setView([40.73, -74.0], 13);
       map.scrollWheelZoom.disable();

app.getInfo = function(dateRange, category, neighborhood) {
	$.ajax({
		url: 'http://api.nytimes.com/svc/events/v2/listings.jsonp',
		type: 'GET',
		dataType: 'jsonp',
	    data: {
	      'api-key': 'e6a25b3f20881562c56e3247ecd6335d:3:72623857',
	      'facets': 1,
	      'filters': 'category:' + app.category + ',neighborhood:' + app.neighborhood,
	      'limit': 20,
	      'date_range': app.dateRange
	  },
	  	success: function (res) {
	  		// console.log(res);
			app.displayResults(res);
		}
	});
};

$('#Museums').on ('click', function() {
	$.ajax({
		url: 'http://api.nytimes.com/svc/events/v2/listings.jsonp?',
		type: 'GET',
		dataType: 'jsonp',
	    data: {
	      'api-key': 'e6a25b3f20881562c56e3247ecd6335d:3:72623857',
	      'facets': 1,
	      'filters': 'subcategory: Museums and Sites',
	      'limit': 20,
	      'date_range': app.dateRange
	  },
	  	success: function (museumResults) {
			console.log(museumResults);
			app.displayResults(museumResults);
		}
	});
});

$('#Events').on ('click', function() {
	$.ajax({
		url: 'http://api.nytimes.com/svc/events/v2/listings.jsonp?',
		type: 'GET',
		dataType: 'jsonp',
	    data: {
	      'api-key': 'e6a25b3f20881562c56e3247ecd6335d:3:72623857',
	      'facets': 1,
	      'filters': 'subcategory: Events',
	      'limit': 20,
	      'date_range': app.dateRange
	  },
	  	success: function (eventResults) {
			console.log(eventResults);
			app.displayResults(eventResults);
		}
	});
});

$('#Tours').on ('click', function() {
	$.ajax({
		url: 'http://api.nytimes.com/svc/events/v2/listings.jsonp?',
		type: 'GET',
		dataType: 'jsonp',
	    data: {
	      'api-key': 'e6a25b3f20881562c56e3247ecd6335d:3:72623857',
	      'facets': 1,
	      'filters': 'subcategory: Walking Tours',
	      'limit': 20,
	      'date_range': app.dateRange
	  },
	  	success: function (toursResults) {
			console.log(toursResults);
			app.displayResults(toursResults);
		}
	});
});

$('.question').on ('click', 'label', function() {
	$(this).toggleClass('choose');
	$(this).find('i').toggleClass('fa-check-square-o fa-square-o');
	$(this).find('input[type=checkbox]').attr('checked','checked');
});	


app.displayResults = function(res) {
	$('#results').empty();
	var results = res.results;
	// console.log(results);
	if (results.length===0) {
		var noResults = $('<h3>');
		noResults.text('Sorry, we couldn\'t find any results in your area. Try expanding your search.').addClass('sorry');
		$('#results').append(noResults);
		// console.log(noResults);
	} else {
		// loop over results array to get & display info

		$.each(results, function(index, value) {
			console.log(index, value);
			var resultContainer = $('<div>').addClass('result-container');
			var title = $('<p>').text(value.event_name).addClass('title');
			var venue = $('<p>').text(value.venue_name).addClass('venue');
			var address = $('<p>').text(value.street_address).addClass('address');
			var neighborhood = $('<p>').text(value.neighborhood).addClass('neighborhood');
			var description = $('<p>').html(value.web_description).addClass('description');
			resultContainer.append(title, venue, address, neighborhood, description);
			$('#results').append(resultContainer);
			L.marker([value.geocode_latitude,value.geocode_longitude]).addTo(map).bindPopup(value.event_name + ":" + "<br>" + value.street_address);
		});


	};

};


$(function () {
	app.init();
});


//if the category clicked on is spare times 
	//  if the value is 'Museums'
			//display results with a subcategory of 'Museums and Sites'
	//else if the value is 'Tours'
			//display results with a subcategory of 'Walking Tours'
//else



//svg
//style calendars
//add date inputs to bottom form
//masonry
//add my events bar
//modal
//animation slide up
//add save to my events
//printable
//credit the svg person
//show more button (load/ more results)
//slider images possibly?








