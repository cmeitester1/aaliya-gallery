const verifyCode = async(hashcode) => {
    try {
        const response = await fetch('/users/info/passwordhashcode/' + hashcode)
        if (response.status === 204 || response.status === 404) {
            console.log("The passwordhashcode doesn't exist")
            window.location.href = '/';
        }
    } catch (e) {
        console.log("The passwordhashcode doesn't exist")
    }
}

const {
    code
} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

//const code = 'ea732229990145771f3b9dd4dc5466e1';

console.log(code);

if (code) {
//If the code is correct then render the page, otherwise redirect to home page
    verifyCode(code);
}

/*
const passwordResetPasswordPostFocus = () => {
    
    const errMsg = document.getElementById('forms-error-reset-browser');
    const password = document.getElementById('password-browser').value;

    errMsg.style.display = "none";
    errMsg.textContent = "";

    if (password) {
        if (password.length < 7) {
            errMsg.style.display = "block";
            errMsg.textContent = 'Password needs to be atleast 7 characters';
            document.getElementById('password-browser').focus();
        } else {
            errMsg.style.display = "none";
            errMsg.textContent = "";
        }
    }
}
*/

document.forms['reset-password-email-form'].addEventListener('submit', async (event) => {
// Resetting user password
    event.preventDefault();
    
    const errMsg1 = document.getElementById('forms-error-reset-password');
    const newPassword = document.getElementById('new-password').value;
    const errMsg2 = document.getElementById('forms-error-confirm-password');
    const confirmPassword = document.getElementById('confirm-password').value;
    
    errMsg1.style.display = "none";
    errMsg1.textContent = "";
    errMsg2.style.display = "none";
    errMsg2.textContent = "";
    
    document.getElementById('passwordhashcode').value = code;


    if (!newPassword) {
        errMsg1.style.display = "block";
        errMsg1.textContent = "Please enter the new password";
        document.getElementById('new-password').focus();
    } 
    else if (newPassword.length < 7) {
        errMsg1.style.display = "block";
        errMsg1.textContent = 'Password needs to be at least 7 characters';
        document.getElementById('new-password').focus();
    }
    else if (!confirmPassword) {
        errMsg2.style.display = "block";
        errMsg2.textContent = "Please confirm the password";
        document.getElementById('confirm-password').focus();
    }
    else if (newPassword !== confirmPassword) {
        errMsg2.style.display = "block";
        errMsg2.textContent = 'The two passwords are not the same';
        document.getElementById('confirm-password').focus();
    } 
    else {
        try {
            const response = await fetch(event.target.action, {
                    method: 'POST',
                    body: new URLSearchParams(new FormData(event.target)) // event.target is the form
            })
            if (response.status === 200) {
                errMsg2.style.display = "block";
                errMsg2.textContent = 'Password updated. Redirecting to login page';
                errMsg2.style.color = 'green';
                setTimeout(() => {window.location.href = 'login.html'}, 5000)
            } else {
                errMsg2.style.display = "block";
                errMsg2.textContent = 'Error updating password. Pleas try again';
            }     

        } catch (e) {
            errMsg2.style.display = "block";
            errMsg2.textContent = 'Error updating password. Pleas try again';
        }
    }
});


