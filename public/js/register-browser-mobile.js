// ELEMENT
$errorRegister = document.getElementById('error-register');
$errorName = document.getElementById('error-register-browser-mobile-name');
$errorEmail = document.getElementById('error-register-browser-mobile-email');
$errorLoginid = document.getElementById('error-register-browser-mobile-loginid');
$errorPassword = document.getElementById('error-register-browser-mobile-password');
$emailConfirm = document.getElementById('email-confirm');
$emailConfirmResend = document.getElementById('email-confirm-resend');


const displayBrowserFirstPage = () => {
// This is a 2 page form. Display the 1st page and hide the 2nd page
        document.getElementById('label-name-browser-mobile').style.display = "block";
        document.getElementById('label-email-browser-mobile').style.display = "block";    
        document.getElementById('name-browser-mobile').style.display = "block";
        document.getElementById('email-browser-mobile').style.display = "block";
        $errorName.style.display = "block"
        $errorEmail.style.display = "block"
        $errorName.textContent = '';
        $errorEmail.textContent = '';
        document.getElementById('btn-next-register-browser-mobile').style.display = "block";
 
    
        document.getElementById('label-loginid-browser-mobile').style.display = "none";
        document.getElementById('label-password-browser-mobile').style.display = "none";
        document.getElementById('loginid-browser-mobile').style.display = "none";
        document.getElementById('password-browser-mobile').style.display = "none";
        $errorLoginid.style.display = "none"
        $errorPassword.style.display = "none"
        document.getElementById('btn-previous-register-browser-mobile').style.display = "none";
        document.getElementById('btn-submit-register-browser-mobile').style.display = "none";  
}

const displayBrowserSecondPage = () => {
// This is a 2 page form. Display the 2nd page and hide the 1st page
        document.getElementById('label-name-browser-mobile').style.display = "none";
        document.getElementById('label-email-browser-mobile').style.display = "none";    
        document.getElementById('name-browser-mobile').style.display = "none";
        document.getElementById('email-browser-mobile').style.display = "none";
        $errorName.style.display = "none"
        $errorEmail.style.display = "none"
        document.getElementById('btn-next-register-browser-mobile').style.display = "none";
 
    
        document.getElementById('label-loginid-browser-mobile').style.display = "block";
        document.getElementById('label-password-browser-mobile').style.display = "block";
        document.getElementById('loginid-browser-mobile').style.display = "block";
        document.getElementById('password-browser-mobile').style.display = "block";
        $errorLoginid.style.display = "block"
        $errorPassword.style.display = "block"
        $errorLoginid.textContent = ""
        $errorPassword.textContent = ""
        document.getElementById('btn-previous-register-browser-mobile').style.display = "block";
        document.getElementById('btn-submit-register-browser-mobile').style.display = "block";  
}

displayBrowserFirstPage();

document.getElementById('btn-next-register-browser-mobile').addEventListener('click', async () => {
    const name = document.getElementById('name-browser-mobile').value;
    const email = document.getElementById('email-browser-mobile').value;
    
    if (!name) {
        $errorName.textContent = 'Please enter your name';
        document.getElementById('name-browser-mobile').focus();
    }
    else if (!email) {
        $errorName.textContent = "";
        $errorEmail.textContent = 'Please enter your email';
        document.getElementById('email-browser-mobile').focus();
    }
    else if (!emailIsValid(email)) {
        $errorName.textContent = "";
        $errorEmail.textContent = 'Please enter a valid email';
        document.getElementById('email-browser-mobile').focus();
    }
    else {
        try {
            const response = await fetch('/users/info/email/' + email)
            if (response.status !== 200) {
                displayBrowserSecondPage();
            } 
            else {
                $errorName.textContent = "";
                $errorEmail.textContent = 'This email is already being used. Please enter a different email';
                document.getElementById('email-browser-mobile').focus();
            }
        } catch {
            displayBrowserSecondPage();
        }
    }
})

document.getElementById('btn-previous-register-browser-mobile').addEventListener('click', () => {
    displayBrowserFirstPage();
})


document.forms['register-browser-mobile-form'].addEventListener('submit', async (event) => {
// When the login form is successfully submitted, render the header of the home page with the correct 
// template. If unsuccessful then give an alert with a message to try again
    event.preventDefault();
    $errorLoginid.textContent = "";
    $errorPassword.textContent = "";
    
    const loginid = document.getElementById('loginid-browser-mobile').value;
    const password = document.getElementById('password-browser-mobile').value;
    // You don't care for name and email b/c they have already been validated when next was pressed
    
    if (!loginid) {
        $errorLoginid.style.display = "block";
        $errorLoginid.textContent = 'Please enter a login';
        document.getElementById('loginid-browser-mobile').focus();
    }
    else if (!password) {
        $errorLoginid.style.display = "none";
        $errorPassword.style.display = "block";
        $errorPassword.textContent = 'Please enter your password';
        document.getElementById('password-browser-mobile').focus();
    }
    else if(password.length < 7) {
            $errorLoginid.style.display = "none";
            $errorPassword.style.display = "block";
            $errorPassword.textContent = 'Password needs to be atleast 7 characters';
            document.getElementById('password-browser-mobile').focus();
    }
    else {

        try {
                const response = await fetch(event.target.action, {
                        method: 'POST',
                        body: new URLSearchParams(new FormData(event.target)) // event.target is the form

                })
                console.log(response);
                console.log(response.status);
                if(response.status === 352) {
                    displayBrowserFirstPage();
                    $errorEmail.textContent = 'This email is already being used. Please enter a different email';
                    document.getElementById('email-browser-mobile').focus();
                } 
                else if(response.status === 351) {
                    $errorLoginid.style.display = "block";
                    $errorPassword.style.display = "none";
                    $errorLoginid.textContent = 'This loginid is already taken. Please enter a different loginid';
                } 
                else {
                    $emailConfirm.textContent = 'Before your account can be activated, please click on the link in your email'
                    $emailConfirmResend.textContent = "If you don't receive the activation email, please click on the 'Resend Email' button"
                    document.getElementById('register-browser-mobile').style.display = 'none';
                    document.getElementById('resend-email').style.display = 'block';                    
                }
            } catch (e) {
                $errorRegister.textContent = 'Error registering. Please try again';
            }
    }
});

document.getElementById('btn-close-register').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})


document.getElementById('btn-close-resend-email').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})


document.getElementById('btn-resend-email').addEventListener('click', async (e) => {
    e.preventDefault();
    const loginid = document.getElementById('register-browser-mobile-form').elements['loginid'].value
    const data = {loginid}
    document.getElementById('btn-resend-email').disabled = true;
    try {
        const response = await fetch('/users/resend/email', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    if (response.status === 200) {
        $emailConfirm.textContent = '';
        $emailConfirmResend.textContent = 'Activation email resent. Please check your email including the spam folder';
        }
    else {
        $emailConfirmResend.textContent = 'Error sending activation email. Please send us a message';
        }
    }
    catch (e) {
        $emailConfirmResend.textContent = 'Error sending activation email. Please send us a message';
    }
    
    // setTimeout(() => {window.location.href = '/'}, 2000)
})

document.addEventListener('touchmove', (e) => {
// To prevent the form from reloading on swipe motion on the screen
    e.preventDefault();
}, {passive: false});

/* Was trying this solution to keep the forms working on a mobile phone, but its not working
Keeping it here for right now
document.getElementById('name').addEventListener('focus', () => {
        console.log('Hello');
        window.scrollTo(0,0);
        document.body.scrollTop = 0;
});
*/

