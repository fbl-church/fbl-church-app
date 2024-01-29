const compression = require('compression');
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
// Gzip
app.use(compression());

// Serve static files from the dist directory
app.use(express.static(__dirname + '/dist/fbl-church-app'));

// Start the app by listening on the default Heroku port
app.listen(port);

// Return index.html for all GET requests for PathLocationStrategy
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/fbl-church-app/index.html'));
});
console.log(`Server listening on ${port}`);
