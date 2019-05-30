let admin = function($container){
    //admin screen html
    $container.html(
        "<div id = 'admin'>"+
            "<h1>Admin</h1>"+
            "<form>"+
                "<div id = 'createRound'>"+
                "<fieldset>"+
                    "<legend>Create Round</legend>"+
                    "<label for = 'league'>League:</label>"+
                    "<select id = 'league'>"+
                        "<option id = 'Top League'>Top League</option>"+
                    "</select></p>"+
                    "<fieldset>"+
                        "<legend>Add game to round:</legend></p>"+
                        "<label for = 'roundNumber'>Round Number:</label>"+
                        "<input type = 'text' id = 'roundNumber' placeholder = 'Round Number' /></p>"+
                        "<label for = 'homeTeam'>Home Team: </label>"+
                        "<select id = 'homeTeam' >"+
                            "<option id = 'Top League'>Beitar Jerusalem</option>"+
                            "<option id = 'Second League'>Bnei Sakhnin</option>"+
                            "<option id = 'Top League'>Bnei Yehuda</option>"+
                            "<option id = 'Second League'>F.C. Ashdod</option>"+
                            "<option id = 'Top League'>Hapoel Be'er Sheva</option>"+
                            "<option id = 'Second League'>Hapoel Hadera</option>"+
                            "<option id = 'Top League'>Hapoel Haifa</option>"+
                            "<option id = 'Second League'>Hapoel Ra'anana</option>"+
                            "<option id = 'Top League'>Hapoel Tel Aviv</option>"+
                            "<option id = 'Second League'>Ironi Kiryat Shmona</option>"+
                            "<option id = 'Top League'>Maccabi Haifa</option>"+
                            "<option id = 'Second League'>Maccabi Netanya</option>"+
                            "<option id = 'Top League'>Maccabi Petah Tikva</option>"+
                            "<option id = 'Second League'>Maccabi Tel Aviv</option>"+
                        "</select>"+
                        "&nbsp&nbsp&nbsp&nbsp "+
                        "<label for = 'guestTeam'>Guest Team: </label>"+
                        "<select id = 'guestTeam' >"+
                            "<option id = 'Top League'>Bnei Yehuda</option>"+
                            "<option id = 'Top League'>Beitar Jerusalem</option>"+
                            "<option id = 'Second League'>Bnei Sakhnin</option>"+
                            "<option id = 'Second League'>F.C. Ashdod</option>"+
                            "<option id = 'Top League'>Hapoel Be'er Sheva</option>"+
                            "<option id = 'Second League'>Hapoel Hadera</option>"+
                            "<option id = 'Top League'>Hapoel Haifa</option>"+
                            "<option id = 'Second League'>Hapoel Ra'anana</option>"+
                            "<option id = 'Top League'>Hapoel Tel Aviv</option>"+
                            "<option id = 'Second League'>Ironi Kiryat Shmona</option>"+
                            "<option id = 'Top League'>Maccabi Haifa</option>"+
                            "<option id = 'Second League'>Maccabi Netanya</option>"+
                            "<option id = 'Top League'>Maccabi Petah Tikva</option>"+
                            "<option id = 'Second League'>Maccabi Tel Aviv</option>"+
                        "</select></p>"+
                        "<label for = 'gameDate'>Date of Game:</label>"+
                        "<input type = 'date' id = 'gameDate'/>"+
                        "&nbsp&nbsp&nbsp&nbsp"+
                        "<label for = 'gameTime'>Time of Game:</label>"+
                        "<input type = 'time' id = 'gameTime'/></p>"+
                        "<button id = 'cmdAddGame' >Add Game to Round</button></p>"+
                        "<div id = 'adminGamesList'>Games List"+
                            "<table>"+
                                "<thead>"+
                                    "<th>League</th>"+
                                    "<th>Home</th>"+
                                    "<th>Guest</th>"+
                                    "<th>Date</th>"+
                                    "<th>Time</th>"+
                                    "<th>Round</th>"+
                                    "<th>delete</th>"+
                                "</thead>"+
                                "<tbody></tbody>"+
                            "</table>"+
                        "</div></p>"+
                    "</fieldset></p>"+
                    "<button id = 'cmdCreateRound'>Create Round</button>"+
                    "<ul></ul>"+
                "</fieldset>"+
            "</div></p><hr/><hr/>"+
                "<div id = 'createLeague'>"+
                    "<fieldset>"+
                        "<legend>Create League</legend>"+
                        "<label for = 'leagueName'>Name:</label>"+
                        "<input type = 'text' id = 'leagueName' placeholder = 'League Name' /></br>"+
                        "<label for = 'leagueSport'>Sport:</label>"+
                        "<input type = 'text' id = 'leagueSport' placeholder = 'League Sport' /></br>"+
                        "<label for = 'leagueState'>State:</label>"+
                        "<input type = 'text' id = 'leagueState' placeholder = 'League State' /></br>"+
                        "<!-- <label for = 'leagueSymbol'>Symbol:</label>"+     //symbol
                        "<input type = 'text' id = 'leagueSymbol' placeholder = 'League Symbol'/></br> -->"+//symbol
                        "<button id = 'cmdCreateLeague'>Create League</button>"+
                    "</fieldset>"+
                "</div></p>"+
                "<div id = 'leagues'>leagues"+
                    "<table>"+
                        "<thead>"+
                            "<th>Name</th>"+
                            "<th>Sport</th>"+
                            "<th>State</th>"+
                            "<th>delete</th>"+
                        "</thead>"+
                        "<tbody></tbody>"+
                    "</table>"+
                "</div></p><hr/><hr/>"+
                "<div id = 'createTeam'>"+
                    "<fieldset>"+
                        "<legend>Create Team</legend>"+
                        "<label for = 'teamName'>Name:</label>"+
                        "<input type = 'text' id = 'teamName' placeholder = 'Team Name' /></br>"+
                        "<label for = 'teamSport'>Sport:</label>"+
                        "<input type = 'text' id = 'teamSport' placeholder = 'Team Sport' /></br>"+
                        "<label for = 'teamState'>State:</label>"+
                        "<input type = 'text' id = 'teamState' placeholder = 'Team State' /></br>"+
                        "<!-- <label for = 'teamSymbol'>Symbol:</label>"+               //symbol
                        "<input type = 'text' id = 'teamSymbol' placeholder = 'Team Symbol'/></br> -->"+//symbol
                        "<label for = 'teamLeague'>League:</label>"+
                        "<input type = 'text' id = 'teamLeague' placeholder = 'Team League' /></br>"+
                        "<button id = 'cmdCreateTeam'>Create Team</button>"+
                    "</fieldset>"+
                "</div></p>"+
                "<div id = teams>teams"+
                    "<table>"+
                        "<thead>"+
                            "<th>Name</th>"+
                            "<th>Sport</th>"+
                            "<th>State</th>"+
                            "<th>League</th>"+
                            "<th>delete</th>"+
                        "</thead>"+
                        "<tbody></tbody>"+
                    "</table>"+
                "</div>"+
            "</form>"+
        "</div>"
    );

    //buttons listeners
	$("#cmdCreateLeague").click(adminClickListener);
    $("#cmdCreateTeam").click(adminClickListener);
    $("#cmdAddGame").click(adminClickListener);
    $("#cmdCreateRound").click(adminClickListener);
    
    
    gamesInRoundIds = [];   //array for to collect all ID's of game in one round
    
    //rt listiner to leagues collction
    firebase.firestore().collection("leagues").onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type == 'added'){
                addLeagueRow(change.doc);       //add row to leagues table
            }
            else if(change.type == 'removed'){
                //deleteLeagueRow()
            }
        });
    });

     //rt listiner to Top League teams collction
     firebase.firestore().collection("leagues/Top League/teams").onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type == 'added'){
                addTeamRow(change.doc);     //add row to teams table
            }
            else if(change.type == 'removed'){
                //deleteLeagueRow()
            }
        });
    });

    //rt listiner to rounds collction
    db.collection("rounds").onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type == 'added'){
                if(change.doc.get("Name") != 0){
                    addRoundRow(change.doc);     //add row to teams table
                }
            }
            else if(change.type == 'removed'){
                //deleteLeagueRow()
            }
        });
    });
    

}

