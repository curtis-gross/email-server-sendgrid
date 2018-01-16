# email-server-sendgrid
This is a NodeJS server which listens for POST requests and sends an email via Sendgrid.  
For use with a website using Lytics / Pathfora
Example Website JS Code:

```
<script type="text/javascript"> 

	var module = new pathfora.Form({
  	id: 'form-modal',
  	layout: 'modal',
 	headline: 'Sign Up!',
 	msg: 'Submit this form to get updates',
 	 displayConditions: {
			showDelay:2
			},

	 formElements: [{
      'type': 'email',
      'name': 'email',
      'label': 'Your Email',
      'placeholder': 'Your Email',
      'required': true
    }],
   // If the form is properly filled out, grab the user's email and send it to the NodeJS app running in Heroku to send an email via Sendgrid.
   confirmAction: {
    name: 'custom confirm',
    callback: function (event, payload) {
     var user_email = payload.data[0].value;  
		 $.ajax({
	  type: "POST",
	  // Use this URL if your app is deployed in Heroku and running
	  url: 'https://afternoon-citadel-94305.herokuapp.com',
	  // swap to the following URL for local testing.
	  //url: 'http://localhost:5000',
	  data: user_email,
	  //success: success,
	  dataType: 'json'
		});
    }
  }	
	});
	pathfora.initializeWidgets([module]);
</script>
```
