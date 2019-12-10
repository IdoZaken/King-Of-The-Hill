let games = function($container, name){
    //games screen html
	$container.html(
        "</p>"+
        "<div id = 'games'>"+
	        "<header>Israeli "+name+"</header><br/>"+
	        "<button id = 'gamesbackBtn' onclick = 'leagues($(\"#home\"))'>back</button></p>"+
	        "<div id = 'gamesList'>"+
	        "</div>"+
        "</div>"
    );

    if($("#gamesList").children().length == 0){
        if(name != ""){		//if games() get name to the league then show only this league games 
            //rt listiner to leagues collction
            firebase.firestore().collection("leagues/"+name+"/games").where("League", "==", name).orderBy("Time").onSnapshot(snapshot => {
                let changes = snapshot.docChanges();
                changes.forEach(change => {
                    if(change.type == 'added'){
                        if((change.doc.get("Round")) != 0){ // condition that want show round 0 game
                            addGame(change.doc, name);       //add row to leagues table
                        }
                    }
                    else if(change.type == 'removed'){
                        //deleteLeagueRow()		//TODO: can be bug here if delete from db and not from screen
                    }
                });
            });
        }
		// else{		//if games() not get name to the league then show all games 
		// 			//TODO: limit to amount of games to show
        //     //rt listiner to leagues collction
        //     firebase.firestore().collection("games").orderBy("Time").onSnapshot(snapshot => {
        //         let changes = snapshot.docChanges();
        //         changes.forEach(change => {
        //             if(change.type == 'added'){
        //                 addGame(change.doc, name);       //add row to leagues table
        //             }
        //             else if(change.type == 'removed'){
        //                 //deleteLeagueRow()		//TODO: can be bug here if delete from db and not from screen
        //             }
        //         });
        //     });
        // }   
    }

};

//function to show on screen game from db
function addGame(doc, leagueName){
    let date = doc.get('Time').toDate();
    let gameTime = pad(date.getDate())+"-"+pad(date.getMonth()+1)+"-"+date.getFullYear()+" Time:"+pad(date.getHours())+":"+pad(date.getMinutes());
    let locked = '';
    let currentUserId = firebase.auth().currentUser.uid;
    //check if game is locked or open
    if(doc.get('Locked')){
        locked = 'locked';
    }
    else{
        locked = 'open';
    }

    let submittedForm = "&#10060;";//false==red cros
    db.collection("leagues/"+leagueName+"/games/"+doc.id+"/forms").where("UserId", "==", currentUserId).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
            submittedForm = "&#9989;";//true==green check sighn
        });
    })
    .then(() => {
        //one game html in list of games
        $("#gamesList").append(
            "<div class = 'game' id = '"+doc.id+"'>"+
                "<header>"+
                    "<div id = 'submittedForm'>"+submittedForm+"</div>"+
                    "<div id = 'time'>"+gameTime+"</div>"+
                    "<div id = 'locked'>"+locked+"</div>"+
                "</header>"+
                "<main>"+
                    "<div id = 'lside'>"+doc.get('Guest').id+"</div>"+
                    "<div id = 'center'></p>"+
                        "<div id = x12>2 x 1</div></p>"+
                        "<div id = guestScore>"+
                            doc.get('GuestScore')+
                        "</div>-"+
                        "<div id = homeScore>"+
                            doc.get('HomeScore')+
                        "</div></p>"+
                        "<button id = 'goToGame' onclick = 'oneGameScreen($(\"#home\"),\""+doc.id+"\",\""+leagueName+"\")'>go to game</button></p>"+
                    "</div>"+                               //=========================^^==========^^====================
                    "<div id = 'rside'>"+doc.get('Home').id+"</div>"+
                "</main>"+
            "</div></br>"
        );
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
	// //one game html in list of games
    // $("#gamesList").append(
    //     "<div class = 'game' id = '"+doc.id+"'>"+
    //         "<header>"+
    //             "<div id = 'submittedForm'></div>"+
    //             "<div id = 'time'>"+gameTime+"</div>"+
    //             "<div id = 'locked'>"+locked+"</div>"+
    //         "</header>"+
    //         "<main>"+
    //             "<div id = 'lside'>"+doc.get('Guest').id+"</div>"+
    //             "<div id = 'center'></p>"+
    //                 "<div id = x12>2 x 1</div></p>"+
    //                 "<div id = guestScore>"+
    //                     doc.get('GuestScore')+
    //                 "</div>-"+
    //                 "<div id = homeScore>"+
    //                     doc.get('HomeScore')+
    //                 "</div></p>"+
    //                 "<button id = 'goToGame' onclick = 'oneGameScreen($(\"#home\"),"+doc.id+",\""+leagueName+"\")'>go to game</button></p>"+
    //             "</div>"+
    //             "<div id = 'rside'>"+doc.get('Home').id+"</div>"+
    //         "</main>"+
    //     "</div></br>"
    // );
}

//function to pad number with zeros 
function pad(n) {
    return n<10 ? '0'+n : n;
}
