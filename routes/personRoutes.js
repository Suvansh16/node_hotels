const express=require("express");
const router=express.Router();
const Person=require("../models/person");
const { jwtAuthMiddleware,generateToken}=require("./../jwt");


router.post("/signup",async(req,res)=>{
    try{
    const data=req.body;//assuming the body contains the person data

    //create a new person document using the mongoose model
    const newPerson= new Person(data);
   
    //save teh new person to the database
    const response=await newPerson.save();
    console.log("data saved");

    const payload={
        id:response.id,
        username:response.username
    }
    console.log(JSON.stringify(payload));
    const token=generateToken(payload);
    console.log("Token is :",token);

    res.status(200).json({response:response , token:token});
     }
     catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
     }
})


// jab token expire ho jayga to hum user se phorse signup ko nhi bolenge hum login karake token bhej denge
//login route
router.post("/login",async (req,res)=>{
    try{

        //extract theusername and password from request body
        const {username,password}=req.body;

        //find the user by username
        const user =await Person.findOne({username:username});

        //if the user does not exist or password does not match return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:"invalid username or password"});
        }

        //generate token
        const payload={
            id:user.id,
            username:user.username
        }
        const token=generateToken(payload);
        //return token as response
        res.json({token});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"internal server error"});
    }
});

//PROFILE ROUTE
router.get("/profile",jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData=req.user;
        console.log("user data ",userData);
        const userId=userData.id;
        const user=await Person.findById(userId);
        res.status(200).json({user});

    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({error:"internal server error"});
    }

})

//get method to get the person
router.get("/", jwtAuthMiddleware,async (req,res)=>{
    try{
        const data=await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

//parameterised call
router.get("/:workType",async (req,res)=>{
    try{
    const workType=req.params.workType;
    if(workType=="chef" ||  workType=="waiter" || workType=="manager"){
        const response=await Person.find({work:workType});
        res.status(200).json(response);
    }
    else
    {
      res.status(400).json({error:"invalid work type"});
    }
      }
      catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})



//update
router.put("/:id",async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body;
        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true , //return the updated data
            runValidators:true // run mongoose validation
        })
        if(!response){
            return res.status(404).json({error:"Person not found"});
        }
        console.log("data updated");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})


//delete
router.delete("/:id",async(req,res)=>{
    try{
    const id=req.params.id;
    const response=await Person.findByIdAndDelete(id);
    if(!response){
        return res.status(404).json({error:"Person not found"});
    }
    console.log("data deleted ");
    res.status(200).json({message:"data deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})
module.exports=router;
