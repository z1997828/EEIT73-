import { waittingConn } from "../waitingConn";
import Alert from "./Alert";
import HTTP from "./HTTP"
import SocketUtil from "./SocketUtil";
import NetUtil from "./SocketUtil";

export default class gameManager{
    public static readonly Instance: gameManager = new gameManager()
    
    
    http:HTTP = null;
    SI = null;
    VERSION = null;
    socketUtil:SocketUtil = null;
    loading:waittingConn = null;
    alert:Alert = null;
    
}