# aaliya-art

FOR PRODUCTION -
1. Create a file /etc/profile.d/custom.sh
2. Add the following to this file -
    #!/bin/bash
    export AALIYAPORTHTTP=80
    export AALIYAPORTHTTPS=443
    export AALIYAHOST='aaliya-gallery'
    export SENDGRIDAPIKEY='apikey'
    export AWSKEY=''
    export AWSSECRET=''
    export AWSREGION='us-west-2'
    export AWSBUCKET='aaliya-gallery'

3. Install mongodb and mongodb backup as per the instructions

TO INSTALL LETSENCRYPT
1. First install EPEL repo
2. yum install certbot

TO RENEW LETSENCRYPT
1. certbot certonly --server https://acme-v02.api.letsencrypt.org/directory --manual --preferred-challenges dns -d 'cmeitest.com' OR certbot certonly --server https://acme-v02.api.letsencrypt.org/directory --manual --preferred-challenges dns -d 'aaliya-gallery.com'
2. Say yes to logging in the IP address



TO RUN THE APPLICATION -
1. Log-in as root
2. nohup /home/ec2-user/mongodb/bin/mongod --dbpath=/home/ec2-user/mongodb-data --bind_ip_all &
3. Go to aaliya-art directory
4. nohup node src/index.js &
5. To find out the processes -
6. netstat -tulpen | grep mongo
7. netstat -tulpen | grep node


TESTING STEPS
EXISTING USERS
1. Can an existing user login successfully
2. Is the correct error message shown when incorrect login information is entered
3. Is redirection proper when the close button is clicked on the login screen?
2. Do error messages dissapear when correcting them
2. After login, can the user click on thumbs-up and get the correct message
3. When the user clicks on message does the correct information gets pre-populated to the message screen
4. Does the message get sent correctly? and does the redirection happen correctly after the message is sent
4. When clicking closing the login and message screens, does the home page show the correct informaton
NEW USERS
1. When registering, do error messages for all fields work correctly
2. Do error messages disappear when correcting them
3. Does the confirmation email work and display the username correctly
4. When closing the registeraition screen does it render the home page correctly
5. When the email gets sent out does it show the correct website page
NON-REGISTERED USERS
1. When sending message do the user information field get populated correctly and does the message get sent and then does the redirection to home page happen correctly
2. When clicking on thumbs up, does it show the correct error message
CHECK FOR RESPONSIVENESS
1. The site needs to be tested on desktop, laptop, iPad, iPhone and Android phone to make sure forms responsiveness is working good
UPLOADING/DELETING FILES
1. When uploading files, try to upload a file on which you don't have read permissions to simulate failed uploads
2. When deleting files, change the s3location to a non existing file when deleting file to simulate a failed delete


TO MOVE A NEW VERSION TO PRODUCTION
1. Make a backup of the db
2. mongodump --archive="db-backup-<date>" --db="aaliya-art-api"
3. Delete node-modules and run npm install to install any new packages
3. Run user.js to find out how many images garfield3 has
4. Delete all likes by garfield3
5. Delete user garfield3. Now this can be used in testing
6. Create a new git tag with the version information

RELEASES
V1.3
1. Date - 02/11/2020
2. Features
    1. Recreate images collection - Change loginid field to artistid and add other fields
    2. The end point should return an array of objects with all the information that needs to be displayed
    3. Use Mustache templating system to render the home page, retrieving the information from the
    database
    4. A message shown when the user likes an image for the first time
    5. To be able to src even the bg image from AWS
    6. Delete index2, index3 and style2 and style3
    7. Delete img subfolder in the public folder

V1.4
1. Branch - images
2. Date - 03/21/2020
3. Features    
	1. Add 3 more images by aaliya1 to AWS S3
	2. Change the images.js script in admin directory to upload information about the 3 images
    
