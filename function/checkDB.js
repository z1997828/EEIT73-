var admin = require('firebase-admin');
var serviceAccount = require("../gameproject-d9074-firebase-adminsdk-6rnh9-cff9fb8858.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

let db = admin.firestore();
//users 資料庫集合的名稱，顯示id及內容
const FieldValue = admin.firestore.FieldValue;

getData();
async function getData(){
    await db.collection('users').get()
    .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            console.log(doc.id, '=>' , doc.data());
        });
    })
    .catch((err)=>{
        console.log('Error getting documents',err);
    });
}