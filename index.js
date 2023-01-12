//Install express server
const express = require("express");
const path = require("path");

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/fb-awana-app"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/fb-awana-app/index.html"));
});

// Start the app by listening on the default Heroku port

let profile = process.env?.ENV ? process.env?.ENV : "local";
if (profile === "prod") {
  profile = "PRODUCTION";
} else {
  profile = "LOCAL";
}

console.log(`Active Profile: ${profile}`);
app.listen(process.env.PORT || 8080);
