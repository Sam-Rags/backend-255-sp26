// setup this is similar to when we use default tags in html
const express = require("express");
// activate or tell this app variable to be an express server
const app = express();
const router = express.Router();

//start the web server
app.listen(3000, function() {
    console.log("Listening on port 3000")
})
/**making an api using routes
 routes are used to handle browser requests. They look like URLs. The difference is that when a browser requests a route, 
 it is dynamically handled by using a function
  */

// GET or a regular request when someone goes to http://localhost:3000/hello, when using a fx in a route, almost always have a parameter or handle a response & request
