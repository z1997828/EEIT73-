// 以 Express 建立 Web 伺服器
var express = require("express");
var app = express();


// 允許跨域使用本服務
var cors = require("cors");
app.use(cors());

// Web 伺服器的靜態檔案置於 public 資料夾
app.use( express.static( "public" ) );

// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
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
// 一切就緒，開始接受用戶端連線
// app.listen(process.env.PORT);
app.listen(3000);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("鍵盤「Ctrl + C」可結束伺服器程式.");

// ---------------

app.get("", function (req, res) {
	
});
app.get("/CMS", function (req, res) {
	res.sendFile('public/CMS_Login.html' , { root : __dirname});
});
app.get("/CMS/users", async function (req,res) {
    let html = '';
    await db.collection('users').get()
    .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            // console.log(doc.id, '=>' , doc.data());
            html += `<tr>
            <td>${doc.id}</td>
            <td>${doc.data().account}</td>
            <td>${doc.data().name}</td>
            <td>${doc.data().email}</td>
            <td>${doc.data().money}</td>
            <td>${Date(doc.data().registertime)}</td>
            <td><button onclick="Edit_user('${doc.id}')" >修改</button>
                <button onclick="Del_user('${doc.id}')">刪除</button> </td>
        </tr>`;
        });
    })
    .catch((err)=>{
        console.log('Error getting documents',err);
    });
    // console.log(html)
    res.send(html)


});

app.post("", function (req, res) {
	
});


