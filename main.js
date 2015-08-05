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


app.init = function () {

	$('.datepicker').each(function () {
    	$(this).datepicker({
    		dateFormat: 'yy-mm-dd'
    	});
    });
	$('.submit-date').on('submit', function (e) {
		e.preventDefault();
		var dateRange = $('.start-date').datepicker({ dateFormat: 'yy-mm-dd' }) + ':' + $('.end-date').datepicker('getDate');
		app.getInfo(dateRange);

	});


}


app.getInfo = function(dateRange) {
	$.ajax({
		url: 'http://api.nytimes.com/svc/events/v2/listings.jsonp',
		type: 'GET',
		dataType: 'jsonp',
	    data: {
	      'api-key': 'c8592a2f201f8cc3fb4732100b74523e:1:71357838',
	      'facets': 1,
	      'limit': 20,
	      'date_range': dateRange
	  },
	  	success: function (res) {
			console.log(res);
		}
	});
};





$(function () {
	app.init();
});



