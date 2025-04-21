

const express=require("express");
const {handleStaticGET,handlestaticPOST,handleStaticURLGET,handleStaticGETClickCount} = require("../controllers/staticController");

const staticRouter = express.Router();

staticRouter.get("/",handleStaticGET);
staticRouter.get("/analytics",handleStaticGETClickCount);
staticRouter.post("/",handlestaticPOST);
staticRouter.get("/:short",handleStaticURLGET);

module.exports=staticRouter;