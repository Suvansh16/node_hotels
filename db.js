//for connectivity
const mongoose=require("mongoose");
require("dotenv").config();
//define the mongodb connection url

//local url
const mongoURL=process.env.MONGODB_URL_LOCAL;

//atlas url
// const mongoURL=process.env.MONGODB_URL;


mongoose.connect(mongoURL);
//get the default connection
//mongoose maintains a default connection object representing the mongoDB connection
const db=mongoose.connection;


//define event listeners
db.on("connected",()=>{
    console.log("connected to mongodb server");
});
db.on("error",(err)=>{
    console.log("Mongodb connection error",err);
});
db.on("disconnected",()=>{
    console.log("Mongodb disconnected");
});

//export the databse connection
module.exports=db;
