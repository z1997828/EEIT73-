import { Game, game } from "cc";

const io = (window as any).io || {}
export default class NetUtil {
    public static readonly Instance: NetUtil = new NetUtil();
    sio = null;
    connected = false;
    fnDisconnect = null;
    isPing = false;
    lastSendTime = null;
    lastReciveTime = null;
    handlers=[];
    init() {
        let opts = {
            'reconnection': false,
            'force new connection': true,
            'transports': ['websocket', 'polling']
        }
        this.sio = io.connect("http://127.0.0.1:3000", opts)
        this.sio.on("connect", (data) => [
            console.log("connect")
        ])
    //     this.sio.on("disconnect",()=>{
    //         this.connected = false;
    //     });
        
    //     this.sio.on("connect_failed",()=>{
    //         console.log("connect_failed")
    //         fnError()
    //     })
    //     this.StartHeartBeat();
    //     game.on(Game.EVENT_HIDE, ()=> {
    //         if(this.sio && this.connected){
    //             this.sio("game_disconect");
    //         }
    //     });
    //     game.on(Game.EVENT_SHOW,()=>{
    //         this.lastReciveTime = Date.now()
    //         this.ping();
    //         if (this.sio && this.connected) {
    //             this.send("game_connect")
    //         }
    //     })
    //     for (const k in this.handlers) {
    //        let v = this.handlers[k];
    //         if(k == "disconnect"){
    //             this.fnDisconnect = v
    //         }
    //         else{
    //             console.log("register:event: " + k);
    //             this.sio.on(k,v)
    //         }
    //     }
    // }

    // addHandler(event,fn){
    //     if(this.handlers[event]){
    //         console.log("監聽已存在");
    //         return ;
    //     }

    //     let handlers = function(data){
    //         if (event != "disconnect" && typeof(data) == "string") {
    //             data = JSON.parse(data)
    //         }
    //         fn(data);
    //     }
    //     this.handlers[event] = handlers
    //     if (this.sio) {
    //         console.log("register:event: " + event)
    //         this.sio.on(event,handlers)
    //     }
    // }
    // StartHeartBeat(){
    //     this.lastReciveTime = Date.now();
    //     if (!this.isPing) {
    //         this.isPing = true;
    //         setInterval(()=>{
    //             if (this.sio) {
    //                 if (Date.now() - this.lastReciveTime > 10000) {
    //                     this.close()
    //                 } else {
    //                     this.ping();
    //                 }
    //             }
    //         },3000)
    //     }  
    //     this.sio.on("game_pong",()=>{
    //         console.log("game_pong")
    //         this.lastReciveTime = Date.now();
    //     })
    // }
    // ping(){
    //     this.lastSendTime = Date.now();
    //     console.log("game_ping");
    //     this.send("game_ping")
    // }
    // send(event,data?){
    //     if(this.connected){
    //         if (data != null && (typeof(data) == "object")) {
    //             data = JSON.stringify(data);
    //         }
    //         this.sio.emit(event.data);
    //     }
    //     console.log("觸發時間: " + (new Date()).toLocaleTimeString + "request :" + event)
    // }

    // close(){
    //     if(this.sio && this.connected){
    //         this.connected = false;
    //         this.sio.disconnect();
    //         this.sio = null;
    //     }
    //     if(this.fnDisconnect){
    //         this.fnDisconnect();
    //         this.fnDisconnect = null;
    //     }


    }
}

