import { _decorator, Component, Node,AudioSource,Button,SpriteFrame} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gameRoomScene')
export class gameRoomScene extends Component {
    @property(Node) setting: Node = null;
    @property(Button)MusicButton: Button = null;
    @property(Button)AudioButton: Button = null;
    @property(SpriteFrame)onImage: SpriteFrame = null;
    @property(SpriteFrame)offImage: SpriteFrame = null;
    @property(AudioSource) bgMusic: AudioSource = null;


    
    public openMenu = false;
    private MusicIsOn: boolean = !false;
    private AudioIsOn: boolean = !false;

    onLoad() {
        this.openMenu = false;
        this.setting.active = false;
    }

// 返回按鈕
public onBack() {
    this.setting.active = false;
    this.openMenu = false;
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



}


