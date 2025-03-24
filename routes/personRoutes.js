const express=require("express");
const router=express.Router();
const Person=require("../models/person");

router.post("/",async(req,res)=>{
    try{
    const data=req.body;//assuming the body contains the person data

    //create a new person document using the mongoose model
    const newPerson= new Person(data);
   
    //save teh new person to the database
    const response=await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
     }
     catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
     }
})


router.get("/",async (req,res)=>{
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
        res.status(500).json(response);
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
