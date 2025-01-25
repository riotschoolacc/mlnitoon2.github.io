const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser || currentUser.role !== 'student') {
  alert('Access denied.');
  window.location.href = 'index.html';
}

document.getElementById('report-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Debugging: Check if form is being submitted
  console.log('Form submission triggered');

  const studentName = document.getElementById('student-name').value; // Get the reported student's name
  const reportText = document.getElementById('report-text').value;
  const issueType = document.getElementById('issue-type').value;
  const severityLevel = document.getElementById('severity-level').value;
  const incidentTime = document.getElementById('incident-time').value;
  const incidentLocation = document.getElementById('incident-location').value;
  const witnesses = document.getElementById('witnesses').value;
  const followUp = document.getElementById('follow-up').value;
  const anonymous = document.getElementById('anonymous').checked;

  // Check if any of the fields are empty
  if (!studentName || !reportText) {
    alert('Both the student name and the report text are required.');
    return;
  }

  // Retrieve or initialize the global reports array
  const reports = JSON.parse(localStorage.getItem('reports')) || [];
  const evidence = document.getElementById('evidence').files;
  const evidenceArray = Array.from(evidence).map(file => file.name); // Store file names
  
  // Create a new report with the correct student name
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

  // Add the report to the global array
  reports.push(newReport);
  localStorage.setItem('reports', JSON.stringify(reports));

  // Debugging: Check the created report and updated reports list
  console.log('Report submitted:', newReport);
  console.log('Updated reports:', reports);

  alert('Report submitted!');
  document.getElementById('report-form').reset();  // Clear the input fields

  // Refresh the reports display
  loadReports();
});

// Function to load and display the reports
function loadReports() {
  const reportList = document.getElementById('report-list');
  const reports = JSON.parse(localStorage.getItem('reports')) || [];

  // Filter reports submitted by the current student
  const studentReports = reports.filter(report => report.submittedBy === currentUser.username);

  // Debugging: Check the filtered student reports
  console.log('Student reports:', studentReports);

  // Display the reports in the list
  reportList.innerHTML = studentReports
    .map(report => `<li>${report.issue}</li>`)
    .join('');
}

// Load reports when the page loads
loadReports();
