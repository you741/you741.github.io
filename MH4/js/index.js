$(document).ready(function(){
    $('a.scrollLink').click(function(){
    	var href = $(this).attr('href');
    	var anchor = $(href).offset();
    	$('body').animate({ scrollTop: anchor.top-50 });
    	return false;
	});
	$(document).scroll(function(){
		/*
		if($(window).scrollTop() > 0){
			$("#navmain").removeClass("transparent-navbar");
			$("#navheader").removeClass("hidden");
			$(".navbar-item").removeClass("hidden");
		} else{
			$("#navmain").addClass("transparent-navbar");
			$("#navheader").addClass("hidden");
			$(".navbar-item").addClass("hidden");
		}
		*/
		if($(window).scrollTop() >= $("#about").offset().top){
			$("#navmain").addClass("navbar-fixed-top");
		} else{
			$("#navmain").removeClass("navbar-fixed-top");
		}

	});
});
