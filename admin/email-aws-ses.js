const nodemailer = require('nodemailer');
const ses = require('nodemailer-ses-transport');

const AWSKEY = process.env.AWSKEY;
const AWSSECRET = process.env.AWSSECRET;
const SENDEMAIL = process.env.SENDEMAIL;


const transport = nodemailer.createTransport(ses
	({
		accessKeyId: AWSKEY,
    		secretAccessKey: AWSSECRET,
		region: 'us-west-2'
}));

const mailOptions = {
	from: SENDEMAIL,
	to: "<sgupt9999@gmail.com>",
	subject: "New User",
	html: "<b>New User Registeration using SES<b>"
};

transport.sendMail(mailOptions);
	
