//================================================
//TODO: כאשר יוצרים גבעה , הגבעה תופיע פעמיים בדף הגבעות הפרטיות.
//בגלל שהמאזין מקבל אדדאד פעמיים : ביצירה וגם בחזרה לדף ולכן מופיע פעמיים.
//==================================================
let hills = function($container){
	//addint html 
	$container.html(
		"<div id = 'hills'>"+
			//"<div id = 'mainHill'></p>"+
			//	"<div id = 'mainHillTitle'>Main Hill</div></p>"+
			//	"<div id = 'mainHillData'>null</div>"+
			//"</div></p>"+
			"</p>"+
			"<div id = 'privateHills'>"+
				"<div id = 'privateHillsTitel'>Private Hills</div></p>"+
				"<div id = 'privateHillsList'></div>"+
			"</div></p>"+
			"<div id = 'buttons'>"+
				"<button id = 'cmdCreateHill' class = 'buttons'>Create Hill</button>"+
				"<button id = 'cmdInvitations' class = 'buttons'>Invitations<span></span></button>"+
			"</div>"+
		"</div>"
	);

	//buttons listeners
	$("#cmdCreateHill").click(hillsClickListener);
	$("#cmdInvitations").click(hillsClickListener);

	//current user id
	let userId = firebase.auth().currentUser.uid;

	//rt listiner to user private hills collction to delete unrelevant hillRefs
	var undefinedRef = db.doc("hills/undefined");
	db.collection("users/"+userId+"/userData/User Hills/private hills").where("HillRef", "==", undefinedRef)
    .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            db.doc("users/"+userId+"/userData/User Hills/private hills/"+doc.id).delete().then(function() {
				console.log("Document successfully deleted!");
			}).catch(function(error) {
				console.error("Error removing document: ", error);
			});
        });
	})
	.then(() => {
		//rt listiner to user private hills collction
		db.collection("users/"+userId+"/userData/User Hills/private hills")
		.where("Name", ">", "").orderBy("Name").orderBy("Time")
		.onSnapshot(snapshot => {
			let changes = snapshot.docChanges();
			changes.forEach(change => {
				if(change.type == 'added'){
					addHillToPrivateHillsList(change.doc);//if ther is hills add them to screen
				}
				else if(change.type == 'removed'){
					//deleteLeagueRow()		
				}
			});
		});
	})
	.then(() => {
		//rt listiner to see if ther is any invitations
		db.collection("users/"+userId+"/userData/User Hills/invitations").where("Name", ">", "")
		.onSnapshot(function(querySnapshot) {
			$("#hills #cmdInvitations span").text("("+querySnapshot.size+")");
		});	
	})
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
	
	
};

//events function
function hillsClickListener(e){
	let targetId = e.target.id;		//e.target.id shortcut

	if(targetId == "cmdInvitations"){
		invitations($('#home'));	//go to invitations screen
	}
	else if(targetId == "cmdCreateHill"){
		createHill($('#home'));		//go to creat hill screen
	}
}

