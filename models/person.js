const mongoose=require("mongoose");

//define the person schema

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,

    },
    work:{
        type:String,
        enum:["waiter","chef","manager"],//yhi teen value me se ek values le sakte
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    address:{
        type:String,

    },
    salary:{
        type:Number,
        required:true,
    }
});

const Person=mongoose.model("Person",personSchema);
module.exports=Person;