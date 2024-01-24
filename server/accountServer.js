
const express = require("express")
const app = express();
const io = require('socket.io-client');
const http = require('http').Server(app)
const sio = require('socket.io')(http)
const Login = require('../function/login')
const gamectr = require('./game_ctr')


// 允許跨域使用本服務
var cors = require("cors");
const { userInfo } = require("os");
const player = require("./player");
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
//登錄
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // console.log(req,"收到的帳號:", req.body.email, "密碼:", password);

  Login.getUsers(email, password)
    .then(userDetails => {

      res.status(200).json({ message: '登錄成功', userDetails });
    })
    .catch(error => {
      res.status(401).json({ message: '登錄失敗', error });
    });
});

//檢測帳號重複

// 註冊
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  console.log("name:", username, "email:", email, "password:", password);

  Login.registerNewUser(username, email, password)
    .then(NewUserDetails => {
      res.status(200).json({ message: '註冊成功', NewUserDetails });

    })
    .catch(error => {
      res.send.json({ message: '註冊失敗', error });
    });
});

app.get('/confirmname', (req, res) => {
  let username = req.query.username;

  Login.getData(username)
    .then(result => {
      if (result.length > 0) {
        // 如果獲取到資料，表示用戶名已存在
        res.status(200).send({ exists: true, message: "用戶名已被占用" });
      } else {
        // 如果沒有資料，表示用戶名不存在
        res.status(200).send({ exists: false, message: "用戶名可用" });
      }
    }).catch(error => {
      // 處理可能出現的錯誤
      res.status(500).send({ error: error.message });
    });
});
//獲取伺服器信息
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
  socket.on('notify', (req) => {


    const cmdType = req.cmd;
    const info = req.data;
    const callindex = req.callindex;

    var that = {}
    that._username = info.username;    //用户昵称
    that._email = info.email;  //用户账号
    that._avatar = info.avatar;  //头像
    that._money = info.money;       //当前金币
    that._socket = socket
    that._gamesctr = gamectr
    that._room = undefined //所在房间的引用
    that._seatindex = 0   //在房间的位置
    that._isready = false //当前在房间的状态 是否点击了准备按钮
    that._cards = []      //当前手上的牌
    //内部使用的发送数据函数
    const _notify = function (type, result, info, callBackIndex) {
        console.log('notify =' + JSON.stringify(info));
        that._socket.emit('notify', {
            type: type,
            result: result,
            info: info,
            callBackIndex: callBackIndex
        });

    };
    console.log(`收到通知: 命令類型 - ${cmdType}, 數據 - ${JSON.stringify(info.username)},callindex - ${callindex}`);
    switch (cmdType) {
      case 'login':
        gamectr.create_player(info, socket, callindex)

        break;
      case "createroom_req":
        that._gamesctr.create_room(info, that, function (err, result) {
          if (err != 0) {
            console.log("create_room err:" + err)
          } else {
            that._room = result.room

            console.log("create_room:" + result)
          }

          _notify("createroom_resp", err, result.info, callindex)
        })

        break;
      case "joinroom_req":

        that._gamesctr.jion_room(req.info, that, function (err, result) {
          if (err) {
            console.log("joinroom_req err" + err)
            _notify("joinroom_resp", err, null, callindex)
          } else {
            //加入房间成功
            that._room = result.room
            _notify("joinroom_resp", err, result.info, callindex)
          }

        })
        break
      case "enterroom_req":
        if (that._room) {
          that._room.enter_room(that, function (err, result) {
            if (err != 0) {
              _notify("enter_room_resp", err, {}, callindex)
            } else {
              //enterroom成功
              that._seatindex = result.seatindex
              _notify("enter_room_resp", err, result, callindex)
            }

          })

        } else {
          console.log("that._room is null")
        }

        break
      case "player_ready_notify":   //玩家准备消息通知
        if (that._room) {
          that._isready = true
          that._room.playerReady(that)
        }
        break
      case "player_start_notify": //客户端:房主发送开始游戏消息
        if (that._room) {
          that._room.playerStart(that, function (err, result) {
            if (err) {
              console.log("player_start_notify err" + err)
              _notify("player_start_notify", err, null, callindex)
            } else {
              //加入房间成功

              _notify("player_start_notify", err, result.info, callindex)
            }

          })
        }
        break
      case "player_rob_notify":  //客户端发送抢地主消息
        if (that._room) {
          that._room.playerRobmaster(that, info)
        }
        break
      case "no_play_card_req":   //客户端发送出牌消息
        if (that._room) {
          that._room.playerBuChuCard(that, info)
        }
        break
      case "play_card_req":
        if (that._room) {

          console.log("that._room")
          that._room.playerChuCard(that, info, function (err, result) {
            if (err) {
              console.log("playerChuCard cb err:" + err + " " + result)
              _notify("chu_card_res", err, result.info, callindex)

            }
            _notify("chu_card_res", err, result.info, callindex)
          })
        }
        break

      default:
        console.log(`未知的命令類型: ${cmdType}`);
    }


  });
  socket.on("disconnect", () => {
    console.log("客戶端:有人離開Server")
  })

})
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("鍵盤「Ctrl + C」可結束伺服器程式.");

//聊天室
// const chat = require('../function/chat');
// chat(io);
// const PORT = process.env.PORT || 3000;

// server.listen(PORT,()=>{
//     console.log('Server is running on port ${PORT}');
// })
