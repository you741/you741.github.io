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
  firebase.auth().onAuthStateChanged(function(user){
    firebase.database().ref('/users/'+user.uid).once('value').then(function(snapshot){ //opens database stores values in snapshot
      var type = snapshot.val().type; //type of the user
      $('#appform').attr("action", "/"+type+"/saveApplication/"+user.uid);//data put from server
      fillFieldsFromDB(user);
    });
  });
  document.getElementById("appform").addEventListener('submit',function () {
    $("#save_progress").click();//saves the data to fb if they submit
    //event.preventDefault();
  });
});
document.addEventListener("DOMContentLoaded",function(){
  firebase.auth().onAuthStateChanged(function(user) {//this puts in the name dynamically with firebase
      //checks for logged in, get uid
      if(user){
          //logged in we give user option to go to dashboard
          firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
            //first put their name on the doc
            $("#fullname").text(snapshot.val().first_name + " " + snapshot.val().last_name);

            // //refilling all the fields
            // console.log(snapshot.val());
            // $inputids = $('#appform input[id]').map(function() {
            //   this.id;
            // }).get();
            // $frids = $('#appform textarea[id]').map(function() {
            //   return this.id;
            // }).get();
            //render the data from firebase, with the id as the key
            // basics["masseyAttend"]=$("input[name='masseyAttend']:checked").val();
            // basics["grade"]=$("input[name='grade']:checked").val();
            // firebase.database().ref("users/"+user.uid).update(basics);
            // var fr = {};
            // for (var i = 1; i < $(".apply-fr-content").length+1; i++) {
            //   fr["apply_fr_"+i] = $("#apply_fr_"+i).val() + " ";
            // }
            // firebase.database().ref("users/"+user.uid).update(fr);
            // //alert($(".apply-pref-label-content").length);
            // var pref = {};
            // for (var i = 1; i < $(".apply-pref-label-content").length+1; i++) {
            //   var ind=i-1;
            //   pref["pref_" + i] = $("input[name='pref_"+ind+"']:checked").val();
            // };
            // firebase.database().ref("users/"+user.uid).update(pref);

          });
      }
      //if not logged in redirect to home
      else{
        $.get("/logout");
      }
  });
});
$("#save_progress").on('click',function() {
  //submit all data to firebase
  //free responses
  firebase.auth().onAuthStateChanged(function(user) {
      //checks for logged in, get uid
    if(user){
        //we save all their data to firebase, with the id as the key
        var basics = {};
        basics["masseyAttend"]=$("input[name='masseyAttend']:checked").val();
        basics["gender"]=$("input[name='gender']:checked").val();
        basics["grade"]=$("input[name='grade']").val();
        firebase.database().ref("users/"+user.uid).update(basics);
        var fr = {};
        for (var i = 1; i < $(".apply-fr-content").length+1; i++) {
          fr["apply_fr_"+i] = $("#apply_fr_"+i).val();
        }
        firebase.database().ref("users/"+user.uid).update(fr);
        var pref = {};
        for (var i = 1; i < $(".apply-pref-label-content").length+1; i++) {
          var ind=i-1;
          if($("input[name='pref_"+ind+"']:checked").val() != undefined){
            pref["pref_" + i] = $("input[name='pref_"+ind+"']:checked").val();
          }
        };
        firebase.database().ref("users/"+user.uid).update(pref);
    };
    swal("Progress Saved","The next time you come back we will have the data here for you","success");
  });
});

//custom functions
function fillFieldsFromDB(user){
  //fills all the fields from the database (checkes all radio buttons)
  firebase.database().ref('/users/'+user.uid).once('value').then(function(snapshot){
    if(snapshot.val().masseyAttend != ""){
      $("input[name='masseyAttend'][value='"+snapshot.val().masseyAttend+"']").prop("checked",true);
    }
    if(snapshot.val().gender != ""){
      $("input[name='gender'][value='"+snapshot.val().gender+"']").prop("checked",true);
    }
    if(snapshot.val().grade != ""){
      $("input[name='grade']").val(snapshot.val().grade);
    }
    $("input[name='pref_0'][value='"+snapshot.val().pref_1+"']").prop("checked",true);
    $("input[name='pref_1'][value='"+snapshot.val().pref_2+"']").prop("checked",true);
    $("input[name='pref_2'][value='"+snapshot.val().pref_3+"']").prop("checked",true);
    $("input[name='pref_3'][value='"+snapshot.val().pref_4+"']").prop("checked",true);
    $("input[name='pref_4'][value='"+snapshot.val().pref_5+"']").prop("checked",true);
    $("input[name='pref_5'][value='"+snapshot.val().pref_6+"']").prop("checked",true);
    $("input[name='pref_6'][value='"+snapshot.val().pref_7+"']").prop("checked",true);
    $("input[name='pref_7'][value='"+snapshot.val().pref_8+"']").prop("checked",true);
    $("#apply_fr_1").val(snapshot.val().apply_fr_1);
    $("#apply_fr_2").val(snapshot.val().apply_fr_2);
    $("#apply_fr_3").val(snapshot.val().apply_fr_3);
    $("#apply_fr_4").val(snapshot.val().apply_fr_4);
    $("#apply_fr_5").val(snapshot.val().apply_fr_5);
  });
}
