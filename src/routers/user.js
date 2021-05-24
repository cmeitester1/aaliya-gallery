const common = require('./common');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const connection = require('../middleware/connection');
const path = require('path');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const sgMail = require('@sendgrid/mail');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');



const sendgridAPIKEY = process.env.SENDGRIDAPIKEY;
const portHTTPS = process.env.AALIYAPORTHTTPS || 3000;
const host = process.env.AALIYAHOST || 'localhost';
const AWSSMTPHOST = process.env.AWSSMTPHOST
const AWSSMTPUSER = process.env.AWSSMTPUSER;
const AWSSMTPPASS = process.env.AWSSMTPPASS;
const SENDEMAIL = process.env.SENDEMAIL;


const exec = require('child_process').exec;
const cmdToLaunch = "nohup /home/user/mongodb/bin/mongod --dbpath=/home/user/mongodb-data &";

const execCB = (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
}

const getCurrDateTime = common.getCurrDateTime;

router.post('/users', connection, async(req, res) => {
    // Register a new user  

    /* Taking this out for right now. Check if the mongodb is down and then restart it
    if (req.connection !== 1) {
        console.log('DB connection not working in /users')
        const app = exec(cmdToLaunch, execCB);
        mongoose.connect('mongodb://127.0.0.1:27017/aaliya-art-api',{
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).then((data) => {
            console.log('Mongoose reconnection successful');
        }).catch((error) => {
            console.log('Mongoose unable to reconnect');
        })
    }
    */



    if (!req.body.loginid) {
    //If registering as a browser, loginid is not used in registration, but is still used in likes
        req.body.loginid = req.body.email + '-' + Date.now()
    }

    //DEBUG
    console.log(req.body);
    //DEBUG
    const user = new User(req.body);

    try {
        await user.save()
        await user.generateHashCode();

        // Send a confirmation email to the new user, and a new user joining email to admin

        /* Sending email using sendgrid
        sgMail.setApiKey(sendgridAPIKEY);
        sgMail.send({
            to: user.email,
            from: 'aaliyagallery@gmail.com',
            subject: 'aaliya-gallery login confirmation',
            text: `Please click on following link to login https://${host}.com:${portHTTPS}?code=${user.hashcode}`
        })
        sgMail.send({
                to: 'aaliyagallery@gmail.com',
                from: 'aaliyagallery@gmail.com',
                subject: 'New User Account Created',
                text: `Name: ${user.name}, Email: ${user.email}, Loginid: ${user.loginid}`
            })
	*/


        const transport = nodemailer.createTransport({
            "host": AWSSMTPHOST,
            "secureConnection": true,
            "port": 465,
            "auth": {
                "user": AWSSMTPUSER,
                "pass": AWSSMTPPASS
            }
        });

        const mailOptions = {
            from: SENDEMAIL,
            to: user.email,
            subject: "aaliya-gallery login confirmation",
            html: `Please click on following link or open in a new tab to complete registration<br><br>https://${host}.com:${portHTTPS}?code=${user.hashcode}`
        };

        transport.sendMail(mailOptions, function (err, response) {
            if (err) {
                console.log('##### Registration email not sent #####');
                console.log(getCurrDateTime());
                console.log(err);
                console.log('##### Registration email not sent #####');
                transport.close();
            } else {
                console.log('##### Registration email sent #####');
                console.log(getCurrDateTime());
                console.log(response);
                console.log('##### Registration email sent #####');
                transport.close();
            }
        });

        const mailOptions2 = {
            from: SENDEMAIL,
            to: SENDEMAIL,
            subject: "New User Account Created",
            html: `Name: ${user.firstname} ${user.lastname} Email: ${user.email}, Loginid: ${user.loginid}`
        };

        transport.sendMail(mailOptions2, function (err, response) {
            if (err) {
                console.log('##### Registration email not sent to admin account #####');
                console.log(getCurrDateTime());
                console.log(err);
                console.log('##### Registration email not sent to admin account #####');
                transport.close();
            } else {
                console.log('##### Registration email sent to admin account #####');
                console.log(getCurrDateTime());
                console.log(response);
                console.log('##### Registration email sent to admin account #####');
                transport.close();
            }
        });

        res.status(201).send(); // The 201 is most route appropriate status code for a successful creation
    } catch (e) {

        //DEBUG
        //console.log(e)
        //DEBUG

        // All these errors happen when the save is run        
        const keys = Object.keys(e.errors);
        let status = 400;
        if (keys[0] === 'email' && e.errors[keys[0]].message.includes('unique')) {
            // Check if an existing account doesn't use the same email
            status = 352
        } else if (keys[0] === 'loginid' && e.errors[keys[0]].message.includes('unique')) {
            // check if an existing account doesn't use the same loginid
            status = 351
        }
        res.status(status).send(e.errors[keys[0]].message); // To send a non-standard status code
    }
});


