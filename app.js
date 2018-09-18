// RUN PACKAGES
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require("path");
const http = require('http');
const fs = require('fs');

// SETUP APP
const app = express();
const port = process.env.PORT || 3000;
app.use(fileUpload());
app.use('/', express.static(__dirname));

// ROUTES
app.get('/', function(req, res){
	res.sendFile('index.html');
});

app.post('/upload', function(req, res){
	if (!req.files.upload)
		return res.sendFile(path.join(__dirname + '/error.html'));
	var file = req.files.upload;
	file.mv('uploads/' + file.name, function(err) {
		if (err)
			return res.status(500).send(err);
	});
	res.sendFile(path.join(__dirname + '/success.html'));
});

// RUN SERVER
app.listen(port,function(){
	console.log(`Server listening on port ${port}`);
});