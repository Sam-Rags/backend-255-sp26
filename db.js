// mongoose import statement & the URL of our hosted DB w/ username/pw in the url
const mongoose = require('mongoose')
//const {MongoClient, ServerApiVersion} = require('mongodb')
// const uri = "mongodb+srv://sdev255:password23@songdb.uyxggks.mongodb.net/admin?appName=SongDB"
async function run() {
    try{
await mongoose.connect("mongodb://localhost/songs", {useNewUrlParser: true, useUnifiedTopology: true})
        console.log("Successfully connected to DB")
    } catch (err) {
        console.error(err)
    } 
    }

    
run().catch(console.dir)
module.exports = mongoose




/**
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ping: 1})
        console.log("Pinged deployement. You successfully connected to MongoDB!")
    } catch (err) {
        console.error(err);
    }
}
run().catch(console.dir)
*/




// export statement to allow this to be imported by other modules
