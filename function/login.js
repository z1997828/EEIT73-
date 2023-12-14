// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebase-admin";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const signWithEmailAndPassword = (email, password) => {

    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user
            if (user) {

                console.log('user=', user);

                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                // ...
            } else {
                // User is signed out.
                // ...
            }
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.error('error=', error);
        });
};
const email = "user@example.com";
const password = "password123";
signWithEmailAndPassword(email, password);

////////////////使用者是否已登入？

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'

const AuthUserContext = createContext({
authUser:null, //設定初始值
isLoading:true //要開啟程式時獲取資料所以用true
});
//保持追蹤用戶狀態
export default function useFirebaseAuth(){
const [authUser,setAuthUser] = useState(null);
const [isLoading,setIsLoading] = useState(true);

const authStateChanged = async(user) =>{
setIsLoading(true);
if(!user){
setAuthUser(null);
setIsLoading(false);
return;
}
//如果有user資料的話
setAuthUser({
uid: user.uid,
email:user.email
});
//上面已完成用戶資料讀取，所以可以不用讀了
setIsLoading(false);
}

useEffect(()=>{
//當用戶停止使用時，停止監聽事件
const unsibscribe = onAuthStateChanged(auth,authStateChanged);
return () => unsibscribe();
},[]);

return{
authUser,
isLoading
}

}
export function AuthUserProvider({children}){
const auth = useFirebaseAuth();
return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
}

export const useAuth = () => useContext(AuthUserContext);