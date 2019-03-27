//main modul of the app
let KOTH = function(){
	
	let initModule = function($container){
				
		loadSplash($container);// callin to splash screen
		//home($("#primary"))
	};
	
	return{initModule : initModule};
}();

$(document).ready(
	function(){
		KOTH.initModule($("#primary"));
	}
);