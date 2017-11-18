$(document).ready(function(){
    $("#cPass").hide();
    $("#btnUnSignUp").hide();

	$('form').on('submit', function(e){
		if ($(this).find('#cPass:visible').length && $(this).find('#pass').val() !== $(this).find('#cPass').val()) {
            e.preventDefault();
			alert("Error,Passwords Don't Match");
		}
	});
    $('form').on('submit', function(e){
        console.log($(this).find('.passwordConfirm:visible').length);
                    e.preventDefault();

        if ($(this).find('.passwordConfirm:visible').length && $(this).find('.password').val() !== $(this).find('.passwordConfirm').val()) {
            console.log($(this).find('.password') + ', ' + $(this).find('.passwordConfirm'));
            e.preventDefault();
            $.growl.warning({ title: '', message: 'Password and Confirmation don\'t match!' });
        }
    });
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();

        if (scroll > 0){
            $("#header").addClass("scrolled");
        } else{
            $("#header").removeClass("scrolled");
        }
    });
})

$(document).on('click', 'a', function(event){
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top-100
    }, 500);
});

$("#btnSignUp").click(function(){
    if (!$(document).find('#cPass:visible').length) {
        event.preventDefault();
        $("#cPass").show();
        $("#btnUnSignUp").show();
        document.getElementById("btnLogin").disabled = true;
    };
});
$("#btnUnSignUp").click(function(){
    $("#cPass").hide(100);
    $(this).hide();
    event.preventDefault();
    document.getElementById("btnLogin").disabled = false;   
})

function loginKeypress(e) {//clicking enter submits
  if (e.which == 13) {
    e.preventDefault();
    $('#btnlogin').trigger('click');
  }
}
