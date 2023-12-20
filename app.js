// 以 Express 建立 Web 伺服器
const ws = require('nodejs-websocket')
const express = require("express");
const app = express();

// 允許跨域使用本服務
var cors = require("cors");
app.use(cors());

// Web 伺服器的靜態檔案置於 public 資料夾
app.use( express.static( "public" ) );

// 協助 Express 解析表單與JSON資料
app.use(express.urlencoded({extended: true}));
app.use(express.json())

let websocket = ws.createServer(function(client){
    
    client.on('text',(data)=>{
        console.log('客戶端傳送資料: ',data);
    })
    client.on('close',()=>{
        console.log('客戶端斷開連接');
    })
    client.on('error',()=>{
        console.log('網路連接出錯');
    })
})

app.all('*',(req,res,next)=>{
    res.header('Access-Control-Origin',"*");
    res.header('Access-Control-Allow-Headers',"X-Requested-With");
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,OPTIONS,DELETE');
    res.header("X-Powered-By",'3.2.1');
    res.header("Content-Type","application/json;charset=utf-8");
    if (req.method.toLowerCase() == 'options') {
        res.send
    } else{
        next();
    }
})

app.get("/", (req, res) => {
	res.send("hello!");
});

app.get("/getInfo", (req, res) => {
	res.send("Info" + req.query.info)
});

app.post("/getPost",(req, res)=>{
    console.log(req.body)
});

app.use("/use",(req,res) => {
    res.send("use")
});


// 一切就緒，開始接受用戶端連線
// app.listen(process.env.PORT);
app.listen(3000);
websocket.listen(3001);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("鍵盤「Ctrl + C」可結束伺服器程式.");

