const express = require('express'); // Express 
//var fileupload = require("express-fileupload");
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

require("./db/database");


// Creating express object
const app = express();



// middleware body parser
app.use(express.json({extended:false}))
//app.use(fileupload());
app.use(cookieParser());


// Define Routes
app.use('/api/users', userRoutes);
// app.use('/api/users',require('./router/user'));
// app.use('/api/auth',require('./router/auth'));
// app.use('/api/characters',require('./router/character'));
// app.use('/api/characters/report',require('./router/report'));
//app.use('/api/relations',require('./routes/api/relation'));





app.use(notFound);
app.use(errorHandler);

// Initiallizing the app port 
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is Running at PORT ${PORT}`)
})