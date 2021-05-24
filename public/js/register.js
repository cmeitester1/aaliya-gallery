document.getElementById('register-artist-account').addEventListener("click", () => {
        window.location.href='/register-artist.html'
})

document.getElementById('register-browser-account').addEventListener("click", () => {
        window.location.href='/register-browser.html'
})

document.getElementById('btn-close-register-form').addEventListener('click', (e) => {
// Close the form  and go back to the home page
    e.preventDefault();
    window.location.href = '/';
})

