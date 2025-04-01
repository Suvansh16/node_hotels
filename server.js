const express=require("express");
const app=express();
const db=require("./db");
require("dotenv").config();

const passport=require("./auth");


const bodyParser=require("body-parser");
app.use(bodyParser.json())//body parser store the data in req.body
app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.json()); // For JSON data


//middle ware function
const logRequest= (req,res,next)=>{
        console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();
};


app.use(logRequest);



//authetication


app.use(passport.initialize());

const localAuthMiddleware=passport.authenticate("local",{session:false});

app.get("/", localAuthMiddleware ,function (req,res){
    res.send("welcome to our hotel");
})


const PORT=process.env.PORT || 3000;

//import the router file
const personRoutes=require("./routes/personRoutes");
//use the routes
app.use("/person" ,personRoutes);

//import menu router
const menuRoutes=require("./routes/menuItemRoutes");
const Person = require("./models/person");
//use menu routes
app.use("/menuitem" ,menuRoutes);



app.listen(PORT,()=>{
    console.log("listening on port 3000");
})