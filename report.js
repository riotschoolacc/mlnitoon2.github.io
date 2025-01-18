const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'student') {
  alert('Access denied.');
  window.location.href = 'index.html';
}

const reports = JSON.parse(localStorage.getItem('reports')) || [];

function loadReports() {
  const reportList = document.getElementById('report-list');
  const loading = document.getElementById('loading');
  const noReports = document.getElementById('no-reports');
  
  // Simulate async loading (could be a real fetch in practice)
  setTimeout(() => {
    loading.style.display = 'none'; // Hide loading text
    
    if (reports.length === 0) {
      noReports.style.display = 'block';
    } else {
      noReports.style.display = 'none';
      
      reportList.innerHTML = reports
        .map(report => `
          <li class="report-item">
            <strong>Reported Student:</strong> ${report.studentName} <br>
            <strong>Issue:</strong> ${report.issue} - ${report.details || 'N/A'} <br>
            <strong>Full Story:</strong> ${report.fullStory} <br>
            <strong>Submitted By:</strong> ${report.submittedBy}
          </li>
        `)
        .join('');
    }
  }, 500); // Simulate a delay for loading reports
}

loadReports();
