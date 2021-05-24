// ELEMENT
$errorRegister = document.getElementById('error-register');
$errorName = document.getElementById('error-register-artist-mobile-name');
$errorEmail = document.getElementById('error-register-artist-mobile-email');
$errorLoginid = document.getElementById('error-register-artist-mobile-loginid');
$errorPassword = document.getElementById('error-register-artist-mobile-password');
$errorSchool = document.getElementById('error-register-artist-mobile-school');
$errorGrade = document.getElementById('error-register-artist-mobile-grade');
$errorTeacherName = document.getElementById('error-register-artist-mobile-teachername');
$errorTeacherEmail = document.getElementById('error-register-artist-mobile-teacheremail');
$emailConfirm = document.getElementById('email-confirm');
$emailConfirmResend = document.getElementById('email-confirm-resend');


const displayArtistFirstPage = () => {
// This is a 4 page form. Display the 1st page and hide the rest
        document.getElementById('label-name-artist-mobile').style.display = "block";
        document.getElementById('label-email-artist-mobile').style.display = "block";    
        document.getElementById('name-artist-mobile').style.display = "block";
        document.getElementById('email-artist-mobile').style.display = "block";
    
        $errorName.style.display = "block"
        $errorEmail.style.display = "block"
        $errorName.textContent = '';
        $errorEmail.textContent = '';
    
        document.getElementById('btn-next-register-artist-mobile-two').style.display = "block";
 
    
        document.getElementById('label-loginid-artist-mobile').style.display = "none";
        document.getElementById('label-password-artist-mobile').style.display = "none";
        document.getElementById('label-school-artist-mobile').style.display = "none";
        document.getElementById('label-grade-artist-mobile').style.display = "none";
        document.getElementById('label-teachername-artist-mobile').style.display = "none";
        document.getElementById('label-teacheremail-artist-mobile').style.display = "none";
        document.getElementById('loginid-artist-mobile').style.display = "none";
        document.getElementById('password-artist-mobile').style.display = "none";
        document.getElementById('school-artist-mobile').style.display = "none";
        document.getElementById('grade-artist-mobile').style.display = "none";
        document.getElementById('teachername-artist-mobile').style.display = "none";
        document.getElementById('teacheremail-artist-mobile').style.display = "none";
    
        $errorLoginid.style.display = "none";
        $errorPassword.style.display = "none";
        $errorSchool.style.display = "none";
        $errorGrade.style.display = "none";
        $errorTeacherName.style.display = "none";
        $errorTeacherEmail.style.display = "none";
    
        document.getElementById('btn-previous-register-artist-mobile-one').style.display = "none";
        document.getElementById('btn-previous-register-artist-mobile-two').style.display = "none";
        document.getElementById('btn-previous-register-artist-mobile-three').style.display = "none";
        document.getElementById('btn-next-register-artist-mobile-three').style.display = "none";
        document.getElementById('btn-next-register-artist-mobile-four').style.display = "none";
        document.getElementById('btn-submit-register-artist-mobile').style.display = "none";  
}


