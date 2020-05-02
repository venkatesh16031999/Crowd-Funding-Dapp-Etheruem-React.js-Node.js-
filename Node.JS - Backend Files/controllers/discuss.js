const discussionDetails=require('../model/discussion');
const socket=require('../middleware/socket');

exports.initialDiscussCreate=(req,res,next)=>{

    const data={
        contractAddress:req.body.contractAddress,
        discussion:{
            messages:[]
        }
    }

    try{
        const discussionCreate=new discussionDetails(data);

        discussionCreate.save()
        .then(resData=>{
            res.send({
                "response":"Chat Pool Created Successfully"
            });
        })
        .catch(e=>{
            res.send({
                "response":"Cannot create chat pool"
            })
        });
    }catch(e){
        res.send({
            "response":e.message
        })
    }
    

}

exports.getAllMessages=(req,res,next)=>{

    const address=req.body.contractAddress;

    try{

        discussionDetails.findOne({contractAddress:address}).then(resData=>{
            if(!resData.contractAddress){
                res.send({
                    "response":"No Contract Discussion Pool Found"
                });
            }
            else{
    
                res.send({
                    "messages":resData.discussion
                });
    
            }
        })

    }catch(err){
        res.send({
            "response":err.message
        });
    }
    

}

exports.discussionAddPost=(req,res,next)=>{

    const { name,email,image,description,contractAddress }=req.body;

    const messagedata={
        name:name,
        image:image,
        email:email,
        description:description
    }

    try{

        discussionDetails.findOne({contractAddress:contractAddress}).then(resData=>{
            if(!resData.contractAddress){
                res.send({
                    "response":"No Contract Discussion Pool Found"
                });
            }
            
             messageArray=[...resData.discussion.messages];
            messageArray.push(messagedata);
            
            socket.getIo().emit('post',{action:'create',post:messagedata});

            discussionDetails.updateOne({discussion:{messages:messageArray}}).then(updatedData=>{

                console.log(messagedata);

                res.send({
                    "response":resData
                });
            }).catch(e=>{
                res.send({
                    "response":"Message not posted"
                });
            })
            
        }).catch(e=>{
            res.send({
               "response":"No Contract Discussion Pool Found"
            })
        })

    }catch(e){
        res.send({
            "response":e.message
         })
    }

}