// ELEMENTS
$emailConfirm = document.getElementById('email-confirm');
$emailConfirmResend = document.getElementById('email-confirm-resend');

//DEBUG
//document.getElementById('register-artist-form').style.display = 'none';
//document.getElementById('register-artist-complete-page').style.display = 'block';
//$emailConfirm.textContent = 'Before your account can be activated, please click on the link in your email'
//$emailConfirmResend.textContent = "If you don't receive the activation email, please click on the 'Resend Email' button"
//DEBUG



const emailBrowserPostFocus = async() => {
    const errMessages = document.getElementsByClassName('forms-error-msg');
    const errMsg = document.getElementById('forms-error-email-browser');
    const email = document.getElementById('email-browser').value;


    /*for (var i = 0; i < errMessages.length; i++) {
        errMessages.item(i).style.display = "none";
        errMessages.item(i).textContent = '';
    }*/
    
    errMsg.style.display = "none";
    errMsg.textContent = "";

    if (email) {
        if (!emailIsValid(email)) {
            errMsg.style.display = "block";
            errMsg.textContent = 'Please enter a valid email';
            document.getElementById('email-browser').focus();
        } else {
            try {
                const response = await fetch('/users/info/email/' + email)
                // Check if the email is already being used for another account
                if (response.status !== 200) {
                // This email is not already being used
                    errMsg.style.display = "none";
                    errMsg.textContent = "";
                    //document.getElementById('loginid-browser').focus();
                } else {
                    errMsg.style.display = "block";
                    errMsg.textContent = 'This email is already being used. Please enter a different email';
                    document.getElementById('email-browser').focus();
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
}


const passwordBrowserPostFocus = () => {
    const errMessages = document.getElementsByClassName('forms-error-msg');
    const errMsg = document.getElementById('forms-error-password-browser');
    const password = document.getElementById('password-browser').value;

    errMsg.style.display = "none";
    errMsg.textContent = "";

    if (password) {
        if (password.length < 7) {
           /* for (var i = 0; i < errMessages.length; i++) {
                errMessages.item(i).style.display = "none";
                errMessages.item(i).textContent = '';
            }*/
            errMsg.style.display = "block";
            errMsg.textContent = 'Password needs to be atleast 7 characters';
            document.getElementById('password-browser').focus();
        } else {
            errMsg.style.display = "none";
            errMsg.textContent = "";
            /*for (var i = 0; i < errMessages.length; i++) {
                errMessages.item(i).style.display = "none";
                errMessages.item(i).textContent = '';
            }*/
        }
    }
}


document.forms['register-browser-form'].addEventListener('submit', async(event) => {
// When the login form is successfully submitted, render the header of the home page with the correct 
// template. If unsuccessful then give an alert with a message to try again
    
    event.preventDefault();

    const errMessages = document.getElementsByClassName('forms-error-msg');
    const firstName = document.getElementById('firstname-browser').value;
    const lastName = document.getElementById('lastname-browser').value;
    const email = document.getElementById('email-browser').value;
    const password = document.getElementById('password-browser').value;
    const confirmPassword = document.getElementById('confirm-password-browser').value;

    for (var i = 0; i < errMessages.length; i++) {
        // Clear all the error messages
        errMessages.item(i).style.display = "none";
        errMessages.item(i).textContent = '';
    }

    if (!firstName) {
        document.getElementById('forms-error-firstname-browser').style.display = "block";
        document.getElementById('forms-error-firstname-browser').textContent = "Please enter your first name";
        document.getElementById('firstname-browser').focus();
    } 
    else if (!lastName) {
        document.getElementById('forms-error-lastname-browser').style.display = "block";
        document.getElementById('forms-error-lastname-browser').textContent = "Please enter your last name";
        document.getElementById('lastname-browser').focus();
    } 
    else if (!email) {
        document.getElementById('forms-error-email-browser').style.display = "block";
        document.getElementById('forms-error-email-browser').textContent = "Please enter your email";
        document.getElementById('email-browser').focus();
    } else if (!emailIsValid(email)) {
        document.getElementById('forms-error-email-browser').style.display = "block";
        document.getElementById('forms-error-email-browser').textContent = "Please enter a valid email";
        document.getElementById('email-browser').focus();
    } else if (!password) {
        document.getElementById('forms-error-password-browser').style.display = "block";
        document.getElementById('forms-error-password-browser').textContent = 'Please enter a password';
        document.getElementById('password-browser').focus();
    } else if (password.length < 7) {
        document.getElementById('forms-error-password-browser').style.display = "block";
        document.getElementById('forms-error-password-browser').textContent = 'Password needs to be atleast 7 characters';
        document.getElementById('password-browser').focus();
    } else if (!confirmPassword) {
        document.getElementById('forms-error-confirm-password-browser').style.display = "block";
        document.getElementById('forms-error-confirm-password-browser').textContent = 'Please confirm the password';
        document.getElementById('confirm-password-browser').focus();
    } else if (password != confirmPassword) {
        document.getElementById('forms-error-confirm-password-browser').style.display = "block";
        document.getElementById('forms-error-confirm-password-browser').textContent = "The two passwords don't match";
        document.getElementById('confirm-password-browser').focus();
    } else {

        try {
            const response = await fetch(event.target.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)) // event.target is the form

            })
            
            console.log(response);
            if (response.status === 500) {
                console.log('Error registering. Please try again');
                document.getElementById('forms-error-password-browser').style.display = "block";
                document.getElementById('forms-error-password-browser').textContent = 'Excess load on server. Please try again in a few minutes';
            }
            else if (response.status === 352) {
                document.getElementById('forms-error-email-browser').style.display = "block";
                document.getElementById('forms-error-email-browser').textContent = 'This email is already being used. Please enter a different email';
                document.getElementById('email-browser').focus();
            } else if (response.status === 351) {
                document.getElementById('forms-error-loginid-browser').style.display = "block";
                document.getElementById('forms-error-loginid-browser').textContent = 'This loginid is already taken. Please enter a different loginid';
                document.getElementById('loginid-browser').focus();
            } else {
              // New user successfully created
                document.getElementById('register-browser-form').style.display = 'none';
                document.getElementById('register-browser-complete-page').style.display = 'block';
                $emailConfirm.textContent = 'Before your account can be activated, please click on the link sent to your email including the spam folder'
                $emailConfirmResend.textContent = "If you don't receive the activation email, please click on the 'Resend Email' button"
            }
        } catch (e) {
            console.log('Error registering. Please try again');
            document.getElementById('forms-error-password-browser').style.display = "block";
            document.getElementById('forms-error-password-browser').textContent = 'Excess load on server. Please try again in a few minutes';
        }
    }
});


document.getElementById('btn-close-register-browser-form').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})

document.getElementById('btn-close-resend-email-form').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})

document.getElementById('btn-resend-email').addEventListener('click', async (e) => {
    
    e.preventDefault();
    //const loginid = document.getElementById('register-browser-form').elements['loginid'].value
    //const data = {loginid}
    
    const email = document.getElementById('register-browser-form').elements['email'].value
    const data = {email}
    //Using email instead of loginid for user identification
    
    document.getElementById('btn-resend-email').disabled = true;
    $emailConfirm.textContent = '';
    try {
        const response = await fetch('/users/resend/email', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

    if (response.status === 200) {
        $emailConfirmResend.textContent = 'Activation email resent. Please check your email including the spam folder';
        }
    else {
        $emailConfirmResend.textContent = 'Error sending activation email. Please send us a message';
        }
    }
    catch (e) {
        $emailConfirmResend.textContent = 'Error sending activation email. Please send us a message';
    }
})


/*
document.addEventListener('touchmove', (e) => {
// To prevent the form from reloading on swipe motion on the screen
    e.preventDefault();
}, {passive: false});
*/
