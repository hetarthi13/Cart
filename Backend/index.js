import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import router from "./routes/UserRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import "./cron-job.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true })); // ✅ Allows parsing of FormData
app.use(express.json()); 


const PORT = process.env.PORT || 4000;
const MongoDBUrl = "mongodb+srv://admin:admin@cluster0.ftpyu.mongodb.net/"
// "mongodb+srv://hetarthimetizsoft:admin@jwt.dtcvr.mongodb.net/";
// mongodb+srv://admin:admin@cluster0.ftpyu.mongodb.net/CrudApp?retryWrites=true&w=majority&appName=Cluster0

// app.get("/stop-cron", (req, res) => {
//     task.stop();
//     res.send("Cron job has been stopped!");
// });

mongoose.connect(MongoDBUrl).then(() => {
    app.listen(PORT, () => {
        console.log("SERVER connected");
        
    })
}).catch((err) => {
    console.log(err);
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static("uploads"));

app.use('/api',router)  
app.use("/uploads", express.static(path.join(__dirname, "uploads")));