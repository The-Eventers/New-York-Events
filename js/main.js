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
<<<<<<< HEAD:js/main.js
app.subcategory = '';
=======
>>>>>>> b90a5a202db2d8dbae8e0d77619b765cf13ac28a:js/main.js


app.init = function () {

	$('.datepicker').each(function () {
    	$(this).datepicker();
    });
	$('form').on('submit', function (e) {
		e.preventDefault();
		$('.neighborhood-question input[type=checkbox]:checked').each(function(){
		    app.neighborhood = app.neighborhood + ' ' + $(this).val();
		    console.log(app.neighborhood);
		  });
		$('.category-question input[type=checkbox]:checked').each(function() {
<<<<<<< HEAD:js/main.js
			if ($(this).hasClass('subcategory')) { //if option selected is a subcategory (museums or events) then store that value as subcategory
				app.subcategory = app.subcategory + ' ' + $(this).val();
			} else if ($(this).hasClass('category')) { //if option selected is a category (comedy, art, theater) then store that value as category
				app.category = app.category + ' ' + $(this).val();
			}
			console.log(app.category);
			console.log(app.subcategory);
=======
			app.category = app.category + ' ' + $(this).val();
			console.log(app.category);
>>>>>>> b90a5a202db2d8dbae8e0d77619b765cf13ac28a:js/main.js
		});
		var startDate = $('.start-date').datepicker('getDate');
		var endDate = $('.end-date').datepicker('getDate');
		var dateRange = moment(startDate).format('YYYY-MM-DD') + ':' + moment(endDate).format('YYYY-MM-DD');
		console.log(dateRange);
<<<<<<< HEAD:js/main.js
		app.getInfo(dateRange, app.category, app.subcategory, app.neighborhood);
	});
};


app.getInfo = function(dateRange, category, subcategory, neighborhood) {
=======
		app.getInfo(dateRange, app.category, app.neighborhood);
	});
};

L.mapbox.accessToken = 'pk.eyJ1Ijoiam9hbm5hc3RlY2V3aWN6IiwiYSI6IjIzNmNhNjJmNzgxMjhkMzI3M2ZhYjU2Yjk1YmNlZWZmIn0.rA-ceyz6zzzlwCw0Hv0CMQ';
    var map = L.mapbox.map('map', 'mapbox.emerald')
       .setView([40.7, -74.0], 11);
       map.scrollWheelZoom.disable();


app.getInfo = function(dateRange, category, neighborhood) {
>>>>>>> b90a5a202db2d8dbae8e0d77619b765cf13ac28a:js/main.js
	$.ajax({
		url: 'http://api.nytimes.com/svc/events/v2/listings.jsonp?&filters=neighborhood: (Chelsea "Greenwhich Village" SoHo TriBeCa NoHo)',
		type: 'GET',
		dataType: 'jsonp',
	    data: {
	      'api-key': 'e6a25b3f20881562c56e3247ecd6335d:3:72623857',
	      'facets': 1,
<<<<<<< HEAD:js/main.js
	      'filters': 'category:' + app.category + ',subcategory:' + app.subcategory + ',neighborhood:' + app.neighborhood,
=======
	      'filters': 'category:' + app.category + ',neighborhood:' + app.neighborhood,
>>>>>>> b90a5a202db2d8dbae8e0d77619b765cf13ac28a:js/main.js
	      'limit': 20,
	      'date_range': dateRange
	  },
	  	success: function (res) {
			console.log(res);
		}
	});




};

app.displayResults = function() {
	
};






$(function () {
	app.init();
});







