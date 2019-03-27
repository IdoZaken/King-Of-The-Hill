
let register = function($container){
	$container.html(
		"<div id = 'register'>"+
			"<header>"+
				"<h1>register</h1>"+
			"</header>"+
			"<main>"+
				"<form id = 'registerForm' action = '#'>"+
					"<input type = 'text' id = 'name' placeholder = 'Name' required /></br>"+
					"<input type = 'email' id = 'email' placeholder = 'Email' required /></br>"+
					"<input type = 'password' id = 'password' placeholder = 'Password' required /></br>"+
					"<input type = 'password' id = 'confirmPass' placeholder = 'Confirm Password' required /></br>"+
					"<input type = 'submit' id = 'cmdRegister' value = 'REGISTER' /></br>"+
					"<input type = 'checkbox' id = 'terms' required>i agree to the <a href = '' target = '_self' id = 'termsOfUse'>terms</a> of use"+
				"</form>"+
			"</main>"+
			"<nav>"+
				"<h4>or login with:</h4>"+
				"<button id = 'cmdFacebook' >facebook</button><!--href?   maybe should be outside from the form-->"+
				"<button id = 'cmdGoogle'>google</button><!--href?   maybe should be outside from the form-->"+
			"</nav>"+
			"<footer>"+
				"Already have an account?"+
				"<button id = 'cmdLogin'>Login Now</button>"+
			"</footer>"+
		"</div>"
	);
	
	//buttons listeners
	$("#cmdLogin").click(registerClickListener);
	$("#cmdRegister").click(registerClickListener);
};

//events function
let registerClickListener = function(e){
	let targetId = e.target.id;		//e.target.id shortcut
	
	if(targetId == "cmdLogin"){
		login($("#primary"));	//go to login screen
	}
	else if(targetId == "cmdRegister"){
		home($("#primary"));	//go to home screen
	}
}