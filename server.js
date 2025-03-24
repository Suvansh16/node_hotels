const express=require("express");
const app=express();
const db=require("./db");




const bodyParser=require("body-parser");
app.use(bodyParser.json())//body parser store the data in req.body


app.get("/",(req,res)=>{
    res.send("welcome to our hotel");
})




//import the router file
const personRoutes=require("./routes/personRoutes");
//use the routes
app.use("/person",personRoutes);

//import menu router
const menuRoutes=require("./routes/menuItemRoutes");
//use menu routes
app.use("/menuitem",menuRoutes);

app.listen(3000,()=>{
    console.log("listening on port 3000");
})