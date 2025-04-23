const express=require("express");
const {handleSignUpGET,handleSignUpPOST,handleLogInGET,handleLogInPOST} = require("../controllers/authController");


const authRouter = express.Router();

authRouter.get("/signup",handleSignUpGET);
authRouter.get("/login",handleLogInGET);
authRouter.post("/signup",handleSignUpPOST);
authRouter.post("/login",handleLogInPOST);

module.exports = authRouter;
