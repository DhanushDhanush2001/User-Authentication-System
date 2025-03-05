const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
dotenv.config({path:path.join(__dirname,"config/.env")});
const connectDatabase = require('./Config/database');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is listening in Port: ${process.env.PORT}`)
})

const auth = require('./routes/auth')
app.use('/api/v1/',auth);




module.exports = server