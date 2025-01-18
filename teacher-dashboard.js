const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'student') {
  alert('Access denied.');
  window.location.href = 'index.html';
}

document.getElementById('report-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const reportText = document.getElementById('report-text').value;

  if (!reportText) {
    alert('Report text cannot be empty.');
    return;
  }

  // Retrieve or initialize the global reports array
  const reports = JSON.parse(localStorage.getItem('reports')) || [];

  // Create a new report
  const newReport = {
    studentName: currentUser.username,
    issue: reportText,
    submittedBy: currentUser.username,
    fullStory: 'No details provided',
  };

  // Add the report to the global array
  reports.push(newReport);
  localStorage.setItem('reports', JSON.stringify(reports));

  console.log('Report submitted:', newReport);
  console.log('Updated reports:', reports);

  alert('Report submitted!');
  document.getElementById('report-text').value = '';
  loadReports();
});

function loadReports() {
  const reportList = document.getElementById('report-list');
  const reports = JSON.parse(localStorage.getItem('reports')) || [];

  // Filter reports submitted by the current student
  const studentReports = reports.filter(report => report.submittedBy === currentUser.username);

  console.log('Student reports:', studentReports);

  reportList.innerHTML = studentReports
    .map(report => `<li>${report.issue}</li>`)
    .join('');
}

loadReports();
