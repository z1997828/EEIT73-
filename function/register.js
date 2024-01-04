var admin = require('firebase-admin');
var serviceAccount = require("../gameproject-d9074-firebase-adminsdk-6rnh9-cff9fb8858.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const bcrypt = require('bcryptjs')

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

const email = 'happy68@happy.com';
const password = '666666';
const additionalData ={
    username : 'happy68'
}

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    const username = additionalData.username; // 擷取新用戶的名稱

    // 使用bcrypt加密
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('密碼加密失敗', err);
        return;
      }

      // 額外將資料寫入db - 在此處寫入資料庫
      db.collection('users').doc(username).set({
        email: email,
        username: username,
        password: hashedPassword, // 存儲加密後的密碼
      })
      .then(() => {
        console.log('用戶資料寫入成功');
      })
      .catch((error) => {
        console.error('寫入用戶資料失敗', error);
      });

      console.log('註冊成功', user);
    });
  })
  .catch((error) => {
    // 處理註冊失敗的情況
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('註冊失敗', errorCode, errorMessage);
  });

