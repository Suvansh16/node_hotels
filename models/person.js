const mongoose=require("mongoose");
const bcrypt=require("bcrypt");


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
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
personSchema.pre("save",async function(next){
    const person=this;

    //hash the password only if it has been modified (or is new)
    if(!person.isModified("password")) return next();

    try{
        //hash password generation
        const salt=await bcrypt.genSalt(10);
        //hash password
        const hashedPassword=await bcrypt.hash(person.password,salt);

        //override the plain password within the hashed one
        person.password=hashedPassword

        next();
    }
    catch(err){
        return next(err);
    }
   
});

personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with the hashed password
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;

    }
    catch(err){
        throw err;
    }
//comapre fxn salt extract karega usse phir milake password generate karega phir compare karega barabar hai ki nhi password 
}
const Person=mongoose.model("Person",personSchema);
module.exports=Person;