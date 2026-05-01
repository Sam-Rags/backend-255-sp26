// setup this is similar to when we use default tags in html
const express = require("express");
// have to use cors to host front end & back end on same device
var cors = require('cors');
// activate or tell this app variable to be an express server
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const Song = require('./models/songs')
const User = require('./models/users')

app.use(cors());

app.use(bodyParser.json())
const secret = "supersecret"

// creating a new user
router.post("/user", async(req, res) =>{
    if(!req.body.username || !req.body.password) {
        res.status(400).json({error: "Missing username or password"})
    }

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    })

    try {
        await newUser.save()
        console.log(newUser)
        res.status(201).send("User created") //created
    }
    catch(err) {
        console.log(err)
        res.status(400).send(err)
    }

})

// grab all the songs in a database
router.get("/songs", async(req, res) => {
    try{
        const songs = await Song.find({})
        res.send(songs)
        console.log("Song list: " + songs)
    }
    catch (err) {
        console.log(err)
    }
})

// grab a single song in the DB
router.get("/songs/:id", async (req, res) => {
    try {
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch(err) {
        res.status(400).send(err)
    }
})

// adding a song to the DB
router.post("/songs", async(req, res) =>{
    try {
        const song = await new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log("Succesfully added song: " + song)
    }
    catch(err) {
        res.status(400).send(err)
    }
})

// an update is to update an existing record,resource,db entry. Uses a PUT request
router.put("/songs/:id", async(req, res) =>{
    //first we need to find & update the song the front end is asking for
    // to do this we need to request the ID of the song, from the request & then find it in the database & update it
    try {
        const song = req.body
        await Song.updateOne({_id: req.params.id}, song)
        console.log(song)
        res.sendStatus(204)
    }
    catch(err) {
        res.status(400).send(err)
    }
})

router.delete("/songs/:id", async(req, res) => {
    //mongo/mongoose fx to delete a single song object
    try {
        const song = await Song.findById(req.params.id)
        console.log(song)
        await Song.deleteOne({_id: song._id})
        res.sendStatus(204)
    }
    catch(err) {
        res.status(400).send(err)
    }
})


// all requests that usually use an api start with /api e.g. localhost:3000/api/songs
app.use("/api", router)
//listen on the env port (for a live server or 3000 for local)
var port = process.env.PORT || 3000
//start the web server
app.listen(port)