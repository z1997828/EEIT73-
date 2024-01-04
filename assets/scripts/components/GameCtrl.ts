import { Prefab, instantiate } from "cc";
import Poker from "../Card/Poker";
import { UIPoker } from "../Card/UIPoker";


export default class GameCtrl{
    private pokerPrefab:Prefab=null;
    private pokerContainer: Node =null;
    private pokers: Poker[] = [];

    
    public init(pokerPrefab:Prefab){
        // this.pokerContainer = pokerContainer;
        this.pokerPrefab = pokerPrefab;
    }
// 創建一副牌
    public createCard(){
        for(let point = 1 ; point <= 13;point++){
            for(let suit = 0 ; suit < 4;suit++){
                let poker = new Poker(point,suit);
                this.pokers.push(poker);
            }
        }
        let bigKing = new Poker(14, 4);
        let smallKing = new Poker(15, 4);
        
        this.pokers.push(bigKing, smallKing);        
        console.log(this.pokers);
    }
// 洗牌
    public shuffleCard = function(){
        for(var i = this.pokers.length-1; i>=0; i--){
            var randomIndex = Math.floor(Math.random()*(i+1));
            //随机交换
            var tmpCard = this.pokers[randomIndex];
            this.pokers[randomIndex] = this.pokers[i];
            this.pokers[i] = tmpCard;
        }
       
        return this.pokers
    }

    public splitThreeCards = function(){
        var threeCards = {}
        for(var i=0;i<17;i++){
           for(var j=0;j<3;j++){
                if (threeCards.hasOwnProperty(j)) {
                    threeCards[j].push(this.pokers.pop());
                } else {
                    threeCards[j] = [this.pokers.pop()];
                }
           }
        }
        
        return [threeCards[0],threeCards[1],threeCards[2],this.pokers]
    }
}