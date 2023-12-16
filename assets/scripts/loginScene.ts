import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('loginScene')
export class loginScene extends Component {
    @property (Node) singUp: Node = null;
    @property (Node) singIn: Node = null;

    public openMenu = false;
    onLoad() {
        this.singUp.active = false;
        this.singIn.active = false;
    }

    public onTest (){
        director.loadScene("hall")
    }

// -----------登入場景按鈕----------

 // 會員註冊按鈕
 public onMemberregist (){
    if(!this.openMenu)
    this.singUp.active = true,
    this.openMenu = true;
}

// 會員登入按鈕
public onMemberLogin (){
    if(!this.openMenu)
    this.singIn.active = true,
    this.openMenu = true;
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
        console.log("確定按鈕被點擊");
        
    }
    // 找回密碼按鈕
    public onFindpw (){
        console.log("確定按鈕被點擊");
    }


    
    
}

