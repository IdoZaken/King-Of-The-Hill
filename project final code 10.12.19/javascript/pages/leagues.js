let leagues = function($container){
	//leagues screen html
	$container.html(
		"</p>"+
		"<div id = 'leagues'>"+
			"<header>Leagues</header>"+
			"<div id = 'filter'>filter by:"+
				"<button id = 'cmdFilterByLeague'>By League</button>"+
				//"<button id = 'cmdFilterByDate'>By Date</button>"+
			"</div>"+
			"</p>"+
			"<div id = 'list'>"+
				"<ul>"+
				"</ul>"+
			"</div>"+
		"</div>"
	);

	//buttons listeners
	$("#cmdFilterByLeague").click(leaguesClickListener).click();	//click automatic when we open this page to show leagues
	$("#cmdFilterByDate").click(leaguesClickListener);
	
};

//event listener
let leaguesClickListener = function(e){
	let targetId = e.target.id;		//e.target.id shortcut
	
	if(targetId == "cmdFilterByLeague"){
		if($("ul").children().length == 0){
			//rt listiner to leagues collction
			firebase.firestore().collection("leagues").onSnapshot(snapshot => {
				let changes = snapshot.docChanges();
				changes.forEach(change => {
					if(change.type == 'added'){
						addLeagueToList(change.doc);       //add row to leagues table
					}
					else if(change.type == 'removed'){		//TODO: can be bug here if delete from db and not from screen 
						//deleteLeagueRow()
					}
				});
			});
		}
    }
    else if(targetId == "cmdFilterByDate"){		//show all games by date
		games($("#home"), "");
    }
}

//add league to list on screen
function addLeagueToList(doc){
	let leagueName = doc.get('Name');
	$("ul").append(
		"<li><button onclick = 'goToGames(\""+leagueName+"\")'>"+
			"<aside></aside>"+
			"<main>"+
				"<div class = 'leagueName'>"+doc.get('Name')+"</div>"+
				"in"+
				"<div class = 'country'>"+doc.get('State')+"</div>"+
			"</main>"+ 
		"</button></li><br/>"
	);
}

//send to games name of the league to show ther games
function goToGames(name){
	// if(name == "Top League"){
	// 	games($("#home"), name);
	// }
	games($("#home"), name);
}