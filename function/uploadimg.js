var uuid = require('uuid-v4');
var admin = require('firebase-admin');
var serviceAccount = require("../gameproject-d9074-firebase-adminsdk-6rnh9-cff9fb8858.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://gameproject-d9074.appspot.com"
});
var bucket = admin.storage().bucket();
/*
    上述為初始化資料庫，及指定資料庫網址
*/
async function uploadFile(filename){
    await bucket.upload(filename,{
        gzip:true,
        metadata:{
            metadata:{
                firebaseStorageDownloadTokens:uuid()
            },
            cacheControl: ' public,max-age=31536000',
        },
    });
    console.log(`${filename} uploaded.`);
}
uploadFile('C:/Users/vans9/Downloads/train.jpg').catch(console.error);