/*jslint browser: true*/
/*global $, jQuery, alert*/

jQuery(document).ready(function($) {
    'use strict';

    var windowWidth = $(window).width(),
        windowHeight = $(window).height();

    var swiper = new Swiper('.partner-slider', {
        nextButton: '.logo-next',
        prevButton: '.logo-prev',
        slidesPerView: 5,
        spaceBetween: 100,
        breakpoints: {
            900: {
                slidesPerView: 2,
                spaceBetween: 50
            }
        }
    });

    var videoSwiper = new Swiper('.video-slider', {
        autoplay: 5000,
        centeredSlides: true,
        nextButton: '.video-next',
        prevButton: '.video-prev',
        slidesPerView: 4,
        spaceBetween: 100,
        breakpoints: {
            1640: {
                slidesPerView: 3,
                spaceBetween: 50
            },
            900: {
                slidesPerView: 1,
                spaceBetween: 50
            }
        }
    });

    /**
     * Hide loader on window load
     */
    $(window).bind("load", function() {
        $('.loader').fadeOut(300);
    });

    

    /**
     *
     * Adding the class of appear to an element will cause it to slide in
     * when it is within the viewport
     *
     */
    if (windowWidth > 800) {
        $(window).on('scroll load', function() {
            $('.appear').each(function() {
                if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75) {
                    $(this).addClass('visible');
                }
            });
        });
    }


    /**
     *
     * Scroll down through the Facebook Feed Window on mousedown
     *
     */
    var scrolling = false;

    $(function($) {
        $('.scroll-btn').mousedown(function(e) {
            e.preventDefault();
            if ($('.cff-wrapper').position().top < -1900) {
                scrolling = false;
                $('.cff-wrapper').animate({ 'top': '0' });
            } else {
                scrolling = true;
                startScrolling($('.cff-wrapper'), '-=250px');
            }
        }).mouseup(function() {
            scrolling = false;
        });
    });

    function startScrolling(obj, param) {
        obj.animate({ 'top': param }, 'slow', function() {
            if (scrolling) {
                startScrolling(obj, param);
            }
        });
    }

    /**
     *
     * Transition to close icon effect for the hamburger on mobile devices
     * Also reveals and hides the mobile navigation
     *
     */
    $('#hamburger').click(function() {
        $(this).toggleClass('close-nav');
        $('.main-nav').toggle();
    });

    /**
     *
     * If window width is greater than 769px, cetain elements (those given the parallax class)
     * will have a slight translation on scroll giving a layered effect.
     *
     */
    if (windowWidth > 768) {
        $(".parallax").each(function(idx) {
            var i = idx + 1;
            var moveImage = $(this);

            function parallax() {
                var viewableOffset = moveImage.parent().offset().top - $(window).scrollTop();
                moveImage.css("transform", "translateY(" + viewableOffset * 0.1 + "px" + ") translateZ(0px)");
            }
            $(window).on('scroll load', function() {
                requestAnimationFrame(parallax);
            });
        });
        $(".parallax__layer-2").each(function(idx) {
            var i = idx + 1;
            var moveImage = $(this);

            function parallax() {
                var viewableOffset = moveImage.parent().offset().top - $(window).scrollTop();
                moveImage.css("transform", "translateY(" + viewableOffset * 0.35 + "px" + ") translateZ(0px)");
            }
            $(window).on('scroll load', function() {
                requestAnimationFrame(parallax);
            });
        });
    }

    $('.show-contact').click(function(e) {
        var action = $(this).text();
        e.preventDefault();
        $('.contact-modal-underlay').fadeIn(300);
        if (action == 'Book Now') {
            if ($('body').hasClass('page-template-splash-camp')) {
                var subject = 'Splash Camp Booking enquiry';
            }else{
                var subject = 'Booking enquiry';
            }
            
        }else{
            var subject = 'Website enquiry';
        }
        $('.contact-modal .subject input').val(subject);
        $('.contact-modal').addClass('active');
    });


    $('.contact-modal .close, .contact-modal-underlay').click(function(e) {
        e.preventDefault();
        $('.contact-modal-underlay').fadeOut(300);
        $('.contact-modal').removeClass('active');
    });

    $(".surf").each(function(idx) {
        var i = idx + 1;
        var moveImage = $(this);

        function parallax() {
            var viewableOffset = moveImage.parent().offset().top - $(window).scrollTop();
            moveImage.css("transform", "translateX(" + viewableOffset * -0.5 + "px" + ") translateZ(0px)");
        }
        $(window).on('scroll load', function() {
            requestAnimationFrame(parallax);
        });
    });

    /**
     *
     * Displaying and hiding the video modal using a matching class (from the slider)
     * to a matching ID (from the video modal).
     *
     */
    $('[class*="video-modal-"]').click(function(e) {
        e.preventDefault();
        $('#' + $(this).attr('class')).fadeIn(300);
    });
    $('.video-modal .close, .video-modal-underlay').click(function(e) {
        e.preventDefault();
        $(this).parent().hide();
        $(this).parent().find('iframe').each(function() {
            var el_src = $(this).attr("src");
            $(this).attr("src", el_src);
        });
    });

    /*
     *  new_map
     *
     *  This function will render a Google Map onto the selected jQuery element
     *
     *  @type   function
     *  @date   8/11/2013
     *  @since  4.3.0
     *
     *  @param  $el (jQuery element)
     *  @return n/a
     */
    function new_map($el) {
        // var
        var $markers = $el.find('.marker');
        // vars
        var args = {
            zoom: 10,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "hue": "#ff0000" }, { "lightness": -100 }, { "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "hue": "#dddddd" }, { "saturation": -100 }, { "lightness": -3 }, { "visibility": "on" }] }, { "featureType": "landscape", "elementType": "labels", "stylers": [{ "hue": "#000000" }, { "saturation": -100 }, { "lightness": -100 }, { "visibility": "off" }] }, { "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "hue": "#1cff00" }, { "weight": "1.88" }] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "visibility": "off" }, { "saturation": "3" }, { "color": "#161414" }] }, { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [{ "visibility": "on" }, { "color": "#040404" }, { "weight": "0.01" }] }, { "featureType": "landscape.man_made", "elementType": "labels.text", "stylers": [{ "visibility": "off" }, { "color": "#070707" }] }, { "featureType": "landscape.man_made", "elementType": "labels.text.fill", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.man_made", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.man_made", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural.landcover", "elementType": "geometry", "stylers": [{ "visibility": "off" }, { "color": "#ff0000" }] }, { "featureType": "landscape.natural.landcover", "elementType": "geometry.fill", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural.terrain", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "hue": "#000000" }, { "saturation": -100 }, { "lightness": -100 }, { "visibility": "off" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.attraction", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "saturation": -100 }, { "lightness": "-75" }, { "visibility": "on" }, { "color": "#8a8a8a" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "off" }] }, { "featureType": "road", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "hue": "#ff0000" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "on" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "color": "#8c8888" }] }, { "featureType": "road.local", "elementType": "labels.text", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "gamma": "0.71" }, { "weight": "0.01" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.local", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "labels", "stylers": [{ "hue": "#ff0000" }, { "lightness": -100 }, { "visibility": "off" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "hue": "#000000" }, { "saturation": -100 }, { "lightness": -100 }, { "visibility": "off" }] }]
        };
        // create map
        var map = new google.maps.Map($el[0], args);
        // add a markers reference
        map.markers = [];
        // add markers
        $markers.each(function() {
            add_marker($(this), map);
        });
        // center map
        center_map(map);
        // return
        return map;
    }

    /*
     *  add_marker
     *
     *  This function will add a marker to the selected Google Map
     *
     *  @type   function
     *  @date   8/11/2013
     *  @since  4.3.0
     *
     *  @param  $marker (jQuery element)
     *  @param  map (Google Map object)
     *  @return n/a
     */
    function add_marker($marker, map) {
        // var
        var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));

        // create marker
        var marker = new google.maps.Marker({
            position: latlng,
            map: map
        });
        // add to array
        map.markers.push(marker);
        // if marker contains HTML, add it to an infoWindow
        if ($marker.html()) {
            // create info window
            var infowindow = new google.maps.InfoWindow({
                content: $marker.html()
            });
            // show info window when marker is clicked
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
        }
    }

    /*
     *  center_map
     *
     *  This function will center the map, showing all markers attached to this map
     *
     *  @type   function
     *  @date   8/11/2013
     *  @since  4.3.0
     *
     *  @param  map (Google Map object)
     *  @return n/a
     */
    function center_map(map) {
        // vars
        var bounds = new google.maps.LatLngBounds();
        // loop through all markers and create bounds
        $.each(map.markers, function(i, marker) {

            var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());

            bounds.extend(latlng);

        });
        // only 1 marker?
        if (map.markers.length == 1) {
            // set center of map
            map.setCenter(bounds.getCenter());
            map.setZoom(12);
        } else {
            // fit to bounds
            map.fitBounds(bounds);
        }
    }

    /*
     *  document ready
     *
     *  This function will render each map when the document is ready (page has loaded)
     *
     *  @type   function
     *  @date   8/11/2013
     *  @since  5.0.0
     *
     *  @param  n/a
     *  @return n/a
     */
    // global var
    var map = null;
    $(document).ready(function() {
        $('.map').each(function() {
            map = new_map($(this));
        });
    });
});
