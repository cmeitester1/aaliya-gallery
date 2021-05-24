const common = require('../routers/common.js');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const md5 = require('md5');

const getCurrDateTime = common.getCurrDateTime;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true
    },
    firstname: {
        type: String,
        required: false,
        trim: true
    },
    lastname: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    loginid: {
        type: String,
        required: false,
        trim: true,
        unique: true,
        lowercase: true
    },
    hashcode: {
    // MD5 generated hash value based on loginid and email. This is filled in when the user
    // registers and once the user clicks on the email confirmation link, it should be 
    // set to zero
        type: String,
        required: false
    },
    passwordhashcode: {
    // bcrypt generated hash value based on loginid, email, current time and a random number. 
    //This is updated whenever a user wants to change their password
        type: String,
        required: false
    },
    password: {
        type: String,
        trim: true
    },
    school: {
        type: String,
        trim: true
    },
    grade: {
        type: String,
        trim: true
    },
    teacherfirstname: {
        type: String,
        trim: true
    },
    teacherlastname: {
        type: String,
        trim: true
    },
    teacheremail: {
        type: String,
        trim: true,
        lowercase: true
    },
    artist: {
        type: Boolean // If registered as an artist, then this is true
    },
    imagesAllowed: { // Maximum Number of images this artist can upload
        type: Number,
        default: 5
    },
    imagesUploaded: { // Number of images this artist has currently uploaded. This goes down if a user deletes an image
        type: Number, 
        default: 0
    },
    imagesIndex: { // Index of the last image this artist uploaded. This is used to create S3 bucket key. This never goes down and gets incremented by one whenever a new image is uploaded
        type: Number,
        default: 0
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
		}]
});

userSchema.plugin(uniqueValidator); // This is needed to check the uniqueness property of a field



userSchema.methods.generateAuthToken = async function () {
    // Generate a new token and add it to the tokens array on the object
    try {
        const user = this;
        const token = jwt.sign({
            _id: user._id.toString()
        }, 'HelloWorld', {
            expiresIn: 60 * 60 * 24
        }); // expires in 24 hours
        user.tokens = user.tokens.concat({
            token
        });
        await user.save();
        return token;
    } catch (e) {
        console.log(e);
    }
};

userSchema.methods.generateHashCode = async function () {
    // Generate a new hashcode and add it to the user instance
    try {
        const user = this;
        user.hashcode = md5(user.loginid + user.email + Math.floor(Math.random() * 50000));
        // Create a hash value using the loginid, email and a random number b/w 0 amd 50000
        await user.save();
    } catch (e) {
        console.log(e);
    }
};

userSchema.methods.generatePasswordResetHashCode = async function () {
// Generate a new hashcode when user wants to reset their password and add it to the user instance
    try {
        const user = this;
        user.passwordhashcode = md5(user.loginid + user.email + Date.now() + Math.floor(Math.random() * 50000));
        // Create a hash value using the loginid, email, current time and a random number b/w 0 amd 50000
        await user.save();
    } catch (e) {
        console.log(e);
    }
};


userSchema.methods.toJSON = function () {
// We dont want to expose password and tokens when we send the user data back to the client
// This method(toJSON) is called whenever stringify is called on the object and stringify is
// called whenever we do res.send
    const user = this;
    const userObject = user.toObject(); // This method is provided by mongoose to remove some metadata and properties can be deleted from the object

    delete userObject.password;
    delete userObject.tokens;
    /* Need both these fields for the message form
    delete userObject.name;
    delete userObject.email;
    */

    return userObject;
};

// Authenticate the user based on email and password
userSchema.statics.findByCredentials = async(email, password) => {

    try {
        const user = await User.findOne({email});
        
        if (!user) {
            console.log('#########################################################');
            console.log(getCurrDateTime());
            console.log(`##### User email - ${email} not found during login #####`);
            console.log('#########################################################');
            return undefined;
        };

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('#########################################################');
            console.log(getCurrDateTime());
            console.log(`##### User password for - ${email} doesn't match during login #####`);
            console.log('#########################################################');
            return undefined;       
        }
        return user;
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

userSchema.statics.findByLoginId = async(loginid) => {
    // Find user by loginid

    try {
        const user = await User.findOne({
            loginid
        });

        if (!user) {
            console.log('Loginid not found in db');
        };
        return user;
    } catch (e) {
        console.log(e);
    }
};

userSchema.statics.findByEmail = async(email) => {
    // Find user by email

    try {
        const user = await User.findOne({
            email
        });

        if (!user) {
            console.log('Email not found in db');
        };
        return user;
    } catch (e) {
        console.log(e);
    }
};

userSchema.statics.findByHashCode = async(hashcode) => {
    // Find the user by hashcode
    try {
        const user = await User.findOne({
            hashcode
        });
        if (!user) {
            throw new Error('Cannot find the user');
        }
        return user;
    } catch (e) {
        console.log(e);
    }
};

userSchema.statics.findByPasswordHashCode = async(passwordhashcode) => {
    // Find the user by hashcode
    try {
        const user = await User.findOne({
            passwordhashcode
        });
        if (!user) {
            console.log('User not found in password reset')
            return undefined;
        }
        return user;
    } catch (e) {
        console.log(e);
    }
};

userSchema.pre('save', async function (next) {
    // Hash the plain text password before saving
    try {
        const user = this;

        if (user.isModified('password')) {
            // This will be true when the user is first created and then again if the password is being changed
            user.password = await bcrypt.hash(user.password, 8);
        }
    } catch (e) {
        console.log(e)
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
