import { _decorator, Component, Node,AudioSource,Button,SpriteFrame, Label, director  } from 'cc';
import gameManager from './components/gameManager';
import SocketUtil from './components/SocketUtil';
const { ccclass, property } = _decorator;

@ccclass('hall')
export class hallScene extends Component {
    @property(Node) mall: Node = null;
    @property(Node) record: Node = null;
    @property(Node) feedback: Node = null;
    @property(Node) rule: Node = null;
    @property(Node) setting: Node = null;
    @property(Node) face: Node = null;
    @property(Button)MusicButton: Button = null;
    @property(Button)AudioButton: Button = null;
    @property(SpriteFrame)onImage: SpriteFrame = null;
    @property(SpriteFrame)offImage: SpriteFrame = null;
    @property(AudioSource) bgMusic: AudioSource = null;
    @property(Label) name123: Label = null;
    

    public openMenu = false;
    private MusicIsOn: boolean = !false;
    private AudioIsOn: boolean = !false;
    onLoad() {
        this.mall.active = false;
        this.record.active = false;
        this.feedback.active = false;
        this.rule.active = false;
        this.setting.active = false;
        this.face.active = false;
        this.openMenu = false;
        gameManager.Instance.socketUtil = new SocketUtil();
        gameManager.Instance.socketUtil.connect();
    }

    // ----------上方功能列-------------
    // 頭像按鈕
    public onFace() {
        if(!this.openMenu)
        this.face.active = !false,
        this.openMenu = !false;
        console.log("確定按鈕被點擊");
    }


    // 返回按鈕
    public onBack() {
        this.mall.active = false;
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

    public onInRookieRoom() {
        
        console.log("確定按鈕被點擊");
        director.loadScene('gameroom');
    }

    // 進入高級場按鈕

    public onInMasterRoom() {
        console.log("確定按鈕被點擊");
        director.loadScene('gameroom');
    }
    // ----------下方功能列-------------

    // 商城按鈕
    public onMall() {
        if(!this.openMenu)
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
        if(!this.openMenu)
        this.record.active = !false,
        this.openMenu = !false;
    }

    // 反饋按鈕
    public onFeedback() {
        if(!this.openMenu)
        this.feedback.active = !false,
        this.openMenu = !false;
    }

    // 反饋內提交按鈕
    public onFbSummit() {
        console.log("確定按鈕被點擊");
    }
    // 設定按鈕
    public onSetting() {
        if(!this.openMenu)
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
        console.log("確定按鈕被點擊");
    }
    //// 玩法按鈕
    public onRule() {
        if(!this.openMenu)
        this.rule.active = !false,
        this.openMenu = !false;
    }
}


