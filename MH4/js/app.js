// Initialize Firebase
var config = {
    apiKey: "AIzaSyBPwPsg1ZwS0q6Ba2MO38ObcI4N_jYdJEk",
    authDomain: "masseyhacks-iv.firebaseapp.com",
    databaseURL: "https://masseyhacks-iv.firebaseio.com",
    projectId: "masseyhacks-iv",
    storageBucket: "masseyhacks-iv.appspot.com",
  	messagingSenderId: "93576588200"
};
firebase.initializeApp(config);
$(document).ready(function(){
    
});

var isCPassShowing = false;

//allows scrolling effect of links
$(document).on('click', 'a', function(event){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top-50
    }, 500);
});

//form handling
$("#btnLogin").click(function(e){
	//log in
    e.preventDefault();
    hideAllAlerts();
    if($("#email").val() == '' || $("#pass").val() == ''){
        hideAllAlerts();
        $("#emptyfields").show();
    } else{
        firebase.auth().signInWithEmailAndPassword($("#email").val(), $("#pass").val()).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === 'auth/wrong-password') {
                $("#wrongpassword").show();
            } else {
                $("#error").html("<strong>Uh oh!</strong> "+errorMessage);
                $("#error").show();
            }
            console.log(error);
        });

        //now check if user is signed in
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                //logged in we redirect to dashboard
                submitDashboardForm(user);//goes to dashboard with user
            }
        });
    }
    $("#pass").val('');
});
$("#btnSignUp").click(function(e){
    e.preventDefault();
    hideAllAlerts();
    if(!isCPassShowing){
        //shows the confirmation password and the button to close the new sign-up exclusive fields; hides login
        $("#cpLabel").show();
        $("#cPass").show();
        $("#btnUnSignUp").show();
        $("#btnLogin").hide(100);
        hideAllAlerts();
        document.getElementById("btnLogin").disabled = true;
        isCPassShowing = true;
    } else{
		//handle sign up
		if($("#email").val() == '' || $("#pass").val() == '' || $("#cPass").val() == ''){
            $("#emptyfields").show();
		}
		else if($("#pass").val() != $("#cPass").val()){
			$("#nomatch").show();
		} else{
			firebase.auth().createUserWithEmailAndPassword($("#email").val(), $("#pass").val()).catch(function(error) {
				// Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                $("#error").html("<strong>Uh oh!</strong> "+errorMessage);
                $("#error").show();
			});
            //now check if user is signed in
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    //logged in we redirect to dashboard
                    $("#successful").show();
                      $.post("new/hacker/");
                } else{
                }
            });
		}
		$("#pass").val('');
		$("#cPass").val('');
    }
});
$("#btnUnSignUp").click(function(e){
    e.preventDefault();
	$("#cPass").val('');
    $("#cPass").hide(100);
    $("#cpLabel").hide(100);
    $(this).hide();
    $("#btnLogin").show(100);
    hideAllAlerts();
    isCPassShowing = false;
    event.preventDefault();
    document.getElementById("btnLogin").disabled = false;
});

//allows button click on enter press (for sign up only, login already automatic)
$("#email").keypress(function(event){
    if(event.keyCode == 13){
        event.preventDefault();
        enterClicked();
    }
});

$("#pass").keypress(function(event){
    if(event.keyCode == 13){
        event.preventDefault();
        enterClicked();
    }
});

$("#cPass").keypress(function(event){
    if(event.keyCode == 13){
        event.preventDefault();
        enterClicked();
    }
});
