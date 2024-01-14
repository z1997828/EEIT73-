const express=require('express')
const http=require('http')
const socketIO=require('socket.io')
const cors=require('cors')
const session=require('express-session')

const app=express();
const server=http.createServer(app)
const io=socketIO(server)

app.use(cors())

//使用express中間件
app.use(session({
    secret:'0000',
    resave:false,
    saveUninitialized:true
}))

async function handleConnection(socket){
    const currentUsername = socket.handshake.session.currentUsername;// 從登入邏輯中獲取當前用戶名
    socket.join(currentUsername);
    console.log( currentUsername +'connected');

    //監聽客戶端發送的消息
    socket.on('chat message',(msg)=>{
        console.log('message'+msg);
        //廣播消息給特定房間的所有客戶端
        io.to(username).emit('chat message', msg);
    });
    
    //監聽客戶端斷開連接
    socket.on('disconnect',()=>{
        console.log(currentUsername+'離開房間')
        socket.leave(currentUsername);
    })
}
io.on('connection',(socket)=>{
    handleConnection(socket);
})

const PORT = process.env.PORT || 3000;

server.listen(PORT,()=>{
    console.log('Server is running on port ${PORT}');
})
