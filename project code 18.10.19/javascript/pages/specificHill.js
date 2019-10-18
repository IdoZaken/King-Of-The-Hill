let specificHill = function($container, hillId , hillLeague, hillName){
	$container.html(        //addint html and a back botton
		"<header>"+
			"<br/>"+
			"<div id = 'hillName'>"+hillName+"</div></br>"+
			"<div id = 'hillLeague'>"+hillLeague+"</div></br>"+
			"<button onclick = 'hills($(\"#home\"))'>back</button>"+
		"</header>"+
		"</br>"+
		"<main>"+
			"<div id = 'king'>"+
				"<div class = 'rank'>king</div>"+
				"<div class = 'name'>name</div>"+
				"<div class = 'score'>score</div>"+
			"</div>"+
			"<br/>"+
			"<div id = 'prince'>"+
				"<div class = 'rank'>prince</div>"+
				"<div class = 'name'>name</div>"+
				"<div class = 'score'>score</div>"+
			"</div>"+
			"<br/>"+
			"<div id = 'knight'>"+
				"<div class = 'rank'>knight</div>"+
				"<div class = 'name'>name</div>"+
				"<div class = 'score'>score</div>"+
			"</div>"+
			"<br/>"+
			"<div id = 'userRank'>"+
				"<div class = 'rank'>user rank</div>"+
				"<div class = 'name'>name</div>"+
				"<div class = 'score'>score</div>"+
			"</div>"+
		"</main>"+
		"<footer>"+
			"<br/>"+
			"<button onclick = 'manageHill($(\"#home\"), \""+hillId+"\", \""+hillLeague+"\", \""+hillName+"\")'>Manage Hill</button>"+
		"</footer>"
    );


	var currentUserId = firebase.auth().currentUser.uid;//current user ID
	var collRef = db.collection("hills/"+hillId+"/approved"); //hill approved collection referenc
	
	collRef.get().then(function(querySnapshot){
		querySnapshot.forEach(function(doc){//get all documant in approved collection
			(async function(){
				var score = await calculateUserScore(doc, hillLeague);  //calculate score for last 4 rouns

				//update score to approved user
				await collRef.doc(doc.id).update({
					Score: score
				});
			})();
		});
	}).then(() => {
		collRef.orderBy("Score", "desc").get()		//get documants oder by score from big to small
		.then(function(querySnapshot){
			var counter = 1;
		    querySnapshot.forEach(function(doc){		//for every one chack the rank and update on screen
				// doc.data() is never undefined for query doc snapshots

				var rank = "";
				if(counter == 1){rank = "king";}
				else if(counter == 2){rank = "prince";}
				else if(counter == 3){rank = "knight";}
				else{rank = counter.toString();}

				if(counter == 1){//king
					$('#king .name').text(doc.get("Name"));
					$('#king .score').text(doc.get("Score"));
				}
				else if(counter == 2){//prince
					$('#prince .name').text(doc.get("Name"));
					$('#prince .score').text(doc.get("Score"));
				}
				else if(counter == 3){//knight
					$('#knight .name').text(doc.get("Name"));
					$('#knight .score').text(doc.get("Score"));
				}
				if(doc.get("UserId") == currentUserId){
					$('#userRank .name').text(doc.get("Name"));
					$('#userRank .score').text(doc.get("Score"));
					$('#userRank .rank').text(counter);
					//TODO: update user praivate hill relevant hill with user score and rank then update in hill screen
					
					// var rank = "";
					// if(counter == 1){rank = "king";}
					// else if(counter == 2){rank = "prince";}
					// else if(counter == 3){rank = "knight";}
					// else{rank = counter.toString();}
					
					const hillRef = db.doc("hills/"+hillId);
					db.collection("users/"+currentUserId+"/userData/User Hills/private hills")
					.where("HillRef", "==", hillRef).get()
					.then(function(querySnapshot){
						querySnapshot.forEach(function(docu) {
							// doc.data() is never undefined for query doc snapshots
							db.doc("users/"+currentUserId+"/userData/User Hills/private hills/"+docu.id)
							.update({
								Score: doc.get("Score"),
								Rank: rank
							})
						});
					});
				}
				db.doc("hills/"+hillId+"/approved/"+doc.id).update({
					Rank: rank
				});
				counter += 1;
		    });
		});
	});
	
};

