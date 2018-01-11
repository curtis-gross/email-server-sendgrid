/* 
git add server.js 
git commit -m "trimmed code"
git push heroku master 
    
    */

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');

console.log("begin startup");

server = http.createServer( function(req, res) {
	console.log("entered into server setup"); 
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');


    if (req.method == 'POST') {
        console.log("POST Received!");
        var body = '';
        req.on('data', function (data) {
            body += data;
        req.on('end', function () {
            console.log("Body: " + body);
        });
      
            const msg = {
			  to: body,
			  from: 'test-no-reply@ticly.com',
			  subject: 'Welcome to Ticly',
			  text: 'Welcome to Ticly, ' + body + ' we appreciate your signup.',
			  html: '<h3>Welcome to Ticly</h3>' + body + ' we appreciate your signup.',
			  type: 'text/plain',
			  value: 'heya!',
			  template_id: '2ec278d7-85c5-4329-9bf5-3fc5b27238e3'
			};
			console.log("about to send email");
			console.log(msg);
			console.log(body + ' successfully emailed');
			//attempt to send message and catch any errors if there is a failure
			sgMail.send(msg).catch(function () {
				console.log("Message Rejected");
			});
		console.log("Awaiting next email");
            
        });
        
	}
	
});
server.listen(process.env.PORT)
console.log('listening on Port ' + process.env.PORT);

//sendgrid template id : 1138a7de-83f3-40de-a95e-ded29e89cddd
//