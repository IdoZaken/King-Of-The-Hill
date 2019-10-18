let oneGameScreen = function($container, docId, leagueName){ 
	//one game screen html
    $container.html(
        "<br/><button onclick = 'games($(\"#home\"), \""+leagueName+"\")'>back</button></p>"+
		"<div id = 'oneGameScreen'>"+
			"<div id = 'yourMatchScore'>Your Match Score: <span></span></div></p>"+
			"<div id = 'expertTip'>"+
				"<div id = 'headline'>Expert Tip</div></p>"+
				"<div id = 'two'>"+
					"<input class = 'x12-checkbox' type = 'checkbox' value = '2' id = 'checkboxTwo'/>2"+
				"</div>"+
				"<div id = 'x'>"+
					"<input class = 'x12-checkbox' type = 'checkbox' value = 'x' id = 'checkboxX'/>X"+
				"</div>"+
				"<div id = 'one'>"+
					"<input class = 'x12-checkbox' type = 'checkbox' value = '1' id = 'checkboxOne'/>1"+
				"</div>"+
			"</div></p>"+
			"<button id = 'cmdSubmit'>Submit</button></p>"+
			"<div id = 'gamesList'></div></p>"+
			"<div id = 'guessWithOutcome'>guess With Outcome:</p>"+
				"<div id = 'guestScore'>"+
					"<input type = 'text' id = 'guestGuess' placeholder = 'Guest'/>"+
				"</div>-"+
				"<div id = 'homeScore'>"+
					"<input type = 'text' id = 'homeGuess' placeholder = 'Home'/>"+
				"</div>"+
			"</div></p>"+
			"<div id = 'alternativeOutcome'>alternative Outcome (primum)"+
				"<div id = 'alternativeGuestScore'>"+
					"<input type = 'text' id = 'guestGuess' placeholder = 'Guest'/>"+
				"</div>-"+
				"<div id = 'alternativeHomeScore'>"+
					"<input type = 'text' id = 'homeGuess' placeholder = 'Home'/>"+
				"</div>"+
			"</div>"+
			"<div id = 'alternativeOutcome2'>More Alternative Outcome (primum)"+
				"<div id = 'alternativeGuestScore'>"+
					"<input type = 'text' id = 'guestGuess' placeholder = 'Guest'/>"+
				"</div>-"+
				"<div id = 'alternativeHomeScore'>"+
					"<input type = 'text' id = 'homeGuess' placeholder = 'Home'/>"+
				"</div>"+
			"</div><p/>"+
		"</div>"
	);

	//hide alternativeOutcome2 
	$("#alternativeOutcome2").css("display", "none");
	
	//show or hide alternativeOutcome2
	$('.x12-checkbox').on('change', function() {
		if($('.x12-checkbox:checked').length > 2) {
			this.checked = false;
		}
		if($('.x12-checkbox:checked').length == 2){
			$("#alternativeOutcome2").css("display", "block");
		}
		else{
			$("#alternativeOutcome2").css("display", "none");
		}
	 });
	
	//rt listener for this league games at DB
    let docRef = firebase.firestore().collection("leagues/"+leagueName+"/games").doc(docId.id);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            addGame(doc, leagueName);	//add the game from DB to screen
			$("#goToGame").css("display", "none");	//hide goToGame button
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
	});
	
	$("#cmdSubmit").click(function(e){oneGameClickListener(e, leagueName, docId);});

	//function that bring from user DB his guess for this game if he already submit form for this game
	userMatchScore(leagueName, docId);

}

