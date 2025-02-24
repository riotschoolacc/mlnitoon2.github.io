const users = [];
const reports = [];

let currentUser = null;

const signupForm = document.getElementById('signup-form');
const signinForm = document.getElementById('signin-form');

const authContainer = document.getElementById('auth-container');

const dashboard = document.getElementById('dashboard');

const userRoleEl = document.getElementById('user-role');
const userNameEl = document.getElementById('user-name');

const teacherDashboard = document.getElementById('teacher-dashboard');
const studentDashboard = document.getElementById('student-dashboard');

const pendingRequestsEl = document.getElementById('pending-requests');
const incidentReportsEl = document.getElementById('incident-reports');

const reportForm = document.getElementById('report-form');

const studentReportsEl = document.getElementById('student-reports');

function renderDashboard() {
  userRoleEl.textContent = currentUser.role;
  userNameEl.textContent = currentUser.username;
  authContainer.classList.add('hidden');
  dashboard.classList.remove('hidden');

  if (currentUser.role === 'teacher') {
    teacherDashboard.classList.remove('hidden');
    studentDashboard.classList.add('hidden');
    renderTeacherDashboard();
  } else {
    teacherDashboard.classList.add('hidden');
    studentDashboard.classList.remove('hidden');
    renderStudentDashboard();
  }
}

function renderTeacherDashboard() {
  pendingRequestsEl.innerHTML = '';
  incidentReportsEl.innerHTML = '';

  users
    .filter(user => user.role === 'student' && user.classCode === currentUser.classCode && !user.approved)
    .forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.username} (Class: ${user.classCode})`;
      const approveBtn = document.createElement('button');
      approveBtn.textContent = 'Approve';
      approveBtn.onclick = () => {
        user.approved = true;
        renderTeacherDashboard();
      };
      li.appendChild(approveBtn);
      pendingRequestsEl.appendChild(li);
    });

  reports
    .filter(report => report.classCode === currentUser.classCode)
    .forEach(report => {
      const li = document.createElement('li');
      li.textContent = `${report.incident} (Reported by: ${report.reporter})`;
      incidentReportsEl.appendChild(li);
    });
}

function renderStudentDashboard() {
  studentReportsEl.innerHTML = '';
  reports
    .filter(report => report.reporter === currentUser.username)
    .forEach(report => {
      const li = document.createElement('li');
      li.textContent = report.incident;
      studentReportsEl.appendChild(li);
    });
}

signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  const role = document.getElementById('signup-role').value;
  const classCode = document.getElementById('signup-class').value;

  if (role === 'student' && !classCode) {
    alert('Students must provide a class code.');
    return;
  }

  users.push({ username, password, role, classCode, approved: role === 'teacher' });
  alert('Signup successful!');
  signupForm.reset();
});

signinForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('signin-username').value;
  const password = document.getElementById('signin-password').value;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    alert('Invalid credentials.');
    return;
  }

  if (user.role === 'student' && !user.approved) {
    alert('Awaiting teacher approval.');
    return;
  }

  currentUser = user;
  renderDashboard();
});

reportForm.addEventListener('submit', e => {
  e.preventDefault();
  const incident = document.getElementById('incident-text').value;
  reports.push({ incident, reporter: currentUser.username, classCode: currentUser.classCode });
  renderStudentDashboard();
  reportForm.reset();
});
