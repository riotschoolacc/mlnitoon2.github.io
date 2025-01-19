document.getElementById('signin-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === username && u.password === password);
  
    if (user) {
    loginToSmartFox(username, password);
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert(`Signed in successfully as ${user.role}!`);
  
      // Redirect based on role
      if (user.role === 'teacher') {
        window.location.href = 'teacher-dashboard.html';
      } else {
        window.location.href = 'student-dashboard.html';
      }
    } else {
      alert('Invalid username or password.');
    }
  });
  
