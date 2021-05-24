const mongoose = require('../src/db/mongoose');
const Image = require('../src/models/image');



const imageInfo1 = {
    name: 'aaliya1-1.jpg',
    artistid: 'aaliya1',
    displayname: 'Mountain & Lake',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-1__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-1.jpg'
}

const imageInfo2 = {
    name: 'aaliya1-2.jpg',
    artistid: 'aaliya1',
    displayname: 'Solitude',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'y',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-2__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-2.jpg'
}


const imageInfo3 = {
    name: 'aaliya1-3.jpg',
    artistid: 'aaliya1',
    displayname: 'Butterfly',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-3__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-3.jpg'
}


const imageInfo4 = {
    name: 'aaliya1-4.jpg',
    artistid: 'aaliya1',
    displayname: 'Rainbow Tree',
    year: 2017,
    price: 100,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-4__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-4.jpg'
}

const imageInfo5 = {
    name: 'aaliya1-5.jpg',
    artistid: 'aaliya1',
    displayname: 'Venice',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'y',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-5__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-5.jpg'
}

const imageInfo6 = {
    name: 'aaliya1-6.jpg',
    artistid: 'aaliya1',
    displayname: 'Clueless Sally',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'Portrait',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-6__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-6.jpg'
}

const imageInfo7 = {
    name: 'aaliya1-7.jpg',
    artistid: 'aaliya1',
    displayname: 'First Abstract',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-7__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-7.jpg'
}


const imageInfo8 = {
    name: 'aaliya1-8.jpg',
    artistid: 'aaliya1',
    displayname: 'Surprised Sally',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'Portrait',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-8__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-8.jpg'
}


const imageInfo9 = {
    name: 'aaliya1-9.jpg',
    artistid: 'aaliya1',
    displayname: 'Confused Sally',
    year: 2019,
    price: 100,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-9__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-9.jpg'
}

const imageInfo10 = {
    name: 'aaliya1-10.jpg',
    artistid: 'aaliya1',
    displayname: 'Shore',
    year: 2019,
    price: 150,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'landscape',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-10__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-10.jpg'
}

const imageInfo11 = {
    name: 'aaliya1-11.jpg',
    artistid: 'aaliya1',
    displayname: 'Medley',
    year: 2019,
    price: 150,
    type: 'Crayons on Canvas',
    length: 16,
    width: 20,
    orientation: 'Portrait',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-11__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-11.jpg'
}

const imageInfo12 = {
    name: 'aaliya1-12.jpg',
    artistid: 'aaliya1',
    displayname: 'Lady with Roosters',
    year: 2020,
    price: 100,
    type: 'Arcylic on Canvas',
    length: 20,
    width: 16,
    orientation: 'Portrait',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-12__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-12.jpg'
}


const imageInfo13 = {
    name: 'aaliya1-13.jpg',
    artistid: 'aaliya1',
    displayname: 'Farm',
    year: 2020,
    price: 100,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 20,
    orientation: 'Landscape',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-13__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-13.jpg'
}


const imageInfo14 = {
    name: 'aaliya1-14.jpg',
    artistid: 'aaliya1',
    displayname: 'Reaching for sky',
    year: 2020,
    price: 100,
    type: 'Acrylic on Canvas',
    length: 16,
    width: 12,
    orientation: 'Portrait',
    grade: 'Elementary',
    sold: 'n',
    school: 'Walker Station Elementary',
    backside_id: 'aaliya1-14__back',
    s3location: 'https://aaliya-gallery.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-14.jpg'
}


const testImageInfo = { 
  name: 'garfield200-50',
  artistid: 'garfield200',
  s3location:
   'https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/garfield200/garfield200-50-1.jpg',
  backside_id: 'garfield200-50__back',
  title: 'test',
  year: 2020,
  grade: 'I',
  price: 4567,
  height: 10,
  width: 10,
  depth: 2,
  type: 'Acrylic Painting',
  orientation: 'Landscape',
  version: 1 }


const saveImageInfo = async (imageInfo) => {
    const image = new Image(imageInfo);
    console.log(image);
    try {
        await image.save();
        console.log(`${image.name} save successfully`)
    } catch (e) {
        console.log(e);
    }
}

const findAllImages = async () => {
// get the full dump of the image collection
	//const response = await Image.find();
	const response = await Image.find().sort({name:1});
	console.log(response);
}

const findAllImagesByID = async (artistid) => {
// get the list of images for a particular artist
	const response = await Image.find({artistid: artistid});
	console.log(response);
}

