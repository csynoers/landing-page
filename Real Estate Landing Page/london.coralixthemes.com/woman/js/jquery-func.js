jQuery(document).ready(function($) {

	/*********************  $Animate Itemas on Start  **********************/
	$('.animated').appear(function() {
		var elem = $(this);
		var animation = elem.data('animation');
		if ( !elem.hasClass('visible') ) {
			var animationDelay = elem.data('animation-delay');
			
			if ( animationDelay ) {
				setTimeout(function(){
					elem.addClass( animation + " visible" );
				}, animationDelay);

			} else {
				elem.addClass( animation + " visible" );

			}
		}
	});

	/*--------------------------------------------------------------------------- Tooltips ----------------------------*/
	$(".social a").tooltip({
            placement: "top"
        });
	/*************************  $Background Video  *************************/
	$('.bgvideo').bgYtVideo();

	/*****************************  $Form Forms  *****************************/
	$("#suscribe-form").submit(function() {
		var elem = $(this);
		var urlTarget = $(this).attr("action");
		$.ajax({
			type : "POST",
			url : urlTarget,
			dataType : "html",
			data : $(this).serialize(),
			beforeSend : function() {
				elem.prepend("<div class='alert alert-info'>" + "<a class='close' data-dismiss='alert'>×</a>" + "Loading" + "</div>");
				//elem.find(".loading").show();
			},
			success : function(response) {
				elem.prepend(response);
				elem.find(".response").html(response);
				elem.find(".alert-info").hide();
				//elem.find(".alert-danger").hide();
				elem.find("input[type='text'],input[type='email'],textarea").val("");
			}
		});
		return false;
	});

});
