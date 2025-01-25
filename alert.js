// Function to show custom alert
function showAlert(message, duration = 5000) {
  const alertBox = document.getElementById('custom-alert');
  const alertMessage = document.querySelector('.alert-message');
  
  // Set the message in the alert
  alertMessage.textContent = message;

  // Show the alert
  alertBox.style.display = 'block';

  // Auto-hide the alert after the specified duration
  setTimeout(function() {
    alertBox.style.display = 'none';
  }, duration);

  // Close the alert manually when the close button is clicked
  document.getElementById('alert-close-btn').addEventListener('click', function() {
    alertBox.style.display = 'none';
  });
}

// Function to initialize the alert (can be called anywhere)
(function initializeAlert() {
  // Ensure the alert box is present in the DOM
  if (!document.getElementById('custom-alert')) {
    console.warn("Custom alert HTML is missing!");
    return;
  }
})();
