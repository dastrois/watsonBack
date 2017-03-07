var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var fs = require("fs");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Content-Type");
	  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	  next();
});

app.post('/message/:id', function(req, res){
	fs.readFile(__dirname + "/" + "messages.json", "utf8", function(err, data) {
		messages = JSON.parse(data);
		var message = messages[req.params.id]
		console.log(message);
		res.end(JSON.stringify(message));
	});
})

app.post('/messages', function(req, res){
	
	var question = req.body;
	console.log("Quest " + question);
	
	words = question.question.split(" ");
	console.log("Words" + words);
	
	var message = null;
	fs.readFile(__dirname + "/" + "messages.json", "utf8", function(err, data) {
		messages = JSON.parse(data);
		for (var i in words){
			w = words[i];
			console.log("W " + w);
			var w1 = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
			console.log("W1" + w1);
			if (messages[w1]){
				message = messages[w1];
				console.log("w1 " + w1 + message);
			}
		}
		
		if (! message){
			message = {
					"message" : "je ne peux répondre, voulez-vous prendre contact avec votre agent ?",
					"reponses" : 
									[  {"label" : "Oui", "code" :"deuxYes"},
						                {"label" : "Non", "code" :"deuxNo"}
						            ]
					}
		}
		console.log("Mess" + message);
		res.end(JSON.stringify(message));
	});

	//res.end(JSON.stringify(message));
})



app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
})

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.send('Hello GET');
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})