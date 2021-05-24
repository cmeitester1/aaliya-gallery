// ELEMENT
$errorMessage = document.getElementById('error-message');
$messageName = document.getElementById('name-message');
$messageEmail = document.getElementById('email-message');
$messageContent = document.getElementById('content-message');


const initializeForm = async () => {
// If user is logged in, then add that information to form so the user doest have to type it again
    const user = await getUserInfo();
    //DEBUG
    //console.log(user);
    //DEBUG
    if (user) {
        $messageName.value = user.firstname + ' ' + user.lastname;
        $messageEmail.value = user.email
        $messageContent.focus();
    }
    else {
        $messageName.focus();
    }
}

initializeForm();
    
const emailMessagePostFocus = async() => {
    const errMessages = document.getElementsByClassName('forms-error-msg');
    const errMsg = document.getElementById('forms-error-email-message');
    const email = document.getElementById('email-message').value;


    for (var i = 0; i < errMessages.length; i++) {
        errMessages.item(i).style.display = "none";
        errMessages.item(i).textContent = '';
    }

    if (email) {
        if (!emailIsValid(email)) {
            errMsg.style.display = "block";
            errMsg.textContent = 'Please enter a valid email';
            document.getElementById('email-message').focus();
        } 
    }
}


document.forms['message-form'].addEventListener('submit', async (event) => {
// user can send a message to the administrator of the site
    event.preventDefault();
    
    const errMessages = document.getElementsByClassName('forms-error-msg');
    const name = document.getElementById('name-message').value;
    const email = document.getElementById('email-message').value;
    const content = document.getElementById('content-message').value;
    

    for (var i = 0; i < errMessages.length; i++) {
        // Clear all the error messages
        errMessages.item(i).style.display = "none";
        errMessages.item(i).textContent = '';
    }

    if (!name) {
        document.getElementById('forms-error-name-message').style.display = "block";
        document.getElementById('forms-error-name-message').textContent = "Please enter your name";
        document.getElementById('name-message').focus();
    } else if (!email) {
        document.getElementById('forms-error-email-message').style.display = "block";
        document.getElementById('forms-error-email-message').textContent = "Please enter your email";
        document.getElementById('email-message').focus();
    } else if (!emailIsValid(email)) {
        document.getElementById('forms-error-email-message').style.display = "block";
        document.getElementById('forms-error-email-message').textContent = "Please enter a valid email";
        document.getElementById('email-message').focus();
    } else if (!content) {
        document.getElementById('forms-error-content-message').style.display = "block";
        document.getElementById('forms-error-content-message').textContent = "Please enter your message";
        document.getElementById('content-message').focus();
    } else {
        try {
            const response = await fetch(event.target.action, {
                    method: 'POST',
                    body: new URLSearchParams(new FormData(event.target)) // event.target is the form
            })
            if (response.status === 200) {
                document.getElementById('forms-error-content-message').style.display = "block";
                document.getElementById('forms-error-content-message').textContent = 'Your message was sent successfully';
                document.getElementById('forms-error-content-message').style.color = 'green';
                setTimeout(() => {window.location.href = '/'}, 1000)
            } else {
                document.getElementById('forms-error-content-message').style.display = "block";
                document.getElementById('forms-error-content-message').textContent = 'Error sending the message. Please try again'; 
            }     

        } catch (e) {
            document.getElementById('forms-error-content-message').style.display = "block";
            document.getElementById('forms-error-content-message').textContent = 'Error sending the message. Please try again';
        }
    }
});


document.getElementById('btn-close-message-form').addEventListener('click', async (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/' // redirect to home page and based on cookie it will figure out what to do
})

/*
document.addEventListener('touchmove', (e) => {
// To prevent the form from reloading on swipe motion on the screen
    e.preventDefault();
}, {passive: false});
*/
