function handleLogin(email, password, login_type, username, age, role) {
  return loginToSmartFox(email, password, login_type, username, age, role);
}

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

  if (age < 6) {
    showAlert('You are not that young.', 7000);
    return;
  }

  handleLogin(email, password, "signup", username, age, role).then(success => {
    if (success) {
      if (role === 'teacher') {
        window.location.href = 'teacher-dashboard.html';
      } else {
        window.location.href = 'student-dashboard.html';
      }
    } else {
      showAlert('Sign-up failed. Check your credentials and try again.', 7000);
    }
  });
});

  if (age < 6) {
    showAlert('You are not that young.', 7000);
    return;
  }

  const success = await handleLogin(email, password, "signup", username, age, role);
  if (success) {
    if (role === 'teacher') {
      window.location.href = 'teacher-dashboard.html';
    } else {
      window.location.href = 'student-dashboard.html';
    } 
  } else {
    showAlert('Sign-up failed. Check your credentials and try again.', 7000);
  }
});
