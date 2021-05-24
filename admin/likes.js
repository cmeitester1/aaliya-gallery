const mongoose = require('../src/db/mongoose');
const Likes = require('../src/models/likes');


const updateImageNames = async (oldImage, newImage) => {
	const res1 = await Likes.updateMany({ img: oldImage }, {img: newImage});
	console.log(oldImage + ' was modified to  ' + newImage + ' ' + res1.nModified + ' times');
}

const findCountByImage = async (imgName) => {
	const countQuery = await Likes.where({'img': imgName }).countDocuments();
	console.log(imgName + '-' + countQuery);
};

const findAllLikes = async () => {
// get the full dump of the likes collection
	const response = await Likes.find();
	console.log(response);
}

const deleteLikesByLogin= async (id) => {
// Delete all likes by a particular user
    const response = await Likes.deleteMany({loginid: id});
    console.log(response);
}

const deleteAllLikes = async () => {
    const response = await Likes.deleteMany({});
    console.log(response);
}


const findImageCounts = () => {
	findCountByImage('img1');
	findCountByImage('img2');
	findCountByImage('img3');
	findCountByImage('img4');
	findCountByImage('img5');
	findCountByImage('img6');
	findCountByImage('img7');
	findCountByImage('img8');

	findCountByImage('aaliya-1');
	findCountByImage('aaliya-2');
	findCountByImage('aaliya-3');
	findCountByImage('aaliya-4');
	findCountByImage('aaliya-5');
	findCountByImage('aaliya-6');
	findCountByImage('aaliya-7');
	findCountByImage('aaliya-8');
	findCountByImage('aaliya-9');
	findCountByImage('aaliya-10');
	findCountByImage('aaliya-11');
}

const updateAllImageNames = () => {
	updateImageNames('aaliya1-1.jpg','aaliya1-1');
	updateImageNames('aaliya1-2.jpg','aaliya1-2');
	updateImageNames('aaliya1-3.jpg','aaliya1-3');
	updateImageNames('aaliya1-4.jpg','aaliya1-4');
	updateImageNames('aaliya1-5.jpg','aaliya1-5');
	updateImageNames('aaliya1-6.jpg','aaliya1-6');
	updateImageNames('aaliya1-7.jpg','aaliya1-7');
	updateImageNames('aaliya1-8.jpg','aaliya1-8');
    	updateImageNames('aaliya1-9.jpg','aaliya1-9');
	updateImageNames('aaliya1-10.jpg','aaliya1-10');
	updateImageNames('aaliya1-11.jpg','aaliya1-11');
    	updateImageNames('aaliya1-12.jpg','aaliya1-12');
	updateImageNames('aaliya1-13.jpg','aaliya1-13');
	updateImageNames('aaliya1-14.jpg','aaliya1-14');
    	updateImageNames('aaliya1-15.jpg','aaliya1-15');
	updateImageNames('aaliya1-16.jpg','aaliya1-16');
	updateImageNames('aaliya1-17.jpg','aaliya1-17');
}

//findImageCounts();
updateAllImageNames();
//findImageCounts();
//findAllLikes();
//deleteLikesByLogin('garfield1');
//deleteAllLikes();
