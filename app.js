// setup this is similar to when we use default tags in html
const express = require("express");
// have to use cors to host front end & back end on same device
var cors = require('cors');
// activate or tell this app variable to be an express server
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const Song = require('./models/songs')
app.use(cors());

app.use(bodyParser.json())

// grab all the songs in a database
router.get("/songs", function(req, res){
    let query = {}
    if(req.query.genre) {
        query = {genre : req.query.genre}
    }

    //to find all songs in a db, use the find() method build into mongo
    Song.find(query, function(err, songs){
        if(err){
            res.status(400).send(err)
        }
        else{
            res.json(songs)
        }
    })
})


/**making an api using routes
 routes are used to handle browser requests. They look like URLs. The difference is that when a browser requests a route, 
 it is dynamically handled by using a function
  */
 /**app.get("/", function(req, res) {
    res.send(
        "<a href='/api/songs'>Go to Songs</a>")
 })*/

// router.get("/songs", function(req, res){
//     const songs = [
//         {
//             title: "We Found Love",
//             artist: "Rhianna",
//             popularity: 10,
//             releaseDate: new Date(2011, 9, 22),
//             genre: ["electro house"]
//         },
//         {
//             title: "Happy",
//             artist: "Pharrell Williams",
//             popularity: 10,
//             releaseDate: new Date(2013, 11, 21),
//             genre: ["soul", "new soul"]
//         }
//     ];

//     res.json(songs);
// })


// all requests that usually use an api start with /api e.g. localhost:3000/api/songs
app.use("/api", router)
//start the web server
app.listen(3000)