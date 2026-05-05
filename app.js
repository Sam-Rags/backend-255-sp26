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

//authenticate or login; post request - because login is creating a new 'session'
//may usually be a function but we will make async here
router.post("/auth", async(req, res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400).json({error: "Missing username or password"})
        return
    }
    //try to find the username in DB & see if it matches w/ a username/password
    //await finding a user 
    let user = await User.findOne({username : req.body.username}) 
        // if cannot find user
        if (!user) {
            res.status(401).json({error: "Bad Username"})
        }
        //check to see if user's password matches the request password
        else {
            if (user.password != req.body.password) {
                res.status(401).json({error: "Bad password"})
            }
            // successful login
            else {
                //create a token that is encoded w/ jwt library, send back the username (important later)
                // we also will send back as part of the token that you are currently authorized
                // can do this with a boolean or number value; e.g. if auth = 0 you are not authorized, if auth = 1 you are authorized
                username2 = user.username
                const token = jwt.encode({username: user.username}, secret)
                const auth = 1

                // respond with the token
                res.json({
                    username2,
                    token: token,
                    auth: auth
                })
            }
        }
    })

// check status of a user w/ a valid token & see if it matches front end token
router.get("/status", async(req, res) =>{
    if(!req.headers["x-auth"]) {
        return res.status(401).json({error: "Missing X-Auth"})
    }

    // if x-auth contains the token (it shoudl)
    const token = req.headers["x-auth"]
    try {
        const decoded = jwt.decode(token, secret)
        // send back all username & status fields to user or front end
        let users = User.find({}, "username status")
        res.json(users)
    }
    catch (ex) {
        res.status(401).json({error: "Invalid JWT token"})
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