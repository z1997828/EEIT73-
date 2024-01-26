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

    @property(Prefab) pokerPrefab: Prefab = null;
    @property(Node) pokerContainer: Node | null = null;
    @property(SpriteAtlas)
    public cardsSpriteAtlas: SpriteAtlas | null = null;
    deck: Deck = null;

    onLoad() {
        
        this.node.on("push_card_event",function(event){
            console.log("on push_card_event")
            //自己不再发牌
            if(this.username==gameManager.Instance.userDetails.username){
                return
            }
            const [playerOneCards] = this.deck.splitThreeCards(); // 取得玩家一的牌組
            this.showPlayerCards(playerOneCards);
          }.bind(this))
    

        this.deck = new Deck();
        
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