// 以 Express 建立 Web 伺服器
const ws = require('nodejs-websocket')
const express = require("express");
const app = express();

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

let websocket = ws.createServer(function (client) {

    client.on('text', (data) => {
        console.log('客戶端傳送資料: ', data);
    })
    client.on('close', () => {
        console.log('客戶端斷開連接');
    })
    client.on('error', () => {
        console.log('網路連接出錯');
    })
})


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
                            <td>${Date(doc.data().registertime)}</td>
                            <td><button onclick="edit_user('${doc.id}','${doc.data().account}','${doc.data().name}','${doc.data().email}','${doc.data().money}','${Date(doc.data().registertime)}')" >修改</button>
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
                        money:req.body.money,
                        password: '123456',
                        registertime: FieldValue.serverTimestamp()
                    });
                    res.send(true);
                    
                })()
                break;
        
            default:
                break;
        }
        
    }else if (req.method.toLowerCase() == 'put'){
        switch (req.path) {
            case "/CMS/users/edit":
                (async ()=>{
                    const userRef = db.collection('users').doc(req.body.id);
                    await userRef.update({
                        account: req.body.account,
                        name: req.body.name,
                        email: req.body.email,
                        money:req.body.money,
                    });
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


app.get("/getInfo", (req, res) => {
    res.send("Info" + req.query.info)
});



app.post("/getPost", (req, res) => {
    console.log(req.body)
});

app.use("/use", (req, res) => {
    res.send("use")
});


// 一切就緒，開始接受用戶端連線
// app.listen(process.env.PORT);
app.listen(3000);
websocket.listen(3001);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("鍵盤「Ctrl + C」可結束伺服器程式.");

