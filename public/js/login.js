// ELEMENT
//$errorLogin = document.getElementById('error-login');
//$confirmationEmail = document.getElementById('confirmation-email');
//$loginResendEmail = document.getElementById('login-resend-email');
//$btnLoginResendEmail = document.getElementById('btn-login-resend-email');


/*
document.getElementById('register-account').addEventListener("click", () => {
    window.location.href='/register.html'
})*/




document.forms['login-form'].addEventListener('submit', async (event) => {
// When the login form is successfully submitted, render the header of the home page with the correct 
// template. If unsuccessful then give an alert with a message to try again
    event.preventDefault();
    document.getElementById('error-login').textContent = "";

    try {
        const response = await fetch(event.target.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)) // event.target is the form
        })
        if (response.status === 200) {
            window.location.href='/';
        }
        else if (response.status === 350) {
        //loginid and password match, but account hasn't been activated through the email
            document.getElementById('login-form').style.display = "none";
            document.getElementById('confirm-email-page').style.display = "block";
            document.getElementById('confirmation-email').textContent = 'Before your account can be activated, please click on the link sent to your email';
            document.getElementById('login-resend-email').textContent = "If you don't receive the activation email, please click on the 'Resend Email' button"
        } else {
            //document.getElementById('error-login').style.display = "block";
            document.getElementById('error-login').textContent = 'Error logging in. Please try again';
        }
    } catch (e) {
        document.getElementById('error-login').textContent = 'Error logging in. Please try again';
    }
});


document.getElementById('btn-login-resend-email').addEventListener('click', async (e) => {
    
    e.preventDefault();
    const loginid = document.getElementById('login-form').elements['loginid'].value
    const data = {loginid}
    document.getElementById('btn-login-resend-email').disabled = true;
    document.getElementById('confirmation-email').textContent = '';
    try {
        const response = await fetch('/users/resend/email', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        
    if (response.status === 200) {
        document.getElementById('login-resend-email').textContent = 'Activation email resent. Please check your email including the spam folder';
        }
    else {
        document.getElementById('login-resend-email').textContent = 'Error sending activation email. Please send us a message';
        }
    }
    catch (e) {
       document.getElementById('login-resend-email').textContent = 'Error sending activation email. Please send us a message';
    }

})

document.getElementById('btn-close-login-form').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})


document.getElementById('btn-close-confirm-email-form').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})

/*
document.addEventListener('touchmove', (e) => {
// To prevent the form from reloading on swipe motion on the screen
    e.preventDefault();
}, {passive: false});
*/