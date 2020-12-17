// import express from 'express';
// import body from 'body-parser';
// import mongoose from 'mongoose';
// import cors from 'cors';
const express = require('express')
const body = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const postsRouter = require('./routes/posts')
const dotenv = require('dotenv')

const app = express();
dotenv.config();


app.use(body.json({ limit: "30mb", extended: true }));
app.use(body.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postsRouter)

app.get('/', (req, res) => {
    res.send('Hello to Memories API')
})

//mongodb
// change password
const CONNECTION_URL = 'mongodb+srv://watunyu41:watunyu41@the-memorise.ooyb3.mongodb.net/postApp?retryWrites=true&w=majority'
//const CONNECTION_URL = 'mongodb+srv://watunyu41:watunyu41@the-memorise.ooyb3.mongodb.net/<dbname>?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server runnin on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

//make sure  that we dont get any warning in the console.
mongoose.set('useFindAndModify', false);