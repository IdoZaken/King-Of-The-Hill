// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

//create user DB when he first singin
exports.createUserDb = functions.firestore
	.document('users/{userId}')
	.onCreate(event => {
		const docId = event.id;
		//const name = event.data().name;
		const userDataRef = db.collection('users/'+docId+'/userData');
		userDataRef.doc('Preferences').set({
			PushReminder: false,
			OtherServices: false,
			PremiumAccount: false
		})
		.then(function() {
			console.log("Document written with ID: ", userDataRef);
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});


		userDataRef.doc('User Hills').set({
			mainHill: ""
		})
		.then(function() {
			console.log("Document written with ID: ", userDataRef);
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});


		userDataRef.doc('User Hills').collection('private hills').add({
			Name: "",
			Time: firebase.firestore.Timestamp.now()
		})
		.then(function() {
			console.log("Document written with ID: ", userDataRef);
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});


		userDataRef.doc('User Hills').collection('invitations').add({
			Name: "",
			Time: firebase.firestore.Timestamp.now()
		})
		.then(function() {
			console.log("Document written with ID: ", userDataRef);
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});
		return null;
	});

	exports.formScoreCalculation = functions.firestore.document('leagues/{leagueName}/games/{gameId}')
	.onUpdate((change, context) => {
		// Get an object representing the document
		// e.g. {'name': 'Marie', 'age': 66}
		const newValue = change.after.data();

		// ...or the previous value before this update
		const previousValue = change.before.data();

		// We'll only update if FinalScore has changed.
      	// This is crucial to prevent infinite loops.
		if(newValue.FinalScore == previousValue.FinalScore){return null;}
		
		if(newValue.FinalScore){
			var guestScore = newValue.GuestScore;
			var homeScore = newValue.HomeScore;
			var difference = homeScore - guestScore;//0 => X(Draw) || + => One(home win) || - => Two(guest win)
			var oneXtwo;
			if(guestScore > homeScore){oneXtwo = "two";}
			else if(guestScore < homeScore){oneXtwo = "one";}
			else{oneXtwo = "x";}
			const leagueName = context.params.leagueName;
			const gameId = context.params.gameId;

			db.collection("leagues/"+leagueName+"/games/"+gameId+"/forms").get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
//לעשות פה את החישובים ולעדכן את הטופס
// צריך לשקול להוסיף את הדגל שמעדכן שהתוצאה של הטופס היא סופית
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.id, " => ", doc.data());
				});
			})
			.catch(function(error) {
				console.log("Error getting documents: ", error);
			});


		}


		// access a particular field as you would any JS property
		const leagueName = newValue.League;
		console.log("=-=-=-=-=-=>>>>"+leagueName+"<<<<=-=-=-=-=-=-");//Top Leage
		// perform desired operations ...

		//===cotext from path wildcards===
		// context.params.userId == "marie";
      	// context.params.messageCollectionId == "incoming_messages";
	  	// context.params.messageId == "134";
	  
		return null; //return 0; works

		

	});


