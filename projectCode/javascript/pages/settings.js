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
					"<input type = 'text' id = 'Phone' placeholder = '+972 50-123-4567'/>"+
				"</div>"+
				"<div id = 'myPreferences'>"+
					"<div id = 'topPreferences'><h4>MY PREFERENCES</h4></div>"+
					"Push Reminder"+
					"<label class='switch'>"+
						"<input type='checkbox'>"+
						"<span class='slider round'></span>"+
					"</label></br>"+
					"Other Services"+
					"<label class='switch'>"+
						"<input type='checkbox'>"+
						"<span class='slider round'></span>"+
					"</label></br>"+
					"Premium Account"+
					"<label class='switch'>"+
						"<input type='checkbox'>"+
						"<span class='slider round'></span>"+
					"</label></br>"+
				"</div>"+
				"<div id = 'myMainMounntain'>"+
					"<div id = 'topMountain'><h4>MY MAIN MOUNTAIN</h4></div>"+
					"<button id = 'terms'>Terms & Conditions</button>"+
				"</div>"+
			"</form>"+
		"</div>"
	);
	
};