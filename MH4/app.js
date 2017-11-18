

	console.log("meow");
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
	var database = firebase.database();

	function writeUserData(fname,lname,email,age) {
	  firebase.database().ref("hackers").push({
	    fname: fname,
	    lname: lname,
	    email: email,
	    age: age
	  });
	}
	const fnameTxt = document.getElementById("fname");
	const lnameTxt = document.getElementById("lname");
	const email = document.getElementById("email");
	const age = document.getElementById("age");
	const regBtn = document.getElementById("reg");
	console.log("meow");

	regBtn.addEventListener("click", e => {
		console.log("meow");
		writeUserData(fnameTxt.value,lnameTxt.value,email.value,age.options[age.selectedIndex].text);
	});
