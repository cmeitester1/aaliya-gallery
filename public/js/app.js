// Elements
const $thumbsupclassname = document.getElementsByClassName('btn-thumbs-up');
const $informationclassname = document.getElementsByClassName('btn-info');
const $imgbackclose = document.getElementsByClassName('img__back--close');
const $likesclassname = document.getElementsByClassName('total-likes');
const $messageclass = document.getElementsByClassName('fa-envelope')
const $closeinformationclassname = document.getElementsByClassName('btn-close-information');
const $imgfront = document.getElementsByClassName('img__front');







const loginByHashCode = async(hashcode) => {
    try {
        const response = await fetch('/users/confirm/' + hashcode)
        if (response.status === 400) {
            console.log('The email link not working')
        }
        window.location.href = '/';
    } catch (e) {
        alert('The email link not working')
    }
}


const {
    code
} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
// This is the user confirming the creation of the account through the email link
if (code && code !== "0") {
// This is to prevent someone from trying to connect using code="0"
    loginByHashCode(code);
}

const setupHeader = async() => {
//Setup the home page header based on if a user is alread logged in
    const user = await getUserInfo();
    if (user) {
    //If user is not undefined
        document.getElementById('firstname').textContent = user.firstname;
        document.getElementById('logout-btn').style.display = "block"; // display the logout button
        document.getElementById('login-label').style.display = "none"; // Once logged in hide the log in button   
        document.getElementById('register-label').style.display = "none"; // Once logged in hide register button
    }
}

setupHeader();

