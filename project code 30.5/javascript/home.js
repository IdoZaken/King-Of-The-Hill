let home = function($container){
	//home page html
	$container.html(
		"<div id = 'topPage'><h2>King of the Hill</h2></div>"+
		"<div id = 'navBar' class = 'navBar' style = 'visibility : hidden'>"+//Create a hidden navigation bar
				"<button id = 'cmdNavHome' class = 'navBar'>Home</button>"+
				"<button id = 'cmdNavLeagues' class = 'navBar'>The Leagues</button>"+
				"<button id = 'cmdNavHills' class = 'navBar'>My Hills</button>"+
				"<button id = 'cmdNavPoints' class = 'navBar'>Expert Points</button>"+
				"<button id = 'cmdNavForm' class = 'navBar'>Games Form</button>"+
				"<button id = 'cmdNavSettings' class = 'navBar'>Settings</button>"+
				"<button id = 'cmdNavToDo' class = 'navBar'>My To-Do List</button>"+
				"<button id = 'cmdNavLogout' class = 'navBar'>logout</button></br>"+
				"<button id = 'cmdNavAdmin' class = 'navBar'>ADMIN</button>"+
		"</div>"+
		"<div id = 'home'>"+
			"<main>"+
				"<section>"+
					"<h1>Welcome to King of the Hill</h1>"+
				"</section>"+
				"<nav>"+
					"<button id = 'cmdParticipantsPrizes'>Participants Prizes</button>"+
					"<button id = 'cmdMainPrize'>Main Prize</button>"+
					"<button id = 'cmdSecondPrizes'>Second Prizes</button>"+
				"</nav>"+
				"<footer>"+
					"<h3>UNCOMPLITED TASKS</h3>"+
					"<div id = 'tasksBar'>"+
						"tasks bar"+
					"</div></p>"+
				"</footer>"+
			"</main>"+
			"<nav>"+
				"<button id = 'cmdLeagues'><!--The Leagues--></button>"+
				"<button id = 'cmdHills'><!--My Hills--></button></br>"+
				"<button id = 'cmdPoints'><!--Expert Points--></button>"+
				"<button id = 'cmdForm'><!--Games Form--></button></br>"+
				"<button id = 'cmdSettings'><!--Settings--></button>"+
				"<button id = 'cmdToDoList'><!--My To-Do List--></button>"+
			"</nav>"+
			"<button id = 'logout'>logout</button></br>"+
			"<button id = 'cmdAdmin'>ADMIN</button>"+
		"</div>"
	);
	
	//buttons listeners
	$("#cmdLeagues").click(homeClickListener);
	$("#cmdHills").click(homeClickListener);
	$("#cmdPoints").click(homeClickListener);
	$("#cmdForm").click(homeClickListener);
	$("#cmdSettings").click(homeClickListener);
	$("#cmdToDoList").click(homeClickListener);
	$("#logout").click(homeClickListener);
	$("#cmdAdmin").click(homeClickListener);
	
	//hidden navigation bar buttons listeners
	$("#cmdNavHome").click(navBarClickListener);
	$("#cmdNavLeagues").click(navBarClickListener);
	$("#cmdNavHills").click(navBarClickListener);
	$("#cmdNavPoints").click(navBarClickListener);
	$("#cmdNavForm").click(navBarClickListener);
	$("#cmdNavSettings").click(navBarClickListener);
	$("#cmdNavToDo").click(navBarClickListener);
	$("#cmdNavLogout").click(navBarClickListener);
	$("#cmdNavAdmin").click(navBarClickListener);

	//listener to games in DB to update for current time if game is open or locked
	firebase.firestore().collection("games").where("Locked", "==", false)
    .onSnapshot(function(querySnapshot) {
		var now = new Date();
		now = now.getTime()/1000;
        querySnapshot.forEach(function(doc) {
			if(now >= doc.get("Time").seconds){
				docRef = db.doc("games/"+doc.id);
				docRef.update({
					Locked: true
				})
				.then(function() {
					console.log("Document successfully updated!");
				})
				.catch(function(error) {
					// The document probably doesn't exist.
					console.error("Error updating document: ", error);
				});
			}
        });
    });
	
};

