import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class AppStart extends Component {

    @property(Node)
    bg :Node = null;

    @property(Node)

    lab:Node = null;

    _lab:Label = null;
    

    onLoad(){
        this._lab = this.lab.getComponent(Label);
        this.lab.active = false;
        this.scheduleOnce(()=>{
            this.bg.active = false;
            this.init()
        },2)

    }

//  初始化

    init(){
        this.lab.active=true;
        this._lab.string = "正在連接伺服器..."
        this.getSevetInfo()

    }


// 獲取伺服器信息

    getSevetInfo(){


    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


