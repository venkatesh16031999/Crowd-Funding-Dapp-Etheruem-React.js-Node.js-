const express=require('express');
const app=express();
const cors=require('cors');
require('./db/db'); 
const multer=require('multer');
const path=require('path');

const imagePath=path.join(__dirname,"/images");

app.use("/images",express.static(imagePath));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

// function fileFilter (req, file, cb) {

//   i

//   cb(null, false)

//   cb(null, true)
 
// }
  
app.use(multer({storage:storage}).single('image'));

const userRoute=require('./routes/user');

const discussRoute=require('./routes/discuss');

const PORT=process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

app.use(userRoute);
app.use(discussRoute);

const server=app.listen(PORT,(err)=>{
    if(err){
        console.log(err.message);
    }
    console.log("Server Connect to port :",PORT);
})

const socket= require('./middleware/socket').init(server);

socket.on('connection', soc=>{

  console.log("client connected");

})

