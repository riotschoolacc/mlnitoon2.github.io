    // Create configuration object
    var config = {};
    config.host = "127.0.0.1";
    config.port = 9933;
    config.debug = true;
    config.useSSL = false;
 
    // Create SmartFox client instance
    sfs = new SFS2X.SmartFox(config);
 
    // Set logging
    sfs.logger.level = SFS2X.LogLevel.DEBUG;
    sfs.logger.enableConsoleOutput = true;
    sfs.logger.enableEventDispatching = true;
 
    sfs.logger.addEventListener(SFS2X.LoggerEvent.DEBUG, onDebugLogged, this);
    sfs.logger.addEventListener(SFS2X.LoggerEvent.INFO, onInfoLogged, this);
    sfs.logger.addEventListener(SFS2X.LoggerEvent.WARNING, onWarningLogged, this);
    sfs.logger.addEventListener(SFS2X.LoggerEvent.ERROR, onErrorLogged, this);
 
    // Add event listeners
    sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, this);
    sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, onConnectionLost, this);
 
    // Attempt connection
    sfs.connect();

function onConnection(event)
{
    if (event.success)
    {
        trace("Connected to SmartFoxServer 2X!<br>SFS2X API version: " + sfs.version);
 
        // Show disconnect button
        switchButtons();
    }
    else
    {
        trace("Connection failed: " + (event.errorMessage ? event.errorMessage + " (" + event.errorCode + ")" : "Is the server running at all?"));
 
        // Reset
        reset();
    }
}

function onConnectionLost(event)
{
    trace("Disconnection occurred; reason is: " + event.reason);
 
    // Hide disconnect button
    switchButtons();
 
    // Reset
    reset();
}
 
function reset()
{
    // Enable interface
    enableInterface(true);
 
    // Remove SFS2X listeners
    sfs.removeEventListener(SFS2X.SFSEvent.CONNECTION, onConnection);
    sfs.removeEventListener(SFS2X.SFSEvent.CONNECTION_LOST, onConnectionLost);
     
    sfs.logger.removeEventListener(SFS2X.LoggerEvent.DEBUG, onDebugLogged);
    sfs.logger.removeEventListener(SFS2X.LoggerEvent.INFO, onInfoLogged);
    sfs.logger.removeEventListener(SFS2X.LoggerEvent.WARNING, onWarningLogged);
    sfs.logger.removeEventListener(SFS2X.LoggerEvent.ERROR, onErrorLogged);
     
    sfs = null;
}
