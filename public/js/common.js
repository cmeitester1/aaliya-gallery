// Common Functions for different pages


// Check if an email address is in a valid format
const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Check if a string only contains alpha-numeric values
const stringIsAlphaNumeric = (string) => /^[a-zA-Z0-9]*$/.test(string);

// Return the extension of a file
const fileExtension = (file) => {
    const a = file.split(".");
    if ( a.length === 1 || ( a[0] === "" && a.length === 2)) {
        return "";
    }
    return a.pop();
}

/* Same function was declared differently in app.js and message.js. This is the app.js version
const getUserInfo = async() => {
    try {
        const response = await fetch('/users/info/')
        const user = await response.json();
        return user; // Note of there was no user found, then the body is returned as an object, but it doesnt have the user property
    } catch {
        console.log('Error in getuserinfo');
        return undefined;
    }
}
*/


const getUserInfo = async () => {
//get user info based on the cookie stored
    try {
        const response = await fetch('/users/info/')
        if (response.status !== 401) {
            const user = await response.json();
            return user;
        } else {
            return undefined;
        }
    } catch {
        return undefined;
    }
}

