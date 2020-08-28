const userDetail=require('../model/userDetail');
const userAuth=require('../model/userAuth');
const bcrypt=require('bcrypt');
var nodemailer = require('nodemailer');
var ObjectId = require('mongoose').Types.ObjectId; 
const crypto = require('crypto');
const jwt=require('jsonwebtoken');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'rvenki666@gmail.com',
           pass: 'sixsixsix123456'
       }
   });

exports.logout=(req,res)=>{

    // try{
    //     console.log("session aefaeff",req.session);
    //     console.log(req.session.destroy());
        

    // }catch(e){
    //     res.status(200).send({
    //         "response":e.message
    //     });
    // }

}

exports.userPhoto=(req,res)=>{

    try{


        userDetail.findOne({email:req.body.email}).then(user=>{
            
            user.updateOne({image:req.file.path.replace("\\" ,"/")}).then(resdata=>{

                const dataVal={
                    user:user,
                    response:"images updated successfully",
                    image:req.file.path.replace("\\" ,"/")
                }

                res.status(200).send({
                    dataVal
                })
            }).catch(e=>{
                res.status(200).send({
                    "response":"Image Upload Failed"
                })
            });
        }).catch(e=>{
            res.status(200).send({
                "response":"User Not Found"
            })
        })


    }catch(e){

        res.status(200).send({
            "response":"Server Error While Uploading Image"
        })

    }

}

exports.forgetPassword= async (req,res)=>{

    try{
        const user=await userAuth.findOne({email:req.body.email});

        if(!user){
            res.send({
                "response":"user not found"
            });
        }

        const secret = req.body.email;
        const hash = crypto.createHmac('sha256', secret)
                       .update('I love cupcakes')
                       .digest('hex');

        const userUpdate=await userAuth.findOne({email:req.body.email}).then( async resdata=>{
            resdata.updateOne({
                forgetPasswordHash:hash,
                forgetPasswordDuration: Date.now() + 3600000
            }).then(data=>{
                console.log(data);
            })
        });
    
        const link="http://localhost:3000/resetpassword/"+hash;
    
       const mailOptions = {
        from: 'rvenki666@email.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Passord Reset', // Subject line
        html: `<p>From Crowd Box,</p><br><p>click this <a href=${link}>link</a> to reset your password</p>`// plain text body
      };
    
      transporter.sendMail(mailOptions).then(resdata=>{
          res.send({
              "response":"Email Sent Successfully"
          });
      }).catch(e=>{
        res.send({
            "response":"Email Has Not Sent Successfully"
        });
      })

    }catch(e){
        res.send({
            "response":e.message
        });
    }

}

exports.resetPassword=async (req,res)=>{

    try{

        const { password,hash,date }=req.body;

        const user=await userAuth.findOne({forgetPasswordHash:hash});
    
        if(!user){
            res.send({
                "response":"User Not Found"
            });
        }
    
        if(user.forgetPasswordDuration >= date && user.forgetPasswordHash===hash){
    
            const hashPassword= await bcrypt.hash(password,12);
    
            const userData=await user.updateOne({
                forgetPasswordHash:null,
                forgetPasswordDuration:null,
                password:hashPassword
            }).then(dataupdate=>{
                res.send({
                    "response":"password updated",
                    "user":dataupdate
                });
            }).catch(e=>{
                res.send({
                    "response":"password not updated"
                });
            })
    
        }else{
            res.send({
                "response":"Invalid user or reset time exceeded please again"
            });
        }

    }catch(e){
        res.send({
            "response":e.message
        });
    }

}

exports.getUserDataOnLogin=async (req,res)=>{


    console.log("hello session");

    try{

        await userDetail.findOne({_id:new ObjectId(req.userId)}).then(data=>{
            if(!data){
                res.send({
                    "response":"No User Found"
                });
            }
    
            res.status(200).send({
                user:data
            });
        })

    }catch(err){
        res.status(500).send({
            "response":err.message
        });
    }

}

exports.userSignUp= async (req,res)=>{

    const { name,email,number,password }=req.body;
    console.log(name);
    const data={
        name:name,
        email:email,
        number:number,
        contracts:{ campaigns:[] },
        trusted:0
    }

    const userdetail=new userDetail(data);
    
    try{
        const details=await userdetail.save();

        if(details._id){
            const hashedpassword=await bcrypt.hash(password,12);
            const userauth=new userAuth({
                userid:details._id,
                email:email,
                password:hashedpassword
            });

             authdata=await userauth.save();
        }
        const combineddata={
            userDetail:details,
            userAuth:authdata
        }

        res.status(200).send({combineddata});
    }catch(e){
        res.status(200).json({
            "error":e.message
        });
    }
}

exports.userSignIn=async (req,res)=>{

    const { email , password }=req.body;

    try{
        const user=await userAuth.findOne({email:email}).then(async data=>{
            if(data._id){
                const passwordValid= await bcrypt.compare(password,data.password);
                // console.log("hello",passwordValid);
                if(data.email==email && passwordValid){

                    const userData=await userDetail.findOne({email:email});

                    const token=jwt.sign({      
                        userId:userData._id.toString(),
                        email:userData.email
                    },'crowdfundingjwttokensafetymechanism',{expiresIn:'1h'});

                    var userdetails={
                        response:"Login Successful",
                        user:userData,
                        token:token
                    }
                    res.status(200).send(userdetails);
                }

            }else{
                res.status(200).send({"response":"Invalid Email id or Password"});
            }
        }).catch(e=>{
            res.status(200).send({
                "error":"User Not Found"
            });
        })
    }catch(e){
        res.status(200).send({
            "error":e.message
        });
    }

}

exports.updateContracts=async (req,res)=>{

    const { userid, tag,description,title,contractAddress}=req.body;

    const newContract={
        userId:userid,
        contractAddress:contractAddress,
        tag:tag,
        title:title,
        description:description
    };

    try{
        const user=await userDetail.findById({_id:new ObjectId(userid)}).then(resData=>{

            const contractsData=resData.contracts.campaigns;
    
            contractsData.push(newContract);
            
            resData.updateOne({contracts:{
                campaigns:contractsData
            }
        }).then(data=>{
            res.status(200).send(resData);
        }).catch(e=>{
            res.status(200).send({
                "error":e.message
            });
        });
            
        }).catch(e=>{
            res.status(200).send({
                "error":e.message
            });
        })
    }catch(e){
        res.status(200).send({
            "error":e.message
        });
    }

}

exports.updateContributions=async (req,res)=>{

    const { userid,contractAddress,contributedAmount,title}=req.body;

    const newContribution={
        userid:userid,
        contractAddress:contractAddress,
        contributedAmount:contributedAmount,
        title:title
    };

    console.log(newContribution);


    try{
        const user=await userDetail.findById({_id:new ObjectId(userid)}).then(resData=>{

            const contractsData=resData.contributedContracts.campaigns;
    
            contractsData.push(newContribution);
            
            resData.updateOne({contributedContracts:{
                campaigns:contractsData
            }
        }).then(data=>{
            console.log(resData);
            res.status(200).send(resData);
        }).catch(e=>{
            res.status(200).send({
                "error":e.message
            });
        });
            
        }).catch(e=>{
            res.status(200).send({
                "error":e.message
            });
        })
    }catch(e){
        res.status(200).send({
            "error":e.message
        });
    }
}