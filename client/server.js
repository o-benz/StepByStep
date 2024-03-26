const express = require('express');
const path = require('path');
const app = express();

// Serve only the static files from the dist directory
// Replace 'your-angular-project-name' with the name of your Angular project
app.use(express.static(__dirname + '/dist/client'));

app.get('/*', function(req, res) {
    
    res.sendFile(path.join(__dirname + '/dist/client/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log('Server started');
