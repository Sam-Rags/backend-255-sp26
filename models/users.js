// Import statement for the db.js located one folder up
const db = require("../db");

// This is the model for a song entry in the database
const User = db.model("User", {
    username: {type: String, required: true},
    password: {type: String, required: true},
    status: String
})

// export statement for the Song module
module.exports = User;