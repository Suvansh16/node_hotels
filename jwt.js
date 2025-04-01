const jwt=require("jsonwebtoken");

const jwtAuthMiddleware=(req,res,next)=>{

    //first check the request headers has authorization or not
    const authorization=req.headers.authorization;
    if(!authorization)
        return res.status(401).json({error:"token not found"});


  // extract the jwt token from the request headers
  const token=req.headers.authorization.split(' ')[1];
  if(!token)
    return res.status(401).json({error: "UNauthorized"});

  try{
    //verify the JWT token
    //ye return kya karega --payload jo ki information hai user ki wo return karega
    const decoded=jwt.verify(token,process.env.JWT_SECRET);

    //decoded value aage paas kar do
    //Attach user information to the request object
    //new key generate kar rahe
    // req.jwtPayload=decoded;  kuch bhi naam de sakte hai
    req.user=decoded;
    next();

  }
  catch(err)
  {
    console.error(err);
    res.status(401).json({error:"INVALID TOKEN"});

  }
}


//function to generate token

const generateToken=(userdata)=>{
    //generate a new JWT token using user data
    //expiry in 30 sec--optional
    return jwt.sign(userdata,process.env.JWT_SECRET,{expiresIn:3000});
}
module.exports={
    jwtAuthMiddleware,
    generateToken
};