router.post('/users/login', async(req, res) => {
// Check to see a user exists
// If user exists then check if hashcode has a non-zero value. If it does then that means the user hasn't confirmed the registration via email and should not be able to login    
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        if (!user) {
            res.status(404).send();
        } else if (user.hashcode === '0') {
          // means the user has clicked on the confirmation email
            const token = await user.generateAuthToken();
            // Note this method is on instance user and not the model User
            res.cookie('auth_token', token);
            /*res.sendFile(path.resolve(__dirname, '..', 'views', 'private.html'));*/
            res.status(200).send({
                user,
                token
            });
        } else {
            res.status(350).send(user);
        }
    } catch (e) {
        res.status(400).send({e});
    }
});

router.post('/users/reset-password-email', async(req, res) => {
    //Check if the email exists in the db. If the email exists then send a link to reset the password
    try {
        const user = await User.findByEmail(req.body.email);
        if (user) {
            console.log('Password reset user found');
            await user.generatePasswordResetHashCode();
            // Send a password reset link to the user

            /* Sending email using sendgrid
 	     sgMail.setApiKey(sendgridAPIKEY);
	     sgMail.send({
	     	to: user.email,
	     	from: 'aaliyagallery@gmail.com',
	        subject: 'aaliya-gallery password reset',
	     	text: `You recently requested that your aaliya-gallery password be reset.

To reset your password, click on the following link https://${host}.com:${portHTTPS}/reset-password.html?code=${user.passwordhashcode}`
            })
	    */
            const transport = nodemailer.createTransport({
                "host": AWSSMTPHOST,
                "secureConnection": true,
                "port": 465,
                "auth": {
                    "user": AWSSMTPUSER,
                    "pass": AWSSMTPPASS
                }
            });

            const mailOptions = {
                from: SENDEMAIL,
                to: user.email,
                subject: "aaliya-gallery password reset",
                html: `You recently requested that your aaliya-gallery password be reset.<br><br><br>
				To reset your password, click on the following link https://${host}.com:${portHTTPS}/reset-password.html?code=${user.passwordhashcode}`
            };

            transport.sendMail(mailOptions, function (err, response) {
                if (err) {
                    console.log('##### Password reset link not sent #####');
                    console.log(getCurrDateTime());
                    console.log(err);
                    console.log('##### Password reset link not sent #####');
                    transport.close();
                } else {
                    console.log('##### Password reset link sent #####');
                    console.log(getCurrDateTime());
                    console.log(response);
                    console.log('##### Password reset link sent #####');
                    transport.close();
                }
            });

        } else {
            console.log('Password reset user not found');
        }
        res.status(200).send();
    } catch (e) {
        console.log(e);
    }
})


router.post('/users/reset-password', async(req, res) => {
    //Get the user based on password hash code and then update the password
    try {
        const user = await User.findByPasswordHashCode(req.body.passwordhashcode);
        if (user) {
            user.password = req.body.password;
            await user.save()
        } else {
            console.log('Password reset user not found');
        }
        res.status(200).send();
    } catch (e) {
        console.log(e);
    }
})

router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
                // Take out the token that the client is sending from the tokens stored by the user document
        });
        await req.user.save();
        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
});

/* Sending email using sendgrid
router.post('/users/message', async(req, res) => {
    try {
        sgMail.setApiKey(sendgridAPIKEY);
        sgMail.send({
            to: 'aaliyagallery@gmail.com',
            from: 'aaliyagallery@gmail.com',
            subject: 'New Message',
            text: `${req.body.name} sent message - ${req.body.content} from ${req.body.email}`
        })
        res.status(200).send();
    } catch (e) {
        res.status(500).send(e);
    }
});
*/

router.post('/users/message', (req, res) => {

    const transport = nodemailer.createTransport({
        "host": AWSSMTPHOST,
        "secureConnection": true,
        "port": 465,
        "auth": {
            "user": AWSSMTPUSER,
            "pass": AWSSMTPPASS
        }
    });

    const mailOptions = {
        from: SENDEMAIL,
        to: SENDEMAIL,
        subject: "NEW MESSAGE",
        html: `${req.body.name} sent message<br><br>${req.body.content}<br><br>from ${req.body.email}`
    };

    transport.sendMail(mailOptions, function (err, response) {
        if (err) {
            console.log('##### Message not sent #####');
            console.log(getCurrDateTime());
            console.log(err);
            console.log('##### Message not sent #####');
            transport.close();
            res.status(500).send();
        } else {
            console.log('##### Message sent #####');
            console.log(getCurrDateTime());
            console.log(response);
            console.log('##### Message sent #####');
            transport.close();
            res.status(200).send();
        }
    });

});



