const mongoose=require('mongoose');
const validator=require('validator');

const userDetailSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
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
    image:{
        type:String,
        required:true,
        trim:true,
        default:"NO_IMAGE"
    },
    contracts:{
        campaigns:[
            {
                userId:mongoose.Schema.Types.ObjectId,
                contractAddress:{
                    type:String,
                    trim:true,
                    required:true
                },
                tag:{
                    type:String,
                    trim:true,
                    required:true,
                },
                title:{
                    type:String,
                    trim:true,
                    required:true,
                },
                description:{
                    type:String,
                    trim:true,
                    required:true,
                },
                date:{
                    type : Date,
                    default: Date.now
                }
            }
        ]
    },
    contributedContracts:{
        campaigns:[
            {
                userId:mongoose.Schema.Types.ObjectId,
                contractAddress:{
                    type:String,
                    trim:true,
                    required:true
                },
                contributedAmount:{
                    type:Number,
                    trim:true,
                    required:true
                },
                title:{
                    type:String,
                    required:true,
                    trim:true
                },
                date:{
                    type : Date,
                    default: Date.now
                }
            }
        ]
    },
    number:{
        type:Number,
        trim:true,
        required:true,
        unique:true
    },
    trusted:{
        type:Number,
        trim:true,
        required:true,
        min:0,
        max:20,
        default:0
    }
});




const UserDetail=mongoose.model("UserDetail",userDetailSchema);

module.exports=UserDetail;