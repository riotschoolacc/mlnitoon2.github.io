const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'teacher') {
  alert('Access denied.');
  window.location.href = 'index.html';
}

const reports = JSON.parse(localStorage.getItem('reports')) || [];

// Set the welcome message with the teacher's name
const welcomeMessage = document.getElementById('welcome-message');
if (currentUser && currentUser.name) {
  welcomeMessage.innerHTML = `Welcome, ${currentUser.name}`;
}

function loadReports() {
  const reportList = document.getElementById('report-list');
  const loading = document.getElementById('loading');
  
  // Show the loading circle (animated SVG)
  loading.style.display = 'block';
  
  // Simulate async loading (could be a real fetch in practice)
  setTimeout(() => {
    // Hide loading circle and show the report list
    loading.style.display = 'none';
    reportList.classList.remove('hidden');
    
    // If there are no reports, show "No reports available."
    if (reports.length === 0) {
      reportList.innerHTML = '<li>No reports available.</li>';
    } else {
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
  }, 500); // Simulate a delay for loading reports (1.5 seconds)
}

loadReports();
