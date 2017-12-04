var menuOpen = false;
$(document).ready(function () {
	background();

	$("#header-branding").click(function() {
		$('html, body').animate({
            scrollTop: 0
        }, 200);
	})
	var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};
    var hamburgers = document.querySelectorAll(".hamburger");
    if (hamburgers.length > 0) {
      forEach(hamburgers, function(hamburger) {
        hamburger.addEventListener("click", function() {
			menuOpen = !menuOpen;
          this.classList.toggle("is-active");
		  $(".overlay").toggle();
		  if (menuOpen) {
			  $(".overlay").css("visibility", "visible")
			  $(".overlay").css("display", "flex")
			  $("html").css("overflow-y", "hidden");
		  } else {
			  $("html").css("overflow-y", "scroll");
			  $(".overlay").css("visibility", "hidden")
		  }
        }, false);
      });
    }

	var navButtons = [$("#about-nav"), $("#faq-nav"), $("#schedule-nav"), $("#sponsors-nav"), $("#team-nav")]
	var navDest = [$("#about"), $("#faq"), $("#schedule"), $("#sponsors"), $("#team")]

	for (var i = 0; i < navButtons.length; i++) {
		goTo(navButtons[i], navDest[i]);
	}


	var navButtonsOverlay = [$("#about-nav-overlay"), $("#faq-nav-overlay"), $("#schedule-nav-overlay"), $("#sponsors-nav-overlay"), $("#team-nav-overlay")]
	var navDestOverlay = [$("#about"), $("#faq"), $("#schedule"), $("#sponsors"), $("#team")]

	for (var i = 0; i < navButtonsOverlay.length; i++) {
		goToOverlay(navButtonsOverlay[i], navDestOverlay[i]);
	}


	if ($(window).width() <= 720) {
		$("header").addClass("header-fixed");
		$("#about").addClass("mobile-about")
	}

	!function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","https://www.google-analytics.com/analytics.js","ga"),ga("create","UA-55807810-6","auto"),ga("send","pageview");

})

$(window).resize(function(){
    $("#background").empty();
	background();
});

$(window).scroll(function() {
	if ($(window).width() > 720) {
		var pixs = $(document).scrollTop() / 75;
	    $("#background").css({"-webkit-filter": "blur("+pixs+"px)","filter": "blur("+pixs+"px)" })

		if ($(document).scrollTop() >= $("#about").offset().top - $("header").height()) {
			$("header").addClass("header-fixed");
			$("#about").css("margin-top", "calc(100vh + 90px)")
		} else {
			$("header").removeClass("header-fixed");
			$("#about").css("margin-top", "0")
		}
	}
});
//organizer app
function gotoOrganizerDetails(){
	window.location.href="https://docs.google.com/document/d/1tgwd23jOFv-wrI4V5YC_3m6ri_CwbxCdtID9L9sqPds/edit?usp=sharing";
}
function background() {
	var pattern = Trianglify({
		height: $(window).height(),
		width: $(window).width(),
		cell_size: 150,
		variance: "0.5",
		x_colors: ["#ffc68f", "#e8751d", "#f99a45", "#fed7b1", "#0079f9", "#4ca4fb", "#6080d7", "#a9d3fd", "#0c0276", "#98aad7"]
	});

	$("#background").append(pattern.canvas());
}


function goTo(e, to) {
	e.click(function() {
		$('html, body').animate({
            scrollTop: to.offset().top - $("header").height()
        }, 200);
	})
}

function goToOverlay(e, to) {
	e.click(function() {
		$('html, body').animate({
            scrollTop: to.offset().top - $("header").height()
        }, 200);
		$(".overlay").hide();
		$(".hamburger").removeClass("is-active")
		$("html").css("overflow-y", "scroll");
		menuOpen = false;
	})
}
