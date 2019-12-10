//main modul of the app
let KOTH = function(){
	
	let initModule = function($container){
				
		loadSplash($container);// calling to splash screen
		//home($("#primary"));

	};

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyDYNkOfEJo3vlTsjIaWZEN_b31YUPkxEaU",
		authDomain: "king-of-the-hill-86aa0.firebaseapp.com",
		databaseURL: "https://king-of-the-hill-86aa0.firebaseio.com",
		projectId: "king-of-the-hill-86aa0",
		storageBucket: "king-of-the-hill-86aa0.appspot.com",
		messagingSenderId: "509527676909"
	};
	firebase.initializeApp(config);
	
	// //realtime authentication listener
	// firebase.auth().onAuthStateChanged(function(user) {
	// 	if (user) {
	// 		// User is signed in.
	// 		console.log(user);
	// 		//signedIn = true;
	// 		home($("#primary")); 	//when sign in, go to home screen
	// 	} else {
	// 		// No user is signed in.
	// 		console.log("not login");
	// 		//signedIn = false;
	// 	}
	// });

	


	return{initModule : initModule};
}();

const db = firebase.firestore();//shortcut for DB entrance

//activate the function once the document has finished load
$(document).ready(
	function(){
		KOTH.initModule($("#primary"));
	}
);