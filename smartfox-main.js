var config = {};
config.host = "127.0.0.1";
config.port = 8080;
config.debug = true;
config.useSSL = false;

sfs = new SFS2X.SmartFox(config);

sfs.logger.level = SFS2X.LogLevel.DEBUG;
sfs.logger.enableConsoleOutput = true;
sfs.logger.enableEventDispatching = true;

sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, this);
sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, onConnectionLost, this);
sfs.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, onExtensionResponse, this);
sfs.addEventListener(SFS2X.SFSEvent.LOGIN, onLogin, this);
sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, onLoginError, this);

sfs.connect();

var CMD_SUBMIT = "$SignUp.Submit";
var zoneName = "Worko";

function onConnection(event) {
    if (event.success) {
        console.log("Connected to SmartFoxServer 2X!<br>SFS2X API version: " + sfs.version);
    } else {
        console.log("Connection failed: " + (event.errorMessage ? event.errorMessage + " (" + event.errorCode + ")" : "Is the server running at all?"));

        reset();
    }
}

function onLogin(evt)
{
    console.log("Login successful; username is " + evt.user.name);
}
 
function onLoginError(evt)
{
    console.warn("Login failed: " + evt.errorMessage);
}

function onConnectionLost(event) {
    console.log("Disconnection occurred; reason is: " + event.reason);
    reset();
}

function onExtensionResponse(evt) {
    var cmd = evt.cmd;
    var sfso = evt.params;

    if (cmd == CMD_SUBMIT) {
        if (sfso.getBool("success"))
            console.log("Success, thanks for registering");
        else
            console.warn("SignUp error:" + sfso.getUtfString("errorMessage"));
    }

    if (cmd == "UserFoundResponse") {
        const success = sfso.getBool("success");

        if (success) {
            const userData = {
                username: sfso.getUtfString("username"),
                role: sfso.getUtfString("role"),
                status: sfso.getBool("status"),
            };

            onUserFoundResponse({
                status: success,
                userData: userData
            });
        } else {
            onUserFoundResponse({
                status: false
            });
        } 
    }
}

function reset() {
    sfs.removeEventListener(SFS2X.SFSEvent.CONNECTION, onConnection);
    sfs.removeEventListener(SFS2X.SFSEvent.CONNECTION_LOST, onConnectionLost);

    sfs = null;
}

function loginToSmartFox(username, password, email, age, role) {
    console.log("Loginning In to smartfox")
    var params = new SFS2X.SFSObject();
    params.putUtfString("email", email);
    params.putInt("age", age);
    params.putUtfString("role", role);
    sfs.send(new SFS2X.LoginRequest(username, password, params, zoneName));
}

function findUser(username, password) {
    console.log("Finding")
}
