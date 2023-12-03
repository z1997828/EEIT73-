import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('hallScene')
export class hallScene extends Component {
    // ----------上方功能列-------------
    // 商城按鈕
    public onFace() {
        console.log("確定按鈕被點擊");
    }

    // 返回按鈕
    public onBack() {
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
        console.log("確定按鈕被點擊");
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
        console.log("確定按鈕被點擊");
    }
    // 反饋按鈕
    public onFeedback() {
        console.log("確定按鈕被點擊");
    }

    // 反饋內提交按鈕
    public onFbSummit() {
        console.log("確定按鈕被點擊");
    }
    // 設定按鈕
    public onSetting() {
        console.log("確定按鈕被點擊");
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
        console.log("確定按鈕被點擊");
    }
}


