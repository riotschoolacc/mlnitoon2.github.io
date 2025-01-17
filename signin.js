document.getElementById('signin-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
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
  