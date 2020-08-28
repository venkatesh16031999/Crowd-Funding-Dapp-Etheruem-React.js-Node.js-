let io;

module.exports={
    init: server=>{
        io=require('socket.io')(server);
        return io;
    },
    getIo: ()=>{
        return io;
    }
}