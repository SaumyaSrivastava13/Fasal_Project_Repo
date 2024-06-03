require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const playlistRoutes = require("./routes/playlist");
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/movie_users')
.then(()=>{console.log("DB Connected")})
.catch((err)=>{console.log(err)});

// middlewares
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", playlistRoutes);

let PORT=8080;
app.listen(8080,()=>{
    console.log(`server connected at port at ${PORT}`)
})


