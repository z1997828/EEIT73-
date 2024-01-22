import { _decorator, Component, Node, AudioSource, Button, SpriteFrame, Label, director, game, Prefab, instantiate } from 'cc';
import { createRoomConfig } from "./components/define"
import gameManager from './components/gameManager';
import SocketUtil from './components/SocketUtil';
import Util from './components/Util';

const { ccclass, property } = _decorator;

@ccclass('hall')
export class hallScene extends Component {
    @property(Node) mall: Node = null;
    @property(Node) record: Node = null;
    @property(Node) feedback: Node = null;
    @property(Node) rule: Node = null;
    @property(Node) setting: Node = null;
    @property(Node) face: Node = null;
    @property(Node) mail: Node = null;
    @property(Button) MusicButton: Button = null;
    @property(Button) AudioButton: Button = null;
    @property(SpriteFrame) onImage: SpriteFrame = null;
    @property(SpriteFrame) offImage: SpriteFrame = null;
    @property(AudioSource) bgMusic: AudioSource = null;
    @property(Node) personalInfo: Node = null;
    //sammykym:
    @property(Node) recordFrame: Node = null;  
    @property(Prefab) recordText:Prefab=null;
    //-----------
    @property(Node) lbFace: Node = null;
    @property(Node) lbname: Node = null;
    @property(Node) lbMoney: Node = null;
    _lbname: Label = null;
    _lbMoney: Label = null;
    @property(Node) pIname: Node = null;
    @property(Node) pIemail: Node = null;
    @property(Node) pIip: Node = null;
    _pIname: Label = null;
    _pIemail: Label = null;
    _pIip: Label = null;
    public openMenu = false;
    private MusicIsOn: boolean = !false;
    private AudioIsOn: boolean = !false;

    
    onLoad() {

        this._lbname = this.lbname.getComponent(Label);
        this._lbMoney = this.lbMoney.getComponent(Label);
        this._pIname = this.pIname.getComponent(Label);
        this._pIemail = this.pIemail.getComponent(Label);
        this._pIip = this.pIip.getComponent(Label);
        this.mall.active = false;
        this.record.active = false;
        this.feedback.active = false;
        this.rule.active = false;
        this.setting.active = false;
        this.face.active = false;
        this.mail.active = false;
        this.openMenu = false;
        gameManager.Instance.socketUtil = new SocketUtil();
        gameManager.Instance.util = new Util();
        

        this.init();
    }

   

    init() {
        let userDetails = gameManager.Instance.userDetails;
        if (userDetails) {
            this._lbname.string = userDetails.username;
            this._lbMoney.string = userDetails.money
            this._pIname.string = userDetails.username;
            this._pIemail.string = userDetails.email;

            //sammykym:
            this.recordFrame.removeAllChildren();
            userDetails.user_playway.forEach(record => {
                let record_text = instantiate(this.recordText);
                record.money>0?record_text.getComponentsInChildren(Label)[0].string='勝':record_text.getComponentsInChildren(Label)[0].string='負';
                record_text.getComponentsInChildren(Label)[1].string=record.date;
                record.identity=='banker'?record_text.getComponentsInChildren(Label)[2].string='地主':record_text.getComponentsInChildren(Label)[2].string='農民';
                record_text.getComponentsInChildren(Label)[3].string=record.money;
                this.recordFrame.addChild(record_text);
            });
            //-----------
        }
    }

    
    // ----------上方功能列-------------
    // 頭像按鈕
    public onFace() {
        if (!this.openMenu)
            this.face.active = !false,
                this.openMenu = !false;
        console.log("確定按鈕被點擊");
    }
    // 郵件按鈕
    public onMail() {
        if (!this.openMenu)
            this.mail.active = !false,
                this.openMenu = !false;
    }


    // 返回按鈕
    public onBack() {
        this.mall.active = false;
        this.mail.active = false;
        this.record.active = false;
        this.feedback.active = false;
        this.rule.active = false;
        this.setting.active = false;
        this.face.active = false;
        this.openMenu = false;
        console.log("確定按鈕被點擊");
    }
    // ----------中間功能列-------------

    // 進入初階場按鈕
    onEnterRoom(rateKey) {
        // 獲取房間配置
        const config = createRoomConfig[rateKey];
        if (config) {
            // 創建房間請求
            gameManager.Instance.socketUtil.connect();
            gameManager.Instance.socketUtil.requestCreateRoom(config, (err, result) => {
                if (err) {
                    console.error("創建房間失敗", err);
                } else {
                    console.log("創建房間成功", result);
                    director.loadScene('gameroom')
                    // 在這裡處理房間創建成功後的邏輯，例如跳轉到房間場景
                }
            });
        } else {
            console.error("無效的房間等級");
        }
    }

    public onInRookieRoom() {
        this.onEnterRoom('1')
    }

    // 進入高級場按鈕

    public onInMasterRoom() {
       
    }
    // ----------下方功能列-------------

    // 商城按鈕
    public onMall() {
        if (!this.openMenu)
            this.mall.active = !false,
                this.openMenu = !false;
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
        if (!this.openMenu)
            this.record.active = !false,
                this.openMenu = !false;
    }

    // 反饋按鈕
    public onFeedback() {
        if (!this.openMenu)
            this.feedback.active = !false,
                this.openMenu = !false;
    }

    // 反饋內提交按鈕
    public onFbSummit() {
        console.log("確定按鈕被點擊");
    }
    // 設定按鈕
    public onSetting() {
        if (!this.openMenu)
            this.setting.active = !false,
                this.openMenu = !false;
    }


    // 設定內音樂開關按鈕
    public onMusic() {
        this.MusicIsOn = !this.MusicIsOn;
        if (this.MusicIsOn) {
            this.MusicButton.normalSprite = this.onImage;
            this.MusicButton.pressedSprite = this.onImage;
            this.bgMusic.volume = 1;
            // this.bgMusic.play();
        } else {
            this.MusicButton.normalSprite = this.offImage;
            this.MusicButton.pressedSprite = this.offImage;
            this.bgMusic.volume = 0;
            // this.bgMusic.stop();
        }
        console.log("確定按鈕被點擊");
    }

    // 設定內音效開關按鈕
    public onAudio() {
        this.AudioIsOn = !this.AudioIsOn;
        if (this.AudioIsOn) {
            this.AudioButton.normalSprite = this.onImage;
            this.AudioButton.pressedSprite = this.onImage;
            // this.bgMusic.volume = 1;
        } else {
            this.AudioButton.normalSprite = this.offImage;
            this.AudioButton.pressedSprite = this.offImage;
            // this.bgMusic.volume = 0;
        }
        console.log("確定按鈕被點擊");
    }

    // 設定內登出按鈕
    public onLogout() {

        gameManager.Instance.util.logout();

    }
    //// 玩法按鈕
    public onRule() {
        if (!this.openMenu)
            this.rule.active = !false,
                this.openMenu = !false;
    }
}


