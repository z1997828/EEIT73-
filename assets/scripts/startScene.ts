import { _decorator, Component, director, Label, Node } from 'cc';

const { ccclass, property } = _decorator;
@ccclass('start')
export class startScence extends Component {
    @property(Node) startBg: Node = null;
    @property(Node) connecting: Node = null;
    _connecting: Label = null;
    onLoad() {
        this._connecting = this.connecting.getComponent(Label);
        this.connecting.active = false
        
        let ws = new WebSocket("ws://127.0.0.1:3001")
        ws.onopen = (event)=> {
            console.log("與伺服器連接成功");
            ws.send("Hello server!");
            this.schedule(function() {
                director.loadScene("loading")
            }, 2);
        };

        ws.onmessage = function (data) {
            console.log("伺服器傳送消息 :" + data)
            ws.close
        }
     
        ws.onclose = function () {
            console.log("與伺服器斷開連接")
        };

    }
    


    start() {
       
    }

   
}


