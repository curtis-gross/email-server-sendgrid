const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');


server = http.createServer( function(req, res) {
	 res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware

    console.dir(req.param);

    if (req.method == 'POST') {
        console.log("POST");
        var body = '';
        req.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);
            
            const msg = {
			  to: body,
			  from: 'noreply@lytics.com',
			  subject: 'Welcome to Ticly',
			  text: 'Welcome to Ticly, ' + body + ' we appreciate your signup.',
			  html: '<h3>Welcome to Ticly</h3>' + body + ' we appreciate your signup.'
			};
			console.log(msg);
			console.log(body + ' successfully emailed');
			//attempt to send message and catch any errors if there is a failure
			sgMail.send(msg).catch(function () {
				console.log("Message Rejected");
			});
		console.log("Awaiting next email");
            
        });
       
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('post received');
        
	}

});

port = 3000;
host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);