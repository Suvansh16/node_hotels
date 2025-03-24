const express=require("express");
const router=express.Router();
const MenuItem=require("../models/MenuItem");
const { findByIdAndDelete } = require("../models/person");

router.post("/",async (req,res)=>{
    try{
        const data=req.body;
        const new_menu=new MenuItem(data);
        const response=await new_menu.save();
        console.log("data inserted");
        res.status(500).json(response);
    }
    catch(err){
        console.log(err);
        res.status(404).json({error:"internal error"});
    }
});
router.get("/",async(req,res)=>{
    try{
        const data=await MenuItem.find({});
        console.log("data fetched");
        res.status(500).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

router.get("/:taste",async(req,res)=>{
    try{
    const tastei=req.params.taste;
    if(tastei=="sweet" || tastei=="sour" || tastei=="spicy"){
        const response=await MenuItem.find({taste:tastei});
        res.status(200).json(response);
    }
    else
    {
        res.status(404).json({error:"404 not found"});
    }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

router.put("/:id",async(req,res)=>{
    try{
    const id=req.params.id;
    const updated_data=req.body;
    const response=await MenuItem.findByIdAndUpdate(id,updated_data,{
        new:true,
        runValidators:true
    });
    if(!response){
        res.status(404).json({message:"person not found"});
    }
    console.log("data updated");
    res.status(200).json(response);
}
catch(err){
    console.log(err);
    res.status(500).json({error:"internal server error"});
}

});


router.delete("/:id",async(req,res)=>{
    try{
    const id=req.params.id;
    const response=await MenuItem.findByIdAndDelete(id);
    if(!response)
    {
        res.status(404).json({message:"not found"});
    }
    res.status(200).json({message:"deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }

})

//comment added for testing purpose


module.exports=router;