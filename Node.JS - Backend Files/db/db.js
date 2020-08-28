const mongoose=require('mongoose');

const db=mongoose.connect( process.env.MONGODB_URI || "mongodb://mongodb/crowd-funding",{
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true
}).then(res=>{
    console.log("DB connected");
}).catch(e=>{
    console.log(e.message);
});

module.exports=db;s