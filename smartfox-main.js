// Create a new SmartFox instance
var sfs = new SmartFox();

// Connect to the server
sfs.connect("127.0.0.1", 9933);  // Use your server IP and port here

// Once connected, join a zone
sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, function(event) {
  if (event.success) {
    console.log("Connected to SmartFoxServer!");
    
    // Join the zone
    var zoneName = "YourZone"; // Name of the zone you created in SmartFoxServer
    sfs.send(new SFS2X.Requests.JoinRoomRequest(zoneName));
  } else {
    console.log("Connection failed: " + event.errorMessage);
  }
});

// Handle server messages (like report submission)
sfs.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, function(event) {
  var response = event.params;
  if (response.status === "success") {
    console.log("Report submitted successfully.");
  } else {
    console.log("Report submission failed.");
  }
});

// Send a report to the server
function submitReport(studentName, issue, details, fullStory) {
  var reportData = {
    studentName: studentName,
    issue: issue,
    details: details,
    fullStory: fullStory
  };
  sfs.send(new SFS2X.Requests.ExtensionRequest("submit_report", reportData));
}
