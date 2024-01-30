import { _decorator, Component, Label, Sprite, Node, Prefab, SpriteAtlas, instantiate } from 'cc';
import Deck from '../Card/carder';
import Card2 from '../Card/Card2';
import Card from '../Card/Card';
import gameManager from './gameManager';


const { ccclass, property } = _decorator;

@ccclass('PlayerPrefab')
export default class PlayerPrefab extends Component {

    @property(Label)
    username_label: Label = null;

    @property(Node)
    avatar: Node = null;

    @property(Label)
    money_label: Label = null;

    @property(Node)
    headimage: Node = null;

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

          this.node.on("playernode_canrob_event",function(event){
            var detail = event
            console.log("------playernode_canrob_event detail:"+detail)
            if(detail==this.accountid){
              this.qiangdidzhu_node.active=true
              //this.tips_label.string ="正在抢地主" 
              this.time_label.string="10"
              //开启一个定时器

            }
        }.bind(this))

    }


    init_data(data, index) {
        console.log("init_data:" + JSON.stringify(data))
        //data:{"accountid":"2117836","nick_name":"tiny543","avatarUrl":"http://xxx","goldcount":1000}
        this.avatar = data.avatar
        this.username_label.string = data.username
        this.money_label.string = data.money
        this.cardlist_node = []
        this.seat_index = index
        if (data.isready == true) {
            this.readyimage.active = true
        }
    }

    pushCard(){
        
        // this.pokerContainer.active = true 
        // for(var i=0;i<17;i++){
        //     var card = instantiate(this.pokerPrefab)
        //     console.log(" this.pokerContainer.parent.parent"+ this.pokerContainer.parent.parent.name)
        //     card.parent = this.pokerContainer
        //     //card.parent = this.node   
        //     //console.log("call pushCard x:"+card.x+" y:"+card.y)
        //     this.cardlist_node.push(card)
        // }
    }

    

    
}