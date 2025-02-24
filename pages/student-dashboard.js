const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser || currentUser.role !== 'student') {
  alert('Access denied.');
  window.location.href = 'index.html';
}

document.getElementById('report-form').addEventListener('submit', function (e) {
  e.preventDefault();

  console.log('Form submission triggered');

  const studentName = document.getElementById('student-name').value;
  
  const reportText = document.getElementById('report-text').value;
  
  const issueType = document.getElementById('issue-type').value;
  const severityLevel = document.getElementById('severity-level').value;
  
  const incidentTime = document.getElementById('incident-time').value;
  const incidentLocation = document.getElementById('incident-location').value;
  
  const witnesses = document.getElementById('witnesses').value;
  
  const followUp = document.getElementById('follow-up').value;
  
  const anonymous = document.getElementById('anonymous').checked;

  if (!studentName || !reportText) {
    alert('Both the student name and the report text are required.');
    return;
  }

  const reports = JSON.parse(localStorage.getItem('reports')) || [];
  const evidence = document.getElementById('evidence').files;
  const evidenceArray = Array.from(evidence).map(file => file.name); 
  
  const newReport = {
    studentName: studentName,
    issue: issueType,
    severityLevel: severityLevel,
    incidentTime: incidentTime,
    incidentLocation: incidentLocation,
    witnesses: witnesses,
    followUp: followUp,
    anonymous: anonymous,
    fullStory: reportText || 'No details provided',
    submittedBy: currentUser.username,
    evidence: evidenceArray,
  };

  reports.push(newReport);
  localStorage.setItem('reports', JSON.stringify(reports));

  console.log('Report submitted:', newReport);
  console.log('Updated reports:', reports);

  alert('Report submitted!');
  document.getElementById('report-form').reset();

  loadReports();
});

function loadReports() {
  const reportList = document.getElementById('report-list');
  const reports = JSON.parse(localStorage.getItem('reports')) || [];

  const studentReports = reports.filter(report => report.submittedBy === currentUser.username);

  console.log('Student reports:', studentReports);

  reportList.innerHTML = studentReports
    .map(report => `<li>${report.issue}</li>`)
    .join('');
}

loadReports();