function calculateUserScore(doc, league){//calculat user score on last 4 rounds
	return new Promise(resolve => {
		var userId = doc.get("UserId");
		var score = 0;
		db.collection("users/"+userId+"/scorePerRound").where("League", "==", league)
		.orderBy("Round", "desc").limit(4).get().then(function(querySnapshot){
			querySnapshot.forEach(function(doc) {
				// doc.data() is never undefined for query doc snapshots
				score += doc.get("Score");
			});
			resolve(score);
		});
	});
}

//================ Manage Hill ======================//

function manageHill($container, hillId, hillLeague, hillName){

	var currentUserId = firebase.auth().currentUser.uid;//current user ID
	
	//chack if current user is hill manager
	db.collection("hills/"+hillId+"/approved").where("UserId", "==", currentUserId).get()
	.then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			if(doc.get("Manager")){//if user is manager
				manager($container, hillId, hillLeague, hillName);
			}
			else{
				regular($container, hillId, hillLeague, hillName);
			}
		});
	});


	//Hill users table

}

//========hill manager mod========
function manager($container, hillId, hillLeague, hillName){
	//manager html
	$container.html(
		"<header>"+
			"<br/>"+
			"<div id = 'hillName'>Manage \n"+hillName+"</div></br>"+
			"<button onclick = 'specificHill($(\"#home\"), \""+hillId+"\", \""+hillLeague+"\", \""+hillName+"\")'>back</button>"+
		"</header><br/>"+
		"<main>"+
			"<div id = 'approvedList'>Hill Users"+
				"<table>"+
					"<thead>"+
						"<th>Name</th>"+
						"<th>Email</th>"+
						"<th>Score</th>"+
						"<th>Rank</th>"+
						"<th>Delete</th>"+
					"</thead>"+
					"<tbody></tbody>"+
				"</table>"+
			"</div><br/>"+
			"<div id = 'invitedList'>Invited Users List"+
				"<ol style='text-align:center; list-style-position:inside;'></ol>"+
			"</div><br/>"+
			"<div id = 'newInvitation'>"+
				"<label for = 'newInvite'>invite new friend:</label></br>"+
				"(by friend email)</br>"+
				"<input type = 'email' id = 'newInvite' placeholder = 'friend email'/>"+
				"<button onclick = 'sendInvitation(\""+hillId+"\")' >Send Invitation</button></p>"+
			"</div></br>"+
			"<div id = 'closeThisHill'>"+
				"<button onclick = 'closeThisHill(\""+hillId+"\")'>close this hill</button>"+
			"</div>"+
		"</main>"
	);

	//bring to screen approved user in table
	db.collection("hills/"+hillId+"/approved").get()
	.then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			if(doc.get("Manager")){
				//bring relevant data to tabel
				$("#approvedList tbody").append(
					"<tr>"+
						"<td>"+doc.get("Name")+"</td>"+//name
						"<td>"+doc.get("Email")+"</td>"+//email
						"<td>"+doc.get("Score")+"</td>"+//score
						"<td>"+doc.get("Rank")+"</td>"+//rank
						"<td>Manager</td>"+
					"</tr>"
				);
			}
			else{
				//bring relevant data to tabel
				$("#approvedList tbody").append(
					"<tr>"+
						"<td>"+doc.get("Name")+"</td>"+//name
						"<td>"+doc.get("Email")+"</td>"+//email
						"<td>"+doc.get("Score")+"</td>"+//score
						"<td>"+doc.get("Rank")+"</td>"+//rank
						"<td><button onclick = 'deleteUserFromThisHill(this, \""+doc.id+"\", \""+doc.get("UserId")+"\", \""+hillId+"\")' >delete</button></td>"+
					"</tr>"
				);
			}
			
		});
	});

	//list of invited users to play this hill
	var invited = [];
	db.doc("hills/"+hillId).get().then((doc) => {
		if (doc.exists) {
			invited = doc.get("Invitations");
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).then(() => {
		$("#invitedList ol").append("<li>Manager</li>");
		invited.forEach((element) => {
			$("#invitedList ol").append("<li>"+element+"</li>");
		})
	})
	.catch(function(error) {
		console.log("Error getting document:", error);
	});
}

//function to delete user from hill
function deleteUserFromThisHill(del, approvedDocId, userId, hillId){

	var result = confirm("Do you want to Delete ?");//confirmation to delete user from hill
	if(result){// if confirmed

		// delete form hills/{relevant hill}/approved/{relevant doc} DB
		db.doc("hills/"+hillId+"/approved/"+approvedDocId).delete()
		.then(function() {
			console.log("Document successfully deleted!");
		}).catch(function(error) {
			console.error("Error removing document: ", error);
		});

		// delete from users/{userId}/userData/User Hills/private hills/{relevant doc}
		const hillRef = db.doc("hills/"+hillId);
		db.collection("users/"+userId+"/userData/User Hills/private hills")
		.where("HillRef", "==", hillRef).get()
		.then(function(querySnapshot){
			querySnapshot.forEach(function(doc) {
				doc.ref.delete().then(function() {
					console.log("Document successfully deleted!");
				}).catch(function(error) {
					console.error("Error removing document: ", error);
				});
			});
		});

		// delete from screen
		let tableRow = del.parentNode.parentNode;
    	$(tableRow).remove();
	}
	else{
		console.log("do not delete");
	}
}

//function to invite new frind to hill
 function sendInvitation(hillId){
	let newMail = $("#newInvite").val();
	let user = firebase.auth().currentUser;
	let userEmail;
	if(user != null){
		userEmail = user.email; //current user email
	}

	let invitedList = [];
	let hillName = "";
	let hillLeague = "";
	let hillCreatorId = "";

	//geting hill data
	db.doc("hills/"+hillId).get().then((doc) => {
		if (doc.exists) {
			invitedList = doc.get("Invitations");
			hillName = doc.get("Name").toString();
			hillLeague = doc.get("League").toString();
			hillCreatorId = doc.get("Creator").toString();
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).then(() => {
		db.collection("hills/"+hillId+"/approved").where("Email", "==", newMail).get()
		.then((querySnapshot) => {
			//check that new mail not approved allready
			if(querySnapshot.empty){
				//means that not exsits at approved
				//check if new mail not empty or as maneger mail or already invited 
				//to prevent double Invitation
				if(invitedList.every(m => m != newMail) && newMail != "" && newMail != userEmail){
					//send invitation

					//create new Invitation to new friend that invited to the hill 
					let sendNewInvitation = db.collection("users").where("Email", "==", newMail);
					sendNewInvitation.get().then(function(querySnapshot){
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

					//update hill invatation array
					db.doc("hills/"+hillId).update({
						Invitations: firebase.firestore.FieldValue.arrayUnion(newMail)
					});
					
					//clear new mail input on screen
					$("#newInvite").val('');
					
					//refresh page
					manageHill($("#home"), hillId, hillLeague, hillName);
				}
			}
		});
	})
	.catch(function(error) {
		console.log("Error getting document:", error);
	});
	
 }

 //function to close this hill if manager want to
 function closeThisHill(hillId){
	var result = confirm("Are you sure you want to close this hill ?");
	if(result){
		db.collection("hills/"+hillId+"/approved").get()
		.then((querySnapshot) => {
			if(querySnapshot.empty){
				console.log("querySnapshot empty .... error");
			}
			else if(querySnapshot.size > 1){
				alert("First, You must delete all hill users");
			}
			else{
				querySnapshot.forEach((doc) => {
					// delete form hills/{relevant hill}/approved/{relevant doc} DB
					db.doc("hills/"+hillId+"/approved/"+doc.id).delete()
					.then(function() {
						console.log("Document successfully deleted!");
					}).catch(function(error) {
						console.error("Error removing document: ", error);
					});

					// delete from users/{userId}/userData/User Hills/private hills/{relevant doc}
					const hillRef = db.doc("hills/"+hillId);
					db.collection("users/"+doc.get("UserId")+"/userData/User Hills/private hills")
					.where("HillRef", "==", hillRef).get()
					.then(function(querySnapshot){
						querySnapshot.forEach(function(docu) {
							docu.ref.delete().then(function() {
								console.log("Document successfully deleted!");
							}).catch(function(error) {
								console.error("Error removing document: ", error);
							});
						});
					});

					//delete the hill hills/{relevant hill}
					db.doc("hills/"+hillId).delete()
					.then(function() {
						console.log("Document successfully deleted!");
					})
					.then(() => {hills($("#home"));})
					.catch(function(error) {
						console.error("Error removing document: ", error);
					});
					
				});
			}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		});
	}
 }

//========== regular user mode========
function regular($container, hillId, hillLeague, hillName){
	$container.html(
		"<header>"+
			"<br/>"+
			"<div id = 'hillName'>Manage \n"+hillName+"</div></br>"+
			"<button onclick = 'specificHill($(\"#home\"), \""+hillId+"\", \""+hillLeague+"\", \""+hillName+"\")'>back</button>"+
		"</header><br/>"+
		"<main>"+
			"<div id = 'approvedList'>Hill Users"+
				"<table>"+
					"<thead>"+
						"<th>Name</th>"+
						"<th>Email</th>"+
						"<th>Score</th>"+
						"<th>Rank</th>"+
						"<th>Manager</th>"+
					"</thead>"+
					"<tbody></tbody>"+
				"</table>"+
			"</div><br/>"+
			"<div id = 'invitedList'>Invited Users List"+
				"<ol style='text-align:center; list-style-position:inside;'></ol>"+
			"</div><br/>"+
			"<div id = 'closeThisHill'>"+
				"<button onclick = 'leaveThisHill(\""+hillId+"\")'>leave this hill</button>"+
			"</div>"+
		"</main>"
	);

	//bring to screen approved user in table
	db.collection("hills/"+hillId+"/approved").get()
	.then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			if(doc.get("Manager")){
				//bring relevant data to tabel
				$("#approvedList tbody").append(
					"<tr>"+
						"<td>"+doc.get("Name")+"</td>"+//name
						"<td>"+doc.get("Email")+"</td>"+//email
						"<td>"+doc.get("Score")+"</td>"+//score
						"<td>"+doc.get("Rank")+"</td>"+//rank
						"<td>Manager</td>"+//rank
					"</tr>"
				);
			}
			else{
				//bring relevant data to tabel
				$("#approvedList tbody").append(
					"<tr>"+
						"<td>"+doc.get("Name")+"</td>"+//name
						"<td>"+doc.get("Email")+"</td>"+//email
						"<td>"+doc.get("Score")+"</td>"+//score
						"<td>"+doc.get("Rank")+"</td>"+//rank
						"<td> - </td>"+
					"</tr>"
				);
			}
			
		});
	});

	//list of invited users to play this hill
	var invited = [];
	db.doc("hills/"+hillId).get().then((doc) => {
		if (doc.exists) {
			invited = doc.get("Invitations");
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).then(() => {
		$("#invitedList ol").append("<li>Manager</li>");
		invited.forEach((element) => {
			$("#invitedList ol").append("<li>"+element+"</li>");
		})
	})
	.catch(function(error) {
		console.log("Error getting document:", error);
	});
}

function leaveThisHill(hillId){
	var userId = firebase.auth().currentUser.uid;//current user ID
	var result = confirm("Are you sure you want to leave this hill ?");//confirmation to leave this hill

	if(result){// if confirmed

		// delete form hills/{relevant hill}/approved/{relevant doc} DB
		db.collection("hills/"+hillId+"/approved").where("UserId", "==", userId).get()
		.then(function(querySnapshot){
			querySnapshot.forEach(function(doc) {
				doc.ref.delete().then(function() {
					console.log("Document successfully deleted!");
				}).catch(function(error) {
					console.error("Error removing document: ", error);
				});
			});
		});

		// delete from users/{userId}/userData/User Hills/private hills/{relevant doc}
		const hillRef = db.doc("hills/"+hillId);
		db.collection("users/"+userId+"/userData/User Hills/private hills")
		.where("HillRef", "==", hillRef).get()
		.then(function(querySnapshot){
			querySnapshot.forEach(function(doc) {
				doc.ref.delete().then(function() {
					console.log("Document successfully deleted!");
				}).catch(function(error) {
					console.error("Error removing document: ", error);
				});
			});
		})
		.then(() => {hills($("#home"));});
	}
	else{
		console.log("do not delete");
	}
}