V1.5
1. Branch - upload-image
2. Date - 05/07/2020
3. Features
	1. Created a new structure for all the forms to make them scrollable on mobile devices
	2. Added a background pix to all the forms
	3. Made the message icon a little bigger so easier to click
	4. There is upload file as part of this version, but hasnt been tested 
	5. Register button added to the home page 
    
V1.6
1. Branch - store-image
2. Date - 05/24/20
3. Features
    1. Added a banner to all the pages which linke back to the home page
    2. The images on home page and forms now scroll under the banner, so it always stays in place
    3. When resubmitting on login page after an error, the previous error message disappears
    4. Instead of name, ask for separate firstname and lastname for browser, artist and teacher
    5. The login is via email and not loginid anymore
    6. Homepage displays first name instead of loginid
    7. Added a pre-load script to upload page to check if there is a valid logged in user and is an artist
    8. Using email instead of loginid when resending activation email
    9. Added title and height to the images model
    10. displayname and height will have to be deleted as part of the 2nd part of the commit
    11. Cleaned up error display on register pages, but still not very clean and problems on firefox

V1.7
1. Branch - password-reset
2. Date - 06/04/20
3. Features
	1. Added a new route for users, so the user who wants to change the password is sent an email
	2. Added a Forgot Password link in login.html
	3. Create a form and an end-point to reset the password
	4. Corrected a small text error in register-browser.js
	5. Added a field passwordhashcode in user model and also a function to initialize the hash
	6. Deleted length field from image model
    
V1.8
1. Branch - domain-email
2. Date - 06/13/20
3. Features
    1. Created a AWS WorkMail account - support@aaliya-gallery.com
    2. Created a new SMTP user in AWS
    3. Changed to sending all emails from this account using SMTP from sending emails from gmail using sendgrid
    4. Updated the environment variables file
    5. Created a new S3 bucket for storing images in test environment different from production
    6. Added a website title
    7. Fixed a bug in app.js when code = 0

V1.9
1. Branch - upload-forms
2. Date - 07/13/20
3. Features
    1. Added 2 new fields to the image model - version number and if the uploaded artwork is on original piece or not
    2. Version number is initialized to 1 for existing images
    3. Created a form where artists can see the images already uploaded, update image information, upload new images or delete images
    4. DB changes - Add version field and make the value equal to 1 for all images in Image collection
    5. DB changes - Rename image names to not have .jpg extension for all images in Image collection
    6. DB changes - Update the s3 location value to have the version number in the name in Image collection
    7. DB changes - Rename image names to not have .jpg extension for all images in Likes collection
    8. AWS S3 changes - update the file names to add the version number for all image files
    

V1.10
1. Branch - enhancements
2. Date - 07/19/20
3. Features
    1. On the registration pages added firstname and lastname side by side to save some space
    2. Added a new field to confirm the password
    3. On login error, formatted the message that gets printed to the log
    
    
    
V1.11
1. Branch - css-reorg
2. Date - 08/20/20
3. Features
    1. Merged all css files into one using sass
    2. Created a production workflow with all html files calling one compressed css file
    
    
GALLERY-REORG
WHAT TO DO
1. Remove border and outline from the images
2. Make other font size and positioning changes on home page so the responsive changes look better
3. Change the home page artwork pictures where instead of stretching, just show the important part of the image
4. Clicking on an image on the home page should display a bigger and fuller picture. It shows a fuller picture on smaller screens, but not necessarily bigger as it has to maintain the aspect ratio. The portraid images are shohn better on smaller screens
   
   
STEPS TO DO
1. Added 2 new fields to the image model - s3locationmini and s3locationbig. These are for small square image for the homepage and a bigger image when the small image is clicked
2. Uploaded the correct images to AWS S3 manually
3. Added a popup with the larger image and a click event on all small image to display their corresponding bigger images
4. Added navigation when viewing larger images to continue viewing larger images
5. Deleted a lot of variable definitions from base.scss which were not being used anywhere  
   
    
    
    
CSS-REORG
WHAT TO DO
1. Reorg the CSS files

