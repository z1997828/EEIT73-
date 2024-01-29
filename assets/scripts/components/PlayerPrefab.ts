import { _decorator, Component, Label, Sprite, Node, Prefab, SpriteAtlas, instantiate } from 'cc';
import Deck from '../Card/carder';
import Card2 from '../Card/Card2';
import Card from '../Card/Card';
import gameManager from './gameManager';


const { ccclass, property } = _decorator;

@ccclass('PlayerNode')
export class PlayerNode extends Component {

    @property(Label)
    username_label: Label = null;

    @property(Node)
    avatar: Node = null;

    @property(Label)
    money_label: Label = null;

    @property(Node)
    headimage: Node = null;


    @property(Node)
    card_node: Node = null;

    @property(Node)
    clockimage: Node = null;

    @property(Node)
    qiangdidzhu_node: Node = null;

    @property(Label)
    time_label: Label = null;

    @property(Node)
    robimage_sp: Node = null;

    @property(Node)
    robnoimage_sp: Node = null;

    @property(Node)
    masterIcon: Node = null;
    @property(Node) readyimage: Node = null;
    @property(Prefab) pokerPrefab: Prefab = null;
    @property(Node) pokerContainer: Node | null = null;
    @property(SpriteAtlas)
    public cardsSpriteAtlas: SpriteAtlas | null = null;
    deck: Deck = null;
    cardlist_node = []
    seat_index = null;
    onLoad() {

        //监听开始游戏事件(客户端发给客户端)
        this.node.on("gamestart_event", function (event) {
            this.readyimage.active = false
        }.bind(this))

        this.node.on("push_card_event", function (event) {
            console.log("on push_card_event")
            //自己不再发牌
            if (this.username == gameManager.Instance.userDetails.username) {
                return
            }
            const [playerOneCards] = this.deck.splitThreeCards(); // 取得玩家一的牌組
            this.showPlayerCards(playerOneCards);
        }.bind(this))

        this.node.on("playernode_rob_state_event", function (event) {
            //{"accountid":"2162866","state":1}
            var detail = event

            //如果是自己在抢，需要隐藏qiangdidzhu_node节点
            //this.accountid表示这个节点挂接的accountid
            if (detail.username == this.username) {
                //console.log("detail.accountid"+detail.accountid)
                this.qiangdidzhu_node.active = false

            }

            // if(this.accountid == detail.accountid){
            //   if(detail.state==qian_state.qian){

            //     console.log("this.robIcon_Sp.active = true")
            //     this.robIcon_Sp.active = true

            //   }else if(detail.state==qian_state.buqiang){
            //     this.robnoIcon_Sp.active = true

            //   }else{
            //     console.log("get rob value :"+detail.state)
            //   }
            // }

        }.bind(this))

        this.node.on("playernode_changemaster_event", function (event) {
            var detail = event
            this.robIcon_Sp.active = false
            this.robnoIcon_Sp.active = false
            if (detail == this.accountid) {
                this.masterIcon.active = true
            }
        }.bind(this))

        this.node.on("player_ready_notify", function (event) {
            console.log("player_ready_notify event", event)
            var detail = event
            console.log("------player_ready_notify detail:" + detail)
            if (detail == this.accountid) {
              this.readyimage.active = true
            }
          }.bind(this))

          


        this.deck = new Deck();

        

    }


    init_data(data, index) {
        console.log("init_data:" + JSON.stringify(data))
        //data:{"accountid":"2117836","nick_name":"tiny543","avatarUrl":"http://xxx","goldcount":1000}

        this.username_label = data.username
        this.money_label.string = data.money
        this.cardlist_node = []
        this.seat_index = index
        if (data.isready == true) {
            this.readyimage.active = true
        }
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
}