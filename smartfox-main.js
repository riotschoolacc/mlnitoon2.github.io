    // Create configuration object
    var config = {};
    config.host = "127.0.0.1";
    config.port = 9933;
    config.debug = false;
    config.useSSL = false;
 
    // Create SmartFox client instance
    sfs = new SFS2X.SmartFox(config);
 
    // Set logging
    sfs.logger.level = SFS2X.LogLevel.DEBUG;
    sfs.logger.enableConsoleOutput = true;
    sfs.logger.enableEventDispatching = true;
 
    // Add event listeners
    sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, this);
    sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, onConnectionLost, this);
 
    // Attempt connection
    sfs.connect();

function onConnection(event)
{
    if (event.success)
    {
        console.log("Connected to SmartFoxServer 2X!<br>SFS2X API version: " + sfs.version);
 
        // Show disconnect button
        switchButtons();
    }
    else
    {
        console.log("Connection failed: " + (event.errorMessage ? event.errorMessage + " (" + event.errorCode + ")" : "Is the server running at all?"));
 
        // Reset
        reset();
    }
}

function onConnectionLost(event)
{
    console.log("Disconnection occurred; reason is: " + event.reason);
    // Reset
    reset();
}
 
function reset()
{
 
    // Remove SFS2X listeners
    sfs.removeEventListener(SFS2X.SFSEvent.CONNECTION, onConnection);
    sfs.removeEventListener(SFS2X.SFSEvent.CONNECTION_LOST, onConnectionLost);
     
    sfs.logger.removeEventListener(SFS2X.LoggerEvent.DEBUG, onDebugLogged);
    sfs.logger.removeEventListener(SFS2X.LoggerEvent.INFO, onInfoLogged);
    sfs.logger.removeEventListener(SFS2X.LoggerEvent.WARNING, onWarningLogged);
    sfs.logger.removeEventListener(SFS2X.LoggerEvent.ERROR, onErrorLogged);
     
    sfs = null;
}