const displayArtistSecondPage = () => {
// Display the 2nd page and hide the rest
        document.getElementById('label-loginid-artist-mobile').style.display = "block";
        document.getElementById('label-password-artist-mobile').style.display = "block";    
        document.getElementById('loginid-artist-mobile').style.display = "block";
        document.getElementById('password-artist-mobile').style.display = "block";
    
        $errorLoginid.style.display = "block"
        $errorPassword.style.display = "block"
        $errorLoginid.textContent = '';
        $errorPassword.textContent = '';
    
        document.getElementById('btn-previous-register-artist-mobile-one').style.display = "inline-block";
        document.getElementById('btn-next-register-artist-mobile-three').style.display = "inline-block";
 
    
        document.getElementById('label-name-artist-mobile').style.display = "none";
        document.getElementById('label-email-artist-mobile').style.display = "none";
        document.getElementById('label-school-artist-mobile').style.display = "none";
        document.getElementById('label-grade-artist-mobile').style.display = "none";
        document.getElementById('label-teachername-artist-mobile').style.display = "none";
        document.getElementById('label-teacheremail-artist-mobile').style.display = "none";
        document.getElementById('name-artist-mobile').style.display = "none";
        document.getElementById('email-artist-mobile').style.display = "none";
        document.getElementById('school-artist-mobile').style.display = "none";
        document.getElementById('grade-artist-mobile').style.display = "none";
        document.getElementById('teachername-artist-mobile').style.display = "none";
        document.getElementById('teacheremail-artist-mobile').style.display = "none";
    
        $errorName.style.display = "none";
        $errorEmail.style.display = "none";
        $errorSchool.style.display = "none";
        $errorGrade.style.display = "none";
        $errorTeacherName.style.display = "none";
        $errorTeacherEmail.style.display = "none";
    
        document.getElementById('btn-previous-register-artist-mobile-two').style.display = "none";
        document.getElementById('btn-previous-register-artist-mobile-three').style.display = "none";
        document.getElementById('btn-next-register-artist-mobile-two').style.display = "none";
        document.getElementById('btn-next-register-artist-mobile-four').style.display = "none";
        document.getElementById('btn-submit-register-artist-mobile').style.display = "none";  
}


const displayArtistThirdPage = () => {
// Display the 3rd page and hide the rest
        document.getElementById('label-school-artist-mobile').style.display = "block";
        document.getElementById('label-grade-artist-mobile').style.display = "block";    
        document.getElementById('school-artist-mobile').style.display = "block";
        document.getElementById('grade-artist-mobile').style.display = "block";
    
        $errorSchool.style.display = "block"
        $errorGrade.style.display = "block"
        $errorSchool.textContent = '';
        $errorGrade.textContent = '';
    
        document.getElementById('btn-previous-register-artist-mobile-two').style.display = "inline-block";
        document.getElementById('btn-next-register-artist-mobile-four').style.display = "inline-block";
 
    
        document.getElementById('label-name-artist-mobile').style.display = "none";
        document.getElementById('label-email-artist-mobile').style.display = "none";
        document.getElementById('label-loginid-artist-mobile').style.display = "none";
        document.getElementById('label-password-artist-mobile').style.display = "none";
        document.getElementById('label-teachername-artist-mobile').style.display = "none";
        document.getElementById('label-teacheremail-artist-mobile').style.display = "none";
        document.getElementById('name-artist-mobile').style.display = "none";
        document.getElementById('email-artist-mobile').style.display = "none";
        document.getElementById('loginid-artist-mobile').style.display = "none";
        document.getElementById('password-artist-mobile').style.display = "none";
        document.getElementById('teachername-artist-mobile').style.display = "none";
        document.getElementById('teacheremail-artist-mobile').style.display = "none";
    
        $errorName.style.display = "none";
        $errorEmail.style.display = "none";
        $errorLoginid.style.display = "none";
        $errorPassword.style.display = "none";
        $errorTeacherName.style.display = "none";
        $errorTeacherEmail.style.display = "none";
    
        document.getElementById('btn-previous-register-artist-mobile-one').style.display = "none";
        document.getElementById('btn-previous-register-artist-mobile-three').style.display = "none";
        document.getElementById('btn-next-register-artist-mobile-two').style.display = "none";
        document.getElementById('btn-next-register-artist-mobile-three').style.display = "none";
        document.getElementById('btn-submit-register-artist-mobile').style.display = "none";  
}

