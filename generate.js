var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/smash");

var matchSchema = new mongoose.Schema({
	p1: String,
	p2: String,
	rounds: Number,
	p1Char: String,
	p2Char: String,
	outcome: String,
	time: Number
});

var Match = mongoose.model("Match", matchSchema);

var startTime = new Date().getTime();

function randomName(){
	var names = [
		"Box Ghost",
		"PudgyPanda",
		"Kerblaster",
		"Jordank",
		"Tim (Counter)",
		"Sushi",
		"Roid",
		"Abiding Truth",
		"Krol",
		"IHWP",
		"WDTFS",
		"Mang0",
		"PPMD",
		"Armada",
		"Leffen",
		"Hungry Box",
		"Mew2King",
		"Baddie",
		"Pools Scrub",
		"Sakurai",
		"Some Random"
	];
	var rand = Math.floor(Math.random() * names.length);
	return names[rand];
}

function randomChar(){
	var char = "";
	var rand = Math.floor((Math.random() * 26) + 1);
	switch(rand){
		case 1: char+="bowser"; break;
		case 2: char+="captain falcon"; break;
		case 3: char+="doctor mario"; break;
		case 4: char+="donkey kong"; break;
		case 5: char+="falco"; break;
		case 6: char+="fox"; break;
		case 7: char+="ganondorf"; break;
		case 8: char+="ice climbers"; break;
		case 9: char+="jigglypuff"; break;
		case 10: char+="kirby"; break;
		case 11: char+="link"; break;
		case 12: char+="luigi"; break;
		case 13: char+="mario"; break;
		case 14: char+="marth"; break;
		case 15: char+="mewtwo"; break;
		case 16: char+="mr. game & watch"; break;
		case 17: char+="ness"; break;
		case 18: char+="peach"; break;
		case 19: char+="pichu"; break;
		case 20: char+="pikachu"; break;
		case 21: char+="roy"; break;
		case 22: char+="samus"; break;
		case 23: char+="sheik"; break;
		case 24: char+="yoshi"; break;
		case 25: char+="young link"; break;
		case 26: char+="zelda"; break;
	}
	char+="";
	return char;
}

function chooseRounds(){
	var rand = Math.floor((Math.random() * 5) + 1);
	switch(rand){
		case 1: return 1;
		case 2: return 3;
		case 3: return 5;
		case 4: return 7;
		case 5: return 9;
	}
}

function genOutcome(rounds){
	var outcome;
	var win1 = 0;
	var win2 = 0;
	for (var i = 0; i < rounds; i++) {
		var rand = Math.floor((Math.random() * 2) + 1);
		if(rand == 1)
			win1++;
		else
			win2++;
	}
	outcome = win1.toString() + "-" + win2.toString();
	return outcome;
}

function randomTime(){
	var timeSinceFiveYearsAgo = 5*365*24*60*60*1000;
	return startTime - Math.floor(Math.random() * timeSinceFiveYearsAgo);
}

var matches = [];

for (var i = 0; i < 100; i++) {
	var rounds = chooseRounds();
	var name1 = randomName();
	var name2 = randomName();
	while(name1 == name2){
		name2 = randomName();
	}
	matches.push({
		p1: name1,
		p2: name2,
		rounds: rounds,
		p1Char: randomChar(),
		p2Char: randomChar(),
		outcome: genOutcome(rounds),
		time: randomTime()
	});
}

matches.sort(function(a, b){
	return a.time - b.time;
});

matches.forEach(function(m){
	Match.create(m, function(err, match){
		if(err)
			console.log(err);
	});
});