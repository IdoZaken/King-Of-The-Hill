let register = function($container){
	//regiter html
	$container.html(
		"<div id = 'register'><br/>"+
			"<header>"+
				"<h1>King of the Hill</h1>"+
				"<h5>Time to see Who knows sports best</h5>"+
			"</header><br/><br/>"+
			"<main>"+
				"<form id = 'registerForm' action = '#'>"+
					"<input type = 'text' id = 'name' placeholder = 'Name' required /></br></br>"+
					"<input type = 'email' id = 'email' placeholder = 'Email' required /></br></br>"+
					"<input type = 'password' id = 'password' placeholder = 'Password' required /></br></br>"+
					"<input type = 'password' id = 'confirmPass' placeholder = 'Confirm Password' required /></br></br>"+
					"<button id = 'cmdRegister'>REGISTER</button></br></br>"+
					"<div id = 'termsOfUse'>"+
						"<input type = 'checkbox' id = 'terms' required>"+
						//onclick go to registerTermsAndConditions function
						"<button id = 'cmdTerms' onclick = 'registerTermsAndConditions($(\"#register\"))'> I agree to the terms of use</button>"+ 
					"</div>"+
				"</form>"+
			"</main>"+
			// "<nav>"+
			// 	"<h4>or login with:</h4>"+
			// 	"<button id = 'cmdFacebook' >facebook</button>"+
			// 	"<button id = 'cmdGoogle'>google</button>"+
			// "</nav></br>"+
			"<footer>"+
				"Already have an account ? "+
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
		if(checkRegisterData($("#name").val(), $("#password").val(), $("#confirmPass").val())){ //check if register data are legal 
			//create User With Email And Password
			const promise = firebase.auth().createUserWithEmailAndPassword($("#email").val(), $("#password").val())
			.then(cred =>{
				return firebase.firestore().collection("users").doc(cred.user.uid).set({
					Name: $("#name").val(),
					Nickname: "",
					Email: $("#email").val(),
					Phone: "",
					DateOfBirth: new Date("December 10, 2010")
				})
			});
			promise.catch(e => {
				console.log(e.message);
				alert(e.message);
			});
		}
		else
			alert("not ok");
	}
}

//function to check if the register data are legal
function checkRegisterData(name, password, confirmPass){
	if(name.length < 1 || name.length > 30){
		alert("Name must contain between 1 to 30 latters.")
		return false;
	}	
	else if(password.length < 6 || password.length > 30){
		alert("Password must contain between 6 to 30 latters and/or numbers.")
		return false;
	}
	else if(password != confirmPass){
		alert("Confirm password doesn't match to first password.")
		return false;
	}
	else if(!$("#terms").prop("checked")){//checking if terms is checked
		alert("Agree to terms of use.")
		return false;
	}
	return true;
}

//show terms and conditions with back button 
function registerTermsAndConditions($container){
	$container.html(
		"<div id = 'termsAndCon'></p>terms</p>"+
		"<div id = 'justTerms'></div></p>conditions</p>"+
		"<div id = 'justCon'></div></p>"+
		"<button onclick = 'register($(\"#primary\"))'>back</button>"+
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