import { Esuit } from "./configsEnum";

export default class Poker {
    public point:number = -1;
    public suit:Esuit =Esuit.S;
    constructor(point?:number,suit?:Esuit){
        if(point){this.point = point}
        if(suit){this.suit = suit}
    }
}