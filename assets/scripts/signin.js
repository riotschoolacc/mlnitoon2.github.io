var foundUserResponse = null;

function onUserFoundResponse(response) {
    foundUserResponse = response;
}

function waitForUserResponse() {
    return new Promise((resolve, reject) => {
        const checkInterval = setInterval(() => {
            if (foundUserResponse !== null) {
                clearInterval(checkInterval);
                resolve(foundUserResponse); 
            }
        }, 500);
    });
}

document.getElementById('signin-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    loginToSmartFox(email, password, "signin");

    const user = await waitForUserResponse(); 

    if (user && user.status !== false) {
        if (user.role === 'teacher') {
            window.location.href = 'teacher-dashboard.html';
        } else {
            window.location.href = 'student-dashboard.html';
        }
    } else {
        showAlert('Sign-in failed. Please check your credentials.', 7000);
    }
});
