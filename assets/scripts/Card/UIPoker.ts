import { _decorator, Component, Label, Node } from 'cc';
import Poker from './Poker';
const { ccclass, property } = _decorator;

@ccclass('UIPoker')
export class UIPoker extends Component {
    @property(Label) label:Label =null;
    public init(poker:Poker){
        this.label.string = `UIPoker point: ${poker.point} suit:${poker.suit}`
    }
}

