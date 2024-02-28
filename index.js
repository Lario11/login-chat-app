const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require ('./routes/posts');
const path = require('path');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

//Connect to Mongo
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));  
    
//Middleware
app.use(express.json())



//Routes Middleware 
app.use('/auth', authRoute);
app.use('/api/posts', postRoute);


app.use(express.static(path.join(__dirname, 'public')));

app.listen(5000, () => console.log(`Server up and running!`))
