import { _decorator, Component, Node, Sprite, SpriteAtlas } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('card')
export default class Card extends Component {
    @property({ type: SpriteAtlas })
    public cardsSpriteAtlas: SpriteAtlas | null = null;

    private flag: boolean = false;
    private offset_y: number = 20;
    private cardId: number | undefined;
    private cardData: any; // 根據實際情況定義類型
    private accountId: string | undefined;

    onLoad() {
        // 初始化
        this.node.on('reset_card_flag', this.resetCardFlag, this);
        // 綁定其他事件
    }

    resetCardFlag() {
        if (this.flag) {
            this.flag = false;
            this.node.position = this.node.position.subtract3f(0, this.offset_y, 0);
        }
    }

    runToCenter() {
        //移动到屏幕中间，并带一个牌缩小的效果
    }

    start() {

    }

    init_data(data) {

    }
    // 其他方法同理轉換，省略...

    // setTouchEvent() {
    //     if (this.accountId === myglobal.playerData.accountID) {
    //         this.node.on(Node.EventType.TOUCH_START, this.onCardTouch, this);
    //     }
    // }

    // onCardTouch() {
    //     const gameSceneNode = this.node.parent;
    //     if (gameSceneNode) {
    //         const roomState = gameSceneNode.getComponent('GameScene').roomState;
    //         if (roomState === RoomState.ROOM_PLAYING) {
    //             console.log(`TOUCH_START id: ${this.cardId}`);
    //             this.flag = !this.flag;
    //             this.node.position = this.node.position.add3f(0, this.flag ? this.offset_y : -this.offset_y, 0);
    //             // 通知 gameUI 层选定的牌
    //             gameSceneNode.emit(this.flag ? 'choose_card_event' : 'unchoose_card_event', {
    //                 cardId: this.cardId,
    //                 cardData: this.cardData,
    //             });
    //         }
    //     }
    // }

    showCards(card: any, cardsSpriteAtlas: SpriteAtlas) {
        this.cardData = card;
        // this.accountId = accountId;

        let spriteKey = '';
        if (card.shape) {
            const cardValueMap = {
                "12": 1, "13": 2, "1": 3, "2": 4, "3": 5,
                "4": 6, "5": 7, "6": 8, "7": 9, "8": 10,
                "9": 11, "10": 12, "11": 13
            };

            // 黑桃：spade
            // 红桃：heart
            // 梅花：club
            // 方片：diamond
            const cardShapeMap = {
                "1": 3,
                "2": 2,
                "3": 1,
                "4": 0
            };
            spriteKey = 'card_' + (cardShapeMap[card.shape] * 13 + cardValueMap[card.value]);
        } else if (card.king !== undefined) {
            const kingsMap = {
                "14": 54, "15": 53
            };
            spriteKey = 'card_' + kingsMap[card.king];
        }

        if (this.cardsSpriteAtlas && spriteKey) {
            const spriteFrame = this.cardsSpriteAtlas.getSpriteFrame(spriteKey);
            if (spriteFrame) {
                const spriteComponent = this.node.getComponent(Sprite);
                if (spriteComponent) {
                    spriteComponent.spriteFrame = spriteFrame;
                }
            }
        }
    }
}