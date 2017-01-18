$(".match").each(function(){
	var p1 = $(this).find("#p1");
	var p2 = $(this).find("#p2");
	var outcome = $(this).find("#outcome");
	if(outcome.text().charAt(0) > outcome.text().charAt(2)){
		p1.css("font-weight", "bold");
	}
	else{
		p2.css("font-weight", "bold");
	}
});

var query = "";

function getMatches(){
	if(query==""){
		$(".match").css("display", "block");
		return;	
	}
	else{
		$(".match").css("display", "none");
		$(".match").each(function(){
			var p1 = $(this).find("#p1").text().toLowerCase();
			var p2 = $(this).find("#p2").text().toLowerCase();
			var p1Char = $(this).find("#p1Char").attr("src").toLowerCase();
			var p2Char = $(this).find("#p2Char").attr("src").toLowerCase();
			var qChar = "characters/" + query.toLowerCase() + ".png";
			if(p1.includes(query.toLowerCase()) || p2.includes(query.toLowerCase())){
				$(this).css("display", "block");
			}
			else if(p1Char == qChar  || p2Char == qChar){
				$(this).css("display", "block");
			}
		});
	}
}

$("#submit").on("click", function(e){
	e.preventDefault();
	query=$("input:text").val();
	getMatches();
});

$("#reset").on("click", function(e){
	e.preventDefault();
	$("input:text").val("");
	query="";
	getMatches();
});