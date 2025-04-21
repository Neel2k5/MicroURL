const urlModel = require("../models/urlModel");
const {handleGETbyShort,handlePOST,handleGETClickCount}=require("../controllers/urlRoutesController");
const express = require("express");

const urlRouter = express.Router();

urlRouter.get("/:short",
    handleGETbyShort
);
urlRouter.post("/",
    handlePOST
);
urlRouter.get("/analytics/:short",
    handleGETClickCount
)

module.exports = urlRouter;