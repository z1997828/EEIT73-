import { _decorator, Component, Node, Prefab, Sprite, SpriteAtlas } from 'cc';
import gameManager from '../components/gameManager';
import { RoomState } from '../components/define';
const { ccclass, property } = _decorator;

@ccclass('Card')

export default class Card extends Component {
    @property(SpriteAtlas)
    public cardsSpriteAtlas: SpriteAtlas | null = null;
    @property(Prefab)
    public pokerPrefab: Prefab = null;
    @property(Node)
    public pokerContainer: Node = null;
    private flag = false;
    private offset_y = null;
    private card_id = null;
    private card_data = null;
    private username = '';
    private CardValue = null;
    
    onLoad() {
        this.offset_y = 20

        this.node.on("reset_card_flag", function (event) {
            if (this.flag == true) {
                this.flag = false
                this.node.y -= this.offset_y
            }
        }.bind(this))
    }



    runToCenter() {
        //移动到屏幕中间，并带一个牌缩小的效果
    }

    start() {

    }

    init_data(data) {

    }
    // 其他方法同理轉換，省略...

    setTouchEvent() {
        if (this.username == gameManager.Instance.userDetails.userDetails) {
            this.node.on(Node.EventType.TOUCH_START, function (event) {
                var gameroom_node = this.node.parent
                var room_state = gameroom_node.getComponent("gameroom").roomstate
                if (room_state == RoomState.ROOM_PLAYING) {
                    console.log("TOUCH_START id:" + this.card_id)
                    if (this.flag == false) {
                        this.flag = true
                        this.node.position.y += this.offset_y
                        //通知gameui层选定的牌
                        var carddata = {
                            "cardid": this.card_id,
                            "card_data": this.card_data,
                        }
                        gameroom_node.emit("choose_card_event", carddata)
                    } else {
                        this.flag = false
                        this.node.y -= this.offset_y
                        //通知gameUI取消了那张牌
                        gameroom_node.emit("unchoose_card_event", this.card_id)
                    }
                }

            }.bind(this))
        }

    }

    showCards(card, username) {
        //card.index是服务器生成card给对象设置的一副牌里唯一id
        this.card_id = card.index
        //传入参数 card={"value":5,"shape":1,"index":20}
        this.card_data = card
        if (username) {
            this.username = username //标识card属于的玩家
        }

        // 黑桃：spade
        // 红桃：heart
        // 梅花：club
        // 方片：diamond
        // const CardShape = {
        //     "S": 1,
        //     "H": 2,
        //     "C": 3,
        //     "D": 4,
        // };

        const cardShpae = {
            "1": 3,
            "2": 2,
            "3": 1,
            "4": 0
        }

        //this.node.getComponent(cc.Sprite).spriteFrame = 
        //服务器定义牌的表示
        // const cardvalue = {
        //     "A": 12,
        //     "2": 13,
        //     "3": 1,
        //     "4": 2,
        //     "5": 3,
        //     "6": 4,
        //     "7": 5,
        //     "8": 6,
        //     "9": 7,
        //     "10": 8,
        //     "J": 9,
        //     "Q": 10,
        //     "K": 11,
        // }
    
        const Kings = {
            "14": 54,
            "15": 53
        }

        let spriteKey = '';

        if (card.shape) {
            spriteKey = 'card_' + (cardShpae[card.shape] * 13 + this.CardValue[card.value]);

        } else {
            spriteKey = 'card_' + Kings[card.king];
        }
        
        // console.log("spriteKey"+spriteKey)
        this.node.getComponent(Sprite).spriteFrame = this.cardsSpriteAtlas.getSpriteFrame(spriteKey)
        this.setTouchEvent()
    }


}