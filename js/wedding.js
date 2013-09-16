jQuery.expr.filters.offscreen = function(el) {
  return (
              (el.offsetLeft + el.offsetWidth) < 0 
              || (el.offsetTop + el.offsetHeight) < 0
              || (el.offsetLeft > window.innerWidth || el.offsetTop > window.innerHeight)
         );
};





var Wedding = {
	venue: {},
	hotel : {},
	guest : {},
	center : {},
	init : function(){

		Wedding.loadMap();
		Wedding.bind();


	},
	checkSession : function() {
		if(sessionStorage == null){
			alert('No Session Storage');
		}else{
		
			var routeName = sessionStorage.cRouteName;
			var route = sessionStorage.cRoute;
			var cLon = sessionStorage.cLon;
			var cLat = sessionStorage.cLat;
			var cDir = sessionStorage.cDir;
			var cStop = sessionStorage.cStop;
			var cStopName = sessionStorage.cStopName;
			
			if(route === undefined || route === "null")
			{
				Wedding.loadRouteList();
			}else if(cDir === undefined || cDir === "null"){
				Wedding.loadDirections(route);
			}else if(cStop === undefined || cStop === "null"){
				Wedding.loadStopList(route, cDir);
			}else{
				Wedding.loadPredictions(cStop,route,cLat,cLon,cDir,cStopName);
			}
		
		}
	},
	loadMap : function() {
		
		var venueLatLon = new google.maps.LatLng(Wedding.venue.latitude, Wedding.venue.longitude);
		var hotelLatLon = new google.maps.LatLng(Wedding.hotel.latitude, Wedding.hotel.longitude);
		var centerLatLon = new google.maps.LatLng(Wedding.center.latitude, Wedding.center.longitude);

		var myOptions = {
			zoom: 11,
			center: centerLatLon,
			scrollwheel: false,
			disableDefaultUI: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}


		var venueIcon = 'img/venue.png';
		var hotelIcon = 'img/hotel.png';
		var guestIcon = 'img/person.png';

		Wedding.map = new google.maps.Map(document.getElementById("map"), myOptions);
		//Venue Marker
		var venueMarker = new google.maps.Marker({
			position: venueLatLon,
			map: Wedding.map,
			icon: venueIcon
		});

		//Hotel Marker
		var hotelMarker = new google.maps.Marker({
			position: hotelLatLon,
			map: Wedding.map,
			icon : hotelIcon
		});

		//Guest Marker
		/*var guestMarker = new google.maps.Marker({
			position: guestLatLon,
			map: Wedding.map,
			icon : guestIcon
		});*/


		//Stylize

		/* Create a custom map type */
		var texturedMapType = new google.maps.ImageMapType({
			getTileUrl: function(tileCoord, zoom, ownerDocument)
			{
		    	/* Return the same tile for every coord and zoom level */
		    	return 'img/bg-map-tile.png';
			},
			isPng: true,                    
			tileSize: new google.maps.Size(256, 256)
		});

		/* Add a new layer between the map and the markers and render tiles here */
		Wedding.map.overlayMapTypes.push(null);
		Wedding.map.overlayMapTypes.setAt(0, texturedMapType);


		//Traffic
		var trafficLayer = new google.maps.TrafficLayer();
		trafficLayer.setMap(Wedding.map);
	},
	bind:function(){
		setTimeout(function(){
			$('body').toggleClass('animate');
		},2000);

		$("a").click(function() {
			var target = $(this).attr('href');
			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 2000);
		});

		$(".map-wrapper .overlay").click(function() {
			$(this).fadeOut();
		});

		$(".button.add-person").on('click', function() {
			var html = $('.person-stamp').html();
			$("form .person-list").append(html);
			$("form .person-list .person:last-child input").each(function(){
				var len = $("form .person-list .person").length - 1;
				var attrName = 'person['+ len +']' +  $(this).attr('name');
				$(this).attr('name', attrName);
			});
		});

		$(".button.send-rsvp").on('click', function() {
			$.ajax({
				type: "POST",
				url: 'http://bobbyandkatie.com:8888/submit',
				data: $("form").serialize(), // serializes the form's elements.
				success: function(data)
				{
					console.log(data);
				}
			});
		});

		$(".person-list").on('click', '.person .close', function() {
			console.log('pow');
			var $person = $(this).parent();
			$person.slideUp(500,function(){
				$person.remove();

			});
		});

		$("form").on('change','input[type="radio"]', function() {
			if($(this).parent().parent().hasClass('attending')){
				if($(this).val() === 'yes'){
					$(this).parent().parent().next().stop().slideDown();
				}else{
					$(this).parent().parent().next().stop().slideUp();
				}
			}
		});
	}



};


jQuery(document).ready(function(){
	
	//Set Wedding Venue Coordinates
	Wedding.venue.latitude = 42.923276;
	Wedding.venue.longitude = -85.910129;

	//Set Wedding Venue Coordinates
	Wedding.hotel.latitude = 42.85314;
	Wedding.hotel.longitude = -85.86263;

	//Set Wedding Venue Coordinates
	Wedding.center.latitude = 42.891540;
	Wedding.center.longitude = -85.893946;


	Wedding.init();



	/*var availableTags = [
	  "Bobby LaPorte",
	  "Katie Keith"
	];
	$( ".search" ).autocomplete({
	  source: availableTags
	});*/

});
