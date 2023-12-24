import { _decorator, Component, director, Label, Node } from 'cc';
import gameManager from './components/gameManager';
import HTTP from './components/HTTP';
import { Api } from './components/urlAPI';

const { ccclass, property } = _decorator;
@ccclass('start')
export class startScence extends Component {
    @property(Node) startBg: Node = null;
    @property(Node) connecting: Node = null;
    _connecting: Label = null;
    onLoad() {
        this._connecting = this.connecting.getComponent(Label);
        this.connecting.active = false;
        
        this.scheduleOnce(()=>{
            this.startBg.active = false;
            this.init();
        },2)
        
        

    }
    
    init(){
        gameManager.Instance.http = new HTTP();
        this.connecting.active = true;
        this._connecting.string = "正在連接伺服器 ..."
        this.getServerInfo();
    }

    getServerInfo(){
        console.log("hi")
        let xhr = gameManager.Instance.http.sendRequset(Api.get_serverinfo,null,(ret)=>{
            console.log(ret);
        })
    }

    start() {
        this.scheduleOnce(()=>{
            director.loadScene("loading")
        },3)
    }

   
}


