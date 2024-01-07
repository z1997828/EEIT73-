import { _decorator, Component, Node, AudioSource, Button, SpriteFrame, Prefab, instantiate, SpriteAtlas } from 'cc';
import Deck from './Card/carder';
import Card2 from './Card/Card2';
import Card from './Card/Card';



const { ccclass, property } = _decorator;

@ccclass('gameroom')
export class gameRoomScene extends Component {
    @property(Node) setting: Node = null;
    @property(Button) MusicButton: Button = null;
    @property(Button) AudioButton: Button = null;
    @property(SpriteFrame) onImage: SpriteFrame = null;
    @property(SpriteFrame) offImage: SpriteFrame = null;
    @property(AudioSource) bgMusic: AudioSource = null;
    @property(Prefab) pokerPrefab: Prefab = null;
    @property(Node) pokerContainer: Node | null = null;
    @property(SpriteAtlas)
    public cardsSpriteAtlas: SpriteAtlas | null = null;
    deck: Deck = null;

    public openMenu = false;
    private MusicIsOn: boolean = !false;
    private AudioIsOn: boolean = !false;



    onLoad() {
        this.openMenu = false;
        this.setting.active = false;
        this.deck = new Deck();

    }

    start() {
        const [playerOneCards] = this.deck.splitThreeCards(); // 取得玩家一的牌組
        this.showPlayerCards(playerOneCards);
    }

    showPlayerCards(cards: Card2[]) {
        if (!this.pokerPrefab || !this.pokerContainer) return;

        // 先按value进行排序，点数小的牌排在前面
        cards.sort((a, b) => a.value - b.value);
        // 定义起始位置和每张牌的间隔
        const startPositionX = 150;
        const OFFSET_X = 50; // 每张牌之间的间隔，可以根据需要调整

        cards.forEach((card, index) => {
            const pokerNode = instantiate(this.pokerPrefab);
            if (!pokerNode) return; // 如果实例化失败，直接返回

            const cardComponent = pokerNode.getComponent(Card);
            if (cardComponent) {
                cardComponent.showCards(card, this.cardsSpriteAtlas); // 设置牌面
            }

            // 根据 index 计算牌的 x 位置
            const posX = startPositionX + OFFSET_X * index;
            pokerNode.setPosition(posX, 0, 0); // 设置每张牌的位置

            this.pokerContainer.addChild(pokerNode); // 将牌节点添加到容器中
        });
    }

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


