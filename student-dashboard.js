const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'student') {
  alert('Access denied.');
  window.location.href = 'index.html';
}

const users = JSON.parse(localStorage.getItem('users'));
const user = users.find(u => u.username === currentUser.username);

document.getElementById('report-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const reportText = document.getElementById('report-text').value;

  user.reports.push({ text: reportText, student: currentUser.username });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Report submitted!');
  document.getElementById('report-text').value = '';
  loadReports();
});

function loadReports() {
  const reportList = document.getElementById('report-list');
  reportList.innerHTML = user.reports.map(report => `<li>${report.text}</li>`).join('');
}

loadReports();
