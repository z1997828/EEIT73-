import { _decorator, Component, Node, AudioSource, Button, SpriteFrame, Prefab, instantiate, SpriteAtlas,director, Label } from 'cc';

import gameManager from './components/gameManager';



const { ccclass, property } = _decorator;

@ccclass('gameroom')
export class gameRoomScene extends Component {
    @property(Node) setting: Node = null;
    @property(Button) MusicButton: Button = null;
    @property(Button) AudioButton: Button = null;
    @property(SpriteFrame) onImage: SpriteFrame = null;
    @property(SpriteFrame) offImage: SpriteFrame = null;
    @property(AudioSource) bgMusic: AudioSource = null;
    @property(Prefab) PlayerNode:Prefab = null;
    @property(Label)bottomLabel:Label = null;
    @property(Label)rateLabel:Label = null;
    @property(Label)roomNumberLabel:Label = null;
    playerNodeList = []
    public openMenu = false;
    private MusicIsOn: boolean = !false;
    private AudioIsOn: boolean = !false;



    onLoad() {
        this.openMenu = false;
        this.setting.active = false;
        this.playerNodeList = [];
        this.bottomLabel.string = "底分:" + gameManager.Instance.userDetails.bottom
        this.rateLabel.string = "倍率:" + gameManager.Instance.userDetails.rate
        this.roomNumberLabel.string = "房間號:" 
    }

    start() {
        
    }

    // 

    // 返回按鈕
    public onBack() {
        this.setting.active = false;
        this.openMenu = false;
    }
    // 設定按鈕
    public onSetting() {
        if (!this.openMenu)
            this.setting.active = !false,
                this.openMenu = !false;
    }
    //返回大廳按鈕
    public onleaveRoom() {
        director.loadScene('hall')
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
    public onReady() {

    }


}


