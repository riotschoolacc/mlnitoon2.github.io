var foundUserResponse = null;

function onUserFoundResponse(response) {
    foundUserResponse = response;
}

// Function to simulate waiting for a user response (could be asynchronous)
function waitForUserResponse() {
    return new Promise((resolve, reject) => {
        const checkInterval = setInterval(() => {
            if (foundUserResponse !== null) {
                clearInterval(checkInterval);
                resolve(foundUserResponse); // Resolve with the response when it's not null
            }
        }, 500); // Check every 500ms
    });
}

document.getElementById('signin-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    // First, attempt to log in
    loginToSmartFox(email, password, "signin");

    // Wait for user response after attempting login
    const user = await waitForUserResponse(); // This will wait until foundUserResponse is not null

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