function oneGameClickListener(e, leagueName, docId){
	let targetId = e.target.id;		//e.target.id shortcut
	// console.log(leagueName);
	// console.log(typeof leagueName);
	// console.log(docId.id);
	// console.log(typeof docId.id);
	if(targetId == "cmdSubmit"){	//TODO: chack that nubers are not minus	and not string or somthing else
		//collect all data from screen
		var two = $("#checkboxTwo").prop("checked");
		var x = $("#checkboxX").prop("checked");
		var one = $("#checkboxOne").prop("checked");
		var outcome1guest = $("#guessWithOutcome #guestGuess").val();
		var outcome1home = $("#guessWithOutcome #homeGuess").val();
		var outcome2guest = $("#alternativeOutcome #guestGuess").val();
		var outcome2home = $("#alternativeOutcome #homeGuess").val();
		var outcome3guest = $("#alternativeOutcome2 #guestGuess").val();
		var outcome3home = $("#alternativeOutcome2 #homeGuess").val();
		var userId = firebase.auth().currentUser.uid;
		var gameId = docId.id;
		var formExists = false;

		//decide what type of form the user send
		var type = formType(two, x, one, outcome1guest, outcome1home, outcome2guest, outcome2home, outcome3guest, outcome3home);
		if(type == 0){
			alert("error, must select 	1 X 2.");
			return;
		}
		// console.log("two: "+two+"\nx: "+x+"\none: "+one);
		// console.log("guest 1: "+outcome1guest+"\thome1: "+outcome1home);
		// console.log("guest 2: "+outcome2guest+"\thome2: "+outcome2home);
		// console.log("guest 3: "+outcome3guest+"\thome3: "+outcome3home);
		// console.log("form type: "+type);
		if($("#oneGameScreen #gamesList #locked").text() == "open"){ //if game is open to guess
			if(two || x || one){// check if user already submit form for this game
				var collectionRef = db.collection("leagues/"+leagueName+"/games/"+gameId+"/forms");
				collectionRef.where("UserId", "==", userId).get()
				.then(function(querySnapshot){
					querySnapshot.forEach(function(doc){
						//This means that the form is already exists
						alert("can't submit, form already exists for this game");
						formExists = true;
						console.log(doc.data());// TODO: put on screen the form Details from db same as "settings" (bring the form data to screen that user can see what he submited)
					});
				}).then(function(){//if form don't exists, create it 
					if(!formExists){
						collectionRef.add({
							UserId: userId,
							FormType: type,
							Two: two,
							X: x,
							One: one,
							Outcome1guest: outcome1guest,
							Outcome1home: outcome1home,
							Outcome2guest: outcome2guest,
							Outcome2home: outcome2home,
							Outcome3guest: outcome3guest,
							Outcome3home: outcome3home,
							FormScore: 6,
							AfterCalculation: false
						}).then(function(docRef) {
    						console.log("Document written with ID: ", docRef.id);
						})
						.catch(function(error) {
    						console.error("Error adding document: ", error);
						});
					}
				})
				.catch(function(error) {
					console.log("Error getting documents: ", error);
				});
			}
			else{
				alert("can't submit, form is empty");
			}
		}
		else{
			alert("can't submit, game already closed");
		}

		// clear inputs
		$("#checkboxTwo").prop("checked", false);
		$("#checkboxX").prop("checked", false);
		$("#checkboxOne").prop("checked", false);
		$("#guessWithOutcome #guestGuess").val("");
		$("#guessWithOutcome #homeGuess").val("");
		$("#alternativeOutcome #guestGuess").val("");
		$("#alternativeOutcome #homeGuess").val("");
		$("#alternativeOutcome2 #guestGuess").val("");
		$("#alternativeOutcome2 #homeGuess").val("");
		

	}
}

