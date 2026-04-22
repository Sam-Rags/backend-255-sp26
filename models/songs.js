// Import statement for the db.js located one folder up
const db = require("../db")

// This is the model for a song entry in the database
const Song = db.model("Song",{
    title:{type:String, required:true},
    artist: String,
    popularity:{type:Number, min:1, max:10},
    releaseDate:{type:Date, default:Date.now},
    genre: [String]
})

// export statement for the Song module
module.exports = Song