import { _decorator, Component, director, Node ,AudioSource,AudioClip, find, EditBox } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('login')
export class loginScene extends Component {
    @property (Node) singUp: Node = null;
    @property (Node) singIn: Node = null;
    @property (EditBox)setNameInput: EditBox = null;
    @property (EditBox)setAccountInput: EditBox = null;
    @property (EditBox)setPasswdInput: EditBox = null;
    @property (EditBox)confirmPwInput: EditBox = null;
    @property (EditBox)accountInput: EditBox = null;
    @property (EditBox)passwdInput: EditBox = null;
    public openMenu = false;
    
    onLoad() {
        
        this.singUp.active = false;
        this.singIn.active = false;
        let ws = new WebSocket("ws://127.0.0.1:3001")
        
    }

   

    
    public onTest (){
        director.loadScene("hall")
    }

    




// -----------登入場景按鈕----------

 // 會員註冊按鈕
 public onMemberregist (){
    if(!this.openMenu)
    this.singUp.active = !false,
    this.openMenu = !false;
    
    
}

// 會員登入按鈕
public onMemberLogin (){
    if(!this.openMenu)
    this.singIn.active = !false,
    this.openMenu = !false;
}


// -----------註冊頁按鈕------------

    // 確認會員是否重複按鈕
    public onCheckName (){
        console.log("確定按鈕被點擊");
    }

    // 驗證碼按鈕
    public onVerif (){
        console.log("確定按鈕被點擊");
    }

    // 確定註冊按鈕
    public onConfirmregist (){
        console.log("確定按鈕被點擊");
    }

    // 返回按鈕
    public onBack (){
        this.singUp.active = false;
        this.singIn.active = false;
        this.openMenu = false;
    }

    // -----------登入頁按鈕------------

    // 確定登入按鈕
    public onConfirmLogin (){
        let account = this.accountInput.string
        let passwd = this.passwdInput.string
        console.log("account:" + account + "password" + passwd)
    }
    // 找回密碼按鈕
    public onFindpw (){
        console.log("確定按鈕被點擊");
    }


    
    
}