//function that decides what kind of form to submit
//the function return number 
//====== form types ========
// |   |check|guess|	|   |check|guess|	|   |check|guess|
// |No.|2|x|1|1|2|3|	|No.|2|x|1|1|2|3|	|No.|2|x|1|1|2|3|
// | 0 |-|-|-|-|-|-|	| 8 |-|v|v|v|-|-|	| 16|v|-|v|v|v|-|
// | 1 |-|-|v|-|-|-|	| 9 |-|v|v|v|v|-|	| 17|v|-|v|v|v|v|
// | 2 |-|-|v|v|-|-|	| 10|-|v|v|v|v|v|	| 18|v|v|-|-|-|-|	
// | 3 |-|-|v|v|v|-|	| 11|v|-|-|-|-|-|	| 19|v|v|-|v|-|-|
// | 4 |-|v|-|-|-|-|	| 12|v|-|-|v|-|-|	| 20|v|v|-|v|v|-|
// | 5 |-|v|-|v|-|-|	| 13|v|-|-|v|v|-|	| 21|v|v|-|v|v|v|
// | 6 |-|v|-|v|v|-|	| 14|v|-|v|-|-|-|
// | 7 |-|v|v|-|-|-|	| 15|v|-|v|v|-|-|
function formType(two, x, one, outcome1guest, outcome1home, outcome2guest, outcome2home, outcome3guest, outcome3home){
	if(!two && !x && !one){//000
		return 0; // submit null = error
	}
	else if(!two && !x && one){//001 => 1
		if(outcome1guest != "" && outcome1home != ""){
			if(outcome1guest < outcome1home){
				if(outcome2guest != "" && outcome2home != ""){
					if(outcome2guest < outcome2home){
						return 3; // submit 1 and 2 score guesses
					}
					else{
						alert("error guess 2");
						return 0;
					}
				}
				return 2; // submit 1 and 1 score guess
			}
			else{
				alert("error guess 1");
				return 0;
			}
		}
		return 1; // submit just 1
	}
	else if(!two && x && !one){//010 => x
		if(outcome1guest != "" && outcome1home != ""){
			if(outcome1guest == outcome1home){
				if(outcome2guest != "" && outcome2home != ""){
					if(outcome2guest == outcome2home){
						return 6; // submit x and 2 score guesses
					}
					else{
						alert("error guess 2");
						return 0;
					}
				}
				return 5; // submit x and 1 score guess
			}
			else{
				alert("error guess 1");
				return 0;
			}
		}
		return 4; // submit just x
	}
	else if(!two && x && one){//011 => x,1
		if(outcome1guest != "" && outcome1home != ""){
			if(outcome1guest <= outcome1home){
				if(outcome2guest != "" && outcome2home != ""){
					if(outcome2guest <= outcome2home){
						if(outcome3guest != "" && outcome3home != ""){
							if(outcome2guest <= outcome2home){
								return 10; // submit 1,x and 3 score guesses
							}
							else{
								alert("error guess 3");
								return 0;
							}
						}
						return 9; // submit 1,x and 2 score guesses
					}
					else{
						alert("error guess 2");
						return 0;
					}
				}
				return 8; // submit 1,x and 1 score guess
			}
			else{
				alert("error guess 1");
				return 0;
			}
		}
		return 7; // submit just 1,x
	}
	else if(two && !x && !one){//100 => 2
		if(outcome1guest != "" && outcome1home != ""){
			if(outcome1guest > outcome1home){
				if(outcome2guest != "" && outcome2home != ""){
					if(outcome2guest > outcome2home){
						return 13; // submit 2 and 2 score guesses
					}
					else{
						alert("error guess 2");
						return 0;
					}
				}
				return 12; // submit 2 and 1 score guess
			}
			else{
				alert("error guess 1");
				return 0;
			}
		}
		return 11; // submit just 2
	}
	else if(two && !x && one){//101 => 1,2
		if(outcome1guest != "" && outcome1home != ""){
			if(outcome1guest < outcome1home || outcome1guest > outcome1home){
				if(outcome2guest != "" && outcome2home != ""){
					if(outcome2guest < outcome2home || outcome2guest > outcome2home){
						if(outcome3guest != "" && outcome3home != ""){
							if(outcome2guest < outcome2home || outcome2guest < outcome2home){
								return 17; // submit 1,2 and 3 score guesses
							}
							else{
								alert("error guess 3");
								return 0;
							}
						}
						return 16; // submit 1,2 and 2 score guesses
					}
					else{
						alert("error guess 2");
						return 0;
					}
				}
				return 15; // submit 1,2 and 1 score guess
			}
			else{
				alert("error guess 1");
				return 0;
			}
		}
		return 14; // submit just 1,2
	}
	else if(two && x && !one){//110 => 2,x
		if(outcome1guest != "" && outcome1home != ""){
			if(outcome1guest >= outcome1home){
				if(outcome2guest != "" && outcome2home != ""){
					if(outcome2guest >= outcome2home){
						if(outcome3guest != "" && outcome3home != ""){
							if(outcome2guest >= outcome2home){
								return 21; // submit 2,x and 3 score guesses
							}
							else{
								alert("error guess 3");
								return 0;
							}
						}
						return 20; // submit 2,x and 2 score guesses
					}
					else{
						alert("error guess 2");
						return 0;
					}
				}
				return 19; // submit 2,x and 1 score guess
			}
			else{
				alert("error guess 1");
				return 0;
			}
		}
		return 18; // submit just 2,x
	}
	else if(two && x && one){//111
		return 0; // submit all = error
	}
}

//function that bring from user DB his guess for this game if he already submit form for this game
function userMatchScore(leagueName, docId){
	var userId = firebase.auth().currentUser.uid;
	var gameId = docId.id;
	var formExists = false;

	var collectionRef = db.collection("leagues/"+leagueName+"/games/"+gameId+"/forms");//chack if form exists
	collectionRef.where("UserId", "==", userId).get()
				.then(function(querySnapshot){
					querySnapshot.forEach(function(doc){
						//This means that the form exists
						//then bring all form data from DB and show it on screen
						$("#oneGameScreen #yourMatchScore span").text(""+doc.get("FormScore")+"");
						if(doc.get('Outcome1guest') != ""){
							$("#guessWithOutcome #guestGuess").val(doc.get('Outcome1guest'));
						}
						if(doc.get('Outcome1home') != ""){
							$("#guessWithOutcome #homeGuess").val(doc.get('Outcome1home'));
						}
						if(doc.get('Outcome2guest') != ""){
							$("#alternativeOutcome #guestGuess").val(doc.get('Outcome2guest'));
						}
						if(doc.get('Outcome2home') != ""){
							$("#alternativeOutcome #homeGuess").val(doc.get('Outcome2home'));
						}
						if(doc.get('Outcome3guest') != ""){
							$("#alternativeOutcome2 #guestGuess").val(doc.get('Outcome3guest'));
						}
						if(doc.get('Outcome3home') != ""){
							$("#alternativeOutcome2 #homeGuess").val(doc.get('Outcome3home'));
						}
						$("#oneGameScreen #checkboxTwo").prop("checked", doc.get("Two"));
						$("#oneGameScreen #checkboxX").prop("checked", doc.get("X"));
						$("#oneGameScreen #checkboxOne").prop("checked", doc.get("One"));

						//show alternativeOutcome2 if need it
						if($('.x12-checkbox:checked').length == 2){
							$("#alternativeOutcome2").css("display", "block");
						}

						formExists = true;
					});
				}).then(function(){
					if(!formExists){// if form not exists then user don't get any score
						$("#oneGameScreen #yourMatchScore span").text("0");
					}
				})
				.catch(function(error) {
					console.log("Error getting documents: ", error);
				});
 }