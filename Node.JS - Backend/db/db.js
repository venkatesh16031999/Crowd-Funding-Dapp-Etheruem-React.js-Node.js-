const mongoose=require('mongoose');

const db=mongoose.connect("mongodb://127.0.0.1:27017/crowd-funding",{
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true
}).then(res=>{
    console.log("DB connected");
}).catch(e=>{
    console.log(e.message);
});

module.exports=db;