//events function
let homeClickListener = function(e){
	let targetId = e.target.id;		//e.target.id shortcut
	
	if(targetId == "cmdLeagues"){
		$("#navBar").css("visibility", "visible");			//make nav bar visible
		$("#cmdNavLeagues").css("display", "none");	//hide cmdNavLeagues from nav bar
		leagues($("#home"));		//go to my leagues screen
	}
	else if(targetId == "cmdHills"){
		$("#navBar").css("visibility", "visible");			//make nav bar visible
		$("#cmdNavHills").css("display", "none");		//hide cmdNavHills from nav bar
		hills($("#home"));		//go to my hills screen
	}
	else if(targetId == "cmdPoints"){
		$("#navBar").css("visibility", "visible");			//make nav bar visible
		$("#cmdNavPoints").css("display", "none");		//hide cmdNavPoints from nav bar
		points($("#home"));		//go to expert points screen
	}
	else if(targetId == "cmdForm"){
		$("#navBar").css("visibility", "visible");			//make nav bar visible
		$("#cmdNavForm").css("display", "none");		//hide cmdNavForm from nav bar
		form($("#home"));		//go to games form screen
	}
	else if(targetId == "cmdSettings"){
		$("#navBar").css("visibility", "visible");			//make nav bar visible
		$("#cmdNavSettings").css("display", "none");		//hide cmdNavSettings from nav bar
		settings($("#home"));		//go to my settings screen
	}
	else if(targetId == "cmdToDoList"){
		$("#navBar").css("visibility", "visible");			//make nav bar visible
		$("#cmdNavToDo").css("display", "none");		//hide cmdNavToDo from nav bar
		toDoList($("#home"));		//go to my to-do list screen
	}
	else if(targetId == "logout"){
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
			login($("#primary"));	//go to login screen
		}).catch(function(error) {
			// An error happened.
		});
	}
	else if(targetId == "cmdAdmin"){
		$("#navBar").css("visibility", "visible");			//make nav bar visible
		$("#cmdNavAdmin").css("display", "none");		//hide cmdNavToDo from nav bar
		admin($("#home")); 		//go to admin screen
	}
}

//events function for nav bar buttons
let navBarClickListener = function(e){
	let targetId = e.target.id;		//e.target.id shortcut
	$(".navBar").css("display", "inline-block");	//display all buttons in nav bar
	
	if(targetId == "cmdNavHome"){
		home($("#primary"));	//go back to home screen
	}
	else if(targetId == "cmdNavLeagues"){
		$("#cmdNavLeagues").css("display", "none");	//hide cmdNavLeagues from nav bar
		leagues($("#home"));	//go to my leagues screen
	}
	else if(targetId == "cmdNavHills"){
		$("#cmdNavHills").css("display", "none");	//hide cmdNavHills from nav bar
		hills($("#home"));		//go to my hills screen
	}
	else if(targetId == "cmdNavPoints"){
		$("#cmdNavPoints").css("display", "none");	//hide cmdNavPoints from nav bar
		points($("#home"));		//go to my expert points screen
	}
	else if(targetId == "cmdNavForm"){
		$("#cmdNavForm").css("display", "none");	//hide cmdNavForm from nav bar
		form($("#home"));		//go to games form screen
	}
	else if(targetId == "cmdNavSettings"){
		$("#cmdNavSettings").css("display", "none");	//hide cmdNavSettings from nav bar
		settings($("#home"));		//go to my settings screen
	}
	else if(targetId == "cmdNavToDo"){
		$("#cmdNavToDo").css("display", "none");		//hide cmdNavToDo from nav bar
		toDoList($("#home"));		//go to my to-do list screen
	}
	else if(targetId == "cmdNavLogout"){
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
			login($("#primary"));	//go to login screen
		}).catch(function(error) {
			// An error happened.
		});
	}
	else if(targetId == "cmdNavAdmin"){
		$("#cmdNavAdmin").css("display", "none");
		admin($("#home"));		//go to admin screen
	}
}



