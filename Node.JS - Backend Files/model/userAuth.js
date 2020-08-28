const mongoose=require('mongoose');
const validator=require('validator');

const userAuthSchema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Mailid");
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    forgetPasswordHash:{
        type:String
    },
    forgetPasswordDuration:{
        type:Date
    }
});

const UserAuth=mongoose.model("UserAuth",userAuthSchema);

module.exports=UserAuth;