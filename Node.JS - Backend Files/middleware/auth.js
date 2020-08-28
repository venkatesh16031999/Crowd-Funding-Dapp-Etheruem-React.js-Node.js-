const jwt=require('jsonwebtoken');

module.exports=async (req,res,next)=>{

    let token=req.body.token;
    let decodedToken;
    try{

        decodedToken= await jwt.verify(token,'crowdfundingjwttokensafetymechanism');

    }catch(err){
        res.status(500).send({
            "response":"Server error While authentication"
        });
    }

    if(!decodedToken){
        res.status(422).send({
            "response":"Your Not Authenticated"
        });
    }

    req.userId=decodedToken.userId;
    next();
}