const express = require('express'); // Express 
//var fileupload = require("express-fileupload");

require("./db/database");


// Creating express object
const app = express();



// middleware body parser
app.use(express.json({extended:false}))
//app.use(fileupload());

// Define Routes
//app.use('/api/users',require('./router/user'));
 app.use('/api/auth',require('./router/userRoutes'));
// app.use('/api/characters',require('./router/character'));
// app.use('/api/characters/report',require('./router/report'));
//app.use('/api/relations',require('./routes/api/relation'));






// Initiallizing the app port 
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is Running at PORT ${PORT}`)
})