//function to add hill to private hills list on screen
function addHillToPrivateHillsList(doce){
	var score = "";
	var rank = "";
	let currentUserId = firebase.auth().currentUser.uid;

	let docRef = doce.get("HillRef");		//get doc hill reference

	docRef.collection("approved").where("UserId", "==", currentUserId).get()
	.then(function(querySnapshot){
		querySnapshot.forEach(function(document){
			score = (document.get("Score"));//get user score 
			rank = document.get("Rank");		//get user rank
		})
	})

	docRef.get().then(function(doc) {
		if (doc.exists) {		//if hill exists then add hill to screen
			$("#privateHillsList").append(
				"<p><button class = 'btnHill' onclick = 'specificHill($(\"#home\"), \""+doc.id+"\", \""+doc.get('League')+"\", \""+doc.get("Name")+"\")'><br/>"+
					"<aside><!-- symbol --></aside>"+
					"<main>"+
						"<header>"+doc.get('Name')+"</header>"+
						"<sectio>"+doc.get('League')+"</sectio>"+
						"<footer>"+
							"<div id = 'score'>YOUR SCORE: <span>"+score+"</span></div>"+
							"<div id = 'rank'>YOUR RANK: <span>"+rank+"</span></div>"+
						"</footer></br>"+
					"</main>"+
				"</button></p>"
			);
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});

	
}

//---------------create hill----------------------------- 
function createHill($container){
	//create hill screen html
	$container.html(
		"<div id = 'createHill'></p>"+
			"<div id = 'createHillTitle'><h4>Create Hill</h4></div></p>"+
			//"<form>"+
				"<label for = 'name'>Hill Name:</label>"+
				"<input type = 'text' id = 'name' placeholder = 'hill Name' required/></p>"+
				"<label for = 'league'>Select League:</label>"+
				"<select id = 'league' required>"+
					"<option id = 'Top League'>Top League</option>"+
					"<!-- <option id = 'Second League'>Second League</option> -->"+
				"</select></p></br>"+
				"<label for = 'invite'>Who would you like to invite:</label></br>"+
				"(by friend email)</br>"+
				"<input type = 'email' id = 'invite' placeholder = 'friend email'/>"+
				"<button id = 'cmdAddFriend' >Add Friend</button></p>"+
				"<div id = 'invitationList'>Invitation List"+
					"<ul></ul>"+
				"</div></p>"+
				"<button id = 'cmdCreate' >Create</button>"+
				"<button id = 'cmdCancel' >Cancel</button>"+
			//"</form>"+
		"</div>"
	);

	
	//buttons listeners
	$("#cmdAddFriend").click(createHillClickListener);
	$("#cmdCreate").click(createHillClickListener);
	$("#cmdCancel").click(createHillClickListener);


}

friendInvitationArray = [];		// array for friends mails thet you want to invite

function createHillClickListener(e){
	let targetId = e.target.id;		//e.target.id shortcut

	if(targetId == "cmdCancel"){	//cancel btn delete array and go back to my hills screen
		friendInvitationArray = [];
		hills($("#home"));
	}
	else if(targetId == "cmdAddFriend"){	//add friend btn enter to array friend mail and show mails list on screen
		let mail = $("#invite").val();
		let user = firebase.auth().currentUser;
		let userEmail;
		if(user != null){
			userEmail = user.email;
		}
		if(friendInvitationArray.every(m => m != mail) && mail != "" && mail != userEmail){
			friendInvitationArray.push(mail);
			$("ul").append(
				"<li>"+
					"<span>"+mail+"</span>"+
					"<input type='button' value='Delete' onclick='deleteInvitationMail(this)'>"+
				"</li>"
			);
			$("#invite").val('');
		}
	}
	else if(targetId == "cmdCreate"){	// create hill in DB and send invitations to friends
		var hillName = $("#name").val();
		var hillLeague = $("#league").val();
		var numOfinvited = friendInvitationArray.length
		var hillCreatorId = firebase.auth().currentUser.uid;
		var hillCreatoreName = "";
		var hillCreatorMail = "";

		db.doc("users/"+hillCreatorId).get().then((doc) => {
			if (doc.exists) {
				hillCreatoreName = doc.get("Name");
				hillCreatorMail = doc.get("Email");

			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		})
		//==============>>
		.then(function(){
			if(friendInvitationArray !== undefined && friendInvitationArray.length > 0){
			
				db.collection("hills").add({	//create hill at main hills collection on DB
					Name: hillName,
					League: hillLeague,
					Quantity: numOfinvited+1,
					Invitations: friendInvitationArray,
					Time: firebase.firestore.Timestamp.now(),
					Creator: hillCreatorId
				}).then(function(docRef){
					db.collection("hills/"+docRef.id+"/approved").add({
						Manager: true,
						UserId: hillCreatorId,
						Name: hillCreatoreName,
						Email: hillCreatorMail
					});
	
					//create hill pointer at user's private hills
					db.collection("users/"+hillCreatorId+"/userData/User Hills/private hills").add({
						HillRef: db.doc("/hills/"+docRef.id),
						Name: "a",
						Time: firebase.firestore.Timestamp.now()
					});
					console.log("Document written with ID: ", docRef.id);
				})
				.catch(function(error) {
					console.error("Error adding document: ", error);
				});
	
				//create Invitations to friends that invited to the hill that the user just created
				friendInvitationArray.forEach(function(item, index, friendInvitationArray){
					let userToInvite = db.collection("users").where("Email", "==", item);
					userToInvite.get().then(function(querySnapshot){
						querySnapshot.forEach(function(doc){
							let invitations = db.collection("users/"+doc.id+"/userData/User Hills/invitations");
							invitations.add({
								HillName: hillName,
								HillLeague: hillLeague,
								Time: firebase.firestore.Timestamp.now(),
								Creator: hillCreatorId,
								Name: "a"
							});
						})
					});
				});
	
				//empty the mails array and go back to my hills screen
				friendInvitationArray = [];
				alert("The Hill \""+hillName+"\" was created, And the invitations were sent to your friends.");
				hills($("#home"));
			}
		})
		//===================>>>>
		.catch(function(error) {
			console.log("Error getting document:", error);
		});

		
	}
}

//delete Invitation Mail from list on screen and from friendInvitationArray
function deleteInvitationMail(element){
	let mail = element.parentNode.firstChild.innerHTML;
	let index = friendInvitationArray.indexOf(mail);
	friendInvitationArray.splice(index, 1);
	$(element.parentNode).remove();

}

//-----------end of create hill-------------------

//----------Invitations------------------
function invitations($container){

	//invitations screen html
	$container.html(
		"<div id = 'invitationsScreen'></br>"+
			"<header>Invitations List</header></p>"+
			"<button id = 'btnBack' onclick = 'hills($(\"#home\"))'>Back</button></p>"+
			"<div id = 'invitationsList'></div>"+
		"</div>"
	);
	
	let userId = firebase.auth().currentUser.uid;

	//rt listiner to user hills invitations
	db.collection("users/"+userId+"/userData/User Hills/invitations")
	.where("Name", ">", "").orderBy("Name").orderBy("Time").onSnapshot(snapshot => {
		let changes = snapshot.docChanges();
		changes.forEach(change => {
			if(change.type == 'added'){
				addInvitationToInvitationsList(change.doc);		//add invitation from user DB to screen
			}
			else if(change.type == 'removed'){
				//deleteLeagueRow()	
			}
		});
	});
}

//function to add invitation to screen from user's DB
function addInvitationToInvitationsList(doc){

	let creatorDocRef = db.doc("users/"+doc.get("Creator"));
	let hillName = doc.get("HillName");
	let leagueName = doc.get("HillLeague");
	let invitationId = doc.id.toString();

	creatorDocRef.get().then(function(document){
		if(document.exists){	//on creator DB
			//add to screen invitation
			$("#invitationsList").append(
				"<p><div class = 'invite'>"+
					"<main>"+
						"<div id = 'hillName'>"+hillName+"</div>"+
						"<div id = 'creator'>created by: "+document.get("Name")+"</div>"+
						"<div id = 'league'>"+leagueName+"</div>"+
					"</main>"+
					"<aside>"+
						"<input type = 'button' id = 'btnAccept' value = 'Accept' onclick = 'acceptInvitation(this, \""+invitationId+"\")'>"+
						"<input type = 'button' id = 'btnIgnore' value = 'Ignore' onclick = 'deleteInvitation(this, \""+invitationId+"\")'>"+
					"</aside>"+
				"</div></p>"
			);
		}
		else{
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});
	
}

//accept to invitation btn Implementation
function acceptInvitation(del, invitationId){

	let userId = firebase.auth().currentUser.uid;
	let hillCreatorId, hillLeague, hillName, time, hillId;
	let userName = "";
	let userEmail = "";

	db.doc("users/"+userId).get().then((doc) => {
		if (doc.exists) {
			userName = doc.get("Name");
			userEmail = doc.get("Email");
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});

	db.doc("users/"+userId+"/userData/User Hills/invitations/"+invitationId).get()
	.then(function(doc){		//user invitation DB getting hill information
		if (doc.exists) {
			hillCreatorId = doc.get("Creator");
			hillLeague = doc.get("HillLeague");
			hillName = doc.get("HillName");
			time = doc.get("Time");
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).then(function(){		//then getting specific hill that user Invited to
		db.collection("hills")
		.where("League", "==", hillLeague).where("Name", "==", hillName).where("Creator", "==", hillCreatorId).get()
		.then(function(querySnapshot){		//TODO: can be bug i need more Identifiers of doc to get the Right one
			querySnapshot.forEach(function(doc){
				hillId = doc.id;
			})
		})
		.then(function(){		//then create hill pointer in user's private hill collection to the specific hill at hills collection
			db.collection("users/"+userId+"/userData/User Hills/private hills").add({
					HillRef: db.doc("/hills/"+hillId),
					Name: "a",
					Time: time
			});
		})
		.then(function(){
			db.collection("hills/"+hillId+"/approved").add({
				Manager: false,
				UserId: userId,
				Name: userName,
				Email: userEmail,
				Score: 0
			})
		})
		.catch(function(error) {
			console.log("Error getting documents: ", error);
		});
	}).then(function(){		//then delete the invitation from screen and from DB
		deleteInvitation(del, invitationId);
	})
	.catch(function(error) {
		console.log("Error getting document:", error);
	});

	

	

	
}

//function to delete invitation from user's invitations DB and from invitations screen
function deleteInvitation(del, invitationId){
	let userId = firebase.auth().currentUser.uid;
	db.doc("users/"+userId+"/userData/User Hills/invitations/"+invitationId).delete()
	.then(function(){
		console.log("Document successfully deleted!");
	}).catch(function(error) {
		console.error("Error removing document: ", error);
	});

//TODO: check if this is better, not delete but refresh, if it is then we do not need del var

	// let p = del.parentNode.parentNode;
	// $(p).remove();
	
	invitations($('#home'));
}
//----------end of Invitations------------------