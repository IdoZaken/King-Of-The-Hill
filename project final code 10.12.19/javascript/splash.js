//loading splash screen.
let loadSplash = function($container){
	
	//add splash screen div with text.
	$container.html(
		"<div id = 'splash'>"+
			"<h1>King Of The Hill</h1>"+
			"<h5>Time to see \"Who knows sports best\"</h5>"+
		"</div>"
		);
	
	//settint pause for splesh screen and after pause, call to login screen.
	$container.ready(function(){setTimeout(goToLogin, 1500);});
	
};

let goToLogin = function(){
	// login($("#primary"));	//send to login screen primary div

	//realtime authentication listener
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			console.log(user);
			//signedIn = true;
			home($("#primary")); 	//when sign in, go to home screen
		} else {
			// No user is signed in.
			console.log("not login");
			login($("#primary"));
			//signedIn = false;
		}
	});
};
