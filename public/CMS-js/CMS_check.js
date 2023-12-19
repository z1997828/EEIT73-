


var username='admin',password='12345';


function checkAdmin(username,password){
    if (this.username===username&&this.password===password) {
        window.location.href='CMS.html';
    }else{
        return alert("登入失敗，請檢查使用者名稱和密碼。");
    }
}