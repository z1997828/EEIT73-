import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('loginScene')
export class loginScene extends Component {
    @property (Node) 會員註冊: Node = null;
    @property (Node) 會員登入: Node = null;

    public 開啟選單 = false;
    onLoad() {
        this.會員註冊.active = false;
        this.會員登入.active = false;
    }

// -----------登入場景按鈕----------

 // 會員註冊按鈕
 public onMemberregist (){
    if(!this.開啟選單)
    this.會員註冊.active = true,
    this.開啟選單 = true;
}

// 會員登入按鈕
public onMemberLogin (){
    if(!this.開啟選單)
    this.會員登入.active = true,
    this.開啟選單 = true;
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
        this.會員註冊.active = false;
        this.會員登入.active = false;
        this.開啟選單 = false;
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