const displayArtistFourthPage = () => {
// Display the 4th page and hide the rest
        document.getElementById('label-teachername-artist-mobile').style.display = "block";
        document.getElementById('label-teacheremail-artist-mobile').style.display = "block";    
        document.getElementById('teachername-artist-mobile').style.display = "block";
        document.getElementById('teacheremail-artist-mobile').style.display = "block";
    
        $errorTeacherName.style.display = "block"
        $errorTeacherEmail.style.display = "block"
        $errorTeacherName.textContent = '';
        $errorTeacherEmail.textContent = '';
    
        document.getElementById('btn-previous-register-artist-mobile-three').style.display = "block";
        document.getElementById('btn-submit-register-artist-mobile').style.display = "block";
 
    
        document.getElementById('label-name-artist-mobile').style.display = "none";
        document.getElementById('label-email-artist-mobile').style.display = "none";
        document.getElementById('label-loginid-artist-mobile').style.display = "none";
        document.getElementById('label-password-artist-mobile').style.display = "none";
        document.getElementById('label-school-artist-mobile').style.display = "none";
        document.getElementById('label-grade-artist-mobile').style.display = "none";
        document.getElementById('name-artist-mobile').style.display = "none";
        document.getElementById('email-artist-mobile').style.display = "none";
        document.getElementById('loginid-artist-mobile').style.display = "none";
        document.getElementById('password-artist-mobile').style.display = "none";
        document.getElementById('school-artist-mobile').style.display = "none";
        document.getElementById('grade-artist-mobile').style.display = "none";
    
        $errorName.style.display = "none";
        $errorEmail.style.display = "none";
        $errorLoginid.style.display = "none";
        $errorPassword.style.display = "none";
        $errorSchool.style.display = "none";
        $errorGrade.style.display = "none";
    
        document.getElementById('btn-previous-register-artist-mobile-one').style.display = "none";
        document.getElementById('btn-previous-register-artist-mobile-two').style.display = "none";
        document.getElementById('btn-next-register-artist-mobile-two').style.display = "none";
        document.getElementById('btn-next-register-artist-mobile-three').style.display = "none";
        document.getElementById('btn-next-register-artist-mobile-four').style.display = "none";
}


displayArtistFirstPage();


document.getElementById('btn-next-register-artist-mobile-two').addEventListener('click', async () => {
// Click the next buton on the 1st page of the 4 page form
    const name = document.getElementById('name-artist-mobile').value;
    const email = document.getElementById('email-artist-mobile').value;
    
    if (!name) {
        $errorName.textContent = 'Please enter your name';
        document.getElementById('name-artist-mobile').focus();
    }
    else if (!email) {
        $errorName.textContent = "";
        $errorEmail.textContent = 'Please enter your email';
        document.getElementById('email-artist-mobile').focus();
    }
    else if (!emailIsValid(email)) {
        $errorName.textContent = "";
        $errorEmail.textContent = 'Please enter a valid email';
        document.getElementById('email-artist-mobile').focus();
    }
    else {
        try {
            const response = await fetch('/users/info/email/' + email)
            if (response.status !== 200) {
                displayArtistSecondPage();
            } 
            else {
                $errorName.textContent = "";
                $errorEmail.textContent = 'This email is already being used. Please enter a different email';
                document.getElementById('email-artist-mobile').focus();
            }
        } catch {
            displayArtistSecondPage();
        }
    }
})

document.getElementById('btn-previous-register-artist-mobile-one').addEventListener('click', () => {
// Click the previous button on the 2nd page
    displayArtistFirstPage();
})

document.getElementById('btn-next-register-artist-mobile-three').addEventListener('click', async () => {
// Click the next buton on the 1st page of the 4 page form
    const loginid = document.getElementById('loginid-artist-mobile').value;
    const password = document.getElementById('password-artist-mobile').value;
    
    if (!loginid) {
        $errorLoginid.textContent = 'Please select a loginid';
        document.getElementById('loginid-artist-mobile').focus();
    }
    else {
        try {
            const response = await fetch('/users/info/loginid/' + loginid)
            if (response.status !== 200) {
            //Login id not found in the system. Move on to checking the password
                if (!password) {
                    $errorLoginid.textContent = "";
                    $errorPassword.textContent = 'Please enter a password';
                    document.getElementById('password-artist-mobile').focus();
                }
                else if(password.length < 7) {
                        $errorLoginid.textContent = "";
                        $errorPassword.textContent = 'Password needs to be atleast 7 characters';
                        document.getElementById('password-artist-mobile').focus();
                }
                else {
                    displayArtistThirdPage();
                }
            } 
            else {
                $errorLoginid.textContent = 'This loginid is already taken. Please enter a different loginid';
                document.getElementById('loginid-artist-mobile').focus();
            }
        } catch {
            if (!password) {
                    $errorLoginid.textContent = "";
                    $errorPassword.textContent = 'Please enter a password';
                    document.getElementById('password-artist-mobile').focus();
                }
                else if(password.length < 7) {
                        $errorLoginid.textContent = "";
                        $errorPassword.textContent = 'Password needs to be atleast 7 characters';
                        document.getElementById('password-artist-mobile').focus();
                }
                else {
                    displayArtistThirdPage();
                }
        }
    }
})

