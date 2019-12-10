
let login = function($container){
	//login html
	$container.html(
		"<div id = 'login'><br/>"+
			"<header>"+
				"<h1>King of the Hill</h1>"+
				"<h5>Time to see Who knows sports best</h5>"+
			"</header><br/><br/>"+
			"<main>"+
				"<form id = 'loginForm' action = '#'>"+
					"<input type = 'email' id = 'email' placeholder = 'Email' required /><br/></br>"+
					"<input type = 'password' id = 'password' placeholder = 'Password' required /><br/></br>"+
					"<button id = 'cmdForgotPassword'>Forgot Password?</button><br/><br/></br>"+
					"<button id = 'cmdLogin'>LOGIN</button><br/></br>"+
					"<div id = 'termsOfUse'>"+
						"<input type = 'checkbox' id = 'terms' required>"+
						//onclick go to loginTermsAndConditions function
						"<button id = 'cmdTerms' onclick = 'loginTermsAndConditions($(\"#login\"))'> I agree to the terms of use</button>"+
					"</div>"+
				"</form>"+
			"</main>"+
			"<footer>"+
				"Don't have an account yet ? "+
				"<button id = 'cmdRegister'>Register Now</button>"+
			"</footer>"+
		"</div>"
	);
	
	//buttons listeners
	$("#cmdRegister").click(loginClickListener);
	$("#cmdLogin").click(loginClickListener);
	$("#cmdForgotPassword").click(loginClickListener);

	
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
			.catch(e => {
				console.log(e.message);
				alert(e.message);
			});
		}
		/*
		if(signedIn){
			home($("#primary"));
		}*/
	}
	else if(targetId == "cmdForgotPassword"){
		forgotPassword($("#primary"));
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

	firebase.firestore().doc("terms/Terms").get().then(function(doc){
		if(doc.exists){
			$("#justTerms").text(doc.get('Terms'));		//load terms from DB
			$("#justCon").text(doc.get('conditions'));		//load conditions from DB
		}
		else{
			console.log("No such document!");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});
}


function forgotPassword($container){
	$container.html(
		"<div id = 'forgotPassword'>"+
			"<header>"+
				"Forgot Passeord ?"+
			"</header></br>"+
			"<main>"+
				"<div id = 'messageText'>"+
					"Please enter your email address and we will send you a "+
					"link to the page where you can create a new password."+
				"</div></br>"+
				"<div id = 'getEmail'>"+
					"<label for = 'userEmail'>Enter your email address:</label></br>"+
					"<input type = 'email' id = 'userEmail' placeholder = 'your@email.address'/>"+
				"</div></br>"+
				"<button id = 'cmdResetPassword' onclick = 'resetPassword()'>Continue</button>"+
			"</main></br>"+
			"<button id = 'cmdBack' onclick = 'login($(\"#primary\"))'>Back</button>"+
		"</div>"
	);
}

function resetPassword(){
	var auth = firebase.auth();
	var emailAddress = $("#userEmail").val();

	if(emailAddress != ""){
		auth.sendPasswordResetEmail(emailAddress).then(function() {
			// Email sent.
			alert("An email has been sent to you for resetting the password, please check and verify");
			login($("#primary"));
		}).catch(function(error) {
			// An error happened.
			console.log(error);
		});
	}
	else{
		alert("please enter your email address.");
	}
	
}