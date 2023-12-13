import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('hallScene')
export class hallScene extends Component {
    @property(Node) 商城: Node = null;
    @property(Node) 戰績: Node = null;
    @property(Node) 反饋: Node = null;
    @property(Node) 玩法: Node = null;
    @property(Node) 設置: Node = null;
    @property(Node) 個人資料: Node = null;

    public 開啟選單 = false;


    // ----------上方功能列-------------
    // 頭像按鈕
    public onFace() {
        if(!this.開啟選單)
        this.個人資料.active = true,
        this.開啟選單 = true;
    
    }


    // 返回按鈕
    public onBack() {
        this.商城.active = false;
        this.戰績.active = false;
        this.反饋.active = false;
        this.玩法.active = false;
        this.設置.active = false;
        this.個人資料.active = false;
        this.開啟選單 = false;
        console.log("確定按鈕被點擊");
    }
    // ----------中間功能列-------------

    // 進入初階場按鈕

    public onInRookieRoom() {
        console.log("確定按鈕被點擊");
    }

    // 進入高級場按鈕

    public onInMasterRoom() {
        console.log("確定按鈕被點擊");
    }
    // ----------下方功能列-------------

    // 商城按鈕
    public onMall() {
        if(!this.開啟選單)
        this.商城.active = true,
        this.開啟選單 = true;
    }

    // 商城內儲值金額1按鈕
    public onAddValue150() {
        console.log("確定按鈕被點擊");
    }

    // 商城內儲值金額1按鈕
    public onAddValue300() {
        console.log("確定按鈕被點擊");
    }

    // 商城內儲值金額2按鈕
    public onAddValue500() {
        console.log("確定按鈕被點擊");
    }

    // 商城內儲值金額3按鈕
    public onAddValue1000() {
        console.log("確定按鈕被點擊");
    }

    // 商城內儲值金額4按鈕
    public onAddValue2000() {
        console.log("確定按鈕被點擊");
    }

    // 商城內儲值金額5按鈕
    public onAddValue3290() {
        console.log("確定按鈕被點擊");
    }




    // 戰績按鈕
    public onRecord() {
        if(!this.開啟選單)
        this.戰績.active = true,
        this.開啟選單 = true;
    }
    // 反饋按鈕
    public onFeedback() {
        if(!this.開啟選單)
        this.反饋.active = true,
        this.開啟選單 = true;
    }

    // 反饋內提交按鈕
    public onFbSummit() {
        console.log("確定按鈕被點擊");
    }
    // 設定按鈕
    public onSetting() {
        if(!this.開啟選單)
        this.設置.active = true,
        this.開啟選單 = true;
    }

    // 設定內音樂開關按鈕
    public onMusic() {
        console.log("確定按鈕被點擊");
    }

    // 設定內音效開關按鈕
    public onAudio() {
        console.log("確定按鈕被點擊");
    }

     // 設定內登出按鈕
    public onLogout() {
        console.log("確定按鈕被點擊");
    }
    //// 玩法按鈕
    public onRule() {
        if(!this.開啟選單)
        this.玩法.active = true,
        this.開啟選單 = true;
    }
}


