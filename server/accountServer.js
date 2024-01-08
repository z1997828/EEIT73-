
const express = require("express")
const app = express();
const io = require('socket.io-client');
const http = require('http').Server(app)
const sio = require('socket.io')(http)
// const checkDB = require('../function/checkDB')
const Login = require('../function/login')
// 允許跨域使用本服務
var cors = require("cors");
app.use(cors());

// 協助 Express 解析表單與JSON資料
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Web 伺服器的靜態檔案置於 public 資料夾
app.use("/public", express.static("../public"));

app.all('*', (req, res, next) => {
  res.header('Access-Control-Origin', "*");
  res.header('Access-Control-Allow-Headers', "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE');
  res.header("X-Powered-By", '3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})





app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // console.log("收到的帳號:", req.body.email, "密碼:", password);

  Login.getUsers(email, password)
    .then(userDetails => {
      res.status(200).json({ message: '登錄成功', userDetails });
    })
    .catch(error => {
      res.status(401).json({ message:'登錄失敗', error });
    });
});


// app.get('/login', (req, res) => {
// let account = req.query.account;
// let password = req.query.password;

// checkDB.getData(account, password)
// .then((data) => {
//     if (data.length === 0) {
//       console.log("用戶不存在");
//       res.send([]);
//     }else{
//       console.log(data);
//       res.send(data);
//     }
// })
// .catch((error) => {
//     console.error("發生錯誤:", error);
// });

// });
app.get('/get_serverinfo', (req, res) => {
  const data = { version: '0.0.1' };
  res.send(data);
});

app.post('/getPost', (req, res) => {
  console.log(req.body)
});
// 一切就緒，開始接受用戶端連線

http.listen(3000);
sio.on('connection', (socket) => {
  let clientIp = socket.handshake.address;
  socket.emit('connected', '' + clientIp);
  console.log('a user connected,ip = ' + clientIp);
  socket.on("game_ping", () => {
    socket.emit("game_pong")
  })
  socket.on("disconnect", () => {
    console.log("客戶端:有人離開Server")
  })

})
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("鍵盤「Ctrl + C」可結束伺服器程式.");

