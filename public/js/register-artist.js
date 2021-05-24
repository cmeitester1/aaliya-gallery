// ELEMENTS

$emailConfirm = document.getElementById('email-confirm');
$emailConfirmResend = document.getElementById('email-confirm-resend');

//DEBUG
//document.getElementById('register-artist-form').style.display = 'none';
//document.getElementById('register-artist-complete-page').style.display = 'block';
//$emailConfirm.textContent = 'Before your account can be activated, please click on the link in your email'
//$emailConfirmResend.textContent = "If you don't receive the activation email, please click on the 'Resend Email' button"
//DEBUG



const emailArtistPostFocus = async() => {
    const errMessages = document.getElementsByClassName('forms-error-msg');
    const errMsg = document.getElementById('forms-error-email-artist');
    const email = document.getElementById('email-artist').value;


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
            document.getElementById('email-artist').focus();
        } else {
            try {
                const response = await fetch('/users/info/email/' + email)
                // Check if the email is already being used for another account
                if (response.status !== 200) {
                // This email is not already being used
                    errMsg.style.display = "none";
                    errMsg.textContent = "";
                    //document.getElementById('loginid-artist').focus();
                } else {
                    errMsg.style.display = "block";
                    errMsg.textContent = 'This email is already being used. Please enter a different email';
                    document.getElementById('email-artist').focus();
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
}

const loginidArtistPostFocus = async() => {
    const errMessages = document.getElementsByClassName('forms-error-msg');
    const errMsg = document.getElementById('forms-error-loginid-artist');
    const loginid = document.getElementById('loginid-artist').value;

    errMsg.style.display = "none";
    errMsg.textContent = "";

    if (loginid) {
        if (!stringIsAlphaNumeric(loginid)) {
            errMsg.style.display = "block";
                errMsg.textContent = 'Only alphabets and numbers allowed. Please enter a different loginid';
                document.getElementById('loginid-artist').focus();
        } else {
            try {
                const response = await fetch('/users/info/loginid/' + loginid)
                
                if (response.status !== 200) {
                    errMsg.style.display = "none";
                    errMsg.textContent = "";
                    //document.getElementById('password-artist').focus();
                } else {
                    errMsg.style.display = "block";
                    errMsg.textContent = 'This loginid is already being used. Please enter a different loginid';
                    document.getElementById('loginid-artist').focus();
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
}


const passwordArtistPostFocus = () => {
    const errMessages = document.getElementsByClassName('forms-error-msg');
    const errMsg = document.getElementById('forms-error-password-artist');
    const password = document.getElementById('password-artist').value;


    errMsg.style.display = "none";
    errMsg.textContent = "";
    
    if (password) {
        if (password.length < 7) {
            errMsg.style.display = "block";
            errMsg.textContent = 'Password needs to be atleast 7 characters';
            document.getElementById('password-artist').focus();
        } else {
            errMsg.style.display = "none";
            errMsg.textContent = "";
        }
    }
}


const teacheremailArtistPostFocus = async() => {
    const errMessages = document.getElementsByClassName('forms-error-msg');
    const errMsg = document.getElementById('forms-error-teacheremail-artist');
    const teacherEmail = document.getElementById('teacheremail-artist').value;


    errMsg.style.display = "none";
    errMsg.textContent = "";

    if (teacherEmail) {
        if (!emailIsValid(teacherEmail)) {
            errMsg.style.display = "block";
            errMsg.textContent = "Please enter a valid teacher's email";
            document.getElementById('teacheremail-artist').focus();
        } 
    }
}



document.forms['register-artist-form'].addEventListener('submit', async(event) => {
    // When the login form is successfully submitted, render the header of the home page with the correct 
    // template. If unsuccessful then give an alert with a message to try again
    event.preventDefault();

    const errMessages = document.getElementsByClassName('forms-error-msg');
    const firstName = document.getElementById('firstname-artist').value;
    const lastName = document.getElementById('lastname-artist').value;
    const email = document.getElementById('email-artist').value;
    const loginid = document.getElementById('loginid-artist').value;
    const password = document.getElementById('password-artist').value;
    const confirmPassword = document.getElementById('confirm-password-artist').value;
    const school = document.getElementById('school-artist').value;
    const teacherFirstName = document.getElementById('teacherfirstname-artist').value;
    const teacherLastName = document.getElementById('teacherlastname-artist').value;
    const teacherEmail = document.getElementById('teacheremail-artist').value;

    for (var i = 0; i < errMessages.length; i++) {
        // Clear all the error messages
        errMessages.item(i).style.display = "none";
        errMessages.item(i).textContent = '';
    }

    if (!firstName) {
        document.getElementById('forms-error-firstname-artist').style.display = "block";
        document.getElementById('forms-error-firstname-artist').textContent = "Please enter your first name";
        document.getElementById('firstname-artist').focus();
    } 
    else if (!lastName) {
        document.getElementById('forms-error-lastname-artist').style.display = "block";
        document.getElementById('forms-error-lastname-artist').textContent = "Please enter your last name";
        document.getElementById('lastname-artist').focus();
    } 
    else if (!email) {
        document.getElementById('forms-error-email-artist').style.display = "block";
        document.getElementById('forms-error-email-artist').textContent = "Please enter your email";
        document.getElementById('email-artist').focus();
    } 
    else if (!emailIsValid(email)) {
        document.getElementById('forms-error-email-artist').style.display = "block";
        document.getElementById('forms-error-email-artist').textContent = "Please enter a valid email";
        document.getElementById('email-artist').focus();
    } 
    else if (!loginid) {
        document.getElementById('forms-error-loginid-artist').style.display = "block";
        document.getElementById('forms-error-loginid-artist').textContent = "Please enter your loginid";
        document.getElementById('loginid-artist').focus();
    } 
    else if (!stringIsAlphaNumeric(loginid)) {
        document.getElementById('forms-error-loginid-artist').style.display = "block";
        document.getElementById('forms-error-loginid-artist').textContent = "Only alphabets and numbers allowed. Please enter a different loginid";
        document.getElementById('loginid-artist').focus();
    }  
    else if (!password) {
        document.getElementById('forms-error-password-artist').style.display = "block";
        document.getElementById('forms-error-password-artist').textContent = "Please enter a password";
        document.getElementById('password-artist').focus();
    } 
    else if (password.length < 7) {
        document.getElementById('forms-error-password-artist').style.display = "block";
        document.getElementById('forms-error-password-artist').textContent = 'Password needs to be atleast 7 characters';
        document.getElementById('password-artist').focus();
    } 
    else if (!confirmPassword) {
        document.getElementById('forms-error-confirm-password-artist').style.display = "block";
        document.getElementById('forms-error-confirm-password-artist').textContent = 'Please confirm the password';
        document.getElementById('confirm-password-artist').focus();
    } else if (password != confirmPassword) {
        document.getElementById('forms-error-confirm-password-artist').style.display = "block";
        document.getElementById('forms-error-confirm-password-artist').textContent = "The two passwords don't match";
        document.getElementById('confirm-password-artist').focus();
    }
    else if (!school) {
        document.getElementById('forms-error-school-artist').style.display = "block";
        document.getElementById('forms-error-school-artist').textContent = "Please enter your school's name";
        document.getElementById('school-artist').focus();
    } 
    else if (!teacherFirstName) {
        document.getElementById('forms-error-teacherfirstname-artist').style.display = "block";
        document.getElementById('forms-error-teacherfirstname-artist').textContent = "Please enter your teacher's first name";
        document.getElementById('teacherfirstname-artist').focus();

    } 
    else if (!teacherLastName) {
        document.getElementById('forms-error-teacherlastname-artist').style.display = "block";
        document.getElementById('forms-error-teacherlastname-artist').textContent = "Please enter your teacher's last name";
        document.getElementById('teacherlastname-artist').focus();

    } 
    else if (!teacherEmail) {
        document.getElementById('forms-error-teacheremail-artist').style.display = "block";
        document.getElementById('forms-error-teacheremail-artist').textContent = "Please enter your teacher's email";
        document.getElementById('teacheremail-artist').focus();

    } 
    else if (!emailIsValid(teacherEmail)) {
        document.getElementById('forms-error-teacheremail-artist').style.display = "block";
        document.getElementById('forms-error-teacheremail-artist').textContent = "Please enter a valid teacher's email";
        document.getElementById('teacheremail-artist').focus();
    } 
    else {

        try {
            const response = await fetch(event.target.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)) // event.target is the form

            })
            //DEBUG
            //console.log(response);
            //console.log(response.status);
            //DEBUG
            if (response.status === 352) {
                document.getElementById('forms-error-email-artist').textContent = 'This email is already being used. Please enter a different email';
                document.getElementById('email-artist').focus();
            } else if (response.status === 351) {
                document.getElementById('forms-error-loginid-artist').textContent = 'This loginid is already taken. Please enter a different loginid';
                document.getElementById('loginid-artist').focus();
            } else {
                document.getElementById('register-artist-form').style.display = 'none';
                document.getElementById('register-artist-complete-page').style.display = 'block';
                $emailConfirm.textContent = 'Before your account can be activated, please click on the link sent to your email'
                $emailConfirmResend.textContent = "If you don't receive the activation email, please click on the 'Resend Email' button"
            }
        } catch (e) {
            console.log('Error registering. Please try again');
            document.getElementById('forms-error-teacheremail-artist').style.display = "block";
            document.getElementById('forms-error-teacheremail-artist').textContent = 'Excess load on server. Please try again in a few minutes';
        }
    }
});


document.getElementById('btn-close-register-artist-form').addEventListener('click', (e) => {
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
    //const loginid = document.getElementById('register-artist-form').elements['loginid'].value
    //const data = {loginid}
    
    const email = document.getElementById('register-artist-form').elements['email'].value
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
