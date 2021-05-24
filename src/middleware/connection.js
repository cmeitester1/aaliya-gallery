const mongoose = require('mongoose');

const connection = (req,res,next) => {
	req.connection = mongoose.connection.readyState;
	// 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
	next();
};

module.exports = connection;