const getImageInfo = async() => {
    try {
        let response = await fetch('/images/homepage')
        response = await response.json();
        return response;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

//getImageInfo();


const renderHomePage = async() => {
    const gallery = document.querySelector('#gallery');
    const images = await getImageInfo();
    images.forEach((image) => {
        const imageTemplate = document.querySelector('#image-template').innerHTML;
        const html = Mustache.render(imageTemplate, {
            img_id: image.name,
            img_src: image.s3locationmini,
            img_s3locationbig: image.s3locationbig,
            img_back_id: image.backside_id,
            img_title: image.title,
            img_artistid: image.artistid,
            img_grade: image.grade,
            img_year: image.year
        })
        gallery.insertAdjacentHTML('beforeEnd', html);
    })

    // When the home page is loaded initialize all the likes querying from the database
    Array.from($likesclassname).forEach(async(element) => {
        const img = element.parentElement.parentElement.parentElement.children[0].id;
        const response = await fetch('/likes/' + img)
        const likes = await response.json();
        element.textContent = likes.likes;

    })


    Array.from($informationclassname).forEach((element) => {
        // Create a separate click event for all the information icons
        // When clicking on the information icons the back of the image which has all the image information will be displayed
        element.addEventListener('click', () => {        
            document.getElementById(element.parentElement.parentElement.children[0].id).style.transform = "rotateY(180deg)"; // Rotate the front side 180deg so its not visible */
            document.getElementById(element.parentElement.parentElement.children[1].id).style.transform = "rotateY(0)"; // Rotate the back side to 0deg so it's visible */
        })
    });


    Array.from($thumbsupclassname).forEach((element) => {
        // Create a separate click event for all the thumbs-up icons
        // All the authenticated users can give a thumbs up to a painting, but only once
        element.addEventListener('click', async() => {
            //const img = element.parentElement.parentElement.previousSibling.previousSibling.classList[1];
            //const img = element.parentElement.parentElement.parentElement.childNodes[1].classList[1];
            const img = element.parentElement.parentElement.parentElement.children[0].id;
            element.parentElement.parentElement.nextElementSibling.textContent = '';

            const response = await fetch('/like/' + img);
            if (response.status === 401) {
                element.parentElement.parentElement.nextElementSibling.textContent = 'Please login before using this feature'
            } else if (response.status === 360) {
                element.parentElement.parentElement.nextElementSibling.textContent = 'You can only click once per image';
            } else {
                const like = await response.json()
                element.nextElementSibling.textContent = like.likes;
                element.parentElement.parentElement.nextElementSibling.textContent = 'Thanks for giving a thumbs up to the painting';
            }
        })
    });



    Array.from($closeinformationclassname).forEach((element) => {
    // Create a separate click event for all back pages of the images
    // When clicking close of the back page, it should revert back to the image
        element.addEventListener('click', () => {
            document.getElementById(element.parentElement.parentElement.parentElement.children[0].id).style.transform = "rotateY(0)"; // Rotate the front side to 0deg so it's visible
            document.getElementById(element.parentElement.parentElement.parentElement.children[1].id).style.transform = "rotateY(180deg)"; // Rotate the back side 180deg so its not visible 
        })
    });

    
    Array.from($imgfront).forEach((element) => {
    // Create a separate click event for all images to display a bigger version of the image
        element.addEventListener('click', () => {
            //const windowWidth = window.innerWidth;
            //const windowHeight = window.innerHeight;
            const imgBigLink = element.parentElement.children[1].children[1].children[0].innerHTML; // Get s3 location of the big image of the image that was clicked
            let currImgElement = element.parentElement;
            let nextImgElement = element.parentElement.nextElementSibling;
            let prevImgElement = element.parentElement.previousElementSibling;
            const container = document.body;
            const newImgWindow = document.createElement("div");


            container.appendChild(newImgWindow);
            newImgWindow.setAttribute("class","img-window");

            newImgWindow.addEventListener('click', () => {
            // If clicked anywhere on the screen then close the big image and the buttons
                document.querySelector(".img-window").remove();
                document.querySelector(".img-btn-next").remove();
                document.querySelector(".img-btn-prev").remove();
            })

            const newImg = document.createElement('img');
            newImgWindow.appendChild(newImg);
            newImg.setAttribute('src',imgBigLink); // Set the big image source to the AWS S3 location
            newImg.setAttribute('id','current-img');

            newImg.onload = function() {
            // This is only run after the image has been completely loaded
            // Figure out the links for the next and previous buttons
                if (Array.from($imgfront).length > 1) {
                // If there is only one artwork then there are no buttons
                    //const imgWidth = this.width; 
                    //const imgHeight = this.height

                    const newNextBtn = document.createElement('a');
                    const btnNextText = document.createTextNode("Next");
                    newNextBtn.appendChild(btnNextText);
                    container.appendChild(newNextBtn);
                    newNextBtn.setAttribute('class','img-btn-next');


                    const newPrevBtn = document.createElement('a');
                    const btnPrevText = document.createTextNode("Prev");
                    newPrevBtn.appendChild(btnPrevText);
                    container.appendChild(newPrevBtn);
                    newPrevBtn.setAttribute('class','img-btn-prev');

                    //newNextBtn.style.cssText = "right:" + calcImgToEdge + "px";
                    //newPrevBtn.style.cssText = "left:" + calcImgToEdge + "px";

                   
                    if (!nextImgElement) {
                    // This condition is needed in cases when the user selects the last image
                        newNextBtn.style.display = 'none';
                    } else{
                        newNextBtn.style.display = 'block';
                    }

                    newNextBtn.addEventListener('click', () => {
                        document.querySelector('#current-img').remove();
                        const getImgWindow = document.querySelector('.img-window');
                        const newImg = document.createElement('img');
                        getImgWindow.appendChild(newImg)
                        newImg.setAttribute('src',nextImgElement.children[1].children[1].children[0].innerHTML);
                        newImg.setAttribute('id','current-img');

                        if (nextImgElement.nextElementSibling) {
                            // If there are more elements in the list, then move forward
                            prevImgElement = currImgElement;
                            currImgElement = nextImgElement;
                            nextImgElement = nextImgElement.nextElementSibling;
                            newPrevBtn.style.display = 'block';
                            newNextBtn.style.display = 'block';
                        } else {
                        // No more images to display. Disable the next button
                            prevImgElement = currImgElement;
                            currImgElement = nextImgElement;
                            newPrevBtn.style.display = 'block';
                            newNextBtn.style.display = 'none';
                        }
                    })                    
                    
                    if (!prevImgElement) {
                    // This condition is needed when the user selects the first image
                        newPrevBtn.style.display = 'none';
                    } else {
                        newPrevBtn.style.display = 'block';
                    }

                    newPrevBtn.addEventListener('click', () => {
                        document.querySelector('#current-img').remove();
                        const getImgWindow = document.querySelector('.img-window');
                        const newImg = document.createElement('img');
                        getImgWindow.appendChild(newImg)
                        newImg.setAttribute('src',prevImgElement.children[1].children[1].children[0].innerHTML);
                        newImg.setAttribute('id','current-img');
                        if (prevImgElement.previousElementSibling) {
                        // If there are more elements in the list, then move back
                            nextImgElement = currImgElement;
                            currImgElement = prevImgElement;
                            prevImgElement = prevImgElement.previousElementSibling;
                            newNextBtn.style.display = 'block';
                            newPrevBtn.style.display = 'block';
                        } else {
                        // No more images to display. Disable the previous button
                            nextImgElement = currImgElement;
                            currImgElement = prevImgElement;
                            newPrevBtn.style.display = 'none';
                            newNextBtn.style.display = 'block';
                        }
                    })                    
                }
            }
        })
    });
}

renderHomePage();






document.forms['logout'].addEventListener('submit', async(event) => {
    // When logging out, delete the cookie from the current session and the database
    event.preventDefault();
    document.cookie = 'auth_token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    try {
        const response = await fetch(event.target.action, {
            method: 'POST',
            body: new URLSearchParams(new FormData(event.target)) // event.target is the form
        })
        document.cookie = 'auth_token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'; // Expire the cookie from the browser
        location.href = '/';
    } catch (e) {
        alert('Error logging out. Please try again')
    }
});
