document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const repeatPassword = document.getElementById('repeat-password').value;
  const role = document.getElementById('signup-role').value;
  const age = document.getElementById('signup-age').value;

  if (!username || !email || !password || !repeatPassword || !role || !age) {
    showAlert('Please fill in all fields.', 7000);
    return;
  }

  if (password !== repeatPassword) {
    showAlert('Sign-up failed. Passwords do not match.', 7000);
    return;
  }

  if (password == username) {
    showAlert('Sign-up failed. Username and password should not match.', 7000);
    return;
  }

  if (age < 5) {
    showAlert('We have high suspicion that you are not that young. If you are, have your parent/guardian or teacher contact us.', 7000);
    return;
  }

  if (age > 70) {
    showAlert('We have high suspicion that you are not that old. If you are, please contact us.', 7000);
    return;
  }

  var success = loginToSmartFox(email, password, "signup", username, age, role);

  if (success) {
    if (role === 'teacher') {
      window.location.href = 'teacher-dashboard.html';
    } else {
      window.location.href = 'student-dashboard.html';
    }
  } else {
    showAlert('Sign-up failed. Check your credentials and try again.', 7000);
  }
})
