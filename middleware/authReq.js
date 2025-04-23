const jwt = require("jsonwebtoken");
const SECRET_CONTEXT = process.env.JWT_SECURITY_CONTEXT;



function verifyJWT(req,res,next){
    const jwToken=req.cookies.token;
   
    if(!jwToken)return res.status(401).render("login",{message:null,error:"Acess Denied, Log In to acess"});
    try{
        const decodedJWT = jwt.verify(jwToken,SECRET_CONTEXT);
        req.user=decodedJWT;
        next();
    }
    catch (err){
        return res.status(401).render("login",{message:null,error:"Acess Denied by middleware, Log In to acess"});
    }
}

function verifyJWTforAPI(req,res,next){
    const jwToken=req.cookies.token;
   
    if(!jwToken)return res.status(401).json({error:"Unauthorised"});
    try{
        const decodedJWT = jwt.verify(jwToken,SECRET_CONTEXT);
        req.user=decodedJWT;
        next();
    }
    catch (err){
        return res.status(401).json({error:"Unauthorised"});;
    }
}

module.exports = {verifyJWT,verifyJWTforAPI};