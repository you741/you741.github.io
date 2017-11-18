//handles everything to do with hamburger
$(document).ready(function(){
	toggleHamburger();
	$(".hamburger").on("click",function(){
		$("#navham").toggleClass("is-active");
		if($("#navham").hasClass("is-active")){
			$(".overlay").css({width:"100%"});
		} else{
			$(".overlay").css({width:"0"});
		}
	});
	$(".overlay").on("click",function(){
		$(".overlay").css({width:"0"});
		$("#navham").removeClass("is-active");
	});
});

$(window).resize(function(){
	toggleHamburger();
});

function toggleHamburger(){
	//toggles hamburger based on window width
	if($(window).width() <= 800){
		$("#navham").removeClass("hidden");
		$("#navright").hide();
	} else{
		$("#navham").addClass("hidden");
		$("#navright").show();
	}
}
