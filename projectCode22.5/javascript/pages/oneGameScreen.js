let oneGameScreen = function($container, docId){
    $container.html(
        "<button onclick = 'leagues($(\"#home\"))'>back</button></p>"+//TODO: connect the back btn to Right place
        "<div id = 'oneGameScreen'>"+
			"<div id = 'yourMatchScore'>Your Match Score</div></p>"+
			"<div id = 'expertTip'>"+
				"<div id = 'headline'>Expert Tip</div></p>"+
				"<div id = 'one'>1</br>10%</div>"+
				"<div id = 'x'>X</br>25%</div>"+
				"<div id = 'two'>2</br>65%</div>"+
			"</div></p>"+
			"<button id = 'cmdSubmit'>Submit</button></p>"+
			"<div id = 'gamesList'></div></p>"+
			"<div id = 'guestWithOutcome'>guest With Outcome:</p>"+
				"<div id = guestScore>"+
					"doc.get('Guest Score')"+
				"</div>-"+
				"<div id = homeScore>"+
					"doc.get('Home Score')"+
				"</div>"+
			"</div></p>"+
			"<div id = 'alternativeOutcome'>alternative Outcome  	</p>primum...</div>"+
		"</div>"
    );

    let docRef = firebase.firestore().collection("games").doc(docId.id);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            addGame(doc);
            $("#goToGame").css("display", "none");
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });


}