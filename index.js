
const MONGOURL="mongodb://localhost:27017/microURL";


const express= require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT||8081;

const {verifyJWT,verifyJWTforAPI} = require("./middleware/authReq");
const {connectMongoDB}= require("./connection");
const urlRouter = require("./routes/urlRoutes");
const staticRouter = require("./routes/staticRoutes");
const authRouter = require("./routes/authRoutes");



connectMongoDB(MONGOURL).then(
    ()=>{
        console.log("Sucessfully connected to mongodb");
    }
    ).catch((err)=>{
        console.log(`Could not connect to mongodb : ${err}`);
    });


const apiObj = express();
//MiddleWare
apiObj.use(express.urlencoded({extended:true}));
apiObj.use(express.json());
apiObj.use(cookieParser());

//SSR
apiObj.set("view engine","ejs");
apiObj.set("views",path.resolve("./views"));

//Routes
apiObj.use("/auth/",authRouter);

apiObj.use("/",verifyJWT,staticRouter);

apiObj.use("/api/",verifyJWTforAPI,urlRouter);

apiObj.listen(PORT,()=>{console.log(`Server sucessfully listening at ${PORT}`)});