document.getElementById('btn-previous-register-artist-mobile-two').addEventListener('click', () => {
// Click the previous button on the 3rd page
    displayArtistSecondPage();
})

document.getElementById('btn-next-register-artist-mobile-four').addEventListener('click', () => {
// Click the next buton on the 1st page of the 4 page form
    const school = document.getElementById('school-artist-mobile').value;
    const grade = document.getElementById('grade-artist-mobile').value;
    
    if (!school) {
        $errorSchool.textContent = 'Please enter your school';
        document.getElementById('school-artist-mobile').focus();
    }
    else if (!grade) {
        $errorSchool.textContent = "";
        $errorGrade.textContent = 'Please pick your current grade';
        document.getElementById('grade-artist-mobile').focus();
    }
    else {
        displayArtistFourthPage();
    }
})

document.getElementById('btn-previous-register-artist-mobile-three').addEventListener('click', () => {
// Click the previous button on the 4th page
    displayArtistThirdPage();
})



document.forms['register-artist-mobile-form'].addEventListener('submit', async (event) => {
// When the login form is successfully submitted, render the header of the home page with the correct 
// template. If unsuccessful then give an alert with a message to try again
    event.preventDefault();
    $errorTeacherName.textContent = "";
    $errorTeacherEmail.textContent = "";
    
    const teachername = document.getElementById('teachername-artist-mobile').value;
    const teacheremail = document.getElementById('teacheremail-artist-mobile').value;
    
    if (!teachername) {
        $errorTeacherName.textContent = "Please enter your teacher's name";
        document.getElementById('teachername-artist-mobile').focus();
    }
    else if (!teacheremail) {
        $errorTeacherName.style.display = "none";
        $errorTeacherEmail.textContent = "Please enter your teacher's email";
        document.getElementById('teacheremail-browser-mobile').focus();
    }
    else if (!emailIsValid(teacheremail)) {
        $errorTeacherName.textContent = "";
        $errorTeacherEmail.textContent = 'Please enter a valid email';
        document.getElementById('email-artist-mobile').focus();
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
                    displayArtistFirstPage();
                    $errorEmail.textContent = 'This email is already being used. Please enter a different email';
                    document.getElementById('email-artist-mobile').focus();
                } 
                else if(response.status === 351) {
                    displayArtistSecondPage();
                    $errorLoginid.textContent = 'This loginid is already taken. Please enter a different loginid';
                    document.getElementById('loginid-artist-mobile').focus();
                } 
                else {
                    $emailConfirm.textContent = 'Before your account can be activated, please click on the link in your email'
                    $emailConfirmResend.textContent = "If you don't receive the activation email, please click on the 'Resend Email' button"
                    document.getElementById('register-artist-mobile').style.display = 'none';
                    document.getElementById('resend-email').style.display = 'block';                    
                }
            } catch (e) {
                $errorRegister.textContent = 'Error registering. Please try again';
            }
    }
});

document.getElementById('btn-close-register-artist').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})

/*
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

*/

/* Was trying this solution to keep the forms working on a mobile phone, but its not working
Keeping it here for right now
document.getElementById('name').addEventListener('focus', () => {
        console.log('Hello');
        window.scrollTo(0,0);
        document.body.scrollTop = 0;
});
*/

