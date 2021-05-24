const nodemailer = require('nodemailer');

const AWSSMTPHOST = process.env.AWSSMTPHOST;
const AWSSMTPUSER = process.env.AWSSMTPUSER;
const AWSSMTPPASS = process.env.AWSSMTPPASS;
const SENDEMAIL = process.env.SENDEMAIL;

const transport = nodemailer.createTransport(
	{
		"host": AWSSMTPHOST,
		"secureConnection": true,
		"port": 465,
		"auth": {
			"user": AWSSMTPUSER,
			"pass": AWSSMTPPASS
		}
	}
);

const mailOptions = {
	from: SENDEMAIL,
	//to: "<sgupt9999@gmail.com>",
	to: "<sancvcvcvcvcvvcvcvcvcvcvcvcjaygupta100@yahoo.com>",
	subject: "New User",
	html: "<b>New User Registeration using SMTP<b>"
};

transport.sendMail(mailOptions, function(err,response) {
	if (err) {
		console.log(err);
	}
	else {
		console.log(response);
		console.log("Message sent: " + response.message);
	}

	transport.close();
});
	
