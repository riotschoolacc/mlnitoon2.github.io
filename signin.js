document.getElementById('signin-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    loginToSmartFox(username, password);
    
    const user = findUser(u.email, u.password)
  
    if (user) {
      if (user.role === 'teacher') {
        window.location.href = 'teacher-dashboard.html';
      } else {
        window.location.href = 'student-dashboard.html';
      }
    } else {
      showAlert('Sign-in failed. Please check your credentials.', 7000);
    }
  });
  
