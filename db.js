// mongoose import statement & the URL of our hosted DB w/ username/pw in the url
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://sdev255:passw0rd255@songdb.uyxggks.mongodb.net/?appName=SongDB",{useNewURLParser: true})

// export statement to allow this to be imported by other modules
module.exports = mongoose