let settings = function($container){
	$container.html(		//addint html and a back botton
		"<div id = 'settings'>"+
			"<header><h3>Profile Settings</h3></header>"+
			"<form>"+
				"<div id = 'myProfile'>"+
					"<div id = 'topProfile'><h4>MY PROFILE</h4></div>"+
					"<label for = 'username'>Username:</label>"+
					"<input type = 'text' id = 'username' placeholder = 'user name'/></br>"+
					"<label for = 'nickname'>Nickname:</label>"+
					"<input type = 'text' id = 'nickname' placeholder = 'nickname'/></br>"+
					"<label for = 'birth'>Date of Birth:</label>"+
					"<input type = 'date' id = 'birth'/></br>"+
					"<label for = 'email'>Email Address:</label>"+
					"<input type = 'email' id = 'email' placeholder = 'blabla@mail.com'/></br>"+
					"<label for = 'phone'>Phone Number:</label>"+
					"<input type = 'text' id = 'phone' placeholder = '+972 50-123-4567'/>"+
				"</div>"+
				"<div id = 'myPreferences'>"+
					"<div id = 'topPreferences'><h4>MY PREFERENCES</h4></div>"+
					"Push Reminder"+
					"<label class='switch'>"+
						"<input type='checkbox' id = 'push'>"+
						"<span class='slider round'></span>"+
					"</label></br>"+
					"Other Services"+
					"<label class='switch'>"+
						"<input type='checkbox' id = 'services'>"+
						"<span class='slider round'></span>"+
					"</label></br>"+
					"Premium Account"+
					"<label class='switch'>"+
						"<input type='checkbox' id = 'premium'>"+
						"<span class='slider round'></span>"+
					"</label></br>"+
				"</div>"+
				"<div id = 'myMainMounntain'>"+
					"<div id = 'topMountain'><h4>MY MAIN MOUNTAIN</h4></div>"+
					"<button id = 'terms' onclick = 'settingsTermsAndConditions($(\"#settings\"))'>Terms & Conditions</button>"+
				"</div></p>"+
				"<button id = 'saveChanges' onclick = 'saveData()'>Save Changes</button>"+
			"</form>"+
		"</div>"
	);
	getData();
	
};

function getData(){
	const currentUser = firebase.auth().currentUser;
	const userDocRef = db.doc("users/"+currentUser.uid);

	userDocRef.get().then(function(doc){
		if(doc.exists){
			if(doc.get('Name') != ""){
				$("#username").val(doc.get('Name'));
			}
			if(doc.get('Nickname') != ""){
				$("#nickname").val(doc.get('Nickname'));
			}

			var date = doc.get('DateOfBirth').toDate();
			var year = date.getFullYear();
			var month;
			var day;
			if(date.getMonth() < 9){
				month = "0"+(date.getMonth()+1);
			}
			else{
				month = (date.getMonth()+1);
			}
			if(date.getDate() < 10){
				day = "0"+date.getDate();
			}
			else{
				day = date.getDate();
			}

			if(year != 2010 || month != 12 || day != 10){
				$("#birth").attr("value", year+"-"+month+"-"+day);
			}

			if(doc.get('Email') != ""){
				$("#email").val(doc.get('Email'));
			}
			if(doc.get('Phone') != ""){
				$("#phone").val(doc.get('Phone'));
			}
		}
		else{
			console.log("No such document!");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});
	

	const userPreferencesRef = db.doc("users/"+currentUser.uid+"/userData/Preferences");
	
	userPreferencesRef.get().then(function(doc){
		if(doc.exists){
			$("#push").prop("checked", doc.get("PushReminder"));
			$("#services").prop("checked", doc.get("OtherServices"));
			$("#premium").prop("checked", doc.get("PremiumAccount"));
			
		}
		else{
			console.log("No such document!");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});
}

function saveData(){
	const currentUser = firebase.auth().currentUser;
	const userDocRef = db.doc("users/"+currentUser.uid);
	userDocRef.get().then(function(doc){
		if(doc.exists){
			if(doc.get('Name') != $("#username").val()){
				userDocRef.update({
					Name: $("#username").val()
				});
			}
			if(doc.get('Email') != $("#email").val()){
				currentUser.updateEmail($("#email").val()).then(function(){
					userDocRef.update({
						Email: $("#email").val()
					});
				}).catch(function(error){
					console.log(error);
				})
				
			}
			if(doc.get('Nickname') != $("#nickname").val()){
				userDocRef.update({
					Nickname: $("#nickname").val()
				});
			}
			if(doc.get('Phone') != $("#phone").val()){
				userDocRef.update({
					Phone: $("#phone").val()
				});
			}

			var date = doc.get('DateOfBirth').toDate();
			var day = date.getDate();
			var year = date.getFullYear();
			var month;
			if(date.getMonth() < 9){
				month = "0"+(date.getMonth()+1);
			}
			else{
				month = (date.getMonth()+1);
			}

			if($("#birth").val() != ""){
				var newDate = new Date($("#birth").val());
				if(year != newDate.getFullYear() || month != newDate.getMonth()+1 || day != newDate.getDate()){
					
					userDocRef.update({
						DateOfBirth: newDate
					});
				}
			}
		}
		else{
			console.log("No such document!");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});

	const userPreferencesRef = db.doc("users/"+currentUser.uid+"/userData/Preferences");
	
	userPreferencesRef.get().then(function(doc){
		if(doc.exists){
			if($("#push").prop("checked") != doc.get("PushReminder")){
				userPreferencesRef.update({
					PushReminder: $("#push").prop("checked")
				}).then(function() {
					console.log("Document successfully updated!");
				})
				.catch(function(error) {
					// The document probably doesn't exist.
					console.error("Error updating document: ", error);
				});
			}
			if($("#services").prop("checked") != doc.get("OtherServices")){
				userPreferencesRef.update({
					OtherServices: $("#services").prop("checked")
				}).then(function() {
					console.log("Document successfully updated!");
				})
				.catch(function(error) {
					// The document probably doesn't exist.
					console.error("Error updating document: ", error);
				});
			}
			if($("#premium").prop("checked") != doc.get("PremiumAccount")){
				userPreferencesRef.update({
					PremiumAccount: $("#premium").prop("checked")
				}).then(function() {
					console.log("Document successfully updated!");
				})
				.catch(function(error) {
					// The document probably doesn't exist.
					console.error("Error updating document: ", error);
				});
			}
		}
		else{
			console.log("No such document!");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});
}

function settingsTermsAndConditions($container){
	$container.html(
		"<div id = 'termsAndCon'></p>terms</p>"+
		"<div id = 'justTerms'></div></p>conditions</p>"+
		"<div id = 'justCon'></div></p>"+
		"<button onclick = 'settings($(\"#home\"))'>back</button>"+
	"</div>"
	);

	db.doc("terms/Terms").get().then(function(doc){
		if(doc.exists){
			$("#justTerms").text(doc.get('Terms'));
			$("#justCon").text(doc.get('conditions'));
		}
		else{
			console.log("No such document!");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});
}

