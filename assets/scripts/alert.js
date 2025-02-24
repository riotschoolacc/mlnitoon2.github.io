function showAlert(message, duration = 5000) {
  const alertBox = document.getElementById('custom-alert');
  const alertMessage = document.querySelector('.alert-message');
  
  alertMessage.textContent = message;

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
    console.warn("Alert HTML is missing!");
    return;
  }
})();
