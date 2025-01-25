function showAlert(message, duration = 5000) {
  const alertBox = document.getElementById('custom-alert');
  const alertMessage = document.querySelector('.alert-message');
  
  // Set the message in the alert
  alertMessage.textContent = message;

  // Show the alert
  alertBox.style.display = 'block';

  setTimeout(function() {
    alertBox.style.display = 'none';
  }, duration);

  document.getElementById('alert-close-btn').addEventListener('click', function() {
    alertBox.style.display = 'none';
  });
}

(function initializeAlert() {
  if (!document.getElementById('custom-alert')) {
    console.warn("Custom alert HTML is missing!");
    return;
  }
})();
