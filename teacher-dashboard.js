const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'teacher') {
  alert('Access denied.');
  window.location.href = 'index.html';
}

// Set the welcome message with the teacher's name
const welcomeMessage = document.getElementById('welcome-message');
if (currentUser && currentUser.name) {
  welcomeMessage.innerHTML = `Welcome, ${currentUser.name}`;
}

function loadReports() {
  const reportList = document.getElementById('report-list');
  const loading = document.getElementById('loading');

  // Retrieve the reports array from localStorage
  const reports = JSON.parse(localStorage.getItem('reports')) || [];

  console.log('All reports:', reports);

  loading.style.display = 'block';

  setTimeout(() => {
    loading.style.display = 'none';
    reportList.classList.remove('hidden');

    if (reports.length === 0) {
      reportList.innerHTML = '<li>No reports available.</li>';
    } else {
      reportList.innerHTML = reports
        .map(report => `
          <li class="report-item">
            <strong>Reported Student:</strong> ${report.studentName} <br>
            <strong>Issue:</strong> ${report.issue} <br>
            <strong>Full Story:</strong> ${report.fullStory || 'N/A'} <br>
            <strong>Submitted By:</strong> ${report.submittedBy}
          </li>
        `)
        .join('');
    }
  }, 500);
}

loadReports();
