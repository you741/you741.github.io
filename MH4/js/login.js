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
var signUpMode = false; //is the user trying to sign up
var types = ["hacker","mentor","organizer"];
$(document).ready(function(){
    //  check if user is signed in
    firebase.auth().onAuthStateChanged(function(user) {
        //hides all the signUp stuff
        toggleMode(signUpMode,0);
        hideAllAlerts(); //hides all alerts that are showing (only show when needed)
        //checks for logged in, if so redirect to dashbaord
        if(user){
            //logged in we give user option to go to dashboard
            if($("#hiddenform").html() == ''){
                $("#hiddenform").html('<button class = "btn btn-success" onclick="submitDashboardForm()">My Dashboard</button>');
                $("#loginLnk").html("<a onclick = 'submitDashboardForm()'>My Dashboard</a>");
                $("#login-form").hide();
            }
        }
    });
});
//custom functions

//allows scrolling effect of links
$(document).on('click', 'a', function(event){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top-50
    }, 500);
});

//form handling
$("#btnLogin").click(function(e){
	//log in
    e.preventDefault(); //prevents default (submitting form)
    hideAllAlerts(); //hides all alerts so that they show when we need them to
    if(!fieldsAllFilled()){ //makes sure all fields are showing
        hideAllAlerts();
        $("#emptyfields").show(); //shows emptyfields alert
    } else{
        firebase.auth().signInWithEmailAndPassword($("#email").val(), $("#pass").val()).catch(function(error) {
            //shows errors
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === 'auth/wrong-password') {
                $("#wrongpassword").show(); //shows wrongpassword alert
            } else {
                $("#error").html("<strong>Uh oh!</strong> "+errorMessage); //displays error on error alert
                $("#error").show();
            }
            console.log(error);
        });

        //now check if user is signed in
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                //logged in we redirect to dashboard
                submitDashboardForm(user); //goes to dashboard with user
            }
        });
    }
    $("#pass").val('');
});
$("#btnSignUp").click(function(e){
    e.preventDefault(); //prevents form submission
    hideAllAlerts(); //hides all alerts so that they show when we need them to
    if(!signUpMode){
        //shows sign up stuff hides login stuff
        signUpMode = true;
        toggleMode(signUpMode); //changes to login mode
        hideAllAlerts();
    } else{
		//handle sign up
		if(!fieldsAllFilled()){ //makes sure all fields are showing
            $("#emptyfields").show();
		}
		else if($("#pass").val() != $("#cPass").val()){ //password not matching error
			$("#nomatch").show();
		} else{
			firebase.auth().createUserWithEmailAndPassword($("#email").val(), $("#pass").val()).catch(function(error) {
				// firebase handles the errors here
                var errorCode = error.code;
                var errorMessage = error.message;
                $("#error").html("<strong>Uh oh!</strong> "+errorMessage); //displays error on error alert
                $("#error").show();
			});
            //now check if user is signed in
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    //add userdata to the database
                    //logged in we hide everything and show the dashboard button.
                    $("#successful").show();
                    writeUserData(user,user.uid,$("#lname").val(),$("#fname").val(),$("#email").val(),types[$("#slider").slider("option","value")]); //writes data and redirects
                }
            });
            $("#pass").val('');
            $("#cPass").val('');
        }
    }
});
$("#btnUnSignUp").click(function(e){
    //changes back to login mode
    e.preventDefault();
    signUpMode = false;
    toggleMode(signUpMode); //changes to login mode
    hideAllAlerts();
    event.preventDefault();
});

//allows button click on enter press (for sign up only, login already automatic)
$("#lname").keypress(function(event){
    if(event.keyCode == 13){
        event.preventDefault();
        enterClicked();
    }
});

$("#fname").keypress(function(event){
    if(event.keyCode == 13){
        event.preventDefault();
        enterClicked();
    }
});

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

//custom functions
//the todashboard form, creates new form and posts for access to dashboard (not get because that's insecure)
function submitDashboardForm(userSpec=false){
    if(!userSpec){
        //if user is not specified uses auth
        firebase.auth().onAuthStateChanged(function(user){
            firebase.database().ref('/users/'+user.uid).once('value').then(function(snapshot){ //opens database stores values in snapshot
                var type = snapshot.val().type; //type of the user
                $("#hiddenform").html("<form name = 'todashboard' id='dashboard' method = 'post' action = '/"+type+"/"+user.uid+"'><input class = 'btn btn-success' type = 'submit' value = 'My Dashboard' /></form>");
                $("#dashboard").submit();
            });
        });
    } else{
        firebase.database().ref('/users/'+userSpec.uid).once('value').then(function(snapshot){
            var type = snapshot.val().type; //type of the user
            $("#hiddenform").html("<form name = 'todashboard' id='dashboard' method = 'post' action = '/"+type+"/"+userSpec.uid+"'><input class = 'btn btn-success' type = 'submit' value = 'My Dashboard' /></form>");
            $("#dashboard").submit();
        });
    }
}
//enter clicked on text field for form
function enterClicked(){
    if(signUpMode){ //clicks sign up on enter if it's sign up mode
        $("#btnSignUp").click();
    } else{ //otherwise we log in
        $("#btnLogin").click();
    }
}

//hides all alerts
function hideAllAlerts(){
    $("#nomatch").hide();
    $("#successful").hide();
    $("#emptyfields").hide();
    $("#wrongpassword").hide();
    $("#error").hide();
}

//toggles the mode between signUp and login
function toggleMode(signUp,anims = 100){
    if(signUp){
        //shows all the signUp stuff, shows login stuff
        $(".toConfirm").show(anims);
        // $("#lname").show(anims);
        // $("#fname").show(anims);
        // $("#lnameLabel").show(anims);
        // $("#fnameLabel").show(anims);
        // $("#cPass").show(anims);
        // $("#cpLabel").show(anims);
        // $("#btnUnSignUp").show(anims);
        $("#btnLogin").hide(anims);
    } else{
        //hides all the signUp stuff, shows login stuff
        $(".toConfirm").hide(anims);
        // $("#lname").hide(anims);
        // $("#fname").hide(anims);
        // $("#lnameLabel").hide(anims);
        // $("#fnameLabel").hide(anims);
        // $("#cPass").val('');
        // $("#cPass").hide(anims);
        // $("#cpLabel").hide(anims);
        $("#btnLogin").show(anims);
        // $("#btnUnSignUp").hide();
    }
}

//writes user data
function writeUserData(user,userId, lname, fname, email, type) {
  firebase.database().ref('users/'+userId).set({
    last_name: lname,
    first_name: fname,
    email: email,
    type: type
  }).then(function(){
    $.post('/newUser/'+types[$("#slider").slider("option","value")]+'/'+user.uid,{first_name:$("#fname").val(), last_name: $("#lname").val(),email:$("#email").val()});
    submitDashboardForm(user);
  });//goes to dashboard after setting the data
}


//checks if all fields are filled
function fieldsAllFilled(){
    if(signUpMode){
        return !($("#email").val() == '' || $("#pass").val() == '' || $("#cPass").val() == '' || $("#fname").val() == '' || $("#lname").val() == '');
    } else{ //login only need to check 2 fields
        return !($("#email").val() == '' || $("#pass").val() == '');
    }
}
