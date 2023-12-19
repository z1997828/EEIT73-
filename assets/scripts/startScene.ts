import { _decorator, Component, director, Label, Node } from 'cc';
import gameManager from './components/gameManager';
import HTTP from './components/HTTP';
import { Api } from './components/urlAPI';
import NetUtil from './components/NetUtil';

const { ccclass, property } = _decorator;

@ccclass('start')
export class startScence extends Component {
    @property(Node)

    startBg: Node = null;
    @property(Node)
    connecting: Node = null;

    _connecting: Label = null;
    onLoad() {
        this._connecting = this.connecting.getComponent(Label);
        this.connecting.active = false
        this.scheduleOnce(() => {
            this.startBg.active = false;
            this.init()

        }, 2)
        
        let ws = new WebSocket("ws://127.0.0.1:3001/msg")
        ws.onopen = (event)=> {
            console.log("與伺服器連接成功");
            ws.send("Hello server!");
        };

        ws.onmessage = function (data) {
            console.log("伺服器傳送消息 :" + data)
            ws.close
        }
     
        ws.onclose = function () {
            console.log("與伺服器斷開連接")
        };

    }
    //  進行初始化
    init() {
        gameManager.Instance.http = new HTTP();
        this.connecting.active = true;
        this._connecting.string = "正在連接伺服器...";
        this.getServerInfo();
    }

    獲取伺服器資料

    getServerInfo() {
        let xhr = null;
        let complete = false;


        xhr = gameManager.Instance.http.sendRequset(Api.get_serverinfo, null, (ret) => {
            console.log(ret);

        })



    }

    start() {
        this.scheduleOnce(() => {

            director.loadScene("loading")

        }, 5)
    }

    // update(deltaTime: number) {

    // }

    // 警示窗按鈕
    //  public onSure (){
    //     console.log("確定按鈕被點擊");
    // }
}


