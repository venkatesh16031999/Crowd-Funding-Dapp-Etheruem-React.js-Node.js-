const mongoose=require('mongoose');
const validator=require('validator');

const discussSchema=new mongoose.Schema({

   contractAddress:{
       type:String,
       required:true,
       trim:true
   },
   discussion:{
        messages:[
            {
                name:{
                    type:String,
                    required:true,
                    trim:true,
                },
                image:{
                    type:String,
                    required:true,
                    trim:true,
                    default:"NO_IMAGE"
                },
                email:{
                    required:true,
                    type:String,
                    trim:true,
                    validate(value){
                        if(!validator.isEmail(value)){
                            throw new Error("Invalid Mailid");
                        }
                    }
                },
                description:{
                    required:true,
                    type:String,
                    trim:true,
                },
                date:{
                    type : Date,
                    default: Date.now
                }
            }
        ]
   }


});

const Discussion = mongoose.model('Discussion',discussSchema);

module.exports=Discussion;