
let login = function($container){
	//login html
	$container.html(
		"<div id = 'login'>"+
			"<header>"+
				"<h1>login</h1>"+
			"</header>"+
			"<main>"+
				"<form id = 'loginForm' action = '#'>"+
					"<input type = 'email' id = 'email' placeholder = 'Email' required /></br>"+
					"<input type = 'password' id = 'password' placeholder = 'Password' required /></br>"+
					"<a href = '#' target = '_self' id = 'fpass'>Forgot Password?</a></br>"+
					"<button id = 'cmdLogin'>LOGIN NOW</button></br>"+
					"<input type = 'checkbox' id = 'terms' required>i agree to the "+
					//onclick go to loginTermsAndConditions function
					"<button id = 'cmdTerms' onclick = 'loginTermsAndConditions($(\"#login\"))'>Terms</button>of use"+
				"</form>"+
			"</main>"+
			"<nav>"+
				"<h4>or login with:</h4>"+
				"<button id = 'cmdFacebook' >facebook</button>"+
				"<button id = 'cmdGoogle'>google</button>"+
			"</nav></br>"+
			"<footer>"+
				"don't have an account yet?"+
				"<button id = 'cmdRegister'>Register Now</button>"+
			"</footer>"+
		"</div>"
	);
	
	//buttons listeners
	$("#cmdRegister").click(loginClickListener);
	$("#cmdLogin").click(loginClickListener);

	
};

//events function
let loginClickListener = function(e){
	let targetId = e.target.id;		//e.target.id shortcut
	
	if(targetId == "cmdRegister"){
		register($("#primary"));	//go to register screen
	}
	else if(targetId == "cmdLogin"){
		if($("#terms").prop("checked")){	//if terms checkbox is checked then sign in With Email And Password
			const promise = firebase.auth().signInWithEmailAndPassword($("#email").val(), $("#password").val())
			.catch(e => console.log(e.message));
		}
		/*
		if(signedIn){
			home($("#primary"));
		}*/
	}
	
}

//show terms and conditions with back button 
function loginTermsAndConditions($container){
	$container.html(
		"<div id = 'termsAndCon'></p>terms</p>"+
		"<div id = 'justTerms'></div></p>conditions</p>"+
		"<div id = 'justCon'></div></p>"+
		"<button onclick = 'login($(\"#primary\"))'>back</button>"+
	"</div>"
	);
	$("#justTerms").text('Terms.......');
	$("#justCon").text('conditions......');

}


