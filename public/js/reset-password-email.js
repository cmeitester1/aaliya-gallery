const emailResetPasswordEmailPostFocus = async() => {
    const errMsg1 = document.getElementById('forms-error-email-reset-password-email-1');
    const errMsg2 = document.getElementById('forms-error-email-reset-password-email-2');
    const email = document.getElementById('email-reset-password-email').value;

    errMsg1.style.display = "none";
    errMsg1.textContent = "";
    errMsg2.style.display = "none";
    errMsg2.textContent = "";
    
    if (email) {
        if (!emailIsValid(email)) {
            errMsg1.style.display = "block";
            errMsg1.textContent = 'Please enter a valid email';
            document.getElementById('email-reset-pasword-email').focus();
        } 
    }
}


document.forms['reset-password-email-form'].addEventListener('submit', async (event) => {
// user can send a message to the administrator of the site
    event.preventDefault();
    
    const errMsg1 = document.getElementById('forms-error-email-reset-password-email-1');
    const errMsg2 = document.getElementById('forms-error-email-reset-password-email-2');
    const email = document.getElementById('email-reset-password-email').value;

    errMsg1.style.display = "none";
    errMsg1.textContent = "";    
    errMsg2.style.display = "none";
    errMsg2.textContent = "";    

    if (!email) {
        errMsg1.style.display = "block";
        errMsg1.textContent = "Please enter your email";
        document.getElementById('email-reset-password-email').focus();
    } 
    else if (!emailIsValid(email)) {
        errMsg1.style.display = "block";
        errMsg1.textContent = "Please enter a valid email";
        document.getElementById('email-reset-password-email').focus();
    } 
    else {
        try {
            const response = await fetch(event.target.action, {
                    method: 'POST',
                    body: new URLSearchParams(new FormData(event.target)) // event.target is the form
            })
            if (response.status === 200) {
                errMsg1.style.display = "block";
                errMsg1.textContent = "WE'VE SENT AN EMAIL!";
                errMsg1.style.color = 'green';
                errMsg2.style.display = "block";
                errMsg2.textContent = `To complete your password reset, click the link in the email sent to ${email}`;
                errMsg2.style.color = 'green';
            } 
        } catch (e) {
            errMsg1.style.display = "block";
            errMsg.textContent = "Error sending message. Please try again";
        }
    }
});


document.getElementById('btn-close-reset-password-email-form').addEventListener('click', async (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/' // redirect to home page and based on cookie it will figure out what to do
})


