const jwt = require('jsonwebtoken');
const User = require('../models/user');



const auth = async (req,res,next) => {    

	try {     
		const token = req.cookies['auth_token'] // token being sent by the client
		const decoded = jwt.verify(token,'HelloWorld'); // token decoded to get the payload 
		const user = await User.findOne({_id: decoded._id, 'tokens.token': token});
		// Find the user with that id and also the token that is sent by the client is one of the tokens stored

		if (!user) {             
			throw new Error() // This will run the below catch statement
		}
		req.token = token;
		req.user = user; // A new property is being added to the req object so the route handler doesnt have to retrieve the user again
		next();
	} catch (e) {        
		res.status(401).send({error: 'Please authenticate'});
	}
};

module.exports = auth;
