var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/smash");

app.use(express.static("static"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

function checkOutcome(outcome, rounds){
	if(outcome.length !== 3)
		return "error";
	var n1 = parseInt(outcome.charAt(0));
	var n2 = parseInt(outcome.charAt(2));
	if(isNaN(n1) || isNaN(n2) || outcome.charAt(1)!=='-')
		return "error";
	if((n1+n2) != rounds)
		return "error";
	return "correct"
}

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

app.get("/", function(req, res){
	Match.find({}, function(err, matches){
		if(err)
			console.log(err);
		else{
			var temp = matches.sort(function(a,b){
				return a.time - b.time;
			});
			temp.reverse();
			res.render("index.ejs", {matches:temp, time:new Date().getTime()});
		}
	});
});

app.get("/addmatch", function(req, res){
	res.render("addmatch.ejs", {error:0});
});

app.post("/addmatch", function(req, res){
	var p1 = req.body.p1;
	var p2 = req.body.p2;
	var rounds = req.body.rounds;
	var p1Char = req.body.p1Char;
	var p2Char = req.body.p2Char;
	var outcome = req.body.outcome;
	if(p1.length<1 || p2.length<1)
		res.send("<h1>Error: invalid tag</h1>");
	else if(p1 == p2)
		res.send("<h1>Error: cannot play yourself</h1>");
	else if(checkOutcome(outcome, rounds)==="error")
		res.send("<h1>Error: not a legal outcome</h1>");
	else{
		Match.create({
			p1: p1,
			p2: p2,
			rounds: rounds,
			p1Char: p1Char,
			p2Char: p2Char,
			outcome: outcome,
			time: new Date().getTime()
		}, function(err, match){
			if(err)
				console.log(err);
			else
				console.log(match);
		});
		res.redirect("/");
	}
});

app.listen(5000, function(){
	console.log("Running server on localhost:5000\nCTRL+C to stop");
});