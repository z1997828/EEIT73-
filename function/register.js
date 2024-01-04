var admin = require('firebase-admin');
var serviceAccount = require("../gameproject-d9074-firebase-adminsdk-6rnh9-cff9fb8858.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyCEEb5PlBygA9_pTl38ce19A5vtZsKUqdA",
    authDomain: "gameproject-d9074.firebaseapp.com",
    databaseURL: "https://gameproject-d9074-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gameproject-d9074",
    storageBucket: "gameproject-d9074.appspot.com",
    messagingSenderId: "521476406324",
    appId: "1:521476406324:web:e44521f5a393d56d945e61",
    measurementId: "G-CL35V2SP5F"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
let db = admin.firestore();

const email = 'happy69@happy.com';
const password = '666666';
const additionalData ={
    username : 'happy69'
}

createUserWithEmailAndPassword(auth,email, password)
  .then((userCredential) => {
    // 新用戶註冊成功，可以在這裡處理成功的邏輯
    const user = userCredential.user;
    const username = additionalData.username; //擷取新用戶的名稱
    //額外將資料寫入db
    db.collection('users').doc(username).set({
      email: email,
      username: username,
    })
    .then(() => {
      console.log('用戶資料寫入成功');
    })
    .catch((error) => {
      console.error('寫入用戶資料失敗', error);
    });

    console.log('註冊成功', user);
  })
  .catch((error) => {
    // 處理註冊失敗的情況
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('註冊失敗', errorCode, errorMessage);
  });

