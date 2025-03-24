//for connectivity
const mongoose=require("mongoose");

//define the mongodb connection url
const mongoURL="mongodb://localhost:27017/hotels";

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