router.get('/users/confirm/:code', async(req, res) => {
    // This route is called when the user clicks on the registration confirmation email. This should only be called once for a new user. The hashcode is changed to zero once the user is found successfully
    const hashcode = req.params.code;
    try {
        const user = await User.findByHashCode(hashcode);

        user.hashcode = 0; // The user is saved in generateAuthToken
        const token = await user.generateAuthToken();

        res.cookie('auth_token', token);
        res.send();

        // This endpoint should just send the cookie and then the page gets redirected to home page
        // which will get the user information based on the cokkie 
        // res.send(user);
    } catch (e) {
        res.status(400).send();
    }
})

router.get('/users/info/email/:email', async(req, res) => {
// This route is uased to check if an email already exists in the system
    const email = req.params.email;
    try {
        const user = await User.findByEmail(email);
        if (user) {
            res.status(200).send();
        } else {
            res.status(204).send();
            // This code is for not found and is not really an error
            // This status code will prevent it from showing up in chrome devtools
        }
    } catch (e) {
        res.status(404).send();
    }
})

router.get('/users/info/loginid/:loginid', async(req, res) => {
// This route is used to check if a login id already exists in the system
    const loginid = req.params.loginid;
    try {
        const user = await User.findByLoginId(loginid);
        if (user) {
            res.status(200).send();
        } else {
            res.status(204).send();
            // This code is for not found and is not really an error
            // This status code will prevent it from showing up in chrome devtools
        }
    } catch (e) {
        res.status(404).send();
    }
})

router.get('/users/info/passwordhashcode/:passwordhashcode', async(req, res) => {
    // This route is used to check if a passwordhashcode already exists in the system
    const passwordhashcode = req.params.passwordhashcode;
    try {
        const user = await User.findByPasswordHashCode(passwordhashcode);
        if (user) {
            res.status(200).send();
        } else {
            res.status(204).send();
            // This code is for not found and is not really an error
            // This status code will prevent it from showing up in chrome devtools
        }
    } catch (e) {
        res.status(404).send();
    }
})


router.get('/users/info', auth, async(req, res) => {
//This route is called when fetching user information based on the cookie
//If a user is found then the information can be used to fill out forms or show messages
    try {
        const user = req.user;
        res.status(200).send(user);
    } catch (e) {
        res.status(401).send(e);
    }
})

router.post('/users/resend/email', async(req, res) => {
    // This route is used to resend the confirmation email based on the 
    // email. 
    try {
        const user = await User.findByEmail(req.body.email);

        if (user) {

            /* Sending email using sendgrid 
        sgMail.setApiKey(sendgridAPIKEY);
        sgMail.send({
            to: user.email,
            from: 'aaliyagallery@gmail.com',
            subject: 'aaliya-art login confirmation',
            text: `Please click on following link to login https://${host}.com:${portHTTPS}?code=${user.hashcode}`
        })
        sgMail.send({
                to: 'aaliyagallery@gmail.com',
                from: 'aaliyagallery@gmail.com',
                subject: 'New User Account Created',
                text: `Name: ${user.name}, Email: ${user.email}, Loginid: ${user.loginid}`
            })
	*/


            const transport = nodemailer.createTransport({
                "host": AWSSMTPHOST,
                "secureConnection": true,
                "port": 465,
                "auth": {
                    "user": AWSSMTPUSER,
                    "pass": AWSSMTPPASS
                }
            });

            const mailOptions = {
                from: SENDEMAIL,
                to: user.email,
                subject: "aaliya-gallery login confirmation",
                html: `Please click on following link or open in a new tab to complete registration<br><br>https://${host}.com:${portHTTPS}?code=${user.hashcode}`
            };

            transport.sendMail(mailOptions, function (err, response) {
                if (err) {
                    console.log('##### Registration email not sent #####');
                    console.log(getCurrDateTime());
                    console.log(err);
                    console.log('##### Registration email not sent #####');
                    transport.close();
                } else {
                    console.log('##### Registration email sent #####');
                    console.log(getCurrDateTime());
                    console.log(response);
                    console.log('##### Registration email sent #####');
                    transport.close();
                }
            });


            const mailOptions2 = {
                from: SENDEMAIL,
                to: SENDEMAIL,
                subject: "New User Account Created",
                html: `Name: ${user.firstname} ${user.lastname} Email: ${user.email}, Loginid: ${user.loginid}`
            };

            transport.sendMail(mailOptions2, function (err, response) {
                if (err) {
                    console.log('##### Registration email not sent to admin account #####');
                    console.log(getCurrDateTime());
                    console.log(err);
                    console.log('##### Registration email not sent to admin account #####');
                    transport.close();
                } else {
                    console.log('##### Registration email sent to admin account #####');
                    console.log(getCurrDateTime());
                    console.log(response);
                    console.log('##### Registration email sent to admin account #####');
                    transport.close();
                }
            });


        }
        // Send a confirmation email to the new user, and a new user joining email to admin
        res.send(); // 
    } catch {
        res.status(401).send();
    }


})

module.exports = router;
