var admin = require('firebase-admin');
var serviceAccount = require("../gameproject-d9074-firebase-adminsdk-6rnh9-cff9fb8858.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    ignoreUndefinedProperties: true
});

let db = admin.firestore();
//users 資料庫集合的名稱，顯示id及內容
const FieldValue = admin.firestore.FieldValue;


exports.getData = async function getData(accountValue, passwordValue){
    await db.collection('users')
    
    .where("account", "==", accountValue)
    .where("password", "==", passwordValue)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    })
    .catch((error) => {
        console.log('Error getting documents: ', error);
    });
}

//  function (account,password,callback) {
    
// }

