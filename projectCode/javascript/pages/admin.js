let admin = function($container){
    $container.html(
        "<div id = 'admin'>"+
            "<h1>Admin</h1>"+
            "<form>"+
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
                "</div></p>"+
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