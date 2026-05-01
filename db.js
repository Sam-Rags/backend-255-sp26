// mongoose import statement & the URL of our hosted DB w/ username/pw in the url
const {MongoClient, ServerApiVersion } = require('mongodb')
const mongoose = require('mongoose')

async function run() {
    try{
await mongoose.connect("mongodb://127.0.0.1:27017/songs")
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
