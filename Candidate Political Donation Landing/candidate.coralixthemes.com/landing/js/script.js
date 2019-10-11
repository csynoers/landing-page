/**
 * The script is encapsulated in an self-executing anonymous function,
 * to avoid conflicts with other libraries
 */
(function($) {


	/**
	 * Declare 'use strict' to the more restrictive code and a bit safer,
	 * sparing future problems
	 */
	"use strict";



	/***********************************************************************/
	/*****************************  $Content  ******************************/
	/**
	* + Content
	* + Collapse Icon
	* + FancyBox
	* + Menu Scroll Action
	* + Menu Scroll Select
	* + Menu Show/Hide Logo
	* + Owl Carousel
	* + Send Forms
	* + Tooltips
	* + Video Background
	*/


	/***************************  $Collapse Icon  **************************/
	var $collapse = $('#accordion'),
		$heading = $collapse.find('.panel-heading');
	
	function changeIcon(e){
		var $emt = $(e.target).parents('.panel'),
			$ico = $emt.find('h4 a i'),
			evt = e.type,
			isIn = ($emt.find('.panel-collapse').hasClass('in')),
			icoClosed = 'icon-right-circled',	//icon when panel is close
			icoOpen   = 'icon-down-circled',	//icon when panel is open
			icoHover  = 'icon-right-circled';	//icon when panel is hover

		$ico.removeClass();
		
		if (evt == 'show'){ 				$ico.addClass(icoOpen);
		} else if (evt == 'hide'){ 			$ico.addClass(icoClosed);
		} else if (evt == 'mouseenter'){ 	$ico.addClass(icoHover);
		} else if (evt == 'mouseleave'){ 
			( isIn )? $ico.addClass(icoOpen) : $ico.addClass(icoClosed);
		}
	}
	
	$collapse.on('hide.bs.collapse', function (e){ changeIcon(e); });
	$collapse.on('show.bs.collapse', function (e){ changeIcon(e); });
	$heading.on('mouseenter', function (e){ changeIcon(e); });
	$heading.on('mouseleave', function (e){ changeIcon(e); });



	/******************************  FancyBox  ****************************/
	$(".fancybox").each(function() {
		$(this).attr('rel', $(this).data('rel'));

		var caption = $(this).parent().parent().find('figcaption p').text()
		$(this).attr('title', caption );
	});

	$(".fancybox").fancybox({
		openEffect	: 'elastic',
		closeEffect	: 'elastic'
	});



	/*********************  $Menu Scroll Action  ***************************/
	var $anchors = $('a[href^="#"]:not([href="#"]):not(a[href^="#collapses"])');
	
	$anchors.each(function() {
		$(this).click( function(e){ 
			e.preventDefault();
			
			var target = this.hash,
			$target = $(target);
			
			$("html, body").stop().animate({
				'scrollTop': $target.offset().top
			}, 900, 'swing', function () {
				window.location.hash = target;
			});

			$('.navbar-collapse').removeClass('in').addClass('collapse')
		});
	})



	/***********************  $Menu Scroll Select   ************************/
	var $itemMenu = $('.navbar-nav li a[href^="#"]'),
		$sections = [];

	$itemMenu.each(function(){
		$sections[$sections.length] = {
			'id': $(this).attr('href'),
			'top': $( $(this).attr('href') ).offset().top
		};
	})

	var len = $sections.length,
		initVal = 70,
		bodyHeight = $('body').height();

	$(window).scroll(function() {   
	    var winTop = $(window).scrollTop();
		
		$('.navbar-nav li').removeClass('active')

	    for (var i=0; i< len; i++) {
			var sect = $sections[i];
			var h = sect.top + $(sect.id).outerHeight();
			
			if(winTop >= sect.top-initVal && winTop < h-initVal){
				$('.navbar-nav li a[href="'+sect.id+'"]').parent().addClass("active");
			}
			
		}
	});


	/***********************  $Menu Show/Hide Logo  ************************/
	$(window).scroll(function() {   
		var winTop = $(window).scrollTop();

		if (winTop > 35 && $(window).width() < 977) {
			$('header .navbar').addClass('nonTop');
		} else {
			$('header .navbar').removeClass('nonTop');
		}
	});



	/***************************  $Owl Carousel  ***************************/
	$("#owl-carousel-gallery").owlCarousel({
		items: 3,
		itemsDesktopSmall: [979,2],
		itemsDesktop: [1199,3],
		autoPlay: true
	});

	$("#owl-carousel-testimonials").owlCarousel({
		items: 3,
		autoPlay: true,
		itemsDesktopSmall: [979,2],
		itemsDesktop: [1199,3]
	});



	/**************************  $Send Forms  ******************************/
	var $form = $('form');

	$form.on( 'submit' , function(e){ 
		if ( $(this).data('ajax') == 1 ) {
			sendForm( $(this) );
			e.preventDefault();
		} 
	})

	function sendForm($form){
		var fieldsData = getFieldsData($form),
			url = $form.attr('action'),
			method = $form.attr('method');

		sendData(url, method, fieldsData, $form, showResults)
	}

	
	function getFieldsData($form) {
		var $fields = $form.find('input, button, textarea, select'),
			fieldsData = {};

		$fields.each( function(){
			var name = $(this).attr('name'),
				val  = $(this).val(),
				type = $(this).attr('type');

			if ( typeof name !== 'undefined' ){
				
				if 	( type == 'checkbox' || type == 'radio' ){

					if ( $(this).is(':checked') ){
						fieldsData[name] = val;
					}
				} else {
					fieldsData[name] = val;
				}
					
			}
		});

		return fieldsData
	}

	function sendData(url, method, data, $form, callback){
		var $btn = $form.find('[type=submit]'),
			$response = $form.find('.form-response');

		$.ajax({
			beforeSend: function(objeto){ 
				$response.html('');
				$btn.button('loading'); 
			},
			complete: function(objeto, exito){ $btn.button('reset'); },
			data: data,
			success: function(dat){  callback(dat, $response); },
			type: method,
			url: url,
		});
	}

	function showResults(data, $response){
		 $response.html(data);
		 $response.find('.alert').slideDown('slow');
	}


	/*****************************  $Tooltips  *****************************/
	$('.social li a').tooltip()


	/*************************  $Video Background  *************************/
	$(".player").mb_YTPlayer();
	$("#bgndVideo").hide();


	/******************************  $Appear  ******************************/
	jQuery('.animate').waypoint(function() {
	     var animation = jQuery(this).attr("data-animate");
	     jQuery(this).addClass(animation);
	     jQuery(this).addClass('animated');
	}, { offset: '80%' });


})(jQuery);