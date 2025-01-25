document.getElementById('signup-role').addEventListener('change', function () {
  const classCodeField = document.getElementById('signup-class');
  if (this.value === 'student') {
    classCodeField.classList.remove('hidden');
  } else {
    classCodeField.classList.add('hidden');
  }
});

document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const repeatPassword = document.getElementById('repeat-password').value;
  const role = document.getElementById('signup-role').value;
  const age = document.getElementById('signup-age').value;

  // Check if passwords match
  if (password !== repeatPassword) {
    showAlert('Sign-up failed. Passwords do not match.', 7000);
    return;
  }

  success = signup(username, email, password, age, role)

  // Auto-sign-in
  localStorage.setItem('currentUser', JSON.stringify({ username, role, email, age}));

  // Redirect based on role
  if (role === 'teacher') {
    window.location.href = 'teacher-dashboard.html';
  } else {
    window.location.href = 'student-dashboard.html';
  }
});
