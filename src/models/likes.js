const mongoose = require('mongoose');


const likesSchema = new mongoose.Schema({
        img: {
                type: String,
                required: true,
                trim: true
        },
        loginid: { // user who liked this image
                type: String,
                required: true,
                trim: true

        }
});


// Authenticate the user
likesSchema.statics.findByUserLike = async (loginid,img) => {
    
    try {
        const like = await Likes.findOne({loginid,img});   

	   return like;
    } catch(e) {
        return(null);
    }
};


const Likes = mongoose.model('Likes',likesSchema);

module.exports = Likes;
