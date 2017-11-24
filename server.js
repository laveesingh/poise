const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));

//Setting a static path.
// app.use(express.static(path.join((__dirname, "./public"))));

//Requiring the routes from the controllers.js file
require("./controllers/experienceController.js")(app);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/poiseDb",
	{
		useMongoClient: true
	}
	);

// Start the API server
app.listen(PORT, function() {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
