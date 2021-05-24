const express = require('express');
const router = express.Router();
const Likes = require('../models/likes');
const auth = require('../middleware/auth');
const path = require('path');



router.get('/like/:img', auth, async (req, res) => {
// user likes a picture
// check if the user has a cookie
// check if the user exists
// check if user has already liked this picture
// if yes then dont do anything
// if no then add a new record and send the new count
    
    const img = req.params.img;
    const loginid = req.user.loginid;
    
    try {
        const like = await Likes.findByUserLike(loginid,img)
                
        if (!like) {
        // This user is liking this picture for the first time, so add an entry
            const like = new Likes({img, loginid}); 
            await like.save();
            const likes = await Likes.countDocuments({img}, (err, count) => {
                            return count;
            })
            res.send({likes});
        } else {          
            const likes = await Likes.countDocuments({img}, (err, count) => {
                            return count;
                        })
            res.status(360).send({likes}); // For some reason 209 status code is not going through
        }
        
    }  catch(e) {
        throw new Error('There was an error');        
    }   

})

router.get('/likes/:img', async (req,res) => {
    const img = req.params.img
    
    const likes = await Likes.countDocuments({img}, (err, count) => {
       
        return count;
    })
    res.send({likes});
})


module.exports = router;