const updateImageNames = async (oldImage, newImage) => {
	const res1 = await Image.updateMany({ name: oldImage }, {name: newImage});
	console.log(oldImage + ' was modified to  ' + newImage + ' ' + res1.nModified + ' times');
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

const updateFieldName = async () => {
    const res = await Image.update({}, { $rename: { displayname: 'title' } }, { multi: true });
    console.log(res);
}

const deleteAllImageInfo = async() => {
	const response = await Image.deleteMany({});
	console.log(response);
}

const dropImageCollection = async () => {
    const response = await mongoose.connection.db.collections() 
          //await mongoose.db.dropCollection('Image');
    console.log(response);
}

const updateField = async (image, value) => {
//Update the given field for the passed image to passed value
	const response = await Image.updateOne({ name: image}, { s3locationmini: value});
	console.log(response);
}

const updateField2 = async (image, value) => {
// Copy of updateField. Creating it so can run 2 updates together
//Update the given field for the passed image to passed value
	const response = await Image.updateOne({ name: image}, { s3locationbig: value});
	console.log(response);
}

const updateAllImageS3Locations = () => {
	updateField('aaliya1-1','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-1-mini-1.jpg')
	updateField('aaliya1-2','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-2-mini-1.jpg')
	updateField('aaliya1-3','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-3-mini-1.jpg')
	updateField('aaliya1-4','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-4-mini-1.jpg')
	updateField('aaliya1-5','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-5-mini-1.jpg')
	updateField('aaliya1-6','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-6-mini-1.jpg')
	updateField('aaliya1-7','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-7-mini-1.jpg')
	updateField('aaliya1-8','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-8-mini-1.jpg')
	updateField('aaliya1-9','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-9-mini-1.jpg')
	updateField('aaliya1-10','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-10-mini-1.jpg')
	updateField('aaliya1-11','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-11-mini-1.jpg')
	updateField('aaliya1-12','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-12-mini-1.jpg')
	updateField('aaliya1-13','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-13-mini-1.jpg')
	updateField('aaliya1-14','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-14-mini-1-jpg')
	updateField('aaliya1-15','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-15-mini-1.jpg')
	updateField('aaliya1-16','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-16-mini-1.jpg')
	updateField('aaliya1-17','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-17-mini-1.jpg')
	
	updateField('aaliya1-1','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-1-big-1.jpg')
	updateField('aaliya1-2','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-2-big-1.jpg')
	updateField('aaliya1-3','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-3-big-1.jpg')
	updateField('aaliya1-4','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-4-big-1.jpg')
	updateField('aaliya1-5','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-5-big-1.jpg')
	updateField('aaliya1-6','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-6-big-1.jpg')
	updateField('aaliya1-7','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-7-big-1.jpg')
	updateField('aaliya1-8','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-8-big-1.jpg')
	updateField('aaliya1-9','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-9-big-1.jpg')
	updateField('aaliya1-10','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-10-big-1.jpg')
	updateField('aaliya1-11','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-11-big-1.jpg')
	updateField('aaliya1-12','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-12-big-1.jpg')
	updateField('aaliya1-13','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-13-big-1.jpg')
	updateField('aaliya1-14','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-14-big-1-jpg')
	updateField('aaliya1-15','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-15-big-1.jpg')
	updateField('aaliya1-16','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-16-big-1.jpg')
	updateField('aaliya1-17','https://aaliya-gallery-test.s3-us-west-2.amazonaws.com/aaliya1/aaliya1-17-big-1.jpg')
}

const updateAllField = async () => {
//Update the value of a field for all the documents in the collection
	const response = await Image.updateMany({},{version: 1}); //The {} means no condition for select - select all
	console.log(response);
}

const addNewAttribute = async () => {
// Add a new attribute to all the records in the colletion	
// The attribute should already be a part of the model even if it's not in any of the documents
	try {
		const response = await Image.updateMany( {}, {$set:{testfield: null}},{upsert:false});
		console.log(response);
	} catch (e) {
		console.log(e)
	}
}


//addNewAttribute();
//findAllImages();
//updateAllField();
updateAllImageS3Locations();
//updateFieldName();
//updateAllImageNames();
//findAllImagesByID('garfield200');
//saveImageInfo(imageInfo12);
//saveImageInfo(imageInfo13);
//saveImageInfo(imageInfo14);
//saveImageInfo(testImageInfo);
//deleteAllImageInfo();
//dropImageCollection();
