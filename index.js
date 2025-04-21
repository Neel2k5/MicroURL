const PORT = 8081;
const MONGOURL="mongodb://localhost:27017/microURL";


const express= require("express");
const path = require("path");

const {connectMongoDB}= require("./connection");
const urlRouter = require("./routes/urlRoutes");
const staticRouter = require("./routes/staticRoutes");

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

//SSR
apiObj.set("view engine","ejs");
apiObj.set("views",path.resolve("./views"));

//Routes
apiObj.use("/",staticRouter);

apiObj.use("/api/",urlRouter);

apiObj.listen(PORT,()=>{console.log(`Server sucessfully listening at ${PORT}`)});