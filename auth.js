const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const Person=require("./models/person");


//authetication
passport.use(new LocalStrategy(async (username,password,done)=>{
    //authetication logic here

    try{
       // console.log("Received Credentials:",username,password);
        const user=await Person.findOne({username});
        if(!user)
            return  done(null,false,{message:"INCORRECT USERNAME"});
        const isPasswordMatch= await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);
        }
        else
        {
            return done(null,false,{message:"INCORRECT Password"});
        }
    }
    catch(error){
        return done(error);
    }
}));

module.exports=passport;