//loading splash screen.
let loadSplash = function($container){
	
	//add splash screen div with text.
	$container.html("<div id = 'splash'>King Of The Hill</div>");
	
	//settint pause for splesh screen and after pause, call to login screen.
	$container.ready(function(){setTimeout(goToLogin, 500);});
	
};

let goToLogin = function(){
	login($("#primary"));	//send to login screen primary div
};
