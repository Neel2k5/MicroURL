const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_CONTEXT = process.env.JWT_SECURITY_CONTEXT;

function handleSignUpGET(req,res){
    return res.status(200).render("signUp",{error:null,message:null});
}
function handleLogInGET(req,res){
    return res.status(200).render("logIn",{error:null,message:null});
}

async function handleLogInPOST(req,res){
    const {userName,password} = req.body;

    const existanceCheck = await userModel.find({"userName":userName},{"_id":0});
    if(existanceCheck.length==0) return res.status(404).render("signUp",{error:"User does not exists"});
    

    bcrypt.compare(password,existanceCheck[0].password,(err, match)=>{
        if(err) {
            return res.status(500).render("logIn",{error:"Internal Server Error",message:null});
        }
        if(!match) return res.status(400).render("logIn",{error:"Invalid Credentials",message:null});
        const jwToken = jwt.sign({userName:userName},SECRET_CONTEXT,{expiresIn:"2h"});
        
        res.cookie("token",jwToken,{
            maxAge:2*3600000,
            httpOnly:true,
        }).redirect("/");
    });
    


}
async function handleSignUpPOST(req,res){
    const {userName ,eMail , password}= req.body;
    const existanceCheck = await userModel.find({"eMail":eMail,"userName":userName},{"_id":0});
    if(existanceCheck.length!=0) return res.status(409).render("signUp",{error:"User with same username or email already exists"});

    const pwdHash = await bcrypt.hash(password,10);
    const result = await userModel.create({
        userName:userName,
        eMail:eMail,
        password:pwdHash,
    })
    .then(
        ()=>{
            
            return res.status(200).render("logIn",{error:null,message:"Sucessfully Signed in, Log in to your account"});
        }
    )
    .catch((err)=>{
        //do something more with the error, log it
        console.log(err);
        return res.status(500).render("signUp",{error:"Internal Server Error"});
    });

}


module.exports={handleSignUpGET,handleSignUpPOST,handleLogInGET,handleLogInPOST};