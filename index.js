const mongoose = require("mongoose");
const express = require("express");

const usercontroller = require("./controller/user.controller")

const connect = require("./config/db")




const app = express();
app.use(express.json())
app.use("users",usercontroller)

app.listen(8900,async()=>{

    console.log("I am listening on port 8900")
})