// const express = require("express");
import express from "express";
import bodyParser from "body-parser";
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
import cors from 'cors';
// const cors = require("cors");
// const mongoose = require("mongoose");
import mongoose from "mongoose";
import router from "./routes/UserRoute.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());


const PORT = process.env.PORT || 4000;
const MongoDBUrl = "mongodb+srv://hetarthimetizsoft:admin@jwt.dtcvr.mongodb.net/";
// mongodb+srv://admin:admin@cluster0.ftpyu.mongodb.net/CrudApp?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect(MongoDBUrl).then(() => {
    app.listen(PORT, () => {
        console.log("SERVER connected");
        
    })
}).catch((err) => {
    console.log(err);
})

// app.use('/api', require('./routes/UserRoute'))
app.use('/api',router)  