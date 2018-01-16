/* 
My current process to deploy code to Heroku (auto spins up node server)
git add server.js 
git commit -m "trimmed code"
git push heroku master 
*/

const sgMail = require('@sendgrid/mail');
// This step requires setting up an environment variable with your sendgrid API key -> Heroku.  This code then looks for this environment variable to use when communicating with heroku. 
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Required node packages (node install xyz)
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');

// HTTP server to listen for inbound POST requests from Lytics Form
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
      // Sendgrid email configuration to send over to sendgrid.
            const msg = {
			  to: body,
			  from: 'test-no-reply@ticly.com',
			  subject: 'Welcome to Ticly',
			  text: 'Welcome to Ticly, ' + body + ' we appreciate your signup.',
			  html: '<h3>Welcome to Ticly</h3>' + body + ' we appreciate your signup.',
			  type: 'text/plain',
			  value: 'Ticly Welcome Email',
			  template_id: '2ec278d7-85c5-4329-9bf5-3fc5b27238e3'
			};
			// Little bit of terminal console output for debugging
			console.log("about to send email");
			console.log(msg);
			console.log(body + ' successfully emailed');
			//attempt to send message and catch any errors if there is a failure
			sgMail.send(msg).catch(function () {
				console.log("Message Rejected");
			});
		// if things failed or succeeded this message shows that the service is ready for the next attempt
		console.log("Awaiting next email");
            
        });
        
	}
	
});
// launch the server (with all the magic above)
server.listen(process.env.PORT)
console.log('listening on Port ' + process.env.PORT);