let games = function($container, name){
    //games screen html
	$container.html(
        "</p>"+
        "<div id = 'games'>"+
	        "<header>Israeli "+name+"</header>"+
	        "<button onclick = 'leagues($(\"#home\"))'>back</button></p>"+
	        "<div id = 'gamesList'>"+
	        "</div>"+
        "</div>"
    );

    if($("#gamesList").children().length == 0){
        if(name != ""){		//if games() get name to the league then show only this league games 
            //rt listiner to leagues collction
            firebase.firestore().collection("games").where("League", "==", name).orderBy("Time").onSnapshot(snapshot => {
                let changes = snapshot.docChanges();
                changes.forEach(change => {
                    if(change.type == 'added'){
                        addGame(change.doc);       //add row to leagues table
                    }
                    else if(change.type == 'removed'){
                        //deleteLeagueRow()		//TODO: can be bug here if delete from db and not from screen
                    }
                });
            });
        }
		else{		//if games() not get name to the league then show all games 
					//TODO: limit to amount of games to show
            //rt listiner to leagues collction
            firebase.firestore().collection("games").orderBy("Time").onSnapshot(snapshot => {
                let changes = snapshot.docChanges();
                changes.forEach(change => {
                    if(change.type == 'added'){
                        addGame(change.doc);       //add row to leagues table
                    }
                    else if(change.type == 'removed'){
                        //deleteLeagueRow()		//TODO: can be bug here if delete from db and not from screen
                    }
                });
            });
        }   
    }

};

//function to show on screen game from db
function addGame(doc){
    let date = doc.get('Time').toDate();
    let gameTime = pad(date.getDate())+"-"+pad(date.getMonth()+1)+"-"+date.getFullYear()+" Time:"+pad(date.getHours())+":"+pad(date.getMinutes());
    let locked = '';

    //check if game is locked or open
    if(doc.get('Locked')){
        locked = 'locked';
    }
    else{
        locked = 'open';
    }

	//one game html in list of games
    $("#gamesList").append(
        "<div class = 'game' id = '"+doc.id+"'>"+
            "<header>"+
                "<div id = 'time'>"+gameTime+"</div>"+
                "<div id = 'locked'>"+locked+"</div>"+
            "</header>"+
            "<main>"+
                "<div id = 'lside'>"+doc.get('Guest').id+"</div>"+
                "<div id = 'center'></p>"+
                    "<div id = x12>1 x 2</div></p>"+
                    "<div id = guestScore>"+
                        doc.get('GuestScore')+
                    "</div>-"+
                    "<div id = homeScore>"+
                        doc.get('HomeScore')+
                    "</div></p>"+
                    "<button id = 'goToGame' onclick = 'oneGameScreen($(\"#home\"),"+doc.id+")'>go to game</button></p>"+
                "</div>"+
                "<div id = 'rside'>"+doc.get('Home').id+"</div>"+
            "</main>"+
        "</div></br>"
    )
}

//function to pad number with zeros 
function pad(n) {
    return n<10 ? '0'+n : n;
}