
const express = require("express")
const app = express();
const io = require('socket.io-client');
const http = require('http').Server(app)
const sio = require('socket.io')(http)

// 允許跨域使用本服務
var cors = require("cors");
app.use(cors());

// Web 伺服器的靜態檔案置於 public 資料夾
app.use(express.static("public"));

//資料庫
var admin = require('firebase-admin');
//取得Key認證文件
var serviceAccount = require("./gameproject-d9074-firebase-adminsdk-6rnh9-cff9fb8858.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
//數據庫對象
let db = admin.firestore();
//服務器時間戳
const FieldValue = admin.firestore.FieldValue;

// 協助 Express 解析表單與JSON資料
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// let websocket = ws.createServer(function (client) {

//     client.on('text', (data) => {
//         console.log('客戶端傳送資料: ', data);
//     })
//     client.on('close', () => {
//         console.log('客戶端斷開連接');
//     })
//     client.on('error', () => {
//         console.log('網路連接出錯');
//     })
// })



app.all('*', (req, res, next) => {
    res.header('Access-Control-Origin', "*");
    res.header('Access-Control-Allow-Headers', "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE');
    res.header("X-Powered-By", '3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    if (req.method.toLowerCase() == 'options') {
        res.send
    } else if (req.method.toLowerCase() == 'get') {
        switch (req.path) {
            case "/CMS": res.header("Content-Type", "text/html"); res.sendFile('public/CMS_Login.html', { root: __dirname }); break;
            case "/CMS/users":
                (async () => {
                    res.header("Content-Type", "text/html");
                    let html = '';
                    await db.collection('users').get()
                        .then((snapshot) => {
                            snapshot.forEach((doc) => {
                                // console.log(doc.id, '=>' , doc.data());

                                html += `<tr id="usertr-${doc.id}">

                    
                            <td>${doc.id}</td>
                            <td>${doc.data().account}</td>
                            <td>${doc.data().name}</td>
                            <td>${doc.data().email}</td>
                            <td>${doc.data().money}</td>
                            <td>${new Date(doc.data().registertime._seconds * 1000)}</td>
                            <td><button onclick="edit_user('${doc.id}','${doc.data().account}','${doc.data().name}','${doc.data().email}','${doc.data().money}','${new Date(doc.data().registertime._seconds * 1000)}')" >修改</button>
                            <td>${Date(doc.data().registertime)}</td>
                            <td><button onclick="edit_user('${doc.id}','${doc.data().account}','${doc.data().name}','${doc.data().email}','${doc.data().money}','${Date(doc.data().registertime)}')" >修改</button>
                            <td><button onclick="edit_user('${doc.id}')" >修改</button>


                                <button onclick="del_user('${doc.id}')">刪除</button> </td>
                             </tr>`;
                            });
                        })
                        .catch((err) => {
                            console.log('Error getting documents', err);
                        });
                    res.send(html);
                })();
                break;
            case "/CMS/game_playway":
                (async () => {
                    res.header("Content-Type", "text/html");
                    let html = '';
                    await db.collection('game_playway').get()
                        .then((snapshot) => {
                            snapshot.forEach((doc) => {
                                // console.log(doc.id, '=>' , doc.data());
                                html += `<tr id="game_playwaytr-${doc.id}">
                            <td>${doc.id}</td>
                            <td>${doc.data().banker_id}</td>
                            <td>${doc.data().banker_money}</td>
                            <td>${doc.data().player1_id}</td>
                            <td>${doc.data().player1_money}</td>
                            <td>${doc.data().player2_id}</td>
                            <td>${doc.data().player2_money}</td>
                            <td>${new Date(doc.data().date._seconds * 1000)}</td>
                            <td><button onclick="edit_game_playway('${doc.id}','${doc.data().banker_id}','${doc.data().banker_money}','${doc.data().player1_id}','${doc.data().player1_money}','${doc.data().player2_id}','${doc.data().player2_money}','${new Date(doc.data().date._seconds * 1000)}')" >修改</button>
                                <button onclick="del_game_playway('${doc.id}')">刪除</button> </td>
                             </tr>`;
                            });
                        })
                        .catch((err) => {
                            console.log('Error getting documents', err);
                        });
                    res.send(html);
                })();
                break;
            case "/CMS/money":
                (async () => {
                    res.header("Content-Type", "text/html");
                    let html = '';
                    await db.collection('money').get()
                        .then((snapshot) => {
                            snapshot.forEach((doc) => {
                                // console.log(doc.id, '=>' , doc.data());
                                html += `<tr id="moneytr-${doc.id}">
                            <td>${doc.id}</td>
                            <td>${doc.data().user_id}</td>
                            <td>${doc.data().money}</td>
                            <td>${new Date(doc.data().date._seconds * 1000)}</td>
                            <td><button onclick="edit_money('${doc.id}','${doc.data().user_id}','${doc.data().money}','${new Date(doc.data().date._seconds * 1000)}')" >修改</button>
                                <button onclick="del_money('${doc.id}')">刪除</button> </td>
                             </tr>`;
                            });
                        })
                        .catch((err) => {
                            console.log('Error getting documents', err);
                        });
                    res.send(html);
                })();
                break;
            default:
                break;
        }
    } else if (req.method.toLowerCase() == 'post') {
        switch (req.path) {
            case "/CMS/users/add":
                (async () => {
                    await db.collection('users').add({
                        account: req.body.account,
                        name: req.body.name,
                        email: req.body.email,
                        money: req.body.money,
                        password: '123456',
                        registertime: FieldValue.serverTimestamp()
                    });
                    res.send(true);

                })()
                break;
            case "/CMS/game_playway/add":
                (async () => {
                    await db.collection('game_playway').add({
                        banker_id: req.body.banker_id,
                        banker_money: req.body.banker_money,
                        player1_id: req.body.player1_id,
                        player1_money: req.body.player1_money,
                        player2_id: req.body.player2_id,
                        player2_money: req.body.player2_money,
                        date: FieldValue.serverTimestamp()
                    });
                    res.send(true);

                })()
                break;
            case "/CMS/money/add":
                (async () => {
                    await db.collection('money').add({
                        user_id: req.body.user_id,
                        money: req.body.money,
                        date: FieldValue.serverTimestamp()
                    });
                    res.send(true);
                })()
                break;
            default:
                break;
        }

    } else if (req.method.toLowerCase() == 'put') {
        switch (req.path) {
            case "/CMS/users/edit":
                (async () => {
                    const userRef = db.collection('users').doc(req.body.id);
                    await userRef.update({
                        account: req.body.account,
                        name: req.body.name,
                        email: req.body.email,
                        money: req.body.money,
                    });
                    res.send(true);
                })();
                break;
            case "/CMS/game_playway/edit":
                (async () => {
                    const userRef = db.collection('game_playway').doc(req.body.id);
                    await userRef.update({
                        banker_id: req.body.banker_id,
                        banker_money: req.body.banker_money,
                        player1_id: req.body.player1_id,
                        player1_money: req.body.player1_money,
                        player2_id: req.body.player2_id,
                        player2_money: req.body.player2_money
                    });
                    res.send(true);
                })();
                break;
            case "/CMS/money/edit":
                (async () => {
                    const userRef = db.collection('money').doc(req.body.id);
                    await userRef.update({
                        user_id: req.body.user_id,
                        money: req.body.money
                    });
                    res.send(true);
                })();
                break;
            default:
                break;
        }


    } else if (req.method.toLowerCase() == 'delete') {
        switch (req.path) {
            case "/CMS/users/del":
                (async () => {
                    await db.collection('users').doc(req.body.id).delete();
                    res.send(true);
                })();
                break;
            case "/CMS/game_playway/del":
                (async () => {
                    await db.collection('game_playway').doc(req.body.id).delete();
                    res.send(true);
                })();
                break;
            case "/CMS/money/del":
                (async () => {
                    await db.collection('money').doc(req.body.id).delete();
                    res.send(true);
                })();
                break;
            default:
                break;
        }

    }
    else {
        next();
    }
})


app.get("/", (req, res) => {
    res.send("hello!");
});

app.get("/get_serverinfo", (req, res) => {
    location.href="/"
});








// 一切就緒，開始接受用戶端連線
// app.listen(process.env.PORT);
http.listen(3000);
sio.on('connection',(socket)=>{
    console.log("socket連接成功")
    socket.on("game_ping",()=>{
        socket.emit("game_pong")
    })
sio.on('disconnection',()=>{
    console.log("socket取消連接")
})

    // socket.on("login",(data)=>{
    //     if(data.name == "sa" && data.pwd == "123"){
    //         let name = "管理員";
    //         socket.emit("login",{err:0,data:name})
    //     }else{
    //         socket.emit("login",{err:1,errmsg:"帳號或密碼出錯"})
    //     }
    // })
})
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("鍵盤「Ctrl + C」可結束伺服器程式.");