STEPS TO DO
1. Create a new OLD directory
2. Move all *old* files to this directory
3. Create a sass directory
4. Install node-sass package
5. Move and rename style-non-forms to the sass folder
6. Create a script in package.json to create this css file in the css folder
7. Created a new file _base.scss in the sass folder and moved some of the base css to this file

8. Move and rename style-forms to the sass folder
9. Create a script in package.json to create this css file in the css folder
10. Created a new common file in sass directory. Moved the common code from form and non form files to the common file
11. Changed the header class name and added header-title to all files other than home page

12. Merged forms and non-forms into style2

13. Move and rename style.css to sass folder
14. Changed the script in package.json to create style.css from style.scss
15. Merged style-media.css into style.scss
16. Moved the common elements from style.scss to common.scss

17. Rename _style.scss _homepage.scss
18. Combine base,common,homepage and components into one css file called style.css
19. Change all html pages to use this css file
20. Deleted the unused files from sass and css directories



21. Install autoprefixer, concat, npm-run-all and postcss-cli packages
22. Build the flow to compile, concatenate, autoprefix and compress into style.css
23. Change all html files to not call all.css separately
24. Update .gitignore to not load the intermediary production flow files


WHAT FIELDS ARE NEEDED FOR THE IMAGE COLLECTION
1. Image title(internal)
2. Image title(displayed)
2. Year painted
3. Artist Loginid
4. Sale Price
5. Type of painting - i.e. canvas
6. Painting Length
7. Painting width
8. Orientation
7. Formatted image
8. Unformatted image
9. Grade when paiting was done
10. Already Sold - Y/N

WHAT FIELDS ARE NEEDED FOR ARTIST COLLECTION
5. Parents Permission
7. Number of paintings uploaded
9. Index of the last file uploaded
10. AWS BucketName


TO DO
1. Cleanup all unnecessary console.logs
2. Stats alignment is a bit messed up
3. the loginids need to be of correct format to align with bucket names. It's not the bucket name, but the object name
    1. Just limit it to alpha-numeric less than 64 characters
4. The email and the key should not be hard-coded
5. at createddatetime filed to both colections
6. Figure out how not to reload images
7. When the page refershes with a user, check if the auth-token matches what's in the system, if not then check them out. Probably have to do the same thing when doing likes
8. The painting information should also have the canvas size
9. On every screen the button needs to be disabled when they cannot be pressed again
10. Correct any cookie conflict, on the home page check for a valid cookie, expire cookies after 24 hours, change user end point
11. The db backups to be uploaded to S3


2. For the names the first letter needs to be capitalized
3 They should be able to upload upto 5 images, no more than 200kb each
5.Problem with email sent through sendgrid
7. Need to create a mail server
9. The onblur still doesnt work on firefox. That needs to be fixed
10. The error display on register pages is still a mess. That also needs to be fixed.
11. Maybe have to change the formatting of the old images
12. How to create thumbnails of uploaded images
13. The price and sold/not sold needs to be added to the front of the image
15.  Work on onblur and onfocus on firefox
16. The background image is different on test and prod
17. Hoe to order images being displayed on the main screen
18. Right now for every new user the imagesAllowed defaults to 5. This needs to change to only for onyl artists
19. How does token array get cleaned up in user record
20. Need to have a character limit on the title f uploaded images
21. When uploading new images the newest image should show on the top
22. Should there be a minimum price at which a paitning can be sold
23. Need to create a new DEV environment
24. format of the buttons
25. Correct error messages
26. Login/Register setup like costco.com
27. When deleting an image, need to delete all versions of uploaded, mini and big
28. When updating an image, delete all the previous versions of all the types
29. On the user-upload page, do you show mini photos? If yes, then how about the just uploaded ones.
30. When trying to upload 2 files at the same time, it errors out on one of the tries. When trying to reload it overwrites the first image
31. If large image in unavailable, still show the mini one





