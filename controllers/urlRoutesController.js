
const urlModel = require("../models/urlModel");
const {nanoid} = require("nanoid");

async function handleGETbyShort(req,res){
    const short = req.params.short;
    if(!short)return res.status(400).json({error:"Bad Request with missing short param"});

    const result = await urlModel.find({"short":short},{"_id":0});
    if(result.length==0) return res.status(404).json({error:"Not Found"});
    //Increment the click count
    const updateCount = await urlModel.updateOne({"short":short},{"clickCount":result[0].clickCount+1}).catch((err)=>{
        console.log(err);//Do something better for error logging later
        return res.status(500).json({error:"Internal Server Error"});
    });

    return res.status(300).redirect(result[0].long);

}

async function handlePOST(req,res) {
    const body = req.body;
    if(!body)return res.status(400).json({error:"Bad Request with missing body"});
    if(!body.long)return res.status(400).json({error:"Bad Request with missing long url in body"});
    const short = nanoid(14);
    const result = await urlModel.create({
       short:short,
       long:body.long,
       clickCount:1,    
       })
       .then(
            ()=>{
                
                return res.status(201).json({message:"Short URL Sucessfully Created",short:short});
            }
       )
       .catch((err)=>{
        console.log(err);//Do something better for error logging later
        return res.status(500).json({error:"Internal Server Error"});
       })
       
}

async function handleGETClickCount(req,res){
    if(!req.params.short)return res.status(400).json({error:"Bad Request with missing short param"});
    const result = await urlModel.find({"short":req.params.short},{"_id":0});
    if(result.length==0) return res.status(404).json({error:"Not Found"});
    return res.status(200).json({clickCount:result[0].clickCount});
}




module.exports = {handleGETbyShort,handlePOST,handleGETClickCount};