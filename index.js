const compression = require('compression');
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
// Gzip
app.use(compression());

// Serve static files from the dist directory
app.use(express.static(__dirname + '/dist/fbl-church-app'));

// Return index.html for all GET requests for PathLocationStrategy
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/fbl-church-app/index.html'));
});

console.log('Application Succesfully Started!');
app.listen(process.env.PORT || 8080);
