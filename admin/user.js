const mongoose = require('../src/db/mongoose');
const Likes = require('../src/models/likes');
const Users = require('../src/models/user');


const updateImageNames = async (oldImage, newImage) => {
	const res1 = await Likes.updateMany({ img: oldImage }, {img: newImage});
	console.log(oldImage + ' was modified to  ' + newImage + ' ' + res1.nModified + ' times');
}

const findCountByImage = async (imgName) => {
	const countQuery = await Likes.where({'img': imgName }).countDocuments();
	console.log(imgName + '-' + countQuery);
};

const findAllUsers = async () => {
// get the name and email of all users
	const response = await Users.find({},'email loginid imagesAllowed imagesUploaded imagesIndex hashcode artist firstname lastname').sort({email:1}).limit(25);
	console.log(response);
}

const findLikesByUser = async (email_id) => {
// get the images liked by a user
    const response = await Likes.find({email: email_id})
    console.log(response);
}

const updateHashCode = async (email_id) => {
//Update hascode of a user to zero, so doesnt have to go through activaetion email
    const response = await Users.updateOne({ email : email_id}, { hashcode: '0' })
    console.log(response);
}

const updateImagesUploaded = async (email_id) => {
//Update images uploaded for a user to zero
    const response = await Users.updateOne({ email : email_id}, { imagesUploaded: 0 })
    console.log(response);
}

const updateImagesAllowed = async (email_id) => {
//Update images alled for a user to 50
    const response = await Users.updateOne({ email : email_id}, { imagesAllowed: 50 })
    console.log(response);
}
const updateImagesIndex = async (email_id) => {
//Update images uploaded for a user to zero
    const response = await Users.updateOne({ email : email_id}, { imagesIndex: 0 })
    console.log(response);
}

const updateField = async (user,value) => {
//Update field of a user to a passed value
    const response = await Users.updateOne({ email : user}, { imagesAllowed: value })
    console.log(response);
}

const deleteUser = async (email_id) => {
    const response = await Users.deleteOne({email: email_id});
    console.log(response);
}

findAllUsers();
//updateImagesAllowed('cmeitester1@gmail.com');
//updateImagesUploaded('sgupt9999@gmail.com');
//updateImagesUploaded('sanjaygupta9999@yahoo.com');
//findLikesByUser('garfield1');
//updateHashCode('cmeitester1@gmail.com');
//updateHashCode('cmeitester2@gmail.com');
//deleteUser('cmeitester1@gmail.com');
//deleteUser('cmeitester2@gmail.com');
//findAllUsers();
updateField('cmeitester1@gmail.com',500000);
//updateImagesIndex('sgupt9999@gmail.com');
