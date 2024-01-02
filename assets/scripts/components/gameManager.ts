import { waittingConn } from "../waitingConn";
import Alert from "./Alert";
import HTTP from "./HTTP"
import SocketUtil from "./SocketUtil";
import NetUtil from "./SocketUtil";

export default class gameManager{
    public static readonly Instance: gameManager = new gameManager()
    
    // 網路請求
    http:HTTP = null;

    // 伺服器Version
    SI = null;

    //判斷版本是否正確
    VERSION = null;
    // socket.io
    socketUtil:SocketUtil = null;
    //等待網路請求畫面
    loading:waittingConn = null;
    //任意通知窗
    alert:Alert = null;
    
    
}