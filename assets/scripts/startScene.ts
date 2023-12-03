import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('start')
export class start extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

// 警示窗按鈕
     public onSure (){
        console.log("確定按鈕被點擊");
    }
}


