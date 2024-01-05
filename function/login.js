    const bcrypt = require('bcryptjs')
    const admin = require('firebase-admin');
    const serviceAccount = require("../gameproject-d9074-firebase-adminsdk-6rnh9-cff9fb8858.json");
    const firebase = require('firebase/app');
    require('firebase/auth');

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

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    const db = admin.firestore();

    const username = 'happy68';//要登入的使用者名稱
    const inputPassword = '666666'//使用者輸入的密碼

    db.collection('users').doc(username).get()
        .then((doc)=>{
            if(doc.exists){
                const userData = doc.data();
                const hashedPasswordFromFirestore = userData.password;

                bcrypt.compare(inputPassword, hashedPasswordFromFirestore,(err,result)=>{
                    if(err){
                        console.error('密碼比對錯誤',err);
                        return;
                    }
                    if(result){
                        console.log('密碼比對成功');
                        //使用Authentication (firebase-admin)
                        firebase.auth()
                        .signInWithEmailAndPassword(userData.email, inputPassword)
                        .then(()=>{
                            console.log('Authenticaiton登入成功');
                        })
                        .catch((error)=>{
                            console.error('登入失敗', error.message)
                        });
                    }else{
                        console.error('密碼比對失敗')
                    }
                });
            }else{
                console.error('使用者不存在')
            }
        })
        .catch((error)=>{
            console.error('取得使用者文件時錯誤',error);
        });
//透過google登入
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

function signInWithGoogle(){
    auth.signInWithPopup(googleProvider)
    .then((userCredential)=>{
        const user= userCredential.user;
    db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        uid: user.uid
    })
    .then(()=>{
        console.log('使用者資料已存入Firestore')
    })
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Google 登入失敗', errorCode, errorMessage); 
    });

    })
}
/*
const { ccclass, property } = cc._decorator;

@ccclass
export default class YourScriptName extends cc.Component {

    // 假設這是按鈕的點擊事件處理函式
    onClickLoginButton() {
        // 呼叫 Google 登入函式
        this.signInWithGoogle();
    }

    // Google 登入函式，這裡放上你的 signInWithGoogle() 函式的內容
    signInWithGoogle() {
        // 實作你的 Google 登入邏輯
        // ...
    }
}
*/