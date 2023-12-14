import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('loadScene')
export class loadScene extends Component {
    @property(Node) alert: Node = null;
    onLoad() {
        this.alert.active = false ;
    }


    start() {
        this.scheduleOnce(()=>{
            
            director.loadScene("login")

        },3)
    }

    update(deltaTime: number) {
        
    }
}


