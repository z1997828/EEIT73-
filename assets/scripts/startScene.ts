import { _decorator, Component, director, Label, Node } from 'cc';
import gameManager from './components/gameManager';
import HTTP from './components/HTTP';
import { Api } from './components/urlAPI';
import NetUtil from './components/NetUtil';

const { ccclass, property } = _decorator;
const io = (window as any).io || {};
@ccclass('start')
export class startScence extends Component {
    @property(Node) startBg: Node = null;
    @property(Node) connecting: Node = null;
    _connecting: Label = null;
    public static readonly Instance: NetUtil = new NetUtil();
    sio = null;
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


