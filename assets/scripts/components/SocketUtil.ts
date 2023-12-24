import { Game, game } from "cc";
const io = (window as any).io || {}
export default class SocketUtil {
    ip = "";
    sio = null;
    connected = false;
    fnDisconnect = null;
    isPing = false;
    lastSendTime = null;
    lastReciveTime = null;
    handlers = [];

    connect() {
        let opts = {
            'reconnection': false,
            'force new connection': true,
            'transports': ['websocket', 'polling']
        }
        this.sio = io.connect("http://127.0.0.1:3000", opts)
        this.sio.on("connect", (data) => {
            console.log(this.ip)
            console.log("connect")
            this.connected = true
            this.StartHeartBeat();
        })
        this.sio.on("disconnect", () => {
            this.connected = false;
            console.log("disconnect")
            this.close();
        });

        this.sio.on("connect_failed", () => {
            console.log("connect_failed")

        })

    }


    StartHeartBeat() {
        this.sio.on("game_pong", () => {
            console.log("game_pong")
            this.lastReciveTime = Date.now();
        })
        this.lastReciveTime = Date.now();

        setInterval(() => {
            if(this.sio && this.connected){
                this.sio.emit("game_ping")
                console.log("game_ping")
            }
        }, 2000)

        setInterval(()=>{
            if(this.sio && this.connected){
                if(Date.now() - this.lastReciveTime > 10000){
                    this.connected = false;
                    this.sio.disconnect();
                    this.sio = null;
                }
            }
        },500)
    }




    ping() {
        this.lastSendTime = Date.now();
        console.log("game_ping");
        this.send("game_ping")
    }
    send(event, data?) {
        if (this.connected) {
            if (data != null && (typeof (data) == "object")) {
                data = JSON.stringify(data);
            }
            this.sio.emit(event.data);
        }
        console.log("觸發時間: " + (new Date()).toLocaleTimeString + "request :" + event)
    }

    close() {
        if (this.sio && this.connected) {
            this.connected = false;
            this.sio.disconnect();
            this.sio = null;
        }
        if (this.fnDisconnect) {
            this.fnDisconnect();
            this.fnDisconnect = null;
        }


    }

}