//events function
let adminClickListener = function(e){
	let targetId = e.target.id;		//e.target.id shortcut
    
	if(targetId == "cmdCreateLeague"){      //create league button listener
        console.log("league");

        let leagueName = $("#leagueName").val();
        let leagueSport = $("#leagueSport").val();
        let leagueState = $("#leagueState").val();

       
        if(chackCreateLeagueData(leagueName, leagueSport, leagueState)){        //chack league data
            console.log("league data ok");
            
            let docRef = firebase.firestore().doc("leagues/"+leagueName+"");    //Create document

            docRef.set({        //entering data to document
                Name: leagueName,
                Sport: leagueSport,
                State: leagueState
            })
            .then(function() {
                console.log("Document written with ID: ", docRef);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
        
        //clear text
        $("#leagueName").val('');
        $("#leagueSport").val('');
        $("#leagueState").val('');
    
    }
    else if(targetId == "cmdCreateTeam"){       //create team button listener
        console.log("teame");

        let teamName = $("#teamName").val();
        let teamSport = $("#teamSport").val();
        let teamState = $("#teamState").val();
        let teamLeague = $("#teamLeague").val();

        if(chackCreateTeamData(teamName, teamSport, teamState, teamLeague)){        //check team data
            console.log("team data ok");
            
            let docRef = firebase.firestore().doc("leagues/"+teamLeague+"/teams/"+teamName+"");    //Create document

            docRef.set({        //entering data to document
                Name: teamName,
                Sport: teamSport,
                State: teamState,
                League: teamLeague
            })
            .then(function() {
                console.log("Document written with ID: ", docRef);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
        
        //clear text
        $("#teamName").val('');
        $("#teamSport").val('');
        $("#teamState").val('');
        $("#teamLeague").val('');
    }                                   
    else if(targetId == "cmdAddGame"){      //add game to round
        //colect all values
        let guestTeam = $("#guestTeam").val();
        let homeTeam = $("#homeTeam").val();
        let score = 0;
        let league = $("#league").val();
        let locked = false;
        let round = $("#roundNumber").val();
        let date = $("#gameDate").val();
        let time = $("#gameTime").val();
        let timestamp = new Date(date+"T"+time);

        //create game on DB
        if(guestTeam != "" && homeTeam != "" && guestTeam != homeTeam && league == "Top League" && round != "" && date != "" && time != ""){
            db.collection("games").add({
                Guest: db.doc("leagues/Top League/teams/"+guestTeam),
                GuestScore: score,
                Home: db.doc("leagues/Top League/teams/"+homeTeam),
                HomeScore: score,
                League: league,
                Locked: locked,
                Round: round,
                Time: timestamp
            })
            .then(function(docRef) {    // create html to see game on screen
                var docId = docRef.id.toString();
                gamesInRoundIds.push(docId);    //add game to round array
                $("#adminGamesList tbody").append(
                    "<tr>"+
                        "<td>"+league+"</td>"+
                        "<td>"+homeTeam+"</td>"+
                        "<td>"+guestTeam+"</td>"+
                        "<td>"+date+"</td>"+
                        "<td>"+time+"</td>"+
                        "<td>"+round+"</td>"+
                        "<td><input type='button' value='Delete' onclick='adminDeleteGameRow(this, \""+docId+"\")'></td>"+
                    "</tr>"
                );

                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            
        }
        
        
    }                                   
    else if(targetId == "cmdCreateRound"){  //create round on DB and screen

        let league = $("#league").val();
        let round = $("#roundNumber").val();
        let startDate = (new Date("January 31 2100 12:30"));
        let endDate = (new Date(0));

        db.collection("games").where("Round", "==", round).where("League", "==", league)
        .orderBy("Time").get()
        .then(function (querySnapshot) {            // getting all games time in this round and updateing the var's
            querySnapshot.forEach(function (doc) {
                if(doc.get("Time").seconds < startDate.getTime()/1000){
                    startDate = new Date(doc.get("Time").toDate());
                }
                if(doc.get("Time").seconds > endDate.getTime()/1000){
                    endDate = new Date(doc.get("Time").toDate());
                }
            });
        }).then(function(){         //creating round in DB
            if(gamesInRoundIds.length > 0){     
                db.doc("rounds/"+round).set({
                    StartDate: startDate,
                    EndDate: endDate,
                    League: league,
                    Name: round,
                    GamesIds: gamesInRoundIds
                }).then(function() {        //clear the screen
                    $("#roundNumber").val('');
                    $("#gameDate").val('');
                    $("#gameTime").val('');
                    
                    $("#adminGamesList tbody").html("");
                    
                    gamesInRoundIds = [];       //clear games in round array
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            }
        }).catch(function(error) {
            console.error("Error writing document: ", error);
        });
        
    }
}

function addRoundRow(doc){      //add round to screen
    $("#createRound ul").append(
        "<li>round: "+doc.get("Name")+"</li>"
    );
}

//function to delete game from DB, screen and array of games in round
function adminDeleteGameRow(del, docId){
    //deleting document from db
    db.collection("games").doc(docId).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

    //delete game id from round array
    let index = gamesInRoundIds.indexOf(docId);
    if(index > -1){
        gamesInRoundIds.splice(index, 1);
    }
    
    //delete game from screen
    let tr = del.parentNode.parentNode;
    $(tr).remove();
}

//function to check data for new league
function chackCreateLeagueData(name, sport, state){
    console.log("name:"+name+"      sport:"+sport+"     state:"+state);
    if(name == ""){
        return false;
    }
    else if(sport == ""){
        return false;
    }
    else if(state == ""){
        return false;
    }
    else{
        return true;
    }
}

//function to delete league from data base and update the leagues table
function deleteLeagueRow(del){  
    let docName = del.parentNode.parentNode.firstChild.innerHTML; //geting leage name as writed at data base
    firebase.firestore().collection("leagues").doc(docName).delete().then(function() {//deleting document from db
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

    let tr = del.parentNode.parentNode;
    $(tr).remove(); 
}

//function to add row to league table
function addLeagueRow(doc){
    $("#leagues tbody").append(
        "<tr>"+
            "<td>"+doc.get("Name")+"</td>"+
            "<td>"+doc.get("Sport")+"</td>"+
            "<td>"+doc.get("State")+"</td>"+
            "<td><input type='button' value='Delete' onclick='deleteLeagueRow(this)'></td>"+
        "</tr>"
    );
}

//function to check data for new team
function chackCreateTeamData(name, sport, state, league){
    console.log("name:"+name+"      sport:"+sport+"     state:"+state+"     league:"+league);

    //checking if the league exists
    let leagueRef = firebase.firestore().collection("leagues");
    leagueRef.where("Name", "==", league).where("Sport", "==", sport).where("State", "==", state).get()
    .then(function(querySnapshot) {
        if(querySnapshot.size == 1){
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        }
        else if(querySnapshot.size > 1){
            console.log("more then one league have same name, sport and state");
            return false;
        }
        else{
            console.log("league not exist");
            return false;
        } 
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    //checking team name
    if(name == ""){
        return false;
    }
    else{
        return true;
    }
}

//adding row to team table
function addTeamRow(doc){
    $("#teams tbody").append(
        "<tr>"+
            "<td>"+doc.get("Name")+"</td>"+
            "<td>"+doc.get("Sport")+"</td>"+
            "<td>"+doc.get("State")+"</td>"+
            "<td>"+doc.get("League")+"</td>"+
            "<td><input type='button' value='Delete' onclick='deleteTeamRow(this)'></td>"+
        "</tr>"
    );
}

//function to delete teame from data base and update the team table
function deleteTeamRow(del){  
    let docName = del.parentNode.parentNode.firstChild.innerHTML; //geting teame name as writed at data base
    firebase.firestore().collection("leagues/Top League/teams").doc(docName).delete().then(function() {//deleting document from db
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

    let tr = del.parentNode.parentNode;
    $(tr).remove